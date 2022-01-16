import React from 'react'
import 'css_files/calculator_gui/draw_space/geometry_canvas.css'
import Dot from './components/dot'
import Line from './components/line'
import Circle from "./components/circle"
import HelpDot from "./components/help_dot"
import help_dot from "./components/help_dot";

class GeometryCanvas extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.onMouseDown = this.onMouseDown.bind(this)
      this.getNextGeId = this.getNextGeId.bind(this)
      this.clear = this.clear.bind(this)
      this.erase = this.erase.bind(this)
      this.createGeometryElement = this.createGeometryElement.bind(this)
      this.getInterDotId = this.getInterDotId.bind(this)
      this.setHelpDots = this.setHelpDots.bind(this)
      this.getDim = this.getDim.bind(this)
      this.addHelpDrawingDots = this.addHelpDrawingDots.bind(this)

      this.painterStatus = ''

      this.props.toolBar.painterNotifier = function (status) {
          this.painterStatus = status
          this.currentLine.dot1Id = ''
          this.currentCircle.centerDotId = ''
          this.helpDrawingDots = []

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
          y1: NaN
      }

      this.currentCircle = {
          centerDotId: '',
          x: NaN,
          y: NaN
      }

      this.helpDrawingDots = []

      this.nextIndex = 0

      this.nextHelpDrawingDotIndex = 0

      this.helpDots = []
  }

  setHelpDots(){
      this.helpDots = []

      let idIndex = 1
      for(let x = 0; x < document.body.clientWidth; x+=30){
          for(let y = 0; y < document.body.clientHeight; y+=30){
              this.helpDots.push(<HelpDot id={'hd_'+ idIndex} key={'hd_'+ idIndex}
                                          posX={x} posY={y} geometryCanvas={this}/>)

              ++idIndex
          }
      }

      this.setState({})
  }

   componentDidMount(){
      this.setHelpDots()
      window.addEventListener('resize', this.setHelpDots)
   }

   getDim(){
      return this.geometrySvg.getBoundingClientRect()
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
          y1: NaN
      }
      this.currentCircle = {
          centerDotId: '',
          x: NaN,
          y: NaN
      }

      this.setState({geometryElements: {
              lines: [],
              dots: [],
              circles: []
          }})

      this.nextIndex = 0
      this.nextHelpDrawingDotIndex = 0

      this.helpDrawingDots = []
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

  getInterDotId(x, y){
      let safeMargin = 0.1
      for(let i = 0; i < this.state.geometryElements.dots.length; ++i) {
          let d = this.state.geometryElements.dots[i]
          if(Math.abs(d.props.posX - x) < safeMargin &&
              Math.abs(d.props.posY - y) < safeMargin){
              return d.props.id
          }
      }

      let nextId = this.getNextGeId()
      this.state.geometryElements.dots.push(
                  <Dot id={nextId} key={nextId} posX={x} posY={y} geometryCanvas={this}/>)

      this.setState({})

      return nextId
  }

  onClick(event) {
      let e = event.target;
      if(e.tagName !== "svg") {
          return
      }

      let dim = this.getDim()
      let x = event.clientX - dim.left
      let y = event.clientY - dim.top

      this.createGeometryElement(x,y)
  }

  addHelpDrawingDots(x, y){
      this.helpDrawingDots = []

      this.instances.circles.forEach((circle)=>{
          // y = m * x +b || x = b
          let m = NaN
          let b = circle.centerX
          if(x !== circle.centerX){
              m = (y - circle.centerY) / (x - circle.centerX)
              b = circle.centerY - m * circle.centerX
          }

          let interSet = circle.getLineInter(m, b)
          let color = this.painterStatus==="circle"?"orange":"blue"
          interSet.forEach(([x, y]) => {
              this.helpDrawingDots.push(<HelpDot id={'hdd_'+ (++this.nextHelpDrawingDotIndex)}
                                                 key={'hdd_'+ this.nextHelpDrawingDotIndex}
                                                 posX={x} posY={y} geometryCanvas={this} color={color}/>)
          })

          if(this.painterStatus!=="circle") { // A type of line
              let distSquare = (x - circle.centerX) ** 2 + (y - circle.centerY) ** 2
              let touchLengthSquare = distSquare - circle.radius ** 2
              if (touchLengthSquare > 0) {
                  let interSet = circle.getCircleInter(x, y, Math.sqrt(touchLengthSquare),
                      circle.centerX, circle.centerY, circle.radius)

                  interSet.forEach(([x, y]) => {
                      this.helpDrawingDots.push(<HelpDot id={'hdd_' + (++this.nextHelpDrawingDotIndex)}
                                                         key={'hdd_' + this.nextHelpDrawingDotIndex}
                                                         posX={x} posY={y} geometryCanvas={this} color="orange"/>)
                  })
              }
          }
      })

      this.setState({})
  }

  createGeometryElement(x,y,nextId='', onSuccess=null, isNextIdCreated=false){
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

          if(!isNextIdCreated) {
              this.state.geometryElements.dots.push(<Dot id={realNextId} key={realNextId}
                                                         posX={x} posY={y} geometryCanvas={this}/>)
              this.setState({})
          }
      } else if(["edge", "broken_edge", "conn_edges"].includes(this.painterStatus)) {
          let realNextId = ((nextId==='') ? this.getNextGeId() : nextId)
          if(this.currentLine.dot1Id === '') {
              if(!isNextIdCreated) {
                  this.state.geometryElements.dots.push(<Dot id={realNextId} key={realNextId}
                                                             posX={x} posY={y} geometryCanvas={this}/>)
                  this.setState({})
              }
              this.currentLine.dot1Id = realNextId
              this.currentLine.x1 = x
              this.currentLine.y1 = y

              this.addHelpDrawingDots(x, y)
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

              if(!isNextIdCreated) {
                  this.state.geometryElements.dots.push(<Dot id={realNextId} key={realNextId}
                                                             posX={x} posY={y} geometryCanvas={this}/>)
              }

              let lineId = this.getNextGeId()
              this.state.geometryElements.lines.push(<Line id={lineId} key={lineId} x2={x} y2={y}
                                                           x1={this.currentLine.x1} y1={this.currentLine.y1}
                                                           dot1Id={this.currentLine.dot1Id}
                                                           dot2Id={realNextId} geometryCanvas={this}
                                                           isBroken={this.painterStatus === "broken_edge"}/>)

              if(this.painterStatus === "conn_edges"){
                  this.currentLine.dot1Id = realNextId
                  this.currentLine.x1 = x
                  this.currentLine.y1 = y

                  this.addHelpDrawingDots(x, y)
              } else {
                  this.currentLine.dot1Id = ''
                  this.helpDrawingDots = []
              }
              this.setState({})
          }
      }else if(this.painterStatus === "circle") {
          if(this.currentCircle.centerDotId === '') {
              let realNextId = ((nextId==='') ? this.getNextGeId() : nextId)
              if(!isNextIdCreated) {
                  this.state.geometryElements.dots.push(<Dot id={realNextId} key={realNextId}
                                                             posX={x} posY={y} geometryCanvas={this}/>)
                  this.setState({})
              }
              this.currentCircle.centerDotId = realNextId
              this.currentCircle.x = x
              this.currentCircle.y = y

              this.addHelpDrawingDots(x, y)
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
                      this.state.geometryElements.dots.push(<Dot id={nextId} key={nextId}
                                                                 posX={x} posY={y} geometryCanvas={this}/>)
                  }
              }

              let circleNextId = this.getNextGeId()
              this.state.geometryElements.circles.push(<Circle id={circleNextId} key={circleNextId}
                                                               centerX={this.currentCircle.x}
                                                               centerY={this.currentCircle.y} onCircleX={x}
                                                               onCircleY={y}
                                                               onCircleId={nextId}
                                                               centerDotId={this.currentCircle.centerDotId}
                                                               geometryCanvas={this}/>)

              this.currentCircle.centerDotId = ''
              this.helpDrawingDots = []
              this.setState({})
          }
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
        <svg className="geometry_grid" onClick={e=>this.onClick(e)}
             onMouseDown={e=>this.onMouseDown(e)} ref={ip => this.geometrySvg = ip}>
            <g id="circles">
                {this.state.geometryElements.circles}
            </g>
            <g id="lines">
                {this.state.geometryElements.lines}
            </g>
            <g>
                {this.helpDots}
            </g>
            <g id="help_dots">
                {this.helpDrawingDots}
            </g>
            <g id="dots">
                {this.state.geometryElements.dots}
            </g>
        </svg>
    )
  }
}

export default GeometryCanvas