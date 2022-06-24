import React from 'react'
import 'css_files/calculator_gui/data_space/components/submit_button.css'

class DeleteProblem extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }

    onClick(e) {
        let prob_name = document.getElementById("problem_name").innerHTML
        jQuery.ajax({
            url: "/delete_problem",
            data: JSON.stringify({ gang_code: this.props.gang_code, problem_name: prob_name }),
            contentType: 'application/json;charset=UTF-8',
            type: "delete",
            success: function (data) {
                alert("הבעיה נמחקה בהצלחה")
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
            <div className="submit">
                <button className="submit" onClick={this.onClick}> מחק בעיה</button>
            </div>
        )
    }
}

export default DeleteProblem