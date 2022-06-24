import React from 'react'

class AddProblem extends React.Component {
    constructor(props) {
        super(props)
    }
    create_new_problem(){
        $("#main_body").load('/calculator/' + this.props.gang_code)
    }
    render() {
        return (
            <button className="style_1" onClick={this.create_new_problem.bind(this)}>הוסף בעיה חדשה</button>
        )
    }
}

export default AddProblem
