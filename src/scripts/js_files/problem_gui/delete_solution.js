import React from 'react'

class DeleteSolution extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }

    onClick(e) {
        let prob_name = document.getElementById("problem_name").innerHTML.substring(21)
        let sol_name = document.getElementById("solution_name").innerHTML.substring(11)
        jQuery.ajax({
            url: "/delete_solution",
            data: JSON.stringify({ gang_code: this.props.gang_code, problem_name: prob_name, solution_name:sol_name}),
            contentType: 'application/json;charset=UTF-8',
            type: "delete",
            success: function (data) {
                alert("הפתרון נמחק בהצלחה")
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
                <button className="style_1" onClick={this.onClick}> מחק פתרון</button>
            </div>
        )
    }
}

export default DeleteSolution