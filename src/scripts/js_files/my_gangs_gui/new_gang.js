import React from 'react'

class NewGang extends React.Component {
    constructor(props) {
        super(props)
    }
    add_new_gang(event) {
        let gang_name = event.target.gang_name.value
        if(gang_name.includes("<")){
            alert("אי אפשר להכניס את התו הזה")
            event.preventDefault()
            return
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
    open_form() {
        document.getElementById("new_gang_form").style.display = "block";
    }
    close_form(){
        document.getElementById("new_gang_form").style.display = "none";
    }
    render() {
        return (
            <div>
                <button className="new_gang" onClick={this.open_form}>
                    {"הוסף גיאו-מטריקה חדשה"}
                </button>
                <div class="form_cantainer" id="new_gang_form">
                    <form class="form_popup" onSubmit={this.add_new_gang}>
                        <label for={"gang_name"}>שם הגיאו-מטריקה</label>
                        <input type={"text"} name={"gang_name"} required></input>
                        <input type={"submit"} value={"צור"}></input>
                    </form>
                    <button class="cancel_button" onClick={this.close_form}>סגור</button>
                </div>
            </div>


        )
    }
}

export default NewGang