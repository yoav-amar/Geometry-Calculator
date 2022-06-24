import React from 'react'
import 'css_files/calculator_gui/data_space/components/submit_button.css'

class DirectSolutions extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }

    onClick(e) {
        let prob_name = document.getElementById("problem_name").innerHTML
        $("#main_body").load('/problem', { gang_code: this.props.gang_code, problem_name: prob_name })

    }

    render() {
        return (
            <div className="submit">
                <button className="submit" onClick={this.onClick}> הצג רשימת פתרונות </button>
            </div>
        )
    }
}

export default DirectSolutions