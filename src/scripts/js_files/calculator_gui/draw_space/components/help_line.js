import React from 'react'
import Dot from "./dot";
import Line from "./line";

class HelpLine extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.handleClickXY = this.handleClickXY.bind(this)

      this.state = {
        isOver: false
      }

      this.line = this.props.line
      this.m = this.line.m
      this.b = this.line.b

      this.safeDist = 3000

      if(isNaN(this.m)){
          this.x1 = this.b
          this.y1 = 0

          this.x2 = this.b
          this.y2 = this.safeDist
      } else {
          this.x1 = 0
          this.y1 = this.b

          this.x2 = this.safeDist
          this.y2 = this.m * this.x2 + this.b
      }

      // intersections with this line
      this.props.geometryCanvas.instances.lines.forEach((line) => {
          let interDot = line.getLineInter(this)

          if(interDot !== null){
              let [x, y] = interDot

              if(line.isDotOnEdge(x,y) && !this.line.isDotOnEdge(x,y)) {
                  this.props.geometryCanvas.createHelpDrawingDot(x, y, "orange", (e)=>{
                      this.handleClickXY(x,y)
                  })
              }
          }
      })

      // intersections with this circle
      this.props.geometryCanvas.instances.circles.forEach((circle) => {
         let interDots = circle.getLineInter(this.m, this.b)

          interDots.forEach(([x, y])=>{
              if(!this.line.isDotOnEdge(x,y)) {
                  this.props.geometryCanvas.createHelpDrawingDot(x, y, "orange", (e)=>{
                      this.handleClickXY(x,y)
                  })
              }
          })
      })
  }

  handleClickXY (x, y, nextId='') {
      // check if dot on line:
      if((isNaN(this.m) && x !== this.b) ||
          Math.abs(y-(this.m * x + this.b)) > 0.01 ||
          this.line.isDotOnEdge(x,y)){
          alert("Dot not on the line's continuation !!!")
          return
      }

      if(nextId===''){
          nextId = this.props.geometryCanvas.getNextGeId()

          this.props.geometryCanvas.state.geometryElements.dots.push(
              <Dot id={nextId} key={nextId} posX={x} posY={y} geometryCanvas={this.props.geometryCanvas}/>)
      }

      let newDots = [...this.line.dots]
      let lineId = this.props.geometryCanvas.getNextGeId()
      let isBroken = this.line.props.isBroken

      let firstDist = Math.sqrt((this.line.props.x1 - x)**2 + (this.line.props.y1 - y)**2)
      let secondDist = Math.sqrt((this.line.props.x2 - x)**2 + (this.line.props.y2 - y)**2)

      let x1,y1,x2,y2, dot1Id, dot2Id
      if(firstDist > secondDist){
          dot1Id = this.line.props.dot1Id
          x1 = this.line.props.x1
          y1 = this.line.props.y1

          dot2Id = nextId
          x2 = x
          y2 = y
      } else {
          dot1Id = nextId
          x1 = x
          y1 = y

          dot2Id = this.line.props.dot2Id
          x2 = this.line.props.x2
          y2 = this.line.props.y2
      }

      this.props.geometryCanvas.erase(this.line.props.id)
      this.line = null

      // creating the new edge
      this.props.geometryCanvas.state.geometryElements.lines.push(
          <Line id={lineId} key={lineId} x1={x1} y1={y1} x2={x2} y2={y2}
                dot1Id={dot1Id} dot2Id={dot2Id}
                geometryCanvas={this.props.geometryCanvas}
                isBroken={isBroken} ref={ref => this.line = ref}/>)

      this.props.geometryCanvas.setState({}, ()=>{

          this.props.geometryCanvas.instances.dots.forEach((dot)=>{
              if(newDots.includes(dot.props.id)){
                  this.line.addDot(dot.props.id, dot.props.posX, dot.props.posY)
              }
          })
      })
  }


  onClick (e){
      let dim = this.props.geometryCanvas.getDim()

      let x, y
      if(isNaN(this.m)){
          x = this.b
          y = e.clientY - dim.top
      } else {
          x = e.clientX - dim.left
          y = this.m * x + this.b
      }

      this.handleClickXY(x, y)
  }


  render() {
    return(
        <line id={this.props.id} x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2}
              stroke={this.state.isOver?"blue":"black"} strokeWidth={6}
              onMouseEnter={e => this.setState({isOver: true})}
              onMouseLeave={e => this.setState({isOver: false})}
              onClick={e => this.onClick(e)}
              opacity={(this.state.isOver)? "1" : "0.4"}
        />
    )
  }
}

export default HelpLine