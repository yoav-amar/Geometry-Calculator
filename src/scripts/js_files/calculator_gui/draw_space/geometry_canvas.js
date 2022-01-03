import React from 'react';
import 'css_files/calculator_gui/draw_space/geometry_canvas.css'
import Dot from './components/Dot'
import Line from './components/Line'

class GeometryCanvas extends React.Component {
  constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)
      this.onMouseDown = this.onMouseDown.bind(this)
      this.getNextGeId = this.getNextGeId.bind(this)
      this.clear = this.clear.bind(this)
      this.erase = this.erase.bind(this)

      this.painterStatus = ''

      this.props.toolBar.painterNotifier = function (status) {
          this.painterStatus = status
          this.currentLine.dot1Id = ''

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

      this.nextIndex = 0
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

      this.setState({geometryElements: {
              lines: [],
              dots: [],
              circles: []
          }})

      this.nextIndex = 0
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

      let dim = e.getBoundingClientRect();
      let x = event.clientX - dim.left
      let y = event.clientY - dim.top

      if(this.painterStatus === "dot") {
          let nextId = this.getNextGeId()
          this.state.geometryElements.dots.push(<Dot id={nextId} posX={x} posY={y} geometryCanvas={this}/>)
            this.setState({})
      } else if(["edge", "broken_edge", "conn_edges"].includes(this.painterStatus)) {
          let nextId = this.getNextGeId()
          if(this.currentLine.dot1Id === '') {
              this.state.geometryElements.dots.push(<Dot id={nextId} posX={x} posY={y} geometryCanvas={this}/>)
              this.currentLine.dot1Id = nextId
              this.currentLine.x1 = x
              this.currentLine.y1 = y
          } else {
              this.state.geometryElements.dots.push(<Dot id={nextId} posX={x} posY={y} geometryCanvas={this}/>)
              let lineId = this.getNextGeId()
              this.state.geometryElements.lines.push(<Line id={lineId} x2={x} y2={y} x1={this.currentLine.x1}
                                                           y1={this.currentLine.y1} dot1Id={this.currentLine.dot1Id}
                                                           dot2Id={nextId} geometryCanvas={this}
                                                           isBroken={this.painterStatus === "broken_edge"}/>)

              if(this.painterStatus === "conn_edges"){
                  this.currentLine.dot1Id = nextId
                  this.currentLine.x1 = x
                  this.currentLine.y1 = y
              } else {
                  this.currentLine.dot1Id = ''
              }
          }

          this.setState({})
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