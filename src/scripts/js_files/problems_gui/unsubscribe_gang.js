import React from 'react'

class UnsubscribeGang extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }

    onClick(e) {
        jQuery.ajax({
            url: "/remove_user_from_gang",
            data: JSON.stringify({ gang_code: this.props.gang_code}),
            contentType: 'application/json;charset=UTF-8',
            type: "delete",
            success: function (data) {
                alert("התנתקת מהגיאומטריקה בהצלחה")
                window.location.href = window.location.href
            }.bind(this),
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)
        
                }
            }
        });
    }

    render() {
        return (
            <div className="submit" style={{display:"block"}}>
                <button className="style_1" onClick={this.onClick}> התנתק מהגיאומטריקה</button>
            </div>
        )
    }
}

export default UnsubscribeGang