const MATCH_REQUEST_EXAMPLE = {
    "id": "_0.s8l7mzi4g6m",
    "ghiForm": {
        "lformsVersion": "29.0.3",
        "PATH_DELIMITER": "/",
        "code": null,
        "codeList": null,
        "identifier": null,
        "name": "General Health Information",
        "type": null,
        "template": "table",
        "items": [
            {
                "header": false,
                "dataType": "DT",
                "question": "What is your birth date?",
                "linkId": "birthDate",
                "localQuestionCode": "birthDate",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "value": "1969-11-05"
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "What is your gender?",
                "linkId": "gender",
                "localQuestionCode": "gender",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Male",
                        "code": "M",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "Female",
                        "code": "F",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "Male",
                    "code": "M",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "QTY",
                "question": "What is your height?",
                "linkId": "height",
                "localQuestionCode": "height",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "units": [
                    {
                        "name": "cm"
                    },
                    {
                        "name": "[in_i]"
                    }
                ],
                "value": 195,
                "unit": {
                    "name": "cm",
                    "text": "cm"
                }
            },
            {
                "header": false,
                "dataType": "QTY",
                "question": "What is your weight?",
                "linkId": "weight",
                "localQuestionCode": "weight",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "units": [
                    {
                        "name": "kg"
                    },
                    {
                        "name": "[lb_av]"
                    }
                ],
                "value": 110,
                "unit": {
                    "name": "kg",
                    "text": "kg"
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Are you participating on any ongoing trials?",
                "linkId": "ongoingTrials",
                "localQuestionCode": "ongoingTrials",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Are you or a partner currently trying to have a child?",
                "linkId": "tryingHaveChild",
                "localQuestionCode": "tryingHaveChild",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have hepatitis B?",
                "linkId": "haveHepatitisB",
                "localQuestionCode": "haveHepatitisB",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have hepatitis C?",
                "linkId": "haveHepatitisC",
                "localQuestionCode": "haveHepatitisC",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have HIV?",
                "linkId": "haveHIV",
                "localQuestionCode": "haveHIV",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "0",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you experienced acute heart failure or do you have any severe cardiac conditions?",
                "linkId": "haveCardiac",
                "localQuestionCode": "haveCardiac",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "0",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            }
        ],
        "templateOptions": {
            "showQuestionCode": false,
            "showCodingInstruction": false,
            "tabOnInputFieldsOnly": false,
            "hideFormControls": true,
            "showFormOptionPanel": false,
            "showFormOptionPanelButton": false,
            "showItemOptionPanelButton": false,
            "hideUnits": false,
            "allowMultipleEmptyRepeatingItems": false,
            "allowHTMLInInstructions": false,
            "useAnimation": true,
            "displayControl": {
                "questionLayout": "vertical"
            },
            "viewMode": "auto",
            "showFormHeader": false,
            "showColumnHeaders": true,
            "defaultAnswerLayout": {
                "answerLayout": {
                    "type": "COMBO_BOX",
                    "columns": "0"
                }
            },
            "useTreeLineStyle": true,
            "columnHeaders": [
                {
                    "name": "Name"
                },
                {
                    "name": "Value"
                },
                {
                    "name": "Units"
                }
            ]
        },
        "hasSavedData": true
    },
    "trialPrefs": {
        "lformsVersion": "29.0.3",
        "PATH_DELIMITER": "/",
        "code": null,
        "codeList": null,
        "identifier": null,
        "name": "Trial Preferences",
        "type": null,
        "template": "table",
        "items": [
            {
                "header": false,
                "dataType": "CWE",
                "question": "What is the condition that you want to find a clinical trial for?",
                "linkId": "condition",
                "localQuestionCode": "condition",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": null,
                "externallyDefined": "https://clinicaltables.nlm.nih.gov/api/conditions/v3/search",
                "displayControl": {
                    "answerLayout": {
                        "type": "COMBO_BOX",
                        "columns": "0"
                    }
                },
                "value": {
                    "text": "Rheumatoid arthritis (RA)",
                    "code": "2311"
                }
            },
            {
                "header": false,
                "dataType": "CWE",
                "question": "Where are you located?",
                "linkId": "location",
                "localQuestionCode": "location",
                "codingInstructions": "Example: Berlin, Germany",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "value": {
                    "text": "Center of Lisbon, Portugal",
                    "code": "0b164f7a-9938-42ed-8d5b-f24c9ba96884"
                }
            },
            {
                "header": false,
                "dataType": "QTY",
                "question": "How far are you willing to travel?",
                "linkId": "travelDistance",
                "localQuestionCode": "travelDistance",
                "codingInstructions": "Type a number in kilometers/miles",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "units": [
                    {
                        "name": "km"
                    },
                    {
                        "name": "[mi_i]"
                    }
                ],
                "restrictions": {
                    "minInclusive": "0",
                    "maxInclusive": "200"
                },
                "value": 10,
                "unit": {
                    "name": "km"
                }
            }
        ],
        "templateOptions": {
            "showQuestionCode": false,
            "showCodingInstruction": false,
            "tabOnInputFieldsOnly": false,
            "hideFormControls": true,
            "showFormOptionPanel": false,
            "showFormOptionPanelButton": false,
            "showItemOptionPanelButton": false,
            "hideUnits": false,
            "allowMultipleEmptyRepeatingItems": false,
            "allowHTMLInInstructions": false,
            "useAnimation": true,
            "displayControl": {
                "questionLayout": "vertical"
            },
            "viewMode": "auto",
            "showFormHeader": false,
            "showColumnHeaders": true,
            "defaultAnswerLayout": {
                "answerLayout": {
                    "type": "COMBO_BOX",
                    "columns": "0"
                }
            },
            "useTreeLineStyle": true,
            "columnHeaders": [
                {
                    "name": "Name"
                },
                {
                    "name": "Value"
                },
                {
                    "name": "Units"
                }
            ]
        },
        "hasSavedData": true
    },
    "condition": {
        "lformsVersion": "29.0.3",
        "PATH_DELIMITER": "/",
        "code": null,
        "codeList": null,
        "identifier": null,
        "name": "Condition Specific Questions",
        "type": null,
        "template": "table",
        "items": [
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you being diagnosed with rheumathoid arthritis?",
                "linkId": "haveRheumatoidArthritis",
                "localQuestionCode": "haveRheumatoidArthritis",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Are you taking methotrexate or have you taken it in the last 12 months?",
                "linkId": "takeMethotrexate",
                "localQuestionCode": "takeMethotrexate",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you taken any disease modifying anti-rheumatic drugs (DMARDs)?",
                "linkId": "takeDmards",
                "localQuestionCode": "takeDmards",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have a history of kidney or liver disease?",
                "linkId": "haveLiverDisease",
                "localQuestionCode": "takeDmards",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes, both",
                        "code": "yesBoth",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No, neither",
                        "code": "noNeither",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "Only Liver disease",
                        "code": "onlyLiverDesease",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "Only Kidney disease",
                        "code": "onlyKidneyDesease",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No, neither",
                    "code": "noNeither",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you active or latent tuberculosis?",
                "linkId": "haveTuberculosis",
                "localQuestionCode": "haveTuberculosis",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you taken oral antibioctics?",
                "linkId": "takenOralAntibioctics",
                "localQuestionCode": "takenOralAntibioctics",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you being diagnosed with any autoimmune diseases besides rheumathoid arthritis?",
                "linkId": "haveAutoimmuneBesidesRheuArth",
                "localQuestionCode": "haveAutoimmuneBesidesRheuArth",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you being diagnosed with any neurological diseases?",
                "linkId": "haveNeurologicalDiseases",
                "localQuestionCode": "haveNeurologicalDiseases",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            }
        ],
        "templateOptions": {
            "showQuestionCode": false,
            "showCodingInstruction": false,
            "tabOnInputFieldsOnly": false,
            "hideFormControls": true,
            "showFormOptionPanel": false,
            "showFormOptionPanelButton": false,
            "showItemOptionPanelButton": false,
            "hideUnits": true,
            "allowMultipleEmptyRepeatingItems": false,
            "allowHTMLInInstructions": false,
            "useAnimation": true,
            "displayControl": {
                "questionLayout": "vertical"
            },
            "viewMode": "auto",
            "showFormHeader": false,
            "showColumnHeaders": true,
            "defaultAnswerLayout": {
                "answerLayout": {
                    "type": "COMBO_BOX",
                    "columns": "0"
                }
            },
            "useTreeLineStyle": true,
            "columnHeaders": [
                {
                    "name": "Name"
                },
                {
                    "name": "Value"
                },
                {
                    "name": "Units"
                }
            ]
        },
        "hasSavedData": true
    },
    "trial": {
        "lformsVersion": "29.0.3",
        "PATH_DELIMITER": "/",
        "code": null,
        "codeList": null,
        "identifier": null,
        "name": "Trial Specific Questions",
        "type": null,
        "template": "table",
        "items": [
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you smoke cigarettes?",
                "linkId": "smokeCigarettes",
                "localQuestionCode": "smokeCigarettes",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Are you claustrophobic?",
                "linkId": "claustrophobic",
                "localQuestionCode": "claustrophobic",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "TITLE",
                "question": "Clinical Trial: Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate",
                "linkId": "titlePf06650833",
                "localQuestionCode": "titlePf06650833",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "0",
                    "max": "0"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have a sensitivity to adalimuamab?",
                "linkId": "sessivityToAdalimuamab",
                "localQuestionCode": "sessivityToAdalimuamab",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Has your rheumatoid arthritis gone into remission in the last 6 months?",
                "linkId": "remissionRheumatoidArthritis",
                "localQuestionCode": "remissionRheumatoidArthritis",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "editable": "1",
                "answers": [
                    {
                        "text": "Yes",
                        "code": "yes",
                        "system": null,
                        "label": null,
                        "score": null
                    },
                    {
                        "text": "No",
                        "code": "no",
                        "system": null,
                        "label": null,
                        "score": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "value": {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            }
        ],
        "templateOptions": {
            "showQuestionCode": false,
            "showCodingInstruction": false,
            "tabOnInputFieldsOnly": false,
            "hideFormControls": true,
            "showFormOptionPanel": false,
            "showFormOptionPanelButton": false,
            "showItemOptionPanelButton": false,
            "hideUnits": true,
            "allowMultipleEmptyRepeatingItems": false,
            "allowHTMLInInstructions": false,
            "useAnimation": true,
            "displayControl": {
                "questionLayout": "vertical"
            },
            "viewMode": "auto",
            "showFormHeader": false,
            "showColumnHeaders": true,
            "defaultAnswerLayout": {
                "answerLayout": {
                    "type": "COMBO_BOX",
                    "columns": "0"
                }
            },
            "useTreeLineStyle": true,
            "columnHeaders": [
                {
                    "name": "Name"
                },
                {
                    "name": "Value"
                },
                {
                    "name": "Units"
                }
            ]
        },
        "hasSavedData": true
    }
};

module.exports = {
    MATCH_REQUEST_EXAMPLE
};