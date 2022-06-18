import React from 'react'

class Solution extends React.Component {
    constructor(props) {
        super(props)
    }
    direct_solution_page() {
        window.location.href = window.location.href + "/" + this.props.value
    }
    render() {
        return (
            <button className="solution" onClick={this.direct_solution_page.bind(this)}>
                {this.props.value}
            </button>
        )
    }
}

class SolutionsList extends React.Component {
    constructor(props) {
        super(props)
        this.gang_name = null
        this.problem_name = null
        this.solutions = null
    }
    render() {

        this.gang_name = document.getElementById("gang_name").innerHTML
        this.problem_name = document.getElementById("problame_name").innerHTML

        let data = { gang_name: this.gang_name, problem_name: this.problem_name }
        jQuery.ajax({
            url: "/solutions_names",
            data: data,
            contentType: 'application/json;charset=UTF-8',
            type: "get",
            async: false,
            success: function (data) {
                this.solutions = data
            }.bind(this),
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)
                }
            }
        });
        return (
            <div>
                {this.solutions.map(function (solution_name) {
                    return <Solution value={solution_name} key={solution_name} />

                })}
            </div>
        )
    }
}

export default SolutionsList