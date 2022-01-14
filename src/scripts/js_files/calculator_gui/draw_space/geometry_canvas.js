import React from 'react';
import 'css_files/calculator_gui/draw_space/geometry_canvas.css'
import Dot from './components/dot'
import Line from './components/line'
import Circle from "./components/circle";

class GeometryCanvas extends React.Component {
  constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)
      this.onMouseDown = this.onMouseDown.bind(this)
      this.getNextGeId = this.getNextGeId.bind(this)
      this.clear = this.clear.bind(this)
      this.erase = this.erase.bind(this)
      this.createGeometryElement = this.createGeometryElement.bind(this)

      this.painterStatus = ''

      this.props.toolBar.painterNotifier = function (status) {
          this.painterStatus = status
          this.currentLine.dot1Id = ''
          this.currentCircle.centerDotId = ''

          if(status === "clear") {
              this.clear()
          }
      }.bind(this)

      this.state = {
          geometryElements: {
              lines: [],
              dots: [],
              circles: []
          }
      }

      this.instances = {
          lines: [],
          dots: [],
          circles: []
      }

      this.currentLine = {
          dot1Id: '',
          x1: NaN,
          y1: NaN,
      }

      this.currentCircle = {
          centerDotId: '',
          x: NaN,
          y: NaN,
      }

      this.nextIndex = 0

      this.dim = null
  }

  clear() {
      this.instances = {
          lines: [],
          dots: [],
          circles: []
      }
      this.currentLine = {
          dot1Id: '',
          x1: NaN,
          y1: NaN,
      }
      this.currentCircle = {
          centerDotId: '',
          x: NaN,
          y: NaN,
      }

      this.setState({geometryElements: {
              lines: [],
              dots: [],
              circles: []
          }})

      this.nextIndex = 0

      this.dim = null
  }

  erase(event) {
      let e = event.target;
      if(e.tagName === "svg" || this.painterStatus !== "eraser") {
          return
      }
      this.state.geometryElements.dots = this.state.geometryElements.dots.filter(tag => tag.props.id !== e.id)
      this.state.geometryElements.lines = this.state.geometryElements.lines.filter(tag => tag.props.id !== e.id)
      this.state.geometryElements.circles = this.state.geometryElements.circles.filter(tag => tag.props.id !== e.id)

      let filterFunc = (ge) => {
          if(ge.props.id === e.id) {
              ge.onErase()
              return false
          }

          return true
      }

      this.instances.dots = this.instances.dots.filter(filterFunc)
      this.instances.lines = this.instances.lines.filter(filterFunc)
      this.instances.circles = this.instances.circles.filter(filterFunc)

      this.setState({})
  }

  getNextGeId(){
      this.nextIndex += 1
      return "ge_" + this.nextIndex
  }

  onClick(event) {
      let e = event.target;
      if(e.tagName !== "svg") {
          return
      }

      if(this.dim == null) {
          this.dim = e.getBoundingClientRect();
      }

      let x = event.clientX - this.dim.left
      let y = event.clientY - this.dim.top

      this.createGeometryElement(x,y)
  }

  createGeometryElement(x,y,nextId='', onSuccess=null){
      if(this.painterStatus === "dot") {
          if(nextId !== '') {
              let isDotExists = false

              this.instances.dots.forEach((d) => {
                  if (d.props.id ===nextId) {
                      isDotExists = true
                  }
              })

              if(isDotExists) {
                  alert("Dot already exists !!!")
                  return
              }
          }

          let realNextId = ((nextId==='') ? this.getNextGeId() : nextId)

          this.state.geometryElements.dots.push(<Dot id={realNextId} posX={x} posY={y} geometryCanvas={this}/>)
          this.setState({})
      } else if(["edge", "broken_edge", "conn_edges"].includes(this.painterStatus)) {
          let realNextId = ((nextId==='') ? this.getNextGeId() : nextId)
          if(this.currentLine.dot1Id === '') {
              this.state.geometryElements.dots.push(<Dot id={realNextId} posX={x} posY={y} geometryCanvas={this}/>)
              this.currentLine.dot1Id = realNextId
              this.currentLine.x1 = x
              this.currentLine.y1 = y
          } else {
              if(nextId !== '') {
                  if (this.currentLine.dot1Id === nextId){
                      alert("You should choose different dots for line !!!!")
                      return
                  }

                  let isLineExists = false

                  this.instances.lines.forEach((line) => {
                      if(line.dots.includes(nextId) &&
                        line.dots.includes(this.currentLine.dot1Id)) {
                        isLineExists = true
                      }
                  })

                  if(isLineExists) {
                      alert("Line already exists !!!")
                      return
                  }
              }

              this.state.geometryElements.dots.push(<Dot id={realNextId} posX={x} posY={y} geometryCanvas={this}/>)
              let lineId = this.getNextGeId()
              this.state.geometryElements.lines.push(<Line id={lineId} x2={x} y2={y} x1={this.currentLine.x1}
                                                           y1={this.currentLine.y1} dot1Id={this.currentLine.dot1Id}
                                                           dot2Id={realNextId} geometryCanvas={this}
                                                           isBroken={this.painterStatus === "broken_edge"}/>)

              if(this.painterStatus === "conn_edges"){
                  this.currentLine.dot1Id = realNextId
                  this.currentLine.x1 = x
                  this.currentLine.y1 = y
              } else {
                  this.currentLine.dot1Id = ''
              }
          }

          this.setState({})
      }else if(this.painterStatus === "circle") {
          if(this.currentCircle.centerDotId === '') {
              let realNextId = ((nextId==='') ? this.getNextGeId() : nextId)
              this.state.geometryElements.dots.push(<Dot id={realNextId} posX={x} posY={y} geometryCanvas={this}/>)
              this.currentCircle.centerDotId = realNextId
              this.currentCircle.x = x
              this.currentCircle.y = y
          } else {
              if(nextId !== '') {
                  if (this.currentCircle.centerDotId === nextId){
                      alert("You should choose different dots for circle (radius > 0) !!!!")
                      return
                  }

                  let isCircleExists = false
                  let radius = Math.sqrt((this.currentCircle.x - x)**2
                      + (this.currentCircle.y - y)**2)
                  this.instances.circles.forEach((circle) => {
                      if(circle.centerId === this.currentCircle.centerDotId &&
                        circle.radius === radius) {
                        isCircleExists = true
                      }
                  })

                  if(isCircleExists) {
                      alert("Circle already exists !!!")
                      return
                  }

                  let isDotExists = false
                  this.state.geometryElements.dots.forEach((dot) => {
                      if(dot.props.id === nextId) {
                        isDotExists = true
                      }
                  })

                  if(!isDotExists) {
                      this.state.geometryElements.dots.push(<Dot id={nextId} posX={x} posY={y} geometryCanvas={this}/>)
                  }
              }

              let circleNextId = this.getNextGeId()
              this.state.geometryElements.circles.push(<Circle id={circleNextId} centerX={this.currentCircle.x}
                                                               centerY={this.currentCircle.y} onCircleX={x}
                                                               onCircleY={y}
                                                               onCircleId={nextId}
                                                               centerDotId={this.currentCircle.centerDotId}
                                                               geometryCanvas={this}/>)

              this.currentCircle.centerDotId = ''
          }
          this.setState({})
      }

     if(onSuccess !== null) {
         onSuccess()
     }
  }

  onMouseDown(event) {
      document.onmousemove = (event) => {
          this.erase(event)
      }

      document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null;
      }

      this.erase(event)
  }

  render() {
    return(
        <svg className="geometry_grid" onClick={e=>this.onClick(e)} onMouseDown={e=>this.onMouseDown(e)}>
            {this.state.geometryElements.circles.concat(
                this.state.geometryElements.lines).concat(
                    this.state.geometryElements.dots)}
        </svg>
    )
  }
}

export default GeometryCanvas;