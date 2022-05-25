import React from 'react'

class Gang extends React.Component {
    constructor(props) {
        super(props)
    }
    open_gang() {
        window.location.replace("http://127.0.0.1:5000/problems/" + this.props.value)
        // alert("open the gang: " + this.props.value)
    }
    render() {
        return (
            <button className="gang" onClick={this.open_gang.bind(this)}>
                {this.props.value}
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
            <div>
                {this.gangs.map(function (gang_name) {
                    return <Gang value={gang_name} key={gang_name} />

                })}
            </div>
        )
    }
}

export default GangList