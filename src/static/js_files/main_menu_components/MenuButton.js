class MenuButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <div className="rotation-wrapper">
            <button className="menu_button" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        </div>
    )
  }
}
