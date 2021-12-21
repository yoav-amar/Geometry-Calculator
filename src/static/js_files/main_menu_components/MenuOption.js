class MenuOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <button className={'menu_option' + (this.props.isMarked? ' marked' : '')}>
        {this.props.text}
      </button>
    )
  }
}