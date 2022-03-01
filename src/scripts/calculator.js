import React from 'react'
import ReactDOM from 'react-dom'

import ToolBar from 'js_files/calculator_gui/tools_bar/tool_bar'
import GeometryCanvas from 'js_files/calculator_gui/draw_space/geometry_canvas'
import DataSpace from 'js_files/calculator_gui/data_space/data_space'
import dragElement from 'js_files/calculator_gui/splitter'

dragElement( document.getElementById("horizontal_separator"), "H", "painter", "data_space");
dragElement( document.getElementById("vertical_separator"), "V", "draw_space", "tool_bar");

let domContainer = document.querySelector('.tool_bar')
let toolBar = ReactDOM.render(<ToolBar/>, domContainer)

domContainer = document.querySelector('.draw_space')
let geometryCanvas = ReactDOM.render(<GeometryCanvas toolBar={toolBar}/>, domContainer)

domContainer = document.querySelector('.data_space')
ReactDOM.render(<DataSpace geometryCanvas={geometryCanvas}/>, domContainer)