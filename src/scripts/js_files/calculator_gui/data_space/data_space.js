import React from 'react'
import 'css_files/calculator_gui/data_space/data_space.css'

import DataInput from "./components/data_input";
import SymbolTable from "./components/symbol_table";

class DataSpace extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
        <div className="data_container">
            <DataInput ref={ref => this.dataInput = ref}/>

            <SymbolTable onSymbolSelected={(symbol) => this.dataInput.addSymbol(symbol)}/>
            <div className="data">

            </div>
        </div>
    )
  }
}

export default DataSpace