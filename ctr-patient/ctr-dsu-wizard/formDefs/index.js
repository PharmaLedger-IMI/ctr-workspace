const GHI = {
    "shortName": "ghi",
    "name": "General Health Information",
    "status": "active",
    "version": "0.6.1",
    "experimental": true,
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
            "editable": "1"
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
                },
                {
                    "text": "Not sure",
                    "code": "notSure",
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
            "dataType": "REAL",
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
            ]
        },
        {
            "header": false,
            "dataType": "REAL",
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
            ]
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
                },
                {
                    "text": "Not sure",
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
                },
                {
                    "text": "Not sure",
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
                    "text": "Not sure",
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
                    "text": "Not sure",
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
                    "text": "Not sure",
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
                    "text": "Not sure",
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
            }
        }
    ]
};

const TRIAL_PREFS = {
    "shortName": "trialPrefs",
    "name": "Trial Preferences",
    "status": "active",
    "version": "0.4.2",
    "experimental": true,
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
            "externallyDefined": "https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/medicalconditions"
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
            "externallyDefined": "https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/locations"
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
    ]
};


const TRIAL = {
    "shortName": "trial",
    "name": "Trial Specific Questions",
    "status": "active",
    "version": "0.3.6",
    "experimental": true,
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
            }
        }
    ]
};

const CONDITION = {
    "shortName": "condition",
    "name": "Condition Specific Questions",
    "status": "active",
    "version": "0.3.3",
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
            }
        }
    ]
};

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
            "question": "Are you participating on any ongoing trials?",
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
            }
        }
    ]
};


module.exports = {
    GHI,
    TRIAL_PREFS,
    CONDITION,
    TRIAL,
    LOINC_PHR
}