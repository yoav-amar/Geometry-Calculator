import React from 'react'

function AddSolution() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    let file = null
    let gang_code = document.getElementById("gang_code").innerHTML
    let problem_name = document.getElementById("problem_name").innerHTML.substring(21)

    function handleFile(files) {
        if (files.length != 1) {
            alert("אפשר להעלות רק קובץ אחד")
            return
        }
        file = files[0]
        if (!file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png")) {
            alert("הקובץ צריך להיות תמונה")
            return
        }
        document.getElementById("upload_button").innerHTML = "נבחר קובץ"
    }

    function save_solution() {
        let solution_name = document.getElementById("new_solution_name").value
        if (!file || !solution_name) {
            alert("וודא שכל השדות מולאו")
            return
        }
        if (solution_name.includes("<")) {
            alert("אי אפשר להכניס את התו >")
            return
        }
        let reader = new FileReader();
        reader.onloadend = function () {
            let data = {
                "solution_name": solution_name,
                "gang_code": gang_code,
                "problem_name": problem_name,
                "solution": reader.result
            }
            jQuery.ajax({
                url: "add_solution",
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8',
                type: "post",
                success: function () {
                    alert("הפתרון נוסף בהצלחה")
                    file = null
                    document.getElementById("upload_button").innerHTML = "בחר קובץ"
                    $("#main_body").load('/problem', { "problem_name": problem_name, "gang_code": gang_code })
                },
                error: function (jqXHR) {
                    if (jqXHR.status == 400) {
                        alert(jqXHR.responseText)

                    }
                }
            });
        }
        reader.readAsDataURL(file)
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
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        [<h1> העלה פתרון חדש</h1>,
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <label>
                <input className="gang_3" type={"text"} id="new_solution_name" name='new_solution_name'></input>
                הוסף שם לפתרון
            </label>
            <input className="new_solution" ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept='image/*' />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div>
                    <p>העלה תמונה של פתרון</p>
                    <button className="upload-button" id="upload_button" onClick={onButtonClick}>בחר קובץ</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            <button className='style_1' onClick={save_solution}> שמור את הפתרון</button>
        </form>
        ]

    );
};

export default AddSolution
