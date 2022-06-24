import React from 'react'
import ReactDOM from 'react-dom'
import "./css_files/login_style/login.css"

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: "",
        }
    }

    sign_in(event) {
        this.state.username = event.target.username.value
        this.state.password = event.target.password.value
        if (!this.state.password || !this.state.username) {
            alert("אחד השדות חסר")
            event.preventDefault()
            return
        }
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        jQuery.ajax({
            url: "sign_in",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {

                window.location.replace(window.location.href)
            },
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)

                }
            }
        });
        event.preventDefault()

    }

    render() {
        // TODO make good alignment
        return (
            <div className="sign_in_wrapper">
                <h1> התחברות</h1>
                <form className="sign_up_list" onSubmit={this.sign_in.bind(this)} dir={"rtl"} method={"post"}>
                    <span>
                        <input className="gang" name={"username"} type={"text"} placeholder={"שם משתמש"}/><br/>
                    </span><br/>
                    <span>
                        <input className="gang" name={"password"} type={"password"} placeholder={'סיסמא'}/><br/>
                    </span><br/>
                    <span>
                        <input className="gang" type={"submit"} value={"התחבר"}/><br/>
                    </span>
                </form>
                <button className={"style_1"} onClick={function () {
                    window.location.href = "sign_up";
                }}> הרשמה
                </button>
            </div>


        )
    }

}

const domContainers = document.querySelectorAll('.sign_in')
domContainers.forEach(domContainer => ReactDOM.render(
    <SignIn/>
    , domContainer))