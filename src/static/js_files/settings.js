class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="settings">
                <h1> הגדרות</h1>
                <button> עדכן שם משתמש</button>
                <button> עדכן סיסמא</button>
                <button> עדכן דוא"ל</button>
                <button>שתף תרגילים אוטומטית</button>
                <button>מחיקת משתמש 🙁</button>

            </div>
        )
    }
}

const domContainers = document.querySelectorAll('.settings')
domContainers.forEach(domContainer => ReactDOM.render(<SettingsMenu/>, domContainer))




// class SetProperty extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             property_name: '',
//             new_property_val: ''
//         }
//     }
// }

// class AutomateShare extends SetProperty {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (<>
//             <input type="checkbox"/>
//             <label>automate share your problems</label>
//         </>);
//     }
// }
//
// class DeleteAccount extends SetProperty{
//     constructor(props) {
//         super();
//     }
// }

