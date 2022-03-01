import React from 'react'
import 'css_files/calculator_gui/data_space/components/data_input.css'

import AddButtonImg from './images/add_button.png'
import ResetButtonImg from './images/reset_button.png'

import templates from './templates'

class DataInput extends React.Component {
  constructor(props) {
      super(props)

      this.addData = this.addData.bind(this)
      this.setTemplate = this.setTemplate.bind(this)
      this.addSymbol = this.addSymbol.bind(this)
      this.initializeTemplate = this.initializeTemplate.bind(this)

      this.state = {
          isHoverAdd: false,
          isHoverReset: false,
          dataTypeIndex: 0
      }

      this.dataId = 0
      this.options = []

      this.template = []

      this.templates = templates
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
      let templateObj = this.templateGetObj(++this.dataId)

      if(!templateObj.representation){
          alert("הכנס נתון שאינו ריק !!!")
          return
      }


      templateObj.isNeedProof = (["נתון:", "הוכח:"].at(this.state.dataTypeIndex) === "הוכח:");

      this.props.onAdd(templateObj)
  }

  initializeTemplate(){
      this.options = []
      this.template = [<input className="data_input" id="default_data_input"
                              key="default_data_input" ref={(ref) => this.input = ref}/>]

      this.templateGetObj = (dataId) => {
          return {
              dataType: "כללי",
              dataId: dataId,
              representation: document.querySelector('#default_data_input').value
          }
      }

      this.setState({}, () => {
          this.input.value = ""

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
                          <span id={template.option} key={template.option} className="template_option"
                                onClick={e=>this.setTemplate(template)}>
                              {template.option}
                          </span>
                      )
                  }
              })

              this.setState({})
          })
      })
  }

  setTemplate(template){
      this.template = []

      this.templateGetObj = template.getObjResult

      let labelId = 0
      template.structure.slice().reverse().forEach((element) => {
          if(element.type === "input"){
              this.template.push(<input
                  id={element.id}
                  key={element.id}
                  className="data_input"
                  placeholder={"_".repeat(50)}
                  onFocus={(e) => this.input = e.target}
                  style={{textAlign: "center"}}
              />)
          }else if(element.type === "label"){
              this.template.push(<label
                  id={'l_' + labelId}
                  key={'l_' + labelId}
                  className="data_input_label"
                  style={{direction: 'rtl'}}>
                  {element.content}
              </label>)

              ++labelId
          }
      })

      this.setState({})
  }

  componentDidMount() {
      this.initializeTemplate()
  }

    render() {
    return(
        <div>
            <div className="data_input" style={{display:"flex", width:"100%", height:"100%"}}>
                <button className="reset_data" draggable={false}
                             onClick={e => this.initializeTemplate()}
                             onMouseEnter={e => this.setState({isHoverReset: true})}
                             onMouseLeave={e => this.setState({isHoverReset: false})}>
                    <img className="img_data" src={ResetButtonImg} alt="כפתור-איתחול"
                         style={this.state.isHoverReset?{opacity: "1"}: {opacity: "0.7"}}/>
                </button>

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
                <img className="img_data" src={AddButtonImg} alt="כפתור-הוספה"
                     style={this.state.isHoverAdd?{opacity: "1"}: {opacity: "0.7"}}/>
                </button>
            </div>
            <div className="data_templates"
                 style={(this.template.length === 1)?{display: "block", visibility: "visible"}:
                     {display: "none", visibility: "hidden"}}>
                {this.options}
            </div>
        </div>
    )
  }
}

export default DataInput