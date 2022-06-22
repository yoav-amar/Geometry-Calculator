import React from 'react'

class Circle extends React.Component {
  constructor(props) {
      super(props)

      this.getInfo = this.getInfo.bind(this)
      this.onClick = this.onClick.bind(this)
      this.onErase = this.onErase.bind(this)
      this.addDot = this.addDot.bind(this)
      this.flat = this.flat.bind(this)
      this.getDotsByOrder = this.getDotsByOrder.bind(this)
      this.checkAndHandleLineIntersections = this.checkAndHandleLineIntersections.bind(this)
      this.getYbyX = this.getYbyX.bind(this)
      this.checkAndHandleCircleIntersections = this.checkAndHandleCircleIntersections.bind(this)
      this.getLineInter = this.getLineInter.bind(this)
      this.getCircleInter = this.getCircleInter.bind(this)
      this.getSaveInfo = this.getSaveInfo.bind(this)

      this.state = {
        isOver: false
      }

      this.radius = Math.sqrt((this.props.centerX - this.props.onCircleX)**2
          + (this.props.centerY - this.props.onCircleY)**2)

      this.centerId = this.props.centerDotId
      this.centerX = this.props.centerX
      this.centerY = this.props.centerY

      this.dotsAndPos = {}

      if(this.props.onCircleId !== ''){
          this.dotsAndPos[this.props.onCircleId] = this.flat(this.props.onCircleX, this.props.onCircleY)
      }

      // intersections with dots
      this.props.geometryCanvas.instances.dots.forEach((dot) => {
          let yList = this.getYbyX(dot.props.posX)

          let safeMargin = 0.01
          yList.forEach((y)=>{
              if(Math.abs(y - dot.props.posY) < safeMargin) {
                  this.addDot(dot.props.id, dot.props.posX, y)
              }
          })
      })

      // intersections with line
      this.props.geometryCanvas.instances.lines.forEach((line) => {
         this.checkAndHandleLineIntersections(line)
      })

      // intersections with circle
      this.props.geometryCanvas.instances.circles.forEach((circle) => {
         this.checkAndHandleCircleIntersections(circle)
      })

      this.props.geometryCanvas.instances.circles.push(this)
  }

  getLineInter(mLine, bLine){
      let interSet = new Set()

      if(isNaN(mLine)) {
          this.getYbyX(bLine).forEach((y) => interSet.add([bLine, y]))
      }else {
          let a = 1 + mLine ** 2
          let b = -2 * this.centerX + 2 * bLine * mLine - 2 * mLine * this.centerY
          let c = this.centerX ** 2 + this.centerY ** 2 - this.radius ** 2 + bLine ** 2 - 2 * bLine * this.centerY

          let delta = b ** 2 - 4 * a * c

          if (delta < 0) return interSet

          delta = Math.sqrt(delta)

          let x1 = (-b + delta) / (2 * a)
          let x2 = (-b - delta) / (2 * a)


          interSet.add([x1, mLine * x1 + bLine])
          interSet.add([x2, mLine * x2 + bLine])
      }

      return interSet
  }

  checkAndHandleLineIntersections(line){
      let interSet = this.getLineInter(line.m, line.b)

      interSet.forEach(([x, y]) => {
          if(line.isDotOnEdge(x,y)) {
              let nextId = this.props.geometryCanvas.getInterDotId(x, y)

              this.addDot(nextId, x, y)
              line.addDot(nextId, x, y)
          }
      })
  }

  getCircleInter(x0, y0, r0, x1, y1, r1){
      let a, dx, dy, d, h, rx, ry
      let x2, y2

      /* dx and dy are the vertical and horizontal distances between
      * the circle centers.
      */
      dx = x1 - x0
      dy = y1 - y0

      /* Determine the straight-line distance between the centers. */
      d = Math.sqrt((dy*dy) + (dx*dx))

      /* Check for solvability. */
      let safeMargin = 1e-10
      if (d - (r0 + r1) > safeMargin) {
          /* no solution. circles do not intersect. */
          return new Set()
      }

      if (d - Math.abs(r0 - r1) < -safeMargin) {
          /* no solution. one circle is contained in the other */
          return new Set()
      }

      /* 'point 2' is the point where the line through the circle
      * intersection points crosses the line between the circle
      * centers.
      */

      /* Determine the distance from point 0 to point 2. */
      if((d - (r0 + r1)) > 0 || (d - Math.abs(r0 - r1)) < 0) { // to handle inaccuracies
          a = r0

      } else {
          a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d)
      }


      /* Determine the coordinates of point 2. */
      x2 = x0 + (dx * a/d)
      y2 = y0 + (dy * a/d)

      /* Determine the distance from point 2 to either of the
      * intersection points.
      */
      h = Math.sqrt(Math.max((r0*r0) - (a*a), 0))

      /* Now determine the offsets of the intersection points from
      * point 2.
      */

      rx = -dy * (h/d)
      ry = dx * (h/d);

      /* Determine the absolute intersection points. */
      let xi = x2 + rx
      let xi_prime = x2 - rx
      let yi = y2 + ry
      let yi_prime = y2 - ry

      return new Set([[xi, yi], [xi_prime, yi_prime]])
  }

  checkAndHandleCircleIntersections(circle){
      let interSet = this.getCircleInter(this.centerX, this.centerY, this.radius,
          circle.centerX, circle.centerY, circle.radius)

      interSet.forEach(([x, y]) => {
          let nextId = this.props.geometryCanvas.getInterDotId(x, y)

          this.addDot(nextId, x, y)
          circle.addDot(nextId, x, y)
      })
  }

  getYbyX(x){
      if(x > (this.centerX + this.radius) ||
      x < (this.centerX - this.radius)){
         return []
      }

      let partY = Math.sqrt(this.radius**2 - (x - this.centerX)**2)
      let y1 = partY + this.centerY
      let y2 = -partY + this.centerY

      return [y1, y2]
  }

  onErase(){

  }

  flat(x, y) {
      let normalizeRadius = 1 / this.radius

      let normalizedY = (y - this.centerY) * normalizeRadius
      if(normalizedY === 1) return Infinity

      let normalizedX = (x - this.centerX) * normalizeRadius

      return normalizedX / (1 - normalizedY)
  }

  addDot(dotId,x,y){
      if(dotId in this.dotsAndPos) return

      this.dotsAndPos[dotId] = this.flat(x, y)
  }

  getDotsByOrder(){
      let dots = Object.keys(this.dotsAndPos)

      let self = this
      dots.sort(function(a, b){return self.dotsAndPos[a] - self.dotsAndPos[b]})
      return dots
  }

  onClick (e){
      if(!["edge", "broken_edge", "conn_edges", "circle", "dot"].includes(this.props.geometryCanvas.painterStatus)) {
          return
      }

      let nextId = this.props.geometryCanvas.getNextGeId()

      let dim = this.props.geometryCanvas.getDim()
      let x = e.clientX - dim.left

      if(x > (this.centerX + this.radius)) {
          x = this.centerX + this.radius
      } else if (x < (this.centerX - this.radius)){
          x = this.centerX - this.radius
      }

      let y = e.clientY - dim.top

      let [y1, y2] = this.getYbyX(x)

      if(Math.abs(y - y1) < Math.abs(y - y2)){
          y = y1
      } else {
          y = y2
      }

      this.props.geometryCanvas.createGeometryElement(x,y, nextId,()=>{
          this.addDot(nextId, x, y)
      })
  }

  getInfo(){
      return {id: this.props.id, centerId: this.centerId ,dots: this.getDotsByOrder()}
  }

  getSaveInfo(){
      return {id: this.props.id, centerX: this.props.centerX, centerY: this.props.centerY,
          onCircleX: this.props.onCircleX, onCircleY: this.props.onCircleY, onCircleId: this.props.onCircleId,
          centerDotId: this.props.centerDotId}
  }

  render() {
    return(
        <circle id={this.props.id} cx={this.props.centerX} cy={this.props.centerY} r={this.radius}
                onMouseEnter={e => this.setState({isOver: true})}
                onMouseLeave={e => this.setState({isOver: false})}
                onClick={e => this.onClick(e)}
                stroke={this.state.isOver?"ForestGreen":"black"}
                strokeWidth="6"
                fill="none"
        />
    )
  }
}

export default Circle