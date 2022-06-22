import React from 'react'
import ReactDOM from 'react-dom'

import ToolBar from 'js_files/calculator_gui/tools_bar/tool_bar'
import GeometryCanvas from 'js_files/calculator_gui/draw_space/geometry_canvas'
import DataSpace from 'js_files/calculator_gui/data_space/data_space'
import dragElement from 'js_files/calculator_gui/splitter'
import PopupWindow from "./js_files/calculator_gui/popup_window/popup_window";
import "./css_files/calculator.css";

dragElement( document.getElementById("horizontal_separator"), "H", "painter", "data_space");
dragElement( document.getElementById("vertical_separator"), "V", "draw_space", "tool_bar");

let domContainer = document.querySelector('.tool_bar')
let toolBar = ReactDOM.render(<ToolBar/>, domContainer)

domContainer = document.querySelector('.draw_space')
let geometryCanvas = ReactDOM.render(<GeometryCanvas toolBar={toolBar}/>, domContainer)

let popupWindowPlane = document.querySelector('.popup_window_plane')
popupWindowPlane.addEventListener("click", (event)=>{
    let element = event.target
    if(element.className  !== 'popup_window_plane'){
        return
    }

    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
})

domContainer = document.querySelector('.popup_window')
let popupWindow = ReactDOM.render(<PopupWindow popupWindowPlane={popupWindowPlane}/>, domContainer)

domContainer = document.querySelector('.data_space')
ReactDOM.render(<DataSpace geometryCanvas={geometryCanvas} popupWindow={popupWindow} />, domContainer)