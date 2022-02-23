import React from 'react'
import 'css_files/calculator_gui/data_space/data_space.css'

import DataInput from "./components/data_input"
import DataLabel from "./components/data_label"
import SymbolTable from "./components/symbol_table"

class DataSpace extends React.Component {
  constructor(props) {
      super(props)

      this.dataLabels=[]
  }

  render() {
    return(
        <div className="data_container">
            <DataInput ref={ref => this.dataInput = ref} onAdd={(objData)=>{
                this.dataLabels.push(<
                    DataLabel id={objData.dataId} dataStr={JSON.stringify(objData)}
                              key={objData.dataId} onDelete={()=>{
                                  this.dataLabels = this.dataLabels.filter(e => e.props.id !== objData.dataId)
                                  this.setState({})
                              }}/>)
                this.setState({})
            }}/>

            <SymbolTable onSymbolSelected={(symbol) => this.dataInput.addSymbol(symbol)}/>
            <div className="data">
                {this.dataLabels}
            </div>
        </div>
    )
  }
}

export default DataSpace