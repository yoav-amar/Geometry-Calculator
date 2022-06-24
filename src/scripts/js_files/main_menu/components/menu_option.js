import React from 'react'
import 'css_files/main_menu/components/menu_option.css'

class MenuOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <button className={'menu_option' + (this.props.isMarked? ' marked' : '')}
              onClick={() => this.props.isMarked? window.location.href = window.location.href + "/"+this.props.action:$("#main_body").load(this.props.action)}>
        {this.props.text}
      </button>
    )
  }
}

export default MenuOption