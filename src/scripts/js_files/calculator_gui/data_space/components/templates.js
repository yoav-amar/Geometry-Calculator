let templates = [
    {
        option: "תיכון במשולש",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"תיכון במשולש"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"△"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            return {
                dataType: "תיכון במשולש",
                dataId: dataId,
                representation: `${ts1} תיכון במשולש ${ts2}△`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} תיכון במשולש ${ts2}△`
        }
    },
    {
        option: "קטע משיק למעגל",
        structure:[
            {type: "label", content:"קטע"},
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"משיק למעגל"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"בנק'"},
            {type: "input", id: "tem_struct_3"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            return {
                dataType: "קטע משיק למעגל",
                dataId: dataId,
                representation: `קטע ${ts1} משיק למעגל ${ts2} בנק' ${ts3}`,
                fields: [
                    ts1,
                    ts2,
                    ts3
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]

            return `קטע ${ts1} משיק למעגל ${ts2} בנק' ${ts3}`
        }
    },
    {
        option: "מעגלים משיקים",
        structure:[
            {type: "label", content:"מעגלים"},
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:","},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"משיקים בנק'"},
            {type: "input", id: "tem_struct_3"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            return {
                dataType: "מעגלים משיקים",
                dataId: dataId,
                representation: `מעגלים ${ts2} , ${ts1} משיקים בנק' ${ts3}`,
                fields: [
                    ts1,
                    ts2,
                    ts3
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]

            return `מעגלים ${ts2} , ${ts1} משיקים בנק' ${ts3}`
        }
    },
    {
        option: "קוטר במעגל",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"קוטר במעגל"},
            {type: "input", id: "tem_struct_2"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            return {
                dataType: "קוטר במעגל",
                dataId: dataId,
                representation: `${ts1} קוטר במעגל ${ts2}`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} קוטר במעגל ${ts2}`
        }
    },
    {
        option: "קטע אמצעיים",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"קטע אמצעיים ב-"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"△"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            return {
                dataType: "קטע אמצעיים",
                dataId: dataId,
                representation: `${ts1} קטע אמצעיים ב- ${ts2}△`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} קטע אמצעיים ב- ${ts2}△`
        }
    },
    {
        option: "טרפז",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"טרפז ("},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"||"},
            {type: "input", id: "tem_struct_3"},
            {type: "label", content:")"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            return {
                dataType: "טרפז",
                dataId: dataId,
                representation: `${ts1} טרפז (${ts3} || ${ts2})`,
                fields: [
                    ts1,
                    ts2,
                    ts3
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]

            return `${ts1} טרפז (${ts3} || ${ts2})`
        }
    },
    {
        option: "מקבילית",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"מקבילית"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            return {
                dataType: "מקבילית",
                dataId: dataId,
                representation: `${ts1}  מקבילית`,
                fields: [
                    ts1
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]

            return `${ts1}  מקבילית`
        }
    },
    {
        option: "מעויין",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"מעויין"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            return {
                dataType: "מקבילית",
                dataId: dataId,
                representation: `${ts1}  מעויין`,
                fields: [
                    ts1
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]

            return `${ts1}  מעויין`
        }
    },
    {
        option: "ריבוע",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"ריבוע"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            return {
                dataType: "ריבוע",
                dataId: dataId,
                representation: `${ts1}  ריבוע`,
                fields: [
                    ts1
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]

            return `${ts1}  ריבוע`
        }
    },
    {
        option: "דלתון",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"דלתון ("},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"="},
            {type: "input", id: "tem_struct_3"},
            {type: "label", content:","},
            {type: "input", id: "tem_struct_4"},
            {type: "label", content:"="},
            {type: "input", id: "tem_struct_5"},
            {type: "label", content:")"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            let ts4 = document.querySelector('#tem_struct_4').value
            let ts5 = document.querySelector('#tem_struct_5').value

            return {
                dataType: "דלתון",
                dataId: dataId,
                representation: `${ts1} דלתון (${ts5} = ${ts4}, ${ts3} = ${ts2})`,
                fields: [
                    ts1,
                    ts2,
                    ts3,
                    ts4,
                    ts5
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]
            let ts4 = fields[3]
            let ts5 = fields[4]

            return `${ts1} דלתון (${ts5} = ${ts4}, ${ts3} = ${ts2})`
        }
    },
    {
        option: "טרפז שווה שוקיים",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"טרפז שווה שוקיים ("},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"||"},
            {type: "input", id: "tem_struct_3"},
            {type: "label", content:")"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            return {
                dataType: "טרפז",
                dataId: dataId,
                representation: `${ts1} טרפז שווה שוקיים (${ts3} || ${ts2})`,
                fields: [
                    ts1,
                    ts2,
                    ts3
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]

            return `${ts1} טרפז שווה שוקיים (${ts3} || ${ts2})`
        }
    },
    {
        option: "מלבן",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"מלבן"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            return {
                dataType: "מלבן",
                dataId: dataId,
                representation: `${ts1}  מלבן`,
                fields: [
                    ts1
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]

            return `${ts1}  מלבן`
        }
    },
    {
        option: "משולש ישר זווית",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"△ משולש ישר זווית (90° ="},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"⦠)"},

        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            return {
                dataType: "משולש ישר זווית",
                dataId: dataId,
                representation: `${ts1}△ משולש ישר זווית (90° =${ts2}⦠)`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1}△ משולש ישר זווית (90° =${ts2}⦠)`
        }
    },
    {
        option: "משולש שווה צלעות",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"△ משולש שווה צלעות"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            return {
                dataType: "משולש שווה צלעות",
                dataId: dataId,
                representation: `${ts1}△ משולש שווה צלעות`,
                fields: [
                    ts1
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]

            return `${ts1}△ משולש שווה צלעות`
        }
    },
    {
        option: "משולש שווה שוקיים",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"△ משולש שווה שוקיים ("},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"="},
            {type: "input", id: "tem_struct_3"},
            {type: "label", content:")"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            return {
                dataType: "משולש שווה שוקיים",
                dataId: dataId,
                representation: `${ts1}△ משולש שווה שוקיים (${ts3} = ${ts2})`,
                fields: [
                    ts1,
                    ts2,
                    ts3
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]

            return `${ts1}△ משולש שווה שוקיים (${ts3} = ${ts2})`
        }
    },
    {
        option: "חוצה זווית",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"חוצה זווית"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"⦠"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            return {
                dataType: "חוצה זווית",
                dataId: dataId,
                representation: `${ts1} חוצה זווית ${ts2}⦠`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} חוצה זווית ${ts2}⦠`
        }
    },
    {
        option: "אמצע קטע",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"אמצע קטע"},
            {type: "input", id: "tem_struct_2"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            let a = ts2[0] + ts1
            let b = ts1 + ts2[1]
            return {
                dataType: "קטעים שווים",
                dataId: dataId,
                representation: `|${a}| = |${b}|`,
                fields: [
                    a,
                    b
                ]
            }
        },
        getRepresentation: (fields)=>{
            let a = fields[0]
            let b = fields[1]

            return `|${a}| = |${b}|`
        }
    },
    {
        option: "חסום במעגל",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"חסום במעגל"},
            {type: "input", id: "tem_struct_2"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "חסום במעגל",
                dataId: dataId,
                representation: `${ts1} חסום במעגל ${ts2}`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} חסום במעגל ${ts2}`
        }
    },
    {
        option: "חוסם מעגל",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"חוסם מעגל"},
            {type: "input", id: "tem_struct_2"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "חוסם מעגל",
                dataId: dataId,
                representation: `${ts1} חוסם מעגל ${ts2}`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts1} חוסם מעגל ${ts2}`
        }
    },
    {
        option: "ישרים מקבילים",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"||"},
            {type: "input", id: "tem_struct_2"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "ישרים מקבילים",
                dataId: dataId,
                representation: `${ts2} || ${ts1}`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts2} || ${ts1}`
        }
    },
    {
        option: "ישרים אנכים",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"⊥"},
            {type: "input", id: "tem_struct_2"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "ישרים אנכים",
                dataId: dataId,
                representation: `${ts2} ⊥ ${ts1}`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts2} ⊥ ${ts1}`
        }
    },
    {
        option: "קטעים שווים",
        structure:[
            {type: "label", content:"|"},
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"| = |"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"|"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "קטעים שווים",
                dataId: dataId,
                representation: `|${ts2}| = |${ts1}|`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `|${ts2}| = |${ts1}|`
        }
    },
    {
        option: "משוואת יחס",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"/"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"= |"},
            {type: "input", id: "tem_struct_3"},
            {type: "label", content:"| / |"},
            {type: "input", id: "tem_struct_4"},
            {type: "label", content:"|"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value
            let ts3 = document.querySelector('#tem_struct_3').value
            let ts4 = document.querySelector('#tem_struct_4').value

            return {
                dataType: "משוואת יחס",
                dataId: dataId,
                representation: `${ts4}| / |${ts3}| = ${ts2} / ${ts1}|`,
                fields: [
                    ts1,
                    ts2,
                    ts3,
                    ts4
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]
            let ts3 = fields[2]
            let ts4 = fields[3]

            return `${ts4}| / |${ts3}| = ${ts2} / ${ts1}|`
        }
    },
    {
        option: "זוויות שוות",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"⦠ ="},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"⦠"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "זוויות שוות",
                dataId: dataId,
                representation: `${ts2} = ∢${ts1}⦠`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts2} = ∢${ts1}⦠`
        }
    },
    {
        option: "אורך קטע",
        structure:[
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:" = |"},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"|"},
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "אורך קטע",
                dataId: dataId,
                representation: `${ts2}| = ${ts1}|`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `${ts2}| = ${ts1}|`
        }
    },
    {
        option: "גודל זווית",
        structure:[
            {type: "label", content:"°"},
            {type: "input", id: "tem_struct_1"},
            {type: "label", content:"="},
            {type: "input", id: "tem_struct_2"},
            {type: "label", content:"⦠"}
        ],
        getObjResult: (dataId)=>{
            let ts1 = document.querySelector('#tem_struct_1').value
            let ts2 = document.querySelector('#tem_struct_2').value

            return {
                dataType: "גודל זווית",
                dataId: dataId,
                representation: `°${ts2} = ${ts1}⦠`,
                fields: [
                    ts1,
                    ts2
                ]
            }
        },
        getRepresentation: (fields)=>{
            let ts1 = fields[0]
            let ts2 = fields[1]

            return `°${ts2} = ${ts1}⦠`
        }
    }
]

export default templates