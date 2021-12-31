import React from 'react';
import ReactDOM from 'react-dom';

import ToolBar from 'js_files/calculator_gui/tools_bar/tool_bar';
import GeometryCanvas from 'js_files/calculator_gui/draw_space/geometry_canvas';
import dragElement from 'js_files/calculator_gui/splitter'

dragElement( document.getElementById("horizontal_separator"), "H", "data_space", "painter");
dragElement( document.getElementById("vertical_separator"), "V", "draw_space", "tool_bar");

let domContainers = document.querySelectorAll('.tool_bar')
domContainers.forEach(domContainer => ReactDOM.render(<ToolBar/>, domContainer))

domContainers = document.querySelectorAll('.draw_space')
domContainers.forEach(domContainer => ReactDOM.render(<GeometryCanvas/>, domContainer))