class SettingsOption extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className="settings_option" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        )
    }
}

class ChangeOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            addition_txt: ""
        }
    }

    getBodyElement() {
        if (this.state.type.localeCompare("button")) {
            return (
                <div className={this.props.className}>
                    <h1>{this.props.text}</h1>
                    <button>{this.state.addition_txt}</button>

                </div>
            )
        }
        if (this.state.type.localeCompare("button")) {
            return (
                <div className={this.props.className}>
                    <h1>{this.props.text}</h1>
                    <che>

                </div>

            )
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <h1>{this.props.text}</h1>

            </div>

        )
    }
}

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }
    }


    render() {
        return (
            <div className="settings">
                <div className="page_name">
                    <h1> הגדרות</h1>
                </div>
                <div className="settings_wrapper">
                    <ChangeOption className={'change_setting_option' + (this.state.isOpened ? ' open' : '')}
                                  text={"tey" + this.state.txt}></ChangeOption>
                    <div className="settings_list">
                        <SettingsOption text="עדכן שם משתמש" onClick={() => {
                            alert(this.props.text);
                            this.txt = "ppp"
                            this.state.isOpened = true
                        }}/>
                        <SettingsOption text='עדכן דוא"ל' onClick={() => {
                            this.state.isOpened = true
                        }}/>
                        <SettingsOption text="שתף תרגילים אוטומטית" onClick={() => {
                            this.state.isOpened = true
                        }}/>
                        <SettingsOption text="😟 מחיקת משתמש " onClick={() => {
                            this.state.isOpened = true
                        }}/>
                    </div>
                </div>

            </div>


        )
    }
}

const domContainers = document.querySelectorAll('.settings')
domContainers.forEach(domContainer => ReactDOM.render(<SettingsMenu text="kkkkkkkkkk"/>, domContainer))




