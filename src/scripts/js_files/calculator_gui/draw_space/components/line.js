import React from 'react';
import Dot from './dot'

class Line extends React.Component {
  constructor(props) {
      super(props)

      this.onErase = this.onErase.bind(this)
      this.addDot = this.addDot.bind(this)
      this.onClick = this.onClick.bind(this)
      this.isDotOnEdge = this.isDotOnEdge.bind(this)
      this.checkAndHandleLineIntersections = this.checkAndHandleLineIntersections.bind(this)

      this.state = {
          isOver: false
      }

      this.dots = [this.props.dot1Id, this.props.dot2Id]

      // y = m * x +b || x = b
      if(this.props.x2 === this.props.x1) {
          this.m = NaN
          this.b = this.props.x1
      } else {
          this.m = (this.props.y2 - this.props.y1) / (this.props.x2 - this.props.x1)
          this.b = this.props.y1 - this.m * this.props.x1
      }

      // intersections with this line
      this.props.geometryCanvas.instances.lines.forEach((line) => {
         this.checkAndHandleLineIntersections(line)
      })

      // intersections with this circle
      this.props.geometryCanvas.instances.circles.forEach((circle) => {
         circle.checkAndHandleLineIntersections(this)
      })

      this.props.geometryCanvas.instances.lines.push(this)
  }

  onErase(){

  }

  checkAndHandleLineIntersections(line){
      if(line.m === this.m) {return}

          let x = 0
          let y = 0
          if(isNaN(line.m)) {
              x = line.b
              y = this.m * x + this.b
          } else if(isNaN(this.m)) {
              x = this.b
              y = line.m * x + line.b
          }else {
              x = (line.b - this.b) / (this.m - line.m)
              y = this.m * x + this.b
          }

          if(line.isDotOnEdge(x,y) && this.isDotOnEdge(x,y)) {

              let nextId = this.props.geometryCanvas.getNextGeId()
              this.props.geometryCanvas.state.geometryElements.dots.push(
                  <Dot id={nextId} posX={x} posY={y} geometryCanvas={this.props.geometryCanvas}/>)

              this.props.geometryCanvas.setState({})

              this.addDot(nextId, x, y)
              line.addDot(nextId, x, y)
          }
  }

  onClick(e){
      if(!["edge", "broken_edge", "conn_edges", "dot", "circle"].includes(this.props.geometryCanvas.painterStatus)){
          return
      }

      let nextId = this.props.geometryCanvas.getNextGeId()
      let x = e.clientX - this.props.geometryCanvas.dim.left
      let y = this.m * x + this.b

      this.props.geometryCanvas.createGeometryElement(x,y, nextId,()=>{
          this.addDot(nextId, x, y)
      })
  }

  isDotOnEdge(x,y){
      return this.isDotBetweenDots(x,y, this.props.x1, this.props.y1, this.props.x2, this.props.y2)
  }

  isDotBetweenDots(x,y,x1,y1,x2,y2) {
      let minX = Math.min(x1, x2)
      let maxX = Math.max(x1, x2)
      let minY = Math.min(y1, y2)
      let maxY = Math.max(y1, y2)

      return ((minX < x) && (x < maxX)) && ((minY < y) && (y < maxY))
  }

  addDot(dotId,x,y){
      let firstDot = this.props.geometryCanvas.state.geometryElements.dots.find(d => d.props.id === this.dots[0])
      for(let i = 0; i < this.dots.length - 1; ++i) {
          let secondDot = this.props.geometryCanvas.state.geometryElements.dots.find(
              d => d.props.id === this.dots[i + 1])

          if(this.isDotBetweenDots(x,y,firstDot.props.posX,firstDot.props.posY,
              secondDot.props.posX,secondDot.props.posY)) {
              this.dots.splice( i + 1,0, dotId)
              break
          }

          firstDot = secondDot
      }
  }

  render() {
      return(
          <line id={this.props.id} x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2}
                stroke={this.state.isOver?"ForestGreen":"black"} strokeWidth={6}
                onMouseEnter={e => this.setState({isOver: true})}
                onMouseLeave={e => this.setState({isOver: false})}
                onClick={e => this.onClick(e)}
                strokeDasharray={this.props.isBroken?7: 0}
          />
      )
  }
}

export default Line;