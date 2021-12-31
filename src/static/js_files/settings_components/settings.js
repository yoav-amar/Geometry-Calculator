class ChangeOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            txt: ""
        }
    }

    setType(new_type) {
        this.setState({type: new_type})
    }

    setTxt(new_txt) {
        this.setState({txt: new_txt})
    }

    render() {
        if (!this.state.type.localeCompare("button")) {
            return (
                <div className={this.props.className}>
                    <h1>{this.state.txt}</h1>
                    <input type={"txt"}/> <br/>
                    <button> אשר</button>
                </div>
            )
        }

        if (!this.state.type.localeCompare("checkbox")) {
            return (
                <div className={this.props.className}>
                    <h1>{this.state.txt}</h1>
                    <button> אשר</button>
                </div>
            )
        } else {
            return (<div className={this.props.className}>
                <h1>hey</h1>
            </div>)
        }
    }
}

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this)
        this.changeOption = React.createRef();
        this.state = {
            isOpened: false,
            txt: "ooo"
        }
    }

    onButtonClick(txt, type) {
        this.setState({isOpened: true})
        this.changeOption.current.setType(type)
        this.changeOption.current.setTxt(txt)


    }


    render() {
        return (
            <div className="outer_settings">
                <div className="page_name">
                    <h1> הגדרות</h1>
                </div>
                <div className="settings_wrapper">
                    <ChangeOption className={'change_setting_option' + (this.state.isOpened ? ' open' : '')}
                                  ref={this.changeOption}/>
                    <div className="settings_list">
                        <SettingsOption text="עדכן שם משתמש" onClick={() => {
                            this.onButtonClick("הכנס שם משתמש חדש", "button")
                        }}/>
                        <SettingsOption text='עדכן דוא"ל' onClick={() => {
                            this.onButtonClick('הכנס דוא"ל חדש', "button")
                        }}/>
                        <SettingsOption text="שתף תרגילים אוטומטית" onClick={() => {
                            this.onButtonClick('האם אתה רוצה לשתף תרגילים אוטומטית?', "checkbox")
                        }}/>
                        <SettingsOption text="😟 מחיקת משתמש " onClick={() => {
                            this.onButtonClick('אשר מחיקת משתמש', "checkbox")
                        }}/>
                    </div>
                </div>

            </div>


        )
    }
}

const domContainers = document.querySelectorAll('.settings')
domContainers.forEach(domContainer => ReactDOM.render(
    <SettingsMenu/>
    , domContainer))




