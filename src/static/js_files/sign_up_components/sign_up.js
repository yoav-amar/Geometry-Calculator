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
        alert(event.target.auto_share.checked)
        this.state.email = event.target.email.value
        this.state.username = event.target.username.value
        this.state.password = event.target.password.value
        this.state.auto_share = event.target.auto_share.checked
        if (!this.state.email || !this.state.password || !this.state.username) {
            alert("וודא שכל השדות מולאו כראוי")
            event.preventDefault()
            return
        }
        // TODO send request
        alert(this.state.password)
        event.preventDefault()

    }

    render() {
        // TODO make good alignment
        return (
            <div>
                <div className="page_name">
                    <h1> הרשמה</h1>
                </div>
                <div className="sign_up_wrapper">
                    <form className="sign_up_list" onSubmit={this.resign.bind(this)} dir={"rtl"} method={"post"}><br/>

                        <input name={"username"} type={"text"} placeholder={"שם משתמש"}/><br/>
                        <input name={"password"} type={"password"} placeholder={'סיסמא'} minLength={"6"}/><br/>
                        <input name={"email"} type={"email"} placeholder={'דוא"ל'}/><br/>
                        <label>שתף תרגילילם אוטומטית</label>
                        <input id={"auto_share"} name={"auto_share"} type={"checkbox"} value={"true"}/><br/>
                        <input type={"submit"} value={"הירשם"}/><br/>


                    </form>
                </div>

            </div>


        )
    }

}

const domContainers = document.querySelectorAll('.sign_up')
domContainers.forEach(domContainer => ReactDOM.render(
    <SignUp/>
    , domContainer))
alert(1)