import React from 'react';
import 'css_files/main_menu/components/menu_button.css'

class MenuButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <div className="outer-rotation-wrapper">
            <div className="inner-rotation-wrapper">
                <button className="menu-button" onClick={this.props.onClick}>
                    {this.props.text}
                </button>
            </div>
        </div>
    )
  }
}

export default MenuButton;