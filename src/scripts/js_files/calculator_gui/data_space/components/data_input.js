import React from 'react'
import 'css_files/calculator_gui/data_space/components/data_input.css'

import AddButtonImg from './images/add_button.png'

class DataInput extends React.Component {
  constructor(props) {
      super(props)

      this.addData = this.addData.bind(this)
      this.setTemplate = this.setTemplate.bind(this)
      this.addSymbol = this.addSymbol.bind(this)
      this.initializeTemplate = this.initializeTemplate.bind(this)

      this.state = {
          isHoverAdd: false,
          dataTypeIndex: 0
      }

      this.data_id = 0
      this.options = []

      this.template = []
      this.initializeTemplate()

      this.templates = [
          {
              option: "תיכון במשולש",
              structure:[
                  {type: "input", id: "tem_struct_1"},
                  {type: "label", content:"תיכון במשולש"},
                  {type: "input", id: "tem_struct_2"}
              ],
              getObjResult: ()=>{
                  return {
                      data_type: "תיכון במשולש",
                      data_id: this.data_id++,
                      fields: [
                          document.querySelector('#tem_struct_1').value,
                          document.querySelector('#tem_struct_2').value
                      ]
                  }
              }
          }
      ]
  }

  addSymbol(symbol){
      this.input.focus()

      let start = this.input.selectionStart
      let end = this.input.selectionEnd

      let v = this.input.value
      let textBefore = v.substring(0,  start)
      let textAfter  = v.substring(end, v.length)

      this.input.value = textBefore + symbol + textAfter
      this.input.selectionStart = start + symbol.length
      this.input.selectionEnd = start + symbol.length
  }

  addData(){

  }

  initializeTemplate(){
      this.template = [<input className="data_input" id="default_data_input"
                              key="default_data_input" ref={(ref) => this.input = ref}/>]
      this.setState({})
  }

  setTemplate(template){
      this.template = []

      template.structure.slice().reverse().forEach((element) => {
          if(element.type === "input"){
              this.template.push(<input
                  id={element.id}
                  key={element.id}
                  className="data_input"
                  placeholder={"_".repeat(50)}
                  onFocus={(e) => this.input = e.target}
              />)
          }else if(element.type === "label"){
              this.template.push(<label
                  className="data_label"
                  style={{width: element.width}}>
                  {element.content}
              </label>)
          }
      })

      this.setState({})
  }

  componentDidMount() {
      this.input.addEventListener('input', ()=>{
          this.options = []
          if(this.input.value.replaceAll(' ','') === '') {
              this.setState({})
              return
          }

          let keywords = this.input.value.split(" ").filter(char => char)

          this.templates.forEach((template) =>{
              if(keywords.some(keyword => template.option.includes(keyword))){
                  this.options.push(
                      <span className="template_option"
                            onClick={e=>this.setTemplate(template)}>
                          {template.option}
                      </span>
                  )
              }
          })

          this.setState({})
      })
  }

    render() {
    return(
        <div>
            <div className="data_input" style={{display:"flex", width:"100%", height:"100%"}}>
                <div className="template_space">
                    {this.template}
                </div>

                <button className="type_data" draggable={false}
                         onClick={e => this.setState({dataTypeIndex: (this.state.dataTypeIndex + 1) % 2})}>
                    {["נתון:","הוכח:"].at(this.state.dataTypeIndex)}
                </button>
                <button className="add_data" draggable={false}
                         onClick={e => this.addData()}
                         onMouseEnter={e => this.setState({isHoverAdd: true})}
                         onMouseLeave={e => this.setState({isHoverAdd: false})}>
                <img className="add_data" src={AddButtonImg} alt="כפתור-הוספה"
                     style={this.state.isHoverAdd?{opacity: "1"}: {opacity: "0.7"}}/>
                </button>
            </div>
            <div className="data_templates">
                {this.options}
            </div>
        </div>
    )
  }
}

export default DataInput