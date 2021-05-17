const LOINC_PHR = {
    "lformsVersion": "29.0.0",
    "PATH_DELIMITER": "/",
    "code": "phi",
    "codeList": [
        {
            "code": "phi",
            "display": "Your Personal Health Information"
        }
    ],
    "version": "0.2.7",
    "identifier": null,
    "name": "Personal Health Information",
    "type": "Custom",
    "template": "table",
    "items": [
        {
            "header": true,
            "question": "General Health Information",
            "linkId": "ghi",
            "questionCode": "ghi",
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "editable": "1",
            "items": [
                {
                    "header": false,
                    "dataType": "DT",
                    "question": "What is your birth date?",
                    "linkId": "birthDate",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "editable": "1"
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "What is your gender?",
                    "linkId": "gender",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "REAL",
                    "question": "What is your height?",
                    "linkId": "height",
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
                    ]
                },
                {
                    "header": false,
                    "dataType": "REAL",
                    "question": "What is your weight?",
                    "linkId": "weight",
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
                            "name": "kg"
                        },
                        {
                            "name": "[lb_av]"
                        }
                    ]
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Are you participating on any ongoing trials ?",
                    "linkId": "ongoingTrials",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Are you or a partner currently trying to have a child?",
                    "linkId": "tryingHaveChild",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Do you have HIV ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you experienced acute heart failure or do you have any severe cardiac conditions ?",
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
                    }
                }
            ]
        },
        {
            "header": true,
            "question": "Condition Specific Questions",
            "linkId": "/undefined",
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "editable": "1",
            "items": [
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you being diagnosed with rheumathoid arthritis ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Are you taking methotrexate or have you taken it in the last 12 months ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you taken any disease modifying anti-rheumatic drugs (DMARDs) ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Do you have a history of kidney or liver disease ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you active or latent tuberculosis ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you taken oral antibioctics ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you being diagnosed with any autoimmune diseases besides rheumathoid arthritis ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Have you being diagnosed with any neurological diseases ?",
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
                    }
                }
            ]
        },
        {
            "header": true,
            "question": "Trial Specific Questions",
            "linkId": "/undefined",
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "editable": "1",
            "items": [
                {
                    "header": false,
                    "dataType": "TITLE",
                    "question": "Clinical Trial: Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate",
                    "linkId": "/undefined/undefined",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "editable": "1"
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Do you smoke cigarrettes ?",
                    "linkId": "smoker",
                    "localQuestionCode": "smoker",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Are you claustrophobic ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "TITLE",
                    "question": "Clinical Trial: Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate",
                    "linkId": "/undefined/undefined",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Do you have a sensitivity to adalimuamab ?",
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
                    }
                },
                {
                    "header": false,
                    "dataType": "CNE",
                    "question": "Has your rheumatoid arthritis gone into remission in the last 6 months ?",
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
                    }
                }
            ]
        },
        {
            "header": true,
            "question": "Technical Tests - To Be Removed",
            "linkId": "/undefined",
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "editable": "1",
            "items": [
                {
                    "header": false,
                    "dataType": "ST",
                    "question": "Multiple answers test",
                    "linkId": "testId",
                    "questionCode": "testCode",
                    "questionCardinality": {
                        "min": "1",
                        "max": "*"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "editable": "1"
                }
            ]
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
        "allowHTMLInInstructions": true,
        "useAnimation": true,
        "displayControl": {
            "questionLayout": "vertical"
        },
        "viewMode": "auto",
        "showFormHeader": false,
        "showColumnHeaders": false,
        "defaultAnswerLayout": {
            "answerLayout": {
                "type": "COMBO_BOX",
                "columns": "0"
            }
        },
        "useTreeLineStyle": false,
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
    "extension": [],
    "hasSavedData": true
};

module.exports = {
    LOINC_PHR
}