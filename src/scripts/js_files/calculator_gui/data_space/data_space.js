import React from 'react'
import 'css_files/calculator_gui/data_space/data_space.css'

import DataInput from "./components/data_input"
import DataLabel from "./components/data_label"
import SymbolTable from "./components/symbol_table"
import SubmitButton from "./components/submit_button"
import SaveButton from "./components/save_button"
import DirectSolutions from "./components/direct_solutions_button"
import DirectCalculator from './components/direct_calculator'

class DataSpace extends React.Component {
    constructor(props) {
        super(props)

        this.isPresentMode = this.props.isPresentMode
        if (typeof this.props.isPresentMode === 'undefined') {
            this.isPresentMode = false
        }

        this.getDataRepresentation = this.getDataRepresentation.bind(this)
        this.loadProblem = this.loadProblem.bind(this)
        this.getSaveInfo = this.getSaveInfo.bind(this)
        this.addData = this.addData.bind(this)

        this.givenDataLabels = []
        this.proofDataLabels = []
    }

    getDataRepresentation() {
        let givenData = []
        this.givenDataLabels.forEach((dl) => {
            givenData.push(dl.props.dataStr)
        })

        let proofData = []
        this.proofDataLabels.forEach((dl) => {
            proofData.push(dl.props.dataStr)
        })

        return { givenData: givenData, proofData: proofData }
    }

    componentDidMount() {
        // example for problem = '{"data":{"givenData":["{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":12,\\"representation\\":\\"°EMB = 50⦠\\",\\"fields\\":[\\"50\\",\\"EMB\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"חוצה זווית\\",\\"dataId\\":14,\\"representation\\":\\"BD חוצה זווית ADC⦠\\",\\"fields\\":[\\"BD\\",\\"ADC\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":15,\\"representation\\":\\"°ADC = 120⦠\\",\\"fields\\":[\\"120\\",\\"ADC\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"גודל זווית\\",\\"dataId\\":16,\\"representation\\":\\"°DAB = 70⦠\\",\\"fields\\":[\\"70\\",\\"DAB\\"],\\"isNeedProof\\":false}"],"proofData":["{\\"dataType\\":\\"ישרים מקבילים\\",\\"dataId\\":20,\\"representation\\":\\"FM || AB\\",\\"fields\\":[\\"AB\\",\\"FM\\"],\\"isNeedProof\\":true}"],"dataId":20},"drawing":{"dots":[{"id":"ge_1","name":"A","posX":330,"posY":510},{"id":"ge_2","name":"B","posX":690,"posY":510},{"id":"ge_4","name":"C","posX":630,"posY":210},{"id":"ge_6","name":"D","posX":450,"posY":210},{"id":"ge_10","name":"F","posX":396,"posY":345},{"id":"ge_11","name":"E","posX":657,"posY":345},{"id":"ge_13","name":"M","posX":558,"posY":345}],"lines":[{"id":"ge_3","x1":330,"y1":510,"x2":690,"y2":510,"dot1Id":"ge_1","dot2Id":"ge_2","isBroken":false},{"id":"ge_5","x1":690,"y1":510,"x2":630,"y2":210,"dot1Id":"ge_2","dot2Id":"ge_4","isBroken":false},{"id":"ge_7","x1":630,"y1":210,"x2":450,"y2":210,"dot1Id":"ge_4","dot2Id":"ge_6","isBroken":false},{"id":"ge_8","x1":450,"y1":210,"x2":330,"y2":510,"dot1Id":"ge_6","dot2Id":"ge_1","isBroken":false},{"id":"ge_9","x1":450,"y1":210,"x2":690,"y2":510,"dot1Id":"ge_6","dot2Id":"ge_2","isBroken":false},{"id":"ge_12","x1":396,"y1":345,"x2":657,"y2":345,"dot1Id":"ge_10","dot2Id":"ge_11","isBroken":false}],"circles":[],"nextIndex":13},"title":"h"}'
        if (typeof this.props.lastProblem !== 'undefined') {
            this.loadProblem(this.props.lastProblem)
        }
    }

    loadProblem(problem) {
        problem = JSON.parse(problem)

        //load data
        this.givenDataLabels = []
        this.proofDataLabels = []

        problem.data.givenData.forEach((gd) => this.addData(JSON.parse(gd)))
        problem.data.proofData.forEach((pd) => this.addData(JSON.parse(pd)))
        if (!this.isPresentMode) {
            this.dataInput.dataId = problem.data.dataId
        }

        this.setState({})

        //load drawing
        this.props.geometryCanvas.loadData(problem.drawing)
    }

    addData(objData) {
        let dl = <DataLabel id={objData.dataId} dataStr={JSON.stringify(objData)}
            isNeedProof={objData.isNeedProof}
            isPresentMode={this.isPresentMode}
            key={objData.dataId} onDelete={() => {
                this.proofDataLabels = this.proofDataLabels.filter(e => e.props.id !== objData.dataId)
                this.givenDataLabels = this.givenDataLabels.filter(e => e.props.id !== objData.dataId)
                this.setState({})
            }} />

        if (objData.isNeedProof) {
            this.proofDataLabels.push(dl)
        } else {
            this.givenDataLabels.push(dl)
        }

        this.setState({})
    }

    getSaveInfo() {
        let saveInfo = this.getDataRepresentation()

        saveInfo.dataId = this.dataInput.dataId

        return saveInfo
    }

    render() {
        return (
            <div className="data_container">
                {!this.isPresentMode ?
                    [<DataInput ref={ref => this.dataInput = ref} onAdd={this.addData} />,
                    <SymbolTable onSymbolSelected={(symbol) => this.dataInput.addSymbol(symbol)} />

                    ]
                    : []
                }
                <div className="data" style={this.isPresentMode ? { display: "flex", justifyContent: "center" } : {}}>
                    {this.givenDataLabels.concat(this.proofDataLabels)}
                </div>

                {!this.isPresentMode ?
                    <div style={{ display: "flex", width: "100%" }}>
                        <SaveButton geometryCanvas={this.props.geometryCanvas} gangId={this.props.gangId}
                            popupWindow={this.props.popupWindow} dataSpace={this} />
                        <SubmitButton geometryCanvas={this.props.geometryCanvas} dataSpace={this} />
                    </div>
                    : []
                }
                {
                    this.isPresentMode ?
                        <div style={{ display: "flex", width: "100%" }}>
                            <DirectSolutions gang_code={this.props.gangId} />
                            <DirectCalculator gang_code={this.props.gangId} />
                        </div>

                        : []
                }
            </div>
        )
    }
}

export default DataSpace