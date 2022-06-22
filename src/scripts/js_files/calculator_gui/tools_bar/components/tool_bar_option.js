import React from 'react'
import 'css_files/calculator_gui/tool_bar/components/tool_bar_option.css'

class ToolBarOption extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          isHover: false
      }
  }

  render() {
    return(
        <div className="tool_bar_option">
            <figure>
                <figcaption > {this.props.optionText} </figcaption>
                <input type="image" src={this.props.imageSrc} alt={this.props.imageAlt} draggable={false}
                     onClick={this.props.onClick}
                     onMouseEnter={e => this.setState({isHover: true})}
                     onMouseLeave={e => this.setState({isHover: false})}
                     style={this.state.isHover?{opacity: "1"}: {opacity: "0.7"}}/>
            </figure>
        </div>
    )
  }
}

export default ToolBarOption