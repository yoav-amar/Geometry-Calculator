import React from 'react'
import ReactDOM from 'react-dom'
import ProblemsList from 'js_files/problems_gui/problems_list.js'
import AddProblem from 'js_files/problems_gui/add_problem.js'
import UnsubscribeGang from './js_files/problems_gui/unsubscribe_gang'
import "./css_files/gang_style/gang.css"

let gang_code = document.getElementById("gang_code").innerHTML.substring(16)



let domContainer = document.querySelector('.problems_list')
ReactDOM.render(<ProblemsList/>, domContainer)

domContainer = document.querySelector('.add_problem')
ReactDOM.render(<AddProblem gang_code={gang_code}/>, domContainer)

domContainer = document.querySelector('.unsubscribe')
ReactDOM.render(<UnsubscribeGang gang_code={gang_code}/>, domContainer)
