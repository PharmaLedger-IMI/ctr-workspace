const LOINC_PHR = {
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
};

module.exports = {
    LOINC_PHR
}