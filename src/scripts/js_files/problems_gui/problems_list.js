import React from 'react'

class Problem extends React.Component {
    constructor(props) {
        super(props)
    }
    direct_problem_page() {
        window.location.href = "http://127.0.0.1:5000/problem/" + this.props.value
    }
    render() {
        return (
            <button className="problem" onClick={this.direct_problem_page.bind(this)}>
                {this.props.value}
            </button>
        )
    }
}

class ProblemsList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        jQuery.ajax({
            url: "get_problem",
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
            // <div>
            //     {this.problems.map(function (problem_name) {
            //         return <Problem value={problem_name} key={problem_name} />

            //     })}
            // </div>
            <p>hey</p>
        )
    }
}

export default ProblemsList