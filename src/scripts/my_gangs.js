import React from 'react'
import ReactDOM from 'react-dom'

import GangList from 'js_files/my_gangs_gui/gang'
import NewGang from 'js_files/my_gangs_gui/new_gang.js'
import JoinGang from 'js_files/my_gangs_gui/join_gang.js'

import "./css_files/gangs_style/gangs_list.css"

let domContainer = document.querySelector('.my_gangs')
ReactDOM.render(<GangList />, domContainer)

domContainer = document.querySelector('.join_gang')
ReactDOM.render(<JoinGang/>, domContainer)

domContainer = document.querySelector('.new_gang')
ReactDOM.render(<NewGang/>, domContainer)

