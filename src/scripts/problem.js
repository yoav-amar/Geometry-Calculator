import React from 'react'
import ReactDOM from 'react-dom'
import SolutionsList from 'js_files/problem_gui/solutions_list.js'
import AddSolution from 'js_files/problem_gui/add_solution.js'




let domContainer = document.querySelector('.problems_list')
ReactDOM.render(<SolutionsList/>, domContainer)

domContainer = document.querySelector('.add_problem')
ReactDOM.render(<AddSolution/>, domContainer)