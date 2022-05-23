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
//      let problem = ''
//      this.loadProblem(problem)
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
                <SaveButton geometryCanvas={this.props.geometryCanvas} popupWindow={this.props.popupWindow} dataSpace={this}/>
                <SubmitButton geometryCanvas={this.props.geometryCanvas} dataSpace={this}/>
            </div>
        </div>
    )
  }
}

export default DataSpace