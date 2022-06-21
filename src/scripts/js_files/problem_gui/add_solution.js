import React from 'react'

class AddSolution extends React.Component {
    constructor(props) {
        super(props)
    }
    create_new_solution(event) {
        alert(event.target)
        file = event.target.new_solution
        event.preventDefault()
    }
    handle_drag(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }
    render() {
        return (
            // <form onSubmit={this.create_new_solution.bind(this)} method={"post"}>
            //     <label>העלה פתרון:
            //         <input type="file" id="new_solution" name="new_solution" accept='.png,.jpeg,.jpg' />
            //     </label>
            //     <input type={"submit"} value={"אשר"} />
            // </form>
            <form id="form-file-upload" onSubmit={this.create_new_solution.bind(this)} method={"post"}>
                <input type="file" id="new_solution" name="new_solution" accept='.png,.jpeg,.jpg' />
                <label id="label-file-upload" htmlFor="new_solution">
                    <div>
                        <p>אפשר גם לגרור</p>
                        <button className="upload-button">העלה פתרון</button>
                    </div>
                </label>
            </form>
        )
    }
}

export default AddSolution
