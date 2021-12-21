class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onMenuButtonClicked = this.onMenuButtonClicked.bind(this);
    this.state = {
      isOpened: false
    }
  }

  onMenuButtonClicked(){
    this.setState({isOpened: !this.state.isOpened})
  }

  render() {
    return(
        <div>
          <div className="menu_button">
                <MenuButton onClick={this.onMenuButtonClicked} text={this.state.isOpened? 'Close Menu': 'Open Menu'} />
          </div>
          <div className="menu_options_wrapper">
              <div className={'menu_options'+ (this.state.isOpened? ' open': '')}>
                <MenuOption text="Hello" />
                <br/>
                <MenuOption text="Hello" />
                <br/>
                <MenuOption text="Hello" />
                <br/>
                <MenuOption text="Hello" />
              </div>
          </div>
      </div>
    )
  }
}

const domContainers = document.querySelectorAll('.main_menu')
domContainers.forEach(domContainer => ReactDOM.render(<MainMenu/>, domContainer))
