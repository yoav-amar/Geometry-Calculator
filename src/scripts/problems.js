import React from 'react'
import ReactDOM from 'react-dom'
import ProblemsList from 'js_files/problems_gui/problems_list.js'
import AddProblem from 'js_files/problems_gui/add_problem.js'




let domContainer = document.querySelector('.problems_list')
ReactDOM.render(<ProblemsList/>, domContainer)

domContainer = document.querySelector('.add_problem')
ReactDOM.render(<AddProblem/>, domContainer)
