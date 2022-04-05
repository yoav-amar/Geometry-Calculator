class MenuOption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="menu_option">
            <button>
              Hello!!
            </button>
        </div>
    );
  }
}


class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }

  render() {
    if(!this.state.isOpened) {
        return (
            <div className="rotation-wrapper">
                <button className="menu_button" onClick={() => this.setState({isOpened: true})}>
                    Open Menu
                </button>
            </div>
        )
    }

    return(
      <div>
          <div className="open_menu_close_area">
            <div className="rotation-wrapper">
                <button className="menu_button" onClick={() => this.setState({isOpened: false})}>
                    Close Menu
                </button>
            </div>
          </div>
          <div className="open_menu_options">
            <MenuOption text="Hello" />
            <br/>
            <MenuOption text="Hello" />
            <br/>
            <MenuOption text="Hello" />
            <br/>
            <MenuOption text="Hello" />
          </div>
      </div>
    );
  }
}

const domContainers = document.querySelectorAll('.main_menu')
domContainers.forEach(domContainer => ReactDOM.render(<MainMenu/>, domContainer))