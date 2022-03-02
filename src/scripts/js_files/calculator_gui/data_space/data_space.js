import React from 'react'
import 'css_files/calculator_gui/data_space/data_space.css'

import DataInput from "./components/data_input"
import DataLabel from "./components/data_label"
import SymbolTable from "./components/symbol_table"
import SubmitButton from "./components/submit_button"
import SaveButton from "./components/save_button"

class DataSpace extends React.Component {
  constructor(props) {
      super(props)

      this.getDataRepresentation = this.getDataRepresentation.bind(this)
      this.loadProblem = this.loadProblem.bind(this)
      this.getSaveInfo = this.getSaveInfo.bind(this)
      this.addData = this.addData.bind(this)

      this.givenDataLabels=[]
      this.proofDataLabels=[]
  }

  getDataRepresentation(){
      let givenData = []
      this.givenDataLabels.forEach((dl)=>{
          givenData.push(dl.props.dataStr)
      })

      let proofData = []
      this.proofDataLabels.forEach((dl)=>{
          proofData.push(dl.props.dataStr)
      })

      return {givenData: givenData, proofData: proofData}
  }

  componentDidMount() {
      let problem = '{"data":{"givenData":["{\\"dataType\\":\\"קטע משיק למעגל\\",\\"dataId\\":1,\\"representation\\":\\"קטע AC משיק למעגל O בנק\' C\\",\\"fields\\":[\\"AC\\",\\"O\\",\\"C\\"],\\"isNeedProof\\":false}","{\\"dataType\\":\\"קטע משיק למעגל\\",\\"dataId\\":2,\\"representation\\":\\"קטע AB משיק למעגל O בנק\' B\\",\\"fields\\":[\\"AB\\",\\"O\\",\\"B\\"],\\"isNeedProof\\":false}"],"proofData":["{\\"dataType\\":\\"ישרים מקבילים\\",\\"dataId\\":3,\\"representation\\":\\"AO || BE\\",\\"fields\\":[\\"BE\\",\\"AO\\"],\\"isNeedProof\\":true}"],"dataId":3},"drawing":{"dots":[{"id":"ge_1","name":"O","posX":540,"posY":330},{"id":"ge_3","name":"E","posX":472,"posY":428.8736567544662},{"id":"ge_4","name":"C","posX":607.9999999999993,"posY":231.1263432455347},{"id":"ge_6","name":"B","posX":608,"posY":428.8736567544662},{"id":"ge_9","name":"D","posX":420,"posY":330},{"id":"ge_10","name":"","posX":660,"posY":330},{"id":"ge_12","name":"F","posX":607.9999999999997,"posY":330},{"id":"ge_15","name":"A","posX":870,"posY":330}],"lines":[{"id":"ge_5","x1":472,"y1":428.8736567544662,"x2":607.9999999999993,"y2":231.1263432455347,"dot1Id":"ge_3","dot2Id":"ge_4","isBroken":false},{"id":"ge_7","x1":607.9999999999993,"y1":231.1263432455347,"x2":608,"y2":428.8736567544662,"dot1Id":"ge_4","dot2Id":"ge_6","isBroken":false},{"id":"ge_8","x1":608,"y1":428.8736567544662,"x2":472,"y2":428.8736567544662,"dot1Id":"ge_6","dot2Id":"ge_3","isBroken":false},{"id":"ge_16","x1":420,"y1":330,"x2":870,"y2":330,"dot1Id":"ge_9","dot2Id":"ge_15","isBroken":false},{"id":"ge_17","x1":870,"y1":330,"x2":607.9999999999993,"y2":231.1263432455347,"dot1Id":"ge_15","dot2Id":"ge_4","isBroken":false},{"id":"ge_18","x1":608,"y1":428.8736567544662,"x2":870,"y2":330,"dot1Id":"ge_6","dot2Id":"ge_15","isBroken":false}],"circles":[{"id":"ge_2","centerX":540,"centerY":330,"onCircleX":540,"onCircleY":210,"onCircleId":"","centerDotId":"ge_1"}],"nextIndex":18}}'
      this.loadProblem(problem)
  }

  loadProblem(problem){
      problem = JSON.parse(problem)

      //load data
      this.givenDataLabels=[]
      this.proofDataLabels=[]

      problem.data.givenData.forEach((gd) => this.addData(JSON.parse(gd)))
      problem.data.proofData.forEach((pd) => this.addData(JSON.parse(pd)))
      this.dataInput.dataId = problem.data.dataId

      this.setState({})

      //load drawing
      this.props.geometryCanvas.loadData(problem.drawing)
  }

  addData(objData){
      let dl = <DataLabel id={objData.dataId} dataStr={JSON.stringify(objData)}
                          isNeedProof={objData.isNeedProof}
                          key={objData.dataId} onDelete={()=>{
                              this.proofDataLabels = this.proofDataLabels.filter(e => e.props.id !== objData.dataId)
                              this.givenDataLabels = this.givenDataLabels.filter(e => e.props.id !== objData.dataId)
                              this.setState({})
                          }}/>

      if(objData.isNeedProof){
          this.proofDataLabels.push(dl)
      }else{
          this.givenDataLabels.push(dl)
      }

      this.setState({})
  }

  getSaveInfo(){
      let saveInfo = this.getDataRepresentation()

      saveInfo.dataId = this.dataInput.dataId

      return saveInfo
  }

  render() {
    return(
        <div className="data_container">
            <DataInput ref={ref => this.dataInput = ref} onAdd={this.addData}/>

            <SymbolTable onSymbolSelected={(symbol) => this.dataInput.addSymbol(symbol)}/>
            <div className="data">
                {this.givenDataLabels.concat(this.proofDataLabels)}
            </div>

            <div style={{display:"flex", width: "100%"}}>
                <SaveButton geometryCanvas={this.props.geometryCanvas} dataSpace={this}/>
                <SubmitButton geometryCanvas={this.props.geometryCanvas} dataSpace={this}/>
            </div>
        </div>
    )
  }
}

export default DataSpace