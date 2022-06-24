import React from "react";

import 'css_files/calculator_gui/solution_table/solution_table.css'
import templates from '../data_space/components/templates'

class SolutionTable extends React.Component {
  constructor(props) {
      super(props)
      this.solution = JSON.parse(props.solution).solution
      this.templates = templates
  }

  render() {
    return(
        <div className="solution_table">
            <table className="solution_table">
            <tbody>
                <tr>
                  <th className="title">נימוק</th>
                  <th className="title">טענה</th>
                  <th></th>
                </tr>
                {this.solution.map(val =>
                    <tr>
                      <td className="explain">{val.explain}</td>
                      <td className="claim">{this.templates.find(template => template.option === val.claim.dataType
                      ).getRepresentation(val.claim.fields)}</td>
                      <td className="claim">{val.numMove}</td>
                    </tr>
                )}
            </tbody>
            </table>
       </div>
    )
  }
}

export default SolutionTable