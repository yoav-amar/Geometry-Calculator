import React from 'react'
import ReactDOM from 'react-dom'

import GangList from 'js_files/my_gangs_gui/gang'
import NewGang from 'js_files/my_gangs_gui/new_gang.js'

let domContainer = document.querySelector('.my_gangs')
ReactDOM.render(<GangList />, domContainer)

domContainer = document.querySelector('.new_gang')
ReactDOM.render(<NewGang/>, domContainer)

