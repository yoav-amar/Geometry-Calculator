import React from 'react'

class Gang extends React.Component {
    constructor(props) {
        super(props)
    }
    open_gang() {$("#main_body").load('/my_gangs')
        $("#main_body").load('/problems/'+this.props.value)
    }
    render() {
        return (
            <button className="style_1" onClick={this.open_gang.bind(this)}>
                {this.props.gang_name}
            </button>
        )
    }
}

class GangList extends React.Component {
    constructor(props) {
        super(props)
        this.gangs = null
    }

    render() {
        jQuery.ajax({
            url: "get_gangs",
            contentType: 'application/json;charset=UTF-8',
            type: "get",
            async: false,
            success: function (data) {
                this.gangs = data
            }.bind(this),
            error: function (jqXHR) {
                if (jqXHR.status == 400) {
                    alert(jqXHR.responseText)

                }
            }
        });
        return (
            <div className='gangs_list'>
                {Object.keys(this.gangs).map(function (gang_code) {
                    return <Gang value={gang_code} gang_name={this.gangs[gang_code]} key={gang_code} />

                }.bind(this))}
            </div>
        )
    }
}

export default GangList