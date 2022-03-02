class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            auto_share: true
        }
    }

    set_password(password) {
        this.setState({password: password})
    }

    set_email(email) {
        this.setState({email: email})
    }

    set_username(username) {
        this.setState({username: username})
    }

    set_auto_share(auto_share) {
        this.setState({auto_share: auto_share})
    }

    resign(event) {
        this.state.email = event.target.email.value
        this.state.username = event.target.username.value
        this.state.password = event.target.password.value
        this.state.auto_share = event.target.auto_share.checked
        if (!this.state.email || !this.state.password || !this.state.username) {
            alert("וודא שכל השדות מולאו כראוי")
            event.preventDefault()
            return
        }
        if (this.state.password.localeCompare(event.target.check_password.value)) {
            alert("הסיסמאות אינן תואמות")
            event.preventDefault()
            return
        }
        // TODO send request
        let data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            auto_share: this.state.auto_share
        }
        jQuery.ajax({
            url: "sign_up",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {
                window.location.replace("http://127.0.0.1:5000/")
            },
            error: function (jqXHR) {
                if (jqXHR.status == 409) {
                    alert(jqXHR.responseText)

                }
            }
        });
        event.preventDefault()

    }

    render() {
        // TODO make good alignment
        return (
            <div className="sign_up_wrapper">
                <h1> הצטרף לקהילה</h1>
                <form className="sign_up_list" onSubmit={this.resign.bind(this)} dir={"rtl"} method={"post"}>
                    <span>
                        <input id={"username"} name={"username"} type={"text"} placeholder={"שם משתמש"}/><br/>
                    </span><br/>
                    <span>
                        <input id={"password"} name={"password"} type={"password"} placeholder={'סיסמא'}
                               minLength={"6"}/><br/>
                    </span><br/>
                    <span>
                        <input id={"check_password"} name={"check_password"} type={"password"}
                               placeholder={'אימות סיסמא'}/><br/>
                    </span><br/>
                    <span>
                        <input name={"email"} type={"email"} placeholder={'דוא"ל'}/><br/>
                    </span><br/>
                    <span>
                        <input id={"auto_share"} name={"auto_share"} type={"checkbox"} checked={"true"}/>
                        <label for={"auto_share"}>שתף תרגילים אוטומטית</label>

                    </span><br/>
                    <span>
                        <input type={"submit"} value={"הירשם"}/><br/>
                    </span>
                </form>
            </div>
        )
    }

}

const domContainers = document.querySelectorAll('.sign_up')
domContainers.forEach(domContainer => ReactDOM.render(
    <SignUp/>
    , domContainer))
