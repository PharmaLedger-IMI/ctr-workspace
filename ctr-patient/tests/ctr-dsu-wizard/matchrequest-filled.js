const MATCH_REQUEST_EXAMPLE = {
    "id": "_0.m2laxulmg4b",
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
                "dataType": "CNE",
                "question": "If female, are you pregnant or nursing, or may become pregnant?",
                "linkId": "pregnant",
                "localQuestionCode": "pregnant",
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
                "skipLogic": {
                    "action": "show",
                    "logic": "ALL",
                    "conditions": [
                        {
                            "source": "gender",
                            "trigger": {
                                "value": {
                                    "code": "F"
                                }
                            }
                        }
                    ]
                },
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "If male, are you and a partner currently trying to become pregnant?",
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
                "skipLogic": {
                    "action": "show",
                    "logic": "ALL",
                    "conditions": [
                        {
                            "source": "gender",
                            "trigger": {
                                "value": {
                                    "code": "M"
                                }
                            }
                        }
                    ]
                },
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "externallyDefined": "https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/medicalconditions",
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
                "codingInstructions": "Leave blank if you do not whish to share your location. Example: Berlin, Germany",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "0",
                    "max": "1"
                },
                "editable": "1",
                "answers": null,
                "externallyDefined": "https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/locations",
                "value": {
                    "text": "38.74488,-9.1345574"
                },
                "displayControl": {
                    "answerLayout": {
                        "type": "COMBO_BOX",
                        "columns": "0"
                    }
                }
            },
            {
                "header": false,
                "dataType": "QTY",
                "question": "How far are you willing to travel?",
                "linkId": "travelDistance",
                "localQuestionCode": "travelDistance",
                "codingInstructions": "Type a number in kilometers/miles. Leave blank for no travel distance limit. Do not type anything if you have not shared your location in the previous question.",
                "questionCardinality": {
                    "min": "1",
                    "max": "1"
                },
                "answerCardinality": {
                    "min": "0",
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
                    "maxInclusive": "10000"
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
    "trialPrefsWarning": "",
    "conditionBlank": {
        "shortName": "condition",
        "name": "Condition Specific Questions",
        "status": "active",
        "version": "0.4.12",
        "experimental": true,
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "e7d8f068-32fd-4e21-ae19-403db05c8500"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "2c420af1-29de-45f2-b027-453f5efdc34e"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "ffb5692e-601c-4669-a498-d668cdd86865"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have a history of kidney or liver disease?",
                "linkId": "haveLiverDisease",
                "localQuestionCode": "haveLiverDisease",
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
                        "code": "yesBoth",
                        "text": "Yes, both",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "noNeither",
                        "text": "No, neither",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "onlyLiverDesease",
                        "text": "Only Liver disease",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "onlyKidneyDesease",
                        "text": "Only Kidney disease",
                        "label": null,
                        "score": null,
                        "system": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "ctrExtension": {
                    "cqtIdCollection": [
                        "e8e8dbb9-f209-4886-81ef-d38f89ecb760"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "6d122f74-f06b-4713-960e-b4a41690a726"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "1111c475-01f4-427f-a583-3bc72fc98908"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "482d0b10-be52-43f5-85ff-88f88160c13c"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "c79fab54-681f-4245-8676-349189757970"
                    ]
                }
            }
        ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "e7d8f068-32fd-4e21-ae19-403db05c8500"
                    ]
                },
                "value": {
                    "text": "Yes",
                    "code": "yes",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "2c420af1-29de-45f2-b027-453f5efdc34e"
                    ]
                },
                "value": {
                    "text": "Yes",
                    "code": "yes",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "ffb5692e-601c-4669-a498-d668cdd86865"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                "localQuestionCode": "haveLiverDisease",
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
                        "code": "yesBoth",
                        "text": "Yes, both",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "noNeither",
                        "text": "No, neither",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "onlyLiverDesease",
                        "text": "Only Liver disease",
                        "label": null,
                        "score": null,
                        "system": null
                    },
                    {
                        "code": "onlyKidneyDesease",
                        "text": "Only Kidney disease",
                        "label": null,
                        "score": null,
                        "system": null
                    }
                ],
                "displayControl": {
                    "answerLayout": {
                        "type": "RADIO_CHECKBOX"
                    }
                },
                "ctrExtension": {
                    "cqtIdCollection": [
                        "e8e8dbb9-f209-4886-81ef-d38f89ecb760"
                    ]
                },
                "value": {
                    "code": "yesBoth",
                    "text": "Yes, both",
                    "label": null,
                    "score": null,
                    "system": null
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "6d122f74-f06b-4713-960e-b4a41690a726"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "1111c475-01f4-427f-a583-3bc72fc98908"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "482d0b10-be52-43f5-85ff-88f88160c13c"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "c79fab54-681f-4245-8676-349189757970"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
    "trialBlank": {
        "shortName": "trial",
        "name": "Trial Specific Questions",
        "status": "active",
        "version": "0.4.12",
        "experimental": true,
        "items": [
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "a4835a8f-d81d-4f20-9ba4-ab8e70126d68"
                    ]
                }
            },
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "4ca1dc49-d245-4318-805f-6968dd20b0e9"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "0d011b5e-77b5-4b9d-a85a-7aef0925d63b"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "5377a2cd-7169-42b1-8dfe-984b125947d1"
                    ]
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "8d2554e5-49d6-48e6-9931-98b3e7cebae7"
                    ]
                }
            }
        ]
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "a4835a8f-d81d-4f20-9ba4-ab8e70126d68"
                    ]
                }
            },
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "4ca1dc49-d245-4318-805f-6968dd20b0e9"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "0d011b5e-77b5-4b9d-a85a-7aef0925d63b"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
                    "system": null,
                    "label": null,
                    "score": null
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "5377a2cd-7169-42b1-8dfe-984b125947d1"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
                    },
                    {
                        "text": "Not sure or prefer not to answer",
                        "code": "notSure",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "8d2554e5-49d6-48e6-9931-98b3e7cebae7"
                    ]
                },
                "value": {
                    "text": "Not sure or prefer not to answer",
                    "code": "notSure",
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
    "trials": [
        {
            "id": "4b8ed865-cf36-4fc2-914f-ba5ba28b05a8",
            "name": "Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate",
            "description": "Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWbNNtWnfCDQHZWiBdN6kPY7NMSynmd8MDkw99pmHPYE8GbaYWjrdEdpjtqwabiFvwbV",
            "dsuData": {
                "extraProperty": "Extra data for trial 1"
            },
            "nctNumber": "NCT0480TEST",
            "purpose": "To assess the efficacy and safety of PF 0665083 at Week 12 in subjects with moderate to severe, active, rheumathoid arthritis",
            "phase": "Phase II Clinical Trial",
            "timeCommitment": "Up to 2 hours per week",
            "physicalCommitment": "Weekly check in to the site",
            "travelStipends": "Up to $3500 in travel expenses are reimbursed",
            "eligibilityCriteria": "\nMust have:\n<ul>\n    <li><span style=\"font-weight: bold;\">Rheumathoid arthritis diagnosis</span>\n        <br />We found a diagnosis in your health record\n    </li>\n    <li><span style=\"font-weight: bold;\">Methotrexate prescription</span>\n        <br />You answered that you are taking methotrexate\n    </li>\n    <li><span style=\"font-weight: bold;\">No history of immunodeficiency disorders</span>\n        <br />Your health data shows no record of immunodeficiency disorders\n    </li>\n    <li><span style=\"font-weight: bold;\">No history of HIV</span>\n        <br />Your health data shows no record of HIV\n    </li>\n    <li><span style=\"font-weight: bold;\">No history of kidney or liver disease</span>\n        <br />Your health data shows no record of kidney or liver disease\n    </li>\n</ul>\n</ul>Cannot have:<ul>\n    <li><span style=\"font-weight: bold;\">Cannot smoke cigarettes</span>\n        We're not sure about this criteria!\n    </li>\n    <li><span style=\"font-weight: bold;\">Cannot be claustrophobic</span>\n        We're not sure about this criteria!\n    </li>\n</ul>\n",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "5fb9e662-01fa-47b4-b362-7b4afbe906f1",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "2311",
                        "name": "Rheumatoid arthritis (RA)"
                    }
                }
            ],
            "clinicalSite": {
                "id": "35be0fb7-fb5b-45e3-80f0-705401183848",
                "name": "Centro Hospitalar Universitário de Lisboa Central",
                "address": {
                    "id": "5d624620-a239-4613-945e-c786d49158ff",
                    "street": "Alameda Santo António dos Capuchos",
                    "country": {
                        "code": "PT",
                        "name": "Portugal"
                    },
                    "location": {
                        "id": "6e186617-accc-425e-9551-1912f8cf2db9",
                        "description": "Centro Hospitalar Universitário de Lisboa Central, Lisbon, Portugal",
                        "latitude": 38.72259950051003,
                        "longitude": -9.141586215843667,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "8f0759f0-357f-499f-86f1-db6486f72759",
                "name": "Pfizer",
                "logo": "/assets/mah/pfizer/logo_h165px.png"
            },
            "travDistMiles": 1.595595135362869
        }
    ],
    "submittedOn": "2021-08-27T15:53:29.205Z",
    "constKeySSIStr": "ssi:array:ctr:5K2TrDoKTji96GGB981V57PV5fd1RXgRSTj63EzD8SGE::v0"
};

module.exports = {
    MATCH_REQUEST_EXAMPLE
};