import React from 'react'

class HelpDot extends React.Component {
  constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)

      this.state = {
        isOver: false
      }
  }

  onClick (e){
      this.props.geometryCanvas.createGeometryElement(this.props.posX,this.props.posY)
  }

  render() {
    return(
        <circle id={this.props.id} cx={this.props.posX} cy={this.props.posY} r="5"
            onMouseEnter={e => this.setState({isOver: true})}
            onMouseLeave={e => this.setState({isOver: false})}
            onClick={e => this.onClick(e)}
            fill={this.state.isOver?"#cd374d":(this.props.color?this.props.color:"black")}
            opacity={(this.state.isOver || this.props.color)? "1" : "0.2"}
        />
    )
  }
}

export default HelpDot