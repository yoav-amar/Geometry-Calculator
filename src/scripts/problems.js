import React from 'react'
import ReactDOM from 'react-dom'
import ProblemsList from 'js_files/problems_gui/problems_list.js'


alert(1)


let domContainer = document.querySelector('.problems_list')
ReactDOM.render(<ProblemsList/>, domContainer)
