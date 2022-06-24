import React from 'react'
import ReactDOM from 'react-dom'
import SettingsOption from 'js_files/settings_components/settings_option.js'
import "./css_files/settings_style/settings.css"
import "./css_files/settings_style/settings_option.css"
import "./css_files/settings_style/settings_list.css"

class ChangeOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: "",
            placeholder: "hey",
            txt: "",
            check_password: ""
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
            let check_password = event.target.check_password.value
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
                alert("השדה שונה בהצלחה")
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
            type: "delete",
            success: function () {
                alert("המשתמש נמחק בהצלחה")
                window.location.href = window.location.href + '/logout'
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
            <form onSubmit={this.change_field.bind(this)} dir={"rtl"} method={"post"}>
                <span>
                    <input className="gang_1" name={"field"} value={this.props.field} type={"hidden"} />

                    <label className="gang_1" htmlFor={this.props.field}>
                        <input className="gang_1" name={"new_val"} type={"checkbox"} defaultChecked />
                        שתף תרגילים אוטומטית</ label>
                </span><br />
                <input className="gang_1" type={"submit"} value={"הירשם"} /><br />

            </form>
        </div>)
    }
    render_password() {
        return (
            <div className={this.props.className}>
                <h1>{this.props.txt}</h1>
                <form name={"password form"} onSubmit={this.change_field.bind(this)} method={"post"} dir={"rtl"}>
                    <span>
                        <input className="gang_1" name={"field"} type={"hidden"} value={this.props.field} />
                        <input className="gang_1" name={"new_val"} type={"password"} placeholder={this.props.placeholder}
                            minLength={"6"} /><br />
                    </span><br />
                    <span>
                        <input className="gang_1" name={"check_password"} type={"password"} placeholder={"אשר סיסמא"}
                            minLength={"6"} /><br />
                    </span><br />
                    <span>
                        <input className="gang_1" type={"submit"} value={"אשר"} /><br />
                    </span>
                </form>
            </div>

        )
    }
    render_delete() {
        return (
            <div className={this.props.className}>
                <form name={"delete form"} onSubmit={this.delete_user}>
                    <label className="gang_1" htmlFor={this.props.field}>{this.props.txt}</label><br />
                    <input className="gang_1" type={"submit"} value={"אשר"} />
                </form>
            </div>
        )
    }
    regular_render() {
        return (
            <div className={this.props.className}>
                <h1>{this.props.txt}</h1>
                <form name={this.props.field + "form"} onSubmit={this.change_field.bind(this)} method={"post"}
                    dir={"rtl"}>
                    <span>
                        <input className="gang_1" name={"field"} type={"hidden"} value={this.props.field} />
                        <input className="gang_1" name={"new_val"} type={"text"} placeholder={this.props.placeholder} /><br />
                    </span><br />
                    <span>
                        <input className="gang_1" name={"check_password"} type={"hidden"}
                        /><br />
                    </span><br />
                    <span>
                        <input className="gang_1" type={"submit"} value={"אשר"} /><br />
                    </span>
                </form>
            </div>
        )
    }



    render() {
        if (!this.props.field.localeCompare("auto_share")) {
            return this.render_auto_share()
        } else if (!this.props.field.localeCompare("delete")) {
            return this.render_delete()
        } else if (!this.props.field.localeCompare("password")) {
            return this.render_password()
        } else {
            return this.regular_render()

        }
    }
}

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            txt: "",
            field: "",
            placeholder: ""
        }
    }

    onButtonClick(txt, field, placeholder) {

        if (field != undefined) {
            this.setState({ field: field })
        }
        if (txt != undefined) {
            this.setState({ txt: txt })
        }
        if (placeholder != undefined) {
            this.setState({ placeholder: placeholder })
        }
        this.setState({ isOpened: true })
    }


    render() {
        // alert(this.state.field + ":\n" + this.state.placeholder + ':\n' + this.state.txt + ':\n' + this.state.isOpened)
        if (this.state.isOpened) {
            return (
                <div className="outer_settings">
                    <div className="page_name">
                        <h1> הגדרות</h1>
                    </div>
                    <div className="settings_wrapper">
                        <ChangeOption className={'change_setting_option'}
                            ref={this.changeOption} field={this.state.field} placeholder={this.state.placeholder} txt={this.state.txt} />
                        <div className="settings_list">
                            <SettingsOption text="עדכן סיסמא" onClick={() => {
                                this.onButtonClick("הכנס סיסמא", "password", "סיסמא").bind(this)
                            }} />
                            <SettingsOption text='עדכן דוא"ל' onClick={() => {
                                this.onButtonClick('הכנס דוא"ל חדש', "email", "מייל").bind(this)
                            }} />
                            <SettingsOption text="שתף תרגילים אוטומטית" onClick={() => {
                                this.onButtonClick('האם אתה רוצה לשתף תרגילים אוטומטית?', "auto_share").bind(this)
                            }} />
                            <SettingsOption text="😟 מחיקת משתמש " onClick={() => {
                                this.onButtonClick('אשר מחיקת משתמש', "delete").bind(this)
                            }} />
                        </div>
                    </div>

                </div>
            )
        }
        return (
            <div className="outer_settings">
                <div className="page_name">
                    <h1> הגדרות</h1>
                </div>
                <div className="settings_list">
                    <SettingsOption text="עדכן סיסמא" onClick={() => {
                        this.onButtonClick("הכנס סיסמא", "password", "סיסמא")
                    }} />
                    <SettingsOption text='עדכן דוא"ל' onClick={() => {
                        this.onButtonClick('הכנס דוא"ל חדש', "email", "מייל")
                    }} />
                    <SettingsOption text="שתף תרגילים אוטומטית" onClick={() => {
                        this.onButtonClick('האם אתה רוצה לשתף תרגילים אוטומטית?', "auto_share")
                    }} />
                    <SettingsOption text="😟 מחיקת משתמש " onClick={() => {
                        this.onButtonClick('אשר מחיקת משתמש', "delete")
                    }} />
                </div>

            </div>


        )
    }
}

const domContainers = document.querySelectorAll('.settings')
domContainers.forEach(domContainer => ReactDOM.render(
    <SettingsMenu />
    , domContainer))




