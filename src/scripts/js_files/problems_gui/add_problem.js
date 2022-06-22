import React from 'react'

class AddProblem extends React.Component {
    constructor(props) {
        super(props)
    }
    create_new_problem(){
        window.location.href = "/calculator"
    }
    render() {
        return (
            <button onClick={this.create_new_problem}>הוסף בעיה חדשה</button>
        )
    }
}

export default AddProblem
