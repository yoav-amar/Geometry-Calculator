import React from 'react'

class NewGang extends React.Component {
    constructor(props) {
        super(props)
        this.add_new_gang = this.add_new_gang.bind(this)
        this.state = {
            is_open: false
        }
    }
    add_new_gang(event) {
        let gang_name = event.target.gang_name.value
        if (gang_name.includes("<")) {
            alert("אי אפשר להכניס את התו >")
            event.preventDefault()
            return
        }
        let data = {
            gang_name: gang_name
        }
        jQuery.ajax({
            url: "create_gang",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {
                $("#main_body").load('/my_gangs')
            }.bind(this),
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)

                }
            }
        });
        event.preventDefault()
    }
    open_form() {
        this.setState({ is_open: true })
        // document.getElementById("new_gang_form").style.display = "block";
    }
    close_form() {
        this.setState({ is_open: false })
        // document.getElementById("new_gang_form").style.display = "none";
    }
    render() {
        if (this.state.is_open) {
            return (<div className="form_cantainer" id="new_gang_form">
                <form className="new_gang_form" onSubmit={this.add_new_gang} dir='rtl'>
                    <label htmlFor={"gang_name"}>שם הגיאו-מטריקה</label>
                    <input className="gang" type={"text"} name={"gang_name"} placeholder="הכנס שם" required></input>
                    <input className="gang" type={"submit"} value={"צור"}></input>
                </form>
                <button className="style_1" onClick={this.close_form.bind(this)}>סגור</button>
            </div>)
        }
        return (<button className="new_gang" onClick={this.open_form.bind(this)}>
            {"הוסף גיאו-מטריקה חדשה"}</button>)
    }
}

export default NewGang