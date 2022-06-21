import React from 'react'
class Solution extends React.Component {
    constructor(props) {
        super(props)
    }
    show_solution() {
        // jQuery.ajax({
        //     url: "change_field",
        //     data: JSON.stringify(data),
        //     contentType: 'application/json;charset=UTF-8',
        //     type: "get",
        //     success: function (data) {
        //         let picture = data
        //         this.props.onClick(picture)                
        //     },
        //     error: function (jqXHR) {
        //         if (jqXHR.status == 400) {
        //             alert(jqXHR.responseText)

        //         }
        //     }
        // });
        this.props.onClick("hey")
    }
    render() {
        return (
            <button className="solution" onClick={this.show_solution.bind(this)}>
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
        this.state = {
            is_solution_open: false
        }
    }
    render() {
        this.gang_name = document.getElementById("gang_name").innerHTML
        this.problem_name = document.getElementById("problem_name").innerHTML
        this.solutions = JSON.parse(document.getElementById("solutions_names").innerHTML)
        return (
            <div>
                {this.solutions.map(function (solution_name) {
                    return <Solution value={solution_name} onClick={this.props.onClick} key={solution_name} />

                }.bind(this))}
            </div>
        )
    }
}

export default SolutionsList