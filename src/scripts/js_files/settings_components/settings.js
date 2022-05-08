class ChangeOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: "",
            placeholder: "hey",
            txt: ""
        }
    }


    change_field(event) {
        let field = event.target.field.value
        let new_val = event.target.new_val.value
        if (!new_val || !field) {
            alert("אחד השדות חסר")
            event.preventDefault()
            return
        }
        if (!field.localeCompare("password")) {
            let check_password = event.target.check_password
            if (check_password.localeCompare(new_val)) {
                alert("הסיסמאות אינן תואמות")
                event.preventDefault()
                return
            }
        }
        let data = {
            field: field,
            new_val: new_val
        }
        jQuery.ajax({
            url: "change_field",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {
                window.location.replace("http://127.0.0.1:5000/")
            },
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)

                }
            }
        });
        event.preventDefault()

    }

    delete_user() {
        jQuery.ajax({
            url: "delete_user",
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {
                window.location.replace("http://127.0.0.1:5000/")
            },
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)
                }
            }
        });
        event.preventDefault()
    }



    render_auto_share() {
        return (<div className={this.props.className}>
            <form  onSubmit={this.change_field.bind(this)} dir={"rtl"} method={"post"}>
                    <span>
                        <input name={"field"} value={this.state.field} type={"hidden"}/>
                        <input name={"new_val"} type={"checkbox"} checked={"true"}/>
                        <label htmlFor={this.state.field}>שתף תרגילים אוטומטית</label>
                        </span><br/>
                <input type={"submit"} value={"הירשם"}/><br/>

            </form>
        </div>)
    }



    render() {
        if (!this.state.field.localeCompare("auto_share")) {
            return this.render_auto_share()

        } else if (!this.state.field.localeCompare("delete")) {
            return (
                <div className={this.props.className}>
                    <form name={"delete form"} onSubmit={this.delete_user}>
                        <label htmlFor={this.state.field}>{this.state.txt}</label><br/>
                        <input type={"submit"} value={"אשר"}/>
                    </form>
                </div>
            )
        } else if (!this.state.field.localeCompare("password")) {
            return (
            <div className={this.props.className}>
                <h1>{this.state.txt}</h1>
                <form name={"password form"} onSubmit={this.change_field.bind(this)} method={"post"} dir={"rtl"}>
                        <span>
                            <input name={"field"} type={"hidden"} value={this.state.field}/>
                            <input name={"new_val"} type={"password"} placeholder={this.state.placeholder}
                                   minLength={"6"}/><br/>
                        </span><br/>
                    <span>
                            <input name={"check_password"} type={"password"} placeholder={"אשר סיסמא"}
                                   minLength={"6"}/><br/>
                        </span><br/>
                    <span>
                            <input type={"submit"} value={"heyy"}/><br/>
                        </span>
                </form>
            </div>

        )
        } else {
            return (
                <div className={this.props.className}>
                    <h1>{this.state.txt}</h1>
                    <form name={this.state.field + "form"} onSubmit={this.change_field.bind(this)} method={"post"}
                          dir={"rtl"}>
                        <span>
                            <input name={"field"} type={"hidden"} value={this.state.field}/>
                            <input name={"new_val"} type={"text"} placeholder={this.state.placeholder}/><br/>
                        </span><br/>
                        <span>
                            <input type={"submit"} value={"beyyyy"}/><br/>
                        </span>
                    </form>
                </div>
            )

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
            txt: ""
        }
    }

    onButtonClick(txt, field, placeholder) {
        this.changeOption.current.setState({field: field})
        this.changeOption.current.setState({placeholder: placeholder})
        this.changeOption.current.setState({txt: txt})
        this.setState({isOpened: true})
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
                        <SettingsOption text="עדכן סיסמא" onClick={() => {
                            this.onButtonClick("הכנס סיסמא", "password", "סיסמא")
                        }}/>
                        <SettingsOption text='עדכן דוא"ל' onClick={() => {
                            this.onButtonClick('הכנס דוא"ל חדש', "email", "מייל")
                        }}/>
                        <SettingsOption text="שתף תרגילים אוטומטית" onClick={() => {
                            this.onButtonClick('האם אתה רוצה לשתף תרגילים אוטומטית?', "auto_share")
                        }}/>
                        <SettingsOption text="😟 מחיקת משתמש " onClick={() => {
                            this.onButtonClick('אשר מחיקת משתמש', "delete")
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



