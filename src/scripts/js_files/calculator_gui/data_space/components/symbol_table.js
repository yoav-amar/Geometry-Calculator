import React from 'react'
import 'css_files/calculator_gui/data_space/components/symbol_table.css'

class SymbolTable extends React.Component {
  constructor(props) {
      super(props)

      this.symbolsChars =[
          ['∢', '||', '⊥', '≅', '∼'],
          ['<', '>', '≤', '≥', '='],
          ['+', '-', '/', '*', '°'],
          ['△', 'S()', '⌓()', '?', '.']
      ]

  }

  render() {
    return(
        <div className="symbol_table">
            <table className="symbol_table">
                    {this.symbolsChars.map(line =>
                        <tr>
                            {line.map(char =>
                                <th onClick={e => this.props.onSymbolSelected(char)}>
                                    {char}
                                </th>
                            )}
                        </tr>
                    )}
            </table>
        </div>
    )
  }
}

export default SymbolTable