import React from 'react'
import ReactDOM from 'react-dom'

import SolutionTable from 'js_files/calculator_gui/solution_table/solution_table'
import GeometryCanvas from 'js_files/calculator_gui/draw_space/geometry_canvas'

import "./css_files/solution.css";

let solutionElement = document.querySelector('#solution')
let solution = solutionElement.innerHTML
solutionElement.remove()

let drawingElement = document.querySelector('#drawing')
let drawing = drawingElement.innerHTML
drawingElement.remove()

ReactDOM.render(<SolutionTable solution={solution}/>, document.querySelector('.solution_loc'))
let geometryCanvas = ReactDOM.render(<GeometryCanvas toolBar={null}/>, document.querySelector('.drawing_loc'))
geometryCanvas.loadData(JSON.parse(drawing).drawing)