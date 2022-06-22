import React from 'react'

class Problem extends React.Component {
    constructor(props) {
        super(props)
    }
    direct_problem_page() {
        $("#main_body").load( '/problems' + "/" + this.props.gang_code + "/" + this.props.value)
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
    }
    render() {
        
        this.gang_name = document.getElementById("gang_name").innerHTML
        this.gang_code = document.getElementById("gang_code").innerHTML.substring(16)
        
        let data = {gang_code: this.gang_code}
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
                    return <Problem value={problem_name} gang_code={this.gang_code} key={problem_name} />

                }.bind(this))}
            </div>
        )
    }
}

export default ProblemsList