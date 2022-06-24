import React from 'react'

class JoinGang extends React.Component {
    constructor(props) {
        super(props)
    }
    join_gang(event) {
        let gang_code = parseInt(event.target.gang_code.value)
        if (!gang_code) {
            alert("הקוד צריך להיות מספר בן 6 ספרות")
            event.preventDefault()
            return
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
                $("#main_body").load('/my_gangs')
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
            <form onSubmit={this.join_gang} method="post" dir='rtl'>
                <label htmlFor={"gang_code"}>הצטרף לגיאו-מטריקה נוספת
                    <input className="gang" type={"text"} id={"gang_code"} name={"gang_code"} placeholder='הכנס קוד'>
                    </input>
                </label>

                <input className="gang" type={"submit"} value={"אשר"}></input>
            </form>
        )
    }
}

export default JoinGang