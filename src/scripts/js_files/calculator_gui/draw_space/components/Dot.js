import React from 'react';
import Line from "./Line";

class Dot extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.onErase = this.onErase.bind(this)

      this.state = {
        isOver: false
      }

      this.props.geometryCanvas.instances.dots.push(this)
  }

  onErase(){
      this.props.geometryCanvas.state.geometryElements.lines =
          this.props.geometryCanvas.state.geometryElements.lines.filter(
              line=>(line.props.dot1Id !== this.props.id) && (line.props.dot2Id !== this.props.id))

      this.props.geometryCanvas.instances.lines =
          this.props.geometryCanvas.instances.lines.filter(
              (line) => {
                  let ans = (line.dots.at(0) !== this.props.id) && (line.dots.at(-1) !== this.props.id)

                  if(ans) {
                      line.dots = line.dots.filter(id => id !== this.props.id)
                      return true
                  }

                  return false
              })
  }

  onClick (e){

      if(["edge", "broken_edge", "conn_edges"].includes(this.props.geometryCanvas.painterStatus)) {
          if(this.props.geometryCanvas.currentLine.dot1Id === '') {
              this.props.geometryCanvas.currentLine.dot1Id = this.props.id
              this.props.geometryCanvas.currentLine.x1 = this.props.posX
              this.props.geometryCanvas.currentLine.y1 = this.props.posY
          } else {
              if (this.props.geometryCanvas.currentLine.dot1Id === this.props.id){
                  alert("You should choose different dots for line !!!!")
                  return
              }

              let isLineExists = false
              this.props.geometryCanvas.instances.lines.forEach( (gl) => {
                    if(gl.dots.includes(this.props.id) &&
                        gl.dots.includes(this.props.geometryCanvas.currentLine.dot1Id)) {
                        isLineExists = true
                    }
                  }
              )

              if(isLineExists) {
                  alert("Line already exists !!!")
                  return
              }

              let nextId = this.props.geometryCanvas.getNextGeId()
              this.props.geometryCanvas.state.geometryElements.lines.push(
                  <Line id={nextId} x2={this.props.posX} y2={this.props.posY}
                        x1={this.props.geometryCanvas.currentLine.x1} y1={this.props.geometryCanvas.currentLine.y1}
                        dot1Id={this.props.geometryCanvas.currentLine.dot1Id}
                        dot2Id={this.props.id} geometryCanvas={this.props.geometryCanvas}
                        isBroken={this.props.geometryCanvas.painterStatus === "broken_edge"}/>)

              this.props.geometryCanvas.setState({})

              if(this.props.geometryCanvas.painterStatus === "conn_edges"){
                  this.props.geometryCanvas.currentLine.dot1Id = this.props.id
                  this.props.geometryCanvas.currentLine.x1 = this.props.posX
                  this.props.geometryCanvas.currentLine.y1 = this.props.posY
              } else {
                  this.props.geometryCanvas.currentLine.dot1Id = ''
              }
          }
      }
  }

  render() {
    return(
        <circle id={this.props.id} cx={this.props.posX} cy={this.props.posY} r="7"
                onMouseEnter={e => this.setState({isOver: true})}
                onMouseLeave={e => this.setState({isOver: false})}
                onClick={e => this.onClick(e)}
                fill={this.state.isOver?"ForestGreen":"black"}
        />
    )
  }
}

export default Dot;