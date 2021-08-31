const MATCH_REQUEST_EXAMPLE = {
    "id": "_0.xr4xi7tq19",
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
                    "text": "Psoriatic arthritis",
                    "code": "101000"
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
                    "text": "38.744879999999995,-9.1345574"
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
                "question": "Have you been diagnosed with Psoriatic Arthritis?",
                "linkId": "havePsoriaticArthritis",
                "localQuestionCode": "havePsoriaticArthritis",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "552280bc-2445-4915-994a-d769464f0dde",
                        "67e0718e-fe9d-4e93-b7d5-958544c909d9",
                        "da24ff59-354f-4ee1-82dd-86a14394da2d",
                        "111e837e-f806-4701-b03e-35ec9773efe9",
                        "6296fad2-e390-4044-adae-3ddb29143bce",
                        "bd06b365-4ced-4e7f-b978-6c10669dbe37",
                        "ccb3115b-a753-4c43-b880-7b72fe90b717",
                        "cdabf68a-d22c-40d4-b461-b41d811cb53c",
                        "d8354ce3-4b90-4307-8b9d-c61587234159"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you had Psoriatic Arthritis for at least 6 months?",
                "linkId": "havePsoriaticArthritisFor6Months",
                "localQuestionCode": "havePsoriaticArthritisFor6Months",
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
                "skipLogic": {
                    "logic": "ANY",
                    "action": "show",
                    "conditions": [
                        {
                            "source": "havePsoriaticArthritis",
                            "trigger": {
                                "value": {
                                    "code": "yes"
                                }
                            }
                        },
                        {
                            "source": "havePsoriaticArthritis",
                            "trigger": {
                                "value": {
                                    "code": "notSure"
                                }
                            }
                        }
                    ]
                },
                "ctrExtension": {
                    "cqtIdCollection": [
                        "2a279d5c-cc80-48c0-a43c-1146f1c66ae3",
                        "658e695d-7db2-4f82-b5aa-766d637447d1",
                        "b34fb706-7691-43ed-8299-707157029b6b",
                        "af6196b0-d34d-4e30-927a-d05e14df6bc1",
                        "c9e0adca-e318-46df-8e40-38bcaffebb25",
                        "def069a9-ba90-4801-853b-f863820a33ef"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you been diagnosed with Psoriasis?",
                "linkId": "havePsoriasis",
                "localQuestionCode": "havePsoriasis",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "62a33d29-f81d-4594-ae5b-c7a7a733830a",
                        "d63f3138-7512-4f79-b94a-aeecd3c30cd9",
                        "fb088012-705a-4db4-bbc0-d8bb7a97818c",
                        "1b3cfcf9-3086-49ad-aae4-4cf6dd1d6709",
                        "780f73a9-6ed5-4b2c-ab6d-0138e3a24467",
                        "c7cc6540-918d-4003-b302-395a365ef9d8"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you taken any disease modifying anti-rheumatic drugs (DMARDs)? e.g. adalimumab, cyclosporine, leflunomide, hydroxychloroquine, or sulfasalazine.?",
                "linkId": "takeDmards2",
                "localQuestionCode": "takeDmards2",
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
                        "2d8a1ffa-b6bf-4d27-8b93-29333d4fe633",
                        "66cc34e0-5083-4baa-96c2-b56a0f3a2e3d",
                        "c178e767-e8a5-40c1-9841-10f0639fda9e",
                        "0c0c8bf0-b68c-4d44-bb85-e49f6b8db6b7",
                        "384ecaa0-9576-4c2b-8fb7-d2f74c40f647",
                        "944f022f-695d-4b21-80fd-28ca11279b1c",
                        "cf724660-3710-4d53-a720-1f8549ee9c88"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have inflammatory conditions or autoimmune diseases other than Psoriasis or Psoriatic Arthritis?",
                "linkId": "haveInflaOrAutoImmuneConditionBesidesPsA",
                "localQuestionCode": "haveInflaOrAutoImmuneConditionBesidesPsA",
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
                        "115980ac-a1a4-4f66-bd5a-33dd5ef886fc",
                        "48b59778-7cbb-4880-9770-54bf795ff362",
                        "f6728530-bb92-4d63-832e-563f9e3db603",
                        "406bcfe6-b2e6-489f-81a6-829cf062df0e",
                        "86f83f8e-da31-400b-8970-2a8d5d23e1b0",
                        "8e0259a4-9687-4a01-8d6c-d183e5d31745",
                        "e1f78374-bbfc-49ae-b7a6-5bcf3355c1fe",
                        "ed9d87e0-16e7-48ef-93fc-2edcf6d53a12"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have a history of cancer?",
                "linkId": "haveCancerHistory",
                "localQuestionCode": "haveCancerHistory",
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
                        "29ab22ab-b487-4862-bb41-43900426c301",
                        "6d2b59f9-f52e-4a3d-bc73-4563c2e5005f",
                        "fd84268a-7b1b-49ba-80a3-3188255d87c4",
                        "1ebc7cd1-e5d1-42d9-9204-86b5652290f0",
                        "7942be35-633c-40ee-a9d5-06305e787626",
                        "f34150ec-d7bb-4087-b3f4-ab1740f06ab1"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you been on or previously taken any biologics? (e.g. secukinumab, ustekinumab)?",
                "linkId": "takeBiologics",
                "localQuestionCode": "takeBiologics",
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
                        "1f1c9066-13cc-463d-b6ef-af0a6618020c",
                        "4acb2d3c-3f1b-4af8-acea-b79887599170",
                        "d78d4c6a-092e-4799-880d-bd39abccb130",
                        "1f6481b5-18ab-4420-afb1-ee7959a6c6fc",
                        "41b53198-f7d6-4373-98c4-3c2efa5f4188",
                        "6c52b96d-737e-4fcc-8a65-656abb64650d",
                        "bbfc5f0f-1899-45c2-9735-36159b198ebd",
                        "fe3f5eb0-1471-443d-b6e8-039a51223f61"
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
                "question": "Have you been diagnosed with Psoriatic Arthritis?",
                "linkId": "havePsoriaticArthritis",
                "localQuestionCode": "havePsoriaticArthritis",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "552280bc-2445-4915-994a-d769464f0dde",
                        "67e0718e-fe9d-4e93-b7d5-958544c909d9",
                        "da24ff59-354f-4ee1-82dd-86a14394da2d",
                        "111e837e-f806-4701-b03e-35ec9773efe9",
                        "6296fad2-e390-4044-adae-3ddb29143bce",
                        "bd06b365-4ced-4e7f-b978-6c10669dbe37",
                        "ccb3115b-a753-4c43-b880-7b72fe90b717",
                        "cdabf68a-d22c-40d4-b461-b41d811cb53c",
                        "d8354ce3-4b90-4307-8b9d-c61587234159"
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
                "question": "Have you had Psoriatic Arthritis for at least 6 months?",
                "linkId": "havePsoriaticArthritisFor6Months",
                "localQuestionCode": "havePsoriaticArthritisFor6Months",
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
                "skipLogic": {
                    "logic": "ANY",
                    "action": "show",
                    "conditions": [
                        {
                            "source": "havePsoriaticArthritis",
                            "trigger": {
                                "value": {
                                    "code": "yes"
                                }
                            }
                        },
                        {
                            "source": "havePsoriaticArthritis",
                            "trigger": {
                                "value": {
                                    "code": "notSure"
                                }
                            }
                        }
                    ]
                },
                "ctrExtension": {
                    "cqtIdCollection": [
                        "2a279d5c-cc80-48c0-a43c-1146f1c66ae3",
                        "658e695d-7db2-4f82-b5aa-766d637447d1",
                        "b34fb706-7691-43ed-8299-707157029b6b",
                        "af6196b0-d34d-4e30-927a-d05e14df6bc1",
                        "c9e0adca-e318-46df-8e40-38bcaffebb25",
                        "def069a9-ba90-4801-853b-f863820a33ef"
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
                "question": "Have you been diagnosed with Psoriasis?",
                "linkId": "havePsoriasis",
                "localQuestionCode": "havePsoriasis",
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
                "ctrExtension": {
                    "cqtIdCollection": [
                        "62a33d29-f81d-4594-ae5b-c7a7a733830a",
                        "d63f3138-7512-4f79-b94a-aeecd3c30cd9",
                        "fb088012-705a-4db4-bbc0-d8bb7a97818c",
                        "1b3cfcf9-3086-49ad-aae4-4cf6dd1d6709",
                        "780f73a9-6ed5-4b2c-ab6d-0138e3a24467",
                        "c7cc6540-918d-4003-b302-395a365ef9d8"
                    ]
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
                "question": "Have you taken any disease modifying anti-rheumatic drugs (DMARDs)? e.g. adalimumab, cyclosporine, leflunomide, hydroxychloroquine, or sulfasalazine.?",
                "linkId": "takeDmards2",
                "localQuestionCode": "takeDmards2",
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
                        "2d8a1ffa-b6bf-4d27-8b93-29333d4fe633",
                        "66cc34e0-5083-4baa-96c2-b56a0f3a2e3d",
                        "c178e767-e8a5-40c1-9841-10f0639fda9e",
                        "0c0c8bf0-b68c-4d44-bb85-e49f6b8db6b7",
                        "384ecaa0-9576-4c2b-8fb7-d2f74c40f647",
                        "944f022f-695d-4b21-80fd-28ca11279b1c",
                        "cf724660-3710-4d53-a720-1f8549ee9c88"
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
                "question": "Do you have inflammatory conditions or autoimmune diseases other than Psoriasis or Psoriatic Arthritis?",
                "linkId": "haveInflaOrAutoImmuneConditionBesidesPsA",
                "localQuestionCode": "haveInflaOrAutoImmuneConditionBesidesPsA",
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
                        "115980ac-a1a4-4f66-bd5a-33dd5ef886fc",
                        "48b59778-7cbb-4880-9770-54bf795ff362",
                        "f6728530-bb92-4d63-832e-563f9e3db603",
                        "406bcfe6-b2e6-489f-81a6-829cf062df0e",
                        "86f83f8e-da31-400b-8970-2a8d5d23e1b0",
                        "8e0259a4-9687-4a01-8d6c-d183e5d31745",
                        "e1f78374-bbfc-49ae-b7a6-5bcf3355c1fe",
                        "ed9d87e0-16e7-48ef-93fc-2edcf6d53a12"
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
                "question": "Do you have a history of cancer?",
                "linkId": "haveCancerHistory",
                "localQuestionCode": "haveCancerHistory",
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
                        "29ab22ab-b487-4862-bb41-43900426c301",
                        "6d2b59f9-f52e-4a3d-bc73-4563c2e5005f",
                        "fd84268a-7b1b-49ba-80a3-3188255d87c4",
                        "1ebc7cd1-e5d1-42d9-9204-86b5652290f0",
                        "7942be35-633c-40ee-a9d5-06305e787626",
                        "f34150ec-d7bb-4087-b3f4-ab1740f06ab1"
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
                "question": "Have you been on or previously taken any biologics? (e.g. secukinumab, ustekinumab)?",
                "linkId": "takeBiologics",
                "localQuestionCode": "takeBiologics",
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
                        "1f1c9066-13cc-463d-b6ef-af0a6618020c",
                        "4acb2d3c-3f1b-4af8-acea-b79887599170",
                        "d78d4c6a-092e-4799-880d-bd39abccb130",
                        "1f6481b5-18ab-4420-afb1-ee7959a6c6fc",
                        "41b53198-f7d6-4373-98c4-3c2efa5f4188",
                        "6c52b96d-737e-4fcc-8a65-656abb64650d",
                        "bbfc5f0f-1899-45c2-9735-36159b198ebd",
                        "fe3f5eb0-1471-443d-b6e8-039a51223f61"
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
                "dataType": "CNE",
                "question": "Are you Chinese?",
                "linkId": "areYouChinese",
                "localQuestionCode": "areYouChinese",
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
                        "127091b4-351e-4c52-95cd-c08c825e813e"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you been treated with more than 3 TNF inhibitors?",
                "linkId": "haveGt3nfInhibitors",
                "localQuestionCode": "haveGt3nfInhibitors",
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
                        "7de29aab-7f78-4379-96d5-4eb73c90525e"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "History of chronic alcohol or drug abuse within 6 months?",
                "linkId": "haveDrugOrAlcoholHistory",
                "localQuestionCode": "haveDrugOrAlcoholHistory",
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
                        "94274dd4-6cb2-4e9d-9c12-c4adf2b43559",
                        "c7274876-c4ef-4019-a809-a5e7b3f8b416"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Do you have an active tuberculosis (TB) infection or at high risk for acquiring TB?",
                "linkId": "haveTuberculosis3",
                "localQuestionCode": "haveTuberculosis3",
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
                        "bb8bcc9c-963c-4458-8403-ea6899c2b590"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Any prior exposure to any Janus Kinase (JAK) inhibitor (including but not limited to ruxolitinib, tofacitinib, baricitinib, and filgotinib)?",
                "linkId": "haveJAKExposure",
                "localQuestionCode": "haveJAKExposure",
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
                        "23b1a2df-192d-4768-b616-8499c547da3c",
                        "8a8ff894-4067-4066-a346-a2ec0b98732a"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you been diagnosed with major depression or have active suicidal ideation?",
                "linkId": "haveDepression",
                "localQuestionCode": "haveDepression",
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
                        "deaf4f75-9322-48f4-8883-2e7002d25d23"
                    ]
                }
            },
            {
                "header": false,
                "dataType": "CNE",
                "question": "Have you been diagnosed with fibromyalgia?",
                "linkId": "haveFibromyalgia",
                "localQuestionCode": "haveFibromyalgia",
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
                        "35d8ea7a-80cb-4005-aafb-b7b7b7db123f",
                        "47d53bef-a67d-4d00-8516-e70ff4866f29"
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
                "dataType": "CNE",
                "question": "Are you Chinese?",
                "linkId": "areYouChinese",
                "localQuestionCode": "areYouChinese",
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
                        "127091b4-351e-4c52-95cd-c08c825e813e"
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
                "question": "Have you been treated with more than 3 TNF inhibitors?",
                "linkId": "haveGt3nfInhibitors",
                "localQuestionCode": "haveGt3nfInhibitors",
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
                        "7de29aab-7f78-4379-96d5-4eb73c90525e"
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
                "question": "History of chronic alcohol or drug abuse within 6 months?",
                "linkId": "haveDrugOrAlcoholHistory",
                "localQuestionCode": "haveDrugOrAlcoholHistory",
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
                        "94274dd4-6cb2-4e9d-9c12-c4adf2b43559",
                        "c7274876-c4ef-4019-a809-a5e7b3f8b416"
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
                "question": "Do you have an active tuberculosis (TB) infection or at high risk for acquiring TB?",
                "linkId": "haveTuberculosis3",
                "localQuestionCode": "haveTuberculosis3",
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
                        "bb8bcc9c-963c-4458-8403-ea6899c2b590"
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
                "question": "Any prior exposure to any Janus Kinase (JAK) inhibitor (including but not limited to ruxolitinib, tofacitinib, baricitinib, and filgotinib)?",
                "linkId": "haveJAKExposure",
                "localQuestionCode": "haveJAKExposure",
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
                        "23b1a2df-192d-4768-b616-8499c547da3c",
                        "8a8ff894-4067-4066-a346-a2ec0b98732a"
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
                "question": "Have you been diagnosed with major depression or have active suicidal ideation?",
                "linkId": "haveDepression",
                "localQuestionCode": "haveDepression",
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
                        "deaf4f75-9322-48f4-8883-2e7002d25d23"
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
                "question": "Have you been diagnosed with fibromyalgia?",
                "linkId": "haveFibromyalgia",
                "localQuestionCode": "haveFibromyalgia",
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
                        "35d8ea7a-80cb-4005-aafb-b7b7b7db123f",
                        "47d53bef-a67d-4d00-8516-e70ff4866f29"
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
            "id": "7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad",
            "name": "Psoriatic Arthritis1",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 1"
            },
            "nctNumber": "NCT04632927",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must not be pregnant or nursing</li><li><span class=\"neutral-img\"></span>Must not participate on other ongoing trials</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Must have had Psoriatic Arthritis for at least 6 months</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>No history of taking biologics</li><li><span class=\"neutral-img\"></span>No history of chronic alcohol or drug abuse</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "fe0a47ad-bd5b-4f36-a525-28209ad55522",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "485a1939-b5cc-476b-b055-3e481ace315e",
                "name": "Clinic of Madrid",
                "address": {
                    "id": "eb29c313-3c82-4727-b76d-ae1094b762a9",
                    "street": "Calle de Clínica",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "c45477d1-746d-439b-995c-7b992df23b7e",
                        "description": "Universidad Complutense de Madrid: Clínica Universitaria De Podologia, Madrid, Spain",
                        "latitude": 40.445888890823426,
                        "longitude": -3.725804555613209,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "d9c81fc0-f054-4401-994a-e7a9a1f76500",
                "name": "Novartis",
                "logo": "/assets/mah/novartis/logo_h165px.png"
            },
            "travDistMiles": 391.518468535528
        },
        {
            "id": "90646dda-d562-4c5c-b992-b5732d44943f",
            "name": "Psoriatic Arthritis2",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 2"
            },
            "nctNumber": "NCT04209205",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Must have Active or Previous history of Psoriasis</li><li><span class=\"neutral-img\"></span>No other autoimmune disorder besides PsA</li><li><span class=\"neutral-img\"></span>No history of taking biologics</li><li><span class=\"neutral-img\"></span>Must not have been treated with more than 3 different TNF inhibitors</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "374f1ab9-dfd2-4e43-81e2-20a295c88190",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "ae9a529f-f070-4cce-8d8a-50fa1a4ade56",
                "name": "University of Madrid Hospital",
                "address": {
                    "id": "d2536458-c62d-4ca5-a548-624fb918cdce",
                    "street": "Calle de Universidad",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "70d1c3f8-8d4c-4798-b6f5-c41e5335f171",
                        "description": "Facultad de Ciencias Biológicas, Madrid, Spain",
                        "latitude": 40.449037404991415,
                        "longitude": -3.7267666668236923,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "d9c81fc0-f054-4401-994a-e7a9a1f76500",
                "name": "Novartis",
                "logo": "/assets/mah/novartis/logo_h165px.png"
            },
            "travDistMiles": 391.51948786280127
        },
        {
            "id": "1ca49499-df7e-42d5-a13e-6a05ebee96be",
            "name": "Psoriatic Arthritis3",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 3"
            },
            "nctNumber": "NCT03896581",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must not be pregnant or nursing</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Must not have Active or Previous history of Psoriasis</li><li><span class=\"neutral-img\"></span>No other inflammatory conditions</li><li><span class=\"neutral-img\"></span>No cancer history</li><li><span class=\"neutral-img\"></span>No history of taking biologics</li><li><span class=\"neutral-img\"></span>No history of chronic alcohol or drug abuse</li><li><span class=\"neutral-img\"></span>No major depression diagnosis</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "7633c017-e936-4bb0-a4fc-b304cbc73ab5",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
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
                "id": "c1a9e128-e490-4c2f-b95d-dc69c6fd9a47",
                "name": "UCB",
                "logo": "/assets/mah/ucb/logo_h165px.png"
            },
            "travDistMiles": 1.5955951353620423
        },
        {
            "id": "01f1c1b4-be85-4d10-bb07-7741faae59eb",
            "name": "Psoriatic Arthritis4",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 4"
            },
            "nctNumber": "NCT03895203",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must not be pregnant or nursing</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>No cancer history</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>No history of taking biologics</li><li><span class=\"neutral-img\"></span>No active tuberculosis (TB) infection</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "8fd3e2d4-b978-4969-9a32-dc1e9609b512",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "ae9a529f-f070-4cce-8d8a-50fa1a4ade56",
                "name": "University of Madrid Hospital",
                "address": {
                    "id": "d2536458-c62d-4ca5-a548-624fb918cdce",
                    "street": "Calle de Universidad",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "70d1c3f8-8d4c-4798-b6f5-c41e5335f171",
                        "description": "Facultad de Ciencias Biológicas, Madrid, Spain",
                        "latitude": 40.449037404991415,
                        "longitude": -3.7267666668236923,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "c1a9e128-e490-4c2f-b95d-dc69c6fd9a47",
                "name": "UCB",
                "logo": "/assets/mah/ucb/logo_h165px.png"
            },
            "travDistMiles": 391.51948786280127
        },
        {
            "id": "f6792fa1-c2a4-4f93-be06-2558ad4a00b7",
            "name": "Psoriatic Arthritis5",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 5"
            },
            "nctNumber": "NCT03486457",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Must not have Active or Previous history of Psoriasis</li><li><span class=\"neutral-img\"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>Chinese patient</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "523a27cd-b38a-4948-a8c6-bf2877bcc4c3",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "951a89d9-261c-44aa-8275-383c1e5efbb8",
                "name": "Madrid General Hospital",
                "address": {
                    "id": "06708aa7-da3e-43f6-a739-d0e605022c6b",
                    "street": "Calle de Hospital",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "0f9db45c-99ae-4914-9f92-13c2c81963ec",
                        "description": "HM Hospital Universitario Madrid, Spain",
                        "latitude": 40.43492500775357,
                        "longitude": -3.7069217709132576,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "8f0759f0-357f-499f-86f1-db6486f72759",
                "name": "Pfizer",
                "logo": "/assets/mah/pfizer/logo_h165px.png"
            },
            "travDistMiles": 392.54152262432257
        },
        {
            "id": "9ea9bd15-8062-4e53-a90b-5ee927b849c0",
            "name": "Psoriatic Arthritis6",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 6"
            },
            "nctNumber": "NCT03675308",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Active diagnosis within 6 months</li><li><span class=\"neutral-img\"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>No cancer history</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>No history of taking biologics</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "8de1bbd5-3d7d-49a4-8b07-bda27ddf3a9a",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "485a1939-b5cc-476b-b055-3e481ace315e",
                "name": "Clinic of Madrid",
                "address": {
                    "id": "eb29c313-3c82-4727-b76d-ae1094b762a9",
                    "street": "Calle de Clínica",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "c45477d1-746d-439b-995c-7b992df23b7e",
                        "description": "Universidad Complutense de Madrid: Clínica Universitaria De Podologia, Madrid, Spain",
                        "latitude": 40.445888890823426,
                        "longitude": -3.725804555613209,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "214a7e0b-ced3-475c-945c-94981a92fef0",
                "name": "Abbvie",
                "logo": "/assets/mah/abbvie/logo_h165px.png"
            },
            "travDistMiles": 391.518468535528
        },
        {
            "id": "05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5",
            "name": "Psoriatic Arthritis7",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 7"
            },
            "nctNumber": "NCT03104374",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>Must have other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>No cancer history</li><li><span class=\"neutral-img\"></span>No prior exposure to any Janus Kinase inhbitor</li><li><span class=\"neutral-img\"></span>No fibromyalgia diagnosis</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "d441593b-3687-477e-a446-5d7b165bb45e",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "485a1939-b5cc-476b-b055-3e481ace315e",
                "name": "Clinic of Madrid",
                "address": {
                    "id": "eb29c313-3c82-4727-b76d-ae1094b762a9",
                    "street": "Calle de Clínica",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "c45477d1-746d-439b-995c-7b992df23b7e",
                        "description": "Universidad Complutense de Madrid: Clínica Universitaria De Podologia, Madrid, Spain",
                        "latitude": 40.445888890823426,
                        "longitude": -3.725804555613209,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "214a7e0b-ced3-475c-945c-94981a92fef0",
                "name": "Abbvie",
                "logo": "/assets/mah/abbvie/logo_h165px.png"
            },
            "travDistMiles": 391.518468535528
        },
        {
            "id": "62293111-a28f-4663-826b-88581640a18d",
            "name": "Psoriatic Arthritis8",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 8"
            },
            "nctNumber": "NCT03104400",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Must have PsA symptoms for at least 6 months</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>No cancer history</li><li><span class=\"neutral-img\"></span>No prior exposure to any Janus Kinase inhbitor</li><li><span class=\"neutral-img\"></span>No fibromyalgia diagnosis</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "e11f9665-dd22-408d-b309-1c514f5a4811",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
                    }
                }
            ],
            "clinicalSite": {
                "id": "951a89d9-261c-44aa-8275-383c1e5efbb8",
                "name": "Madrid General Hospital",
                "address": {
                    "id": "06708aa7-da3e-43f6-a739-d0e605022c6b",
                    "street": "Calle de Hospital",
                    "country": {
                        "code": "ES",
                        "name": "Spain"
                    },
                    "location": {
                        "id": "0f9db45c-99ae-4914-9f92-13c2c81963ec",
                        "description": "HM Hospital Universitario Madrid, Spain",
                        "latitude": 40.43492500775357,
                        "longitude": -3.7069217709132576,
                        "center": false
                    }
                }
            },
            "sponsor": {
                "id": "214a7e0b-ced3-475c-945c-94981a92fef0",
                "name": "Abbvie",
                "logo": "/assets/mah/abbvie/logo_h165px.png"
            },
            "travDistMiles": 392.54152262432257
        },
        {
            "id": "d4228287-2707-46a7-9a7c-5f874d375921",
            "name": "Psoriatic Arthritis9",
            "description": "Psoriatic Arthritis",
            "keySsi": "BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7",
            "dsuData": {
                "extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 9"
            },
            "nctNumber": "NCT03671148",
            "purpose": null,
            "phase": null,
            "timeCommitment": null,
            "physicalCommitment": null,
            "travelStipends": null,
            "eligibilityCriteria": "<ul class=\"eligibilitycriteria-group\"><li><span class=\"neutral-img\"></span>Must be 18 or older</li><li><span class=\"neutral-img\"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class=\"neutral-img\"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class=\"neutral-img\"></span>Must have other autoimmune or inflammatory disorder besides PsA</li><li><span class=\"neutral-img\"></span>No cancer history</li></ul>",
            "status": {
                "code": "REC",
                "description": "Recruitment"
            },
            "clinicalTrialMedicalConditions": [
                {
                    "id": "a8348d85-32bb-47b1-9d34-eec2834d2e1b",
                    "ordering": 1000,
                    "medicalCondition": {
                        "code": "101000",
                        "name": "Psoriatic arthritis"
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
                "id": "214a7e0b-ced3-475c-945c-94981a92fef0",
                "name": "Abbvie",
                "logo": "/assets/mah/abbvie/logo_h165px.png"
            },
            "travDistMiles": 1.5955951353620423
        }
    ],
    "submittedOn": "2021-08-31T08:32:55.332Z",
    "constKeySSIStr": "ssi:array:ctr:Btrk3sjKVbHyS8bLKqCaRLMutnpJhJDxcGw39k7TpbRt::v0"
};

module.exports = {
    MATCH_REQUEST_EXAMPLE
};