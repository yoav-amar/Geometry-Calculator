import React from 'react'

class NewGang extends React.Component {
    constructor(props) {
        super(props)
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
                location.reload();
            },
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
            return (<div class="form_cantainer" id="new_gang_form">
                <form class="new_gang_form" onSubmit={this.add_new_gang} dir='rtl'>
                    <label for={"gang_name"}>שם הגיאו-מטריקה</label>
                    <input type={"text"} name={"gang_name"} placeholder="הכנס שם" required></input>
                    <input type={"submit"} value={"צור"}></input>
                </form>
                <button class="cancel_button" onClick={this.close_form.bind(this)}>סגור</button>
            </div>)
        }
        return (<button className="new_gang" onClick={this.open_form.bind(this)}>
            {"הוסף גיאו-מטריקה חדשה"}</button>)
    }
}

export default NewGang