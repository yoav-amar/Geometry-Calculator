import React from 'react'
import ReactDOM from 'react-dom'

class Problem extends React.Component {
    constructor(props) {
        super(props)
    }
    direct_problem_page(){
    alert("add new gang")
    }
    render() {
        return (
            <button className="new_gang" onClick={this.direct_problem_page}>
                {"הוסף גיאו-מטריקה חדשה"}
            </button>
        )
    }
}

export default Problem