import React from 'react';

class MenuOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <button className={'menu_option' + (this.props.isMarked? ' marked' : '')}
              onClick={() => $("#main_body").load(this.props.action)}>
        {this.props.text}
      </button>
    )
  }
}