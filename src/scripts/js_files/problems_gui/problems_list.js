import React from 'react'

class Problem extends React.Component {
    constructor(props) {
        super(props)
    }
    direct_problem_page() {
        jQuery.ajax({
            url: "/get_problem",
            data: { gang_code: this.props.gang_code, problem_name: this.props.value },
            contentType: 'application/json;charset=UTF-8',
            type: "get",
            success: function (data) {
                $("#main_body").load('/present_problem/' + this.props.gang_code, {problem: data, problem_name: this.props.value, is_admin: this.props.is_admin})
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
            <button className="style_1" onClick={this.direct_problem_page.bind(this)}>
                {this.props.value}
            </button>
        )
    }
}

class ProblemsList extends React.Component {
    constructor(props) {
        super(props)
        this.gang_name = null
        this.gang_code = null
        this.problems = null
        this.is_admin = JSON.parse(document.getElementById("is_admin").innerHTML)
    }
    render() {

        this.gang_name = document.getElementById("gang_name").innerHTML
        this.gang_code = document.getElementById("gang_code").innerHTML.substring(16)

        let data = { gang_code: this.gang_code }
        jQuery.ajax({
            url: "/problems_names",
            data: data,
            contentType: 'application/json;charset=UTF-8',
            type: "get",
            async: false,
            success: function (data) {
                this.problems = data
            }.bind(this),
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)
                }
            }
        });
        return (
            <div>
                {this.problems.map(function (problem_name) {
                    return <Problem value={problem_name} gang_code={this.gang_code} is_admin={this.is_admin} key={problem_name} />

                }.bind(this))}
            </div>
        )
    }
}

export default ProblemsList