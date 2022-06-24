import React from 'react'
import ReactDOM from 'react-dom'
import SolutionsList from 'js_files/problem_gui/solutions.js'
import AddSolution from 'js_files/problem_gui/add_solution.js'
import './css_files/problem_style/problem.css'
import './css_files/problem_style/solutions.css'

class SolutionsManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            picture: null,
            is_solution_presented: false,
            solution_name: ""
        }
    }

    on_present_solution(name, pic) {
        this.setState({ is_solution_presented: true, solution_name: name, picture: pic })
    }
    on_present_solutions_list() {
        this.setState({ is_solution_presented: false, solution_name: "", picture: null })
    }

    render() {
        if (this.state.is_solution_presented) {
            return (
                <div >
                    <h3>שם הפתרון: {this.state.solution_name}</h3>
                    <img src={this.state.picture}></img>
                    <button class="style_1" onClick={this.on_present_solutions_list.bind(this)}>חזור לרשימת הפתרונות</button>
                </div>

            )
        }
        return (
            <div>
                <SolutionsList onClick={this.on_present_solution.bind(this)} />
                <div className='add_solution'>
                    <AddSolution />
                </div>
            </div>
        )

    }
}


let domContainer = document.querySelector('.solutions')
ReactDOM.render(<SolutionsManager />, domContainer)

