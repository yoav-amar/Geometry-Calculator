

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
                <MenuButton onClick={this.onMenuButtonClicked} text={this.state.isOpened? 'סגור תפריט': 'פתח תפריט'} />
          </div>
          <div className="menu_options_wrapper">
              <div className={'menu_options'+ (this.state.isOpened? ' open': '')}>
                <MenuOption text="מחשבון" action="calculator"/>
                <br/>
                <MenuOption text="הגיאומטריק-ות שלי" action="my_gangs"/>
                <br/>
                <MenuOption text="ההיסטוריה שלי" action="sign_in"/>
                <br/>
                <MenuOption text="הגדרות" action="settings"/>
                <br/>
                <MenuOption text="התנתק" isMarked={true}/>
              </div>
          </div>
      </div>
    )
  }
}

const domContainers = document.querySelectorAll('.main_menu')
domContainers.forEach(domContainer => ReactDOM.render(<MainMenu/>, domContainer))
