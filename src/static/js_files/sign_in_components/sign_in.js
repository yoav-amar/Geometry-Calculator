class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: "",
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

    sign_in(event) {
        this.state.username = event.target.username.value
        this.state.password = event.target.password.value
        if ( !this.state.password || !this.state.username) {
            alert("אחד השדות חסר")
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
            <div className="sign_in_wrapper">
                <h1> התחבר</h1>
                <form className="sign_up_list" onSubmit={this.sign_in.bind(this)} dir={"rtl"} method={"post"}>
                    <span>
                        <input name={"username"} type={"text"} placeholder={"שם משתמש"}/><br/>
                    </span><br/>
                    <span>
                        <input name={"password"} type={"password"} placeholder={'סיסמא'}/><br/>
                    </span><br/>
                    <span>
                        <input type={"submit"} value={"התחבר"}/><br/>
                    </span>


                </form>
            </div>


        )
    }

}

const domContainers = document.querySelectorAll('.sign_in')
domContainers.forEach(domContainer => ReactDOM.render(
    <SignIn/>
    , domContainer))