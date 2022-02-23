import React from 'react'

class Dot extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.onErase = this.onErase.bind(this)

      this.state = {
        isOver: false,
        name: '',
        isNaming: false
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

      this.props.geometryCanvas.state.geometryElements.circles =
          this.props.geometryCanvas.state.geometryElements.circles.filter(
              circle=>(circle.props.centerDotId !== this.props.id))

      this.props.geometryCanvas.instances.circles =
          this.props.geometryCanvas.instances.circles.filter(
              (circle) => {
                  let ans = (circle.centerId !== this.props.id)

                  if(ans) {
                      delete circle.dotsAndPos[this.props.id]
                      return true
                  }

                  return false
              })
  }

  onClick (e){
      if(this.props.geometryCanvas.painterStatus === "name_dot") {
          this.setState({isNaming: true}, () => this.dotInput.focus())
          return
      } else if(this.props.geometryCanvas.painterStatus === "continue_edge" &&
          this.props.geometryCanvas.helpLine !== null) {
          this.props.geometryCanvas.helpLineRef.handleClickXY(this.props.posX, this.props.posY, this.props.id)
          return
      }

      if(!["edge", "broken_edge", "conn_edges", "circle"].includes(this.props.geometryCanvas.painterStatus)) {
          return
      }

      this.props.geometryCanvas.createGeometryElement(this.props.posX,this.props.posY,this.props.id, null, true)
  }

  render() {
      let elements = []
      elements.push(<circle id={this.props.id} key={this.props.id+'_circle'} cx={this.props.posX} cy={this.props.posY}
                r={this.state.name !== '' ?"10":"7"}
                onMouseEnter={e => this.setState({isOver: true})}
                onMouseLeave={e => this.setState({isOver: false})}
                onClick={e => this.onClick(e)}
                fill={this.state.isOver?"ForestGreen":"black"}/>)

      elements.push(<text stroke="white" x={this.props.posX} y={this.props.posY} key={this.props.id+'_text'}
                  strokeWidth="1px" textAnchor="middle"
                  onMouseEnter={e => this.setState({isOver: true})}
                  onMouseLeave={e => this.setState({isOver: false})}
                  onClick={e => this.onClick(e)} alignmentBaseline="central">{this.state.name}</text>)

      if(this.state.isNaming){
          elements.push(
              <foreignObject key={this.props.id+'_fg'} x={this.props.posX +10} y={this.props.posY - 10} width="50" height="30">
                  <input className="hidden-form" type="text" name="loc" placeholder="Name" key={this.props.id+'_input'}
                           style={{border: "3px solid black", boxSizing: "border-box", width: "100%"}}
                           onInput={e => this.setState({name: e.target.value.charAt(0)})}
                           onBlur={e => this.setState({isNaming: false})}
                           ref={(ip) => this.dotInput = ip}
                  />
              </foreignObject>)
      }
    return(
        <g>
            {elements}
        </g>
    )
  }
}

export default Dot