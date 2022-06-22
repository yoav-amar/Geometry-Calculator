import React from 'react'
import ReactDOM from 'react-dom'

import GeometryCanvas from 'js_files/calculator_gui/draw_space/geometry_canvas'
import DataSpace from 'js_files/calculator_gui/data_space/data_space'
import "./css_files/present_problem.css";

let domContainer = document.querySelector('.draw_space_present')
let geometryCanvas = ReactDOM.render(<GeometryCanvas/>, domContainer)

let lastProblemElement = document.querySelector('#problem')
let lastProblem = lastProblemElement.innerHTML
lastProblemElement.remove()

let gangIdElement = document.querySelector('#gang_id')
let gangId = gangIdElement.innerHTML
gangIdElement.remove()

domContainer = document.querySelector('.data_space_present')
if (lastProblem === '') {
    ReactDOM.render(<DataSpace geometryCanvas={geometryCanvas} isPresentMode={true} gangId={gangId}/>, domContainer)
} else {
    ReactDOM.render(<DataSpace geometryCanvas={geometryCanvas} isPresentMode={true}
    lastProblem={lastProblem} gangId={gangId}/>, domContainer)
}

// example:
// $("#main_body").load('/present_problem/1', {problem: '{"data":{"givenData":["{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":12,\\"representation\\":\\"°EMB = 50⦠\\",\\"fields\\":[\\"50\\",\\"EMB\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"חוצה זווית\\",\\"dataId\\":14,\\"representation\\":\\"BD חוצה זווית ADC⦠\\",\\"fields\\":[\\"BD\\",\\"ADC\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":15,\\"representation\\":\\"°ADC = 120⦠\\",\\"fields\\":[\\"120\\",\\"ADC\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":16,\\"representation\\":\\"°DAB = 70⦠\\",\\"fields\\":[\\"70\\",\\"DAB\\"],\\"isNeedProof\\":false}"],"proofData":["{\\"dataType\\":\\"ישרים מקבילים\\",\\"dataId\\":20,\\"representation\\":\\"FM || AB\\",\\"fields\\":[\\"AB\\",\\"FM\\"],\\"isNeedProof\\":true}"],"dataId":20},"drawing":{"dots":[{"id":"ge_1","name":"A","posX":330,"posY":510},{"id":"ge_2","name":"B","posX":690,"posY":510},{"id":"ge_4","name":"C","posX":630,"posY":210},{"id":"ge_6","name":"D","posX":450,"posY":210},{"id":"ge_10","name":"F","posX":396,"posY":345},{"id":"ge_11","name":"E","posX":657,"posY":345},{"id":"ge_13","name":"M","posX":558,"posY":345}],"lines":[{"id":"ge_3","x1":330,"y1":510,"x2":690,"y2":510,"dot1Id":"ge_1","dot2Id":"ge_2","isBroken":false},{"id":"ge_5","x1":690,"y1":510,"x2":630,"y2":210,"dot1Id":"ge_2","dot2Id":"ge_4","isBroken":false},{"id":"ge_7","x1":630,"y1":210,"x2":450,"y2":210,"dot1Id":"ge_4","dot2Id":"ge_6","isBroken":false},{"id":"ge_8","x1":450,"y1":210,"x2":330,"y2":510,"dot1Id":"ge_6","dot2Id":"ge_1","isBroken":false},{"id":"ge_9","x1":450,"y1":210,"x2":690,"y2":510,"dot1Id":"ge_6","dot2Id":"ge_2","isBroken":false},{"id":"ge_12","x1":396,"y1":345,"x2":657,"y2":345,"dot1Id":"ge_10","dot2Id":"ge_11","isBroken":false}],"circles":[],"nextIndex":13},"title":"h"}'})

