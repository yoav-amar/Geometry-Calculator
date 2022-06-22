import React from 'react'

function AddSolution() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    let file = null
    
    function handleFile(files) {
        if (files.length != 1) {
            alert("אפשר להעלות רק קובץ אחד")
            return
        }
        file = files[0]
        alert(file.type)
    
        if (!file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png")) {
            alert("הקובץ צריך להיות תמונה")
            return
        }
    }


    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
        if(file){
            alert(1)
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        alert(e.target.new_solution_name)
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <label>הוסף שם לפתרון
                <input type={"text"} id="new_solution_name" name='new_solution_name'></input>
            </label>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} accept='.png,.jpeg,.jpg' />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div>
                    <p>העלה תמונה של פתרון</p>
                    <button className="upload-button" onClick={onButtonClick}>בחר קובץ</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
    );
};

export default AddSolution
