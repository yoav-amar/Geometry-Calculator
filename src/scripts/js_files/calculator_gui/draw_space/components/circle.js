import React from 'react';
import Line from "./line";
import Dot from "./dot";

class Circle extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.onErase = this.onErase.bind(this)
      this.addDot = this.addDot.bind(this)
      this.flat = this.flat.bind(this)
      this.getDotsByOrder = this.getDotsByOrder.bind(this)
      this.checkAndHandleLineIntersections = this.checkAndHandleLineIntersections.bind(this)
      this.getYbyX = this.getYbyX.bind(this)
      this.checkAndHandleCircleIntersections = this.checkAndHandleCircleIntersections.bind(this)

      this.safeMargin = 0.00001

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

      // intersections with this line
      this.props.geometryCanvas.instances.lines.forEach((line) => {
         this.checkAndHandleLineIntersections(line)
      })

      // intersections with this circle
      this.props.geometryCanvas.instances.circles.forEach((circle) => {
         this.checkAndHandleCircleIntersections(circle)
      })

      this.props.geometryCanvas.instances.circles.push(this)
  }

  checkAndHandleLineIntersections(line){
      let inter_set = new Set()
      if(isNaN(line.m)) {
          this.getYbyX(line.b).forEach((y) => inter_set.add([line.b, y]))
      }else {
          let a = 1 + line.m ** 2
          let b = -2 * this.centerX + 2 * line.b * line.m - 2 * line.m * this.centerY
          let c = this.centerX ** 2 + this.centerY ** 2 - this.radius ** 2 + line.b ** 2 - 2 * line.b * this.centerY

          let delta = b ** 2 - 4 * a * c

          if (delta < 0) return

          delta = Math.sqrt(delta)

          let x1 = (-b + delta) / (2 * a)
          let x2 = (-b - delta) / (2 * a)


          inter_set.add([x1, line.m * x1 + line.b])
          inter_set.add([x2, line.m * x2 + line.b])
      }

      inter_set.forEach(([x, y]) => {
          if(line.isDotOnEdge(x,y)) {
              let nextId = this.props.geometryCanvas.getNextGeId()
              this.props.geometryCanvas.state.geometryElements.dots.push(
                  <Dot id={nextId} posX={x} posY={y} geometryCanvas={this.props.geometryCanvas}/>)

              this.props.geometryCanvas.setState({})

              this.addDot(nextId, x, y)
              line.addDot(nextId, x, y)
          }
      })
  }

  checkAndHandleCircleIntersections(circle){
      let [x0, y0, r0] = [this.centerX, this.centerY, this.radius]
      let [x1, y1, r1] = [circle.centerX, circle.centerY, circle.radius]

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
      if (d > (r0 + r1)) {
          /* no solution. circles do not intersect. */
          return false
      }

      if (d < Math.abs(r0 - r1)) {
          /* no solution. one circle is contained in the other */
          return false
      }

      /* 'point 2' is the point where the line through the circle
      * intersection points crosses the line between the circle
      * centers.
      */

      /* Determine the distance from point 0 to point 2. */
      a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d)

      /* Determine the coordinates of point 2. */
      x2 = x0 + (dx * a/d)
      y2 = y0 + (dy * a/d)

      /* Determine the distance from point 2 to either of the
      * intersection points.
      */
      h = Math.sqrt((r0*r0) - (a*a))

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

      let inter_set = new Set([[xi, yi], [xi_prime, yi_prime]])

      inter_set.forEach(([x, y]) => {
          let nextId = this.props.geometryCanvas.getNextGeId()
          this.props.geometryCanvas.state.geometryElements.dots.push(
             <Dot id={nextId} posX={x} posY={y} geometryCanvas={this.props.geometryCanvas}/>)

          this.props.geometryCanvas.setState({})
          this.addDot(nextId, x, y)
          circle.addDot(nextId, x, y)
      })
  }

  getYbyX(x){
      if(x > (this.centerX + this.radius - this.safeMargin) ||
      x < (this.centerX - this.radius + this.safeMargin)){
         return []
      }

      let part_y = Math.sqrt(this.radius**2 - (x - this.centerX)**2)
      let y1 = part_y + this.centerY
      let y2 = -part_y + this.centerY

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
      let x = e.clientX - this.props.geometryCanvas.dim.left

      if(x > (this.centerX + this.radius - this.safeMargin)) {
          x = this.centerX + this.radius - this.safeMargin
      } else if (x < (this.centerX - this.radius + this.safeMargin)){
          x = this.centerX - this.radius + this.safeMargin
      }

      let y = e.clientY - this.props.geometryCanvas.dim.top

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

export default Circle;