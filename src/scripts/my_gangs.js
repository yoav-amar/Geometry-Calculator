import React from 'react'
import ReactDOM from 'react-dom'

import Gang from 'js_files/my_gangs_gui/gang'
import NewGang from 'js_files/my_gangs_gui/new_gang.js'

alert(1)

let domContainer = document.querySelector('.my_gangs')
ReactDOM.render(<Gang/>, domContainer)

domContainer = document.querySelector('.new_gang')
ReactDOM.render(<NewGang/>, domContainer)

