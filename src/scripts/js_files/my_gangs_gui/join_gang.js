import React from 'react'

class JoinGang extends React.Component {
    constructor(props) {
        super(props)
    }
    join_gang(event) {
        let gang_code = parseInt(event.target.gang_code.value)
        if(!gang_code){
            alert("יש צורך למלא את הקוד")
        }
        let data = {
            gang_code: gang_code
        }
        jQuery.ajax({
            url: "join_gang",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            type: "post",
            success: function () {
                alert("נוספת בהצלחה")
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
    render() {
        return (
            <form onSubmit={this.join_gang} method="post">
                <label for={"gang_code"}>הכנס קוד של גיאו-מטריקה</label>
                <input type={"text"} id={"gang_code"} name={"gang_code"}></input>
                <input type={"submit"} value={"אשר"}></input>
            </form>
        )
    }
}

export default JoinGang