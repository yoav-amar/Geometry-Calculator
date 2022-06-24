import React from 'react'
import 'css_files/calculator_gui/data_space/components/symbol_table.css'

class SymbolTable extends React.Component {
  constructor(props) {
      super(props)

      this.symbolsChars =[
          ['∢', '||', '⊥', '≅', '∼'],
          ['<', '>', '≤', '≥', '='],
          ['+', '-', '/', '*', '°'],
          ['△', 'S()', 'P()','⌓()', '?']
      ]

  }

  render() {
    return(
        <div className="symbol_table">
            <table className="symbol_table">
                <tbody>
                    {this.symbolsChars.map(line =>
                        <tr key={line}>
                            {line.map(char =>
                                <th onClick={e => this.props.onSymbolSelected(char)} key={char}>
                                    {char}
                                </th>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
  }
}

export default SymbolTable