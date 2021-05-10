const LOINC_PHR = {
    "lformsVersion": "29.0.0",
    "PATH_DELIMITER": "/",
    "code": "phr",
    "codeList": [
        {
            "code": "phr",
            "display": "Personal Health Record"
        }
    ],
    "identifier": null,
    "name": "Personal Health Record",
    "type": "Custom",
    "template": "table",
    "items": [
        {
            "question": "Medical Conditions",
            "questionCode": "conditions",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Medical condition",
                    "questionCode": "condition",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": null,
                    "externallyDefined": "https://clinicaltables.nlm.nih.gov/api/conditions/v3/search",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "30%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/conditions/condition",
                    "codeList": [
                        {
                            "code": "condition",
                            "display": "Medical condition",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Status",
                    "questionCode": "cond_status",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CNE",
                    "answers": [
                        {
                            "text": "Active",
                            "code": "A",
                            "label": null,
                            "score": null
                        },
                        {
                            "text": "Inactive",
                            "code": "I",
                            "label": null,
                            "score": null
                        }
                    ],
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "8%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/conditions/cond_status",
                    "codeList": [
                        {
                            "code": "cond_status",
                            "display": "Status",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Started",
                    "questionCode": "cond_started",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/conditions/cond_started",
                    "codeList": [
                        {
                            "code": "cond_started",
                            "display": "Started",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Stopped",
                    "questionCode": "cond_stopped",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/conditions/cond_stopped",
                    "codeList": [
                        {
                            "code": "cond_stopped",
                            "display": "Stopped",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Description/Comment",
                    "questionCode": "cond_comment",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "TX",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "40%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/conditions/cond_comment",
                    "codeList": [
                        {
                            "code": "cond_comment",
                            "display": "Description/Comment",
                            "system": "Custom"
                        }
                    ]
                }
            ],
            "questionCodeSystem": "Custom",
            "linkId": "/conditions",
            "codeList": [
                {
                    "code": "conditions",
                    "display": "Medical Conditions",
                    "system": "Custom"
                }
            ]
        },
        {
            "question": "Medications",
            "questionCode": "medications",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Medication name",
                    "questionCode": "med_name",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "externallyDefined": "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": null,
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "16%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_name",
                    "codeList": [
                        {
                            "code": "med_name",
                            "display": "Medication name",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Status",
                    "questionCode": "med_status",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CNE",
                    "answers": [
                        {
                            "text": "Active",
                            "code": "A",
                            "label": null,
                            "score": null
                        },
                        {
                            "text": "Stopped",
                            "code": "S",
                            "label": null,
                            "score": null
                        }
                    ],
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "8%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_status",
                    "codeList": [
                        {
                            "code": "med_status",
                            "display": "Status",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Strength",
                    "questionCode": "med_strength",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": [],
                    "dataControl": [
                        {
                            "source": {
                                "sourceType": "INTERNAL",
                                "sourceLinkId": "/medications/med_name"
                            },
                            "construction": "ARRAY",
                            "dataFormat": {
                                "code": "value.data.RXCUIS",
                                "text": "value.data.STRENGTHS_AND_FORMS"
                            },
                            "onAttribute": "answers"
                        }
                    ],
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "15%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_strength",
                    "codeList": [
                        {
                            "code": "med_strength",
                            "display": "Strength",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Instructions",
                    "questionCode": "med_instructions",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "TX",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "15%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_instructions",
                    "codeList": [
                        {
                            "code": "med_instructions",
                            "display": "Instructions",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Started",
                    "questionCode": "med_started",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_started",
                    "codeList": [
                        {
                            "code": "med_started",
                            "display": "Started",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Stopped",
                    "questionCode": "med_stopped",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_stopped",
                    "codeList": [
                        {
                            "code": "med_stopped",
                            "display": "Stopped",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Why stopped",
                    "questionCode": "med_why_stopped",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": [
                        {
                            "code": "STP-1",
                            "text": "Finished the prescription"
                        },
                        {
                            "code": "STP-2",
                            "text": "Dose change"
                        },
                        {
                            "code": "STP-3",
                            "text": "Problem gone"
                        },
                        {
                            "code": "STP-4",
                            "text": "Replaced by better drug"
                        },
                        {
                            "code": "STP-5",
                            "text": "Could not tolerate side effects"
                        },
                        {
                            "code": "STP-6",
                            "text": "Didn't work"
                        },
                        {
                            "code": "STP-7",
                            "text": "Allergy"
                        },
                        {
                            "code": "STP-8",
                            "text": "Too expensive"
                        },
                        {
                            "code": "STP-9",
                            "text": "Not covered by insurance"
                        },
                        {
                            "code": "STP-10",
                            "text": "I don't know"
                        }
                    ],
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "15%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_why_stopped",
                    "codeList": [
                        {
                            "code": "med_why_stopped",
                            "display": "Why stopped",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Resupply",
                    "questionCode": "med_resupply",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/medications/med_resupply",
                    "codeList": [
                        {
                            "code": "med_resupply",
                            "display": "Resupply",
                            "system": "Custom"
                        }
                    ]
                }
            ],
            "questionCodeSystem": "Custom",
            "linkId": "/medications",
            "codeList": [
                {
                    "code": "medications",
                    "display": "Medications",
                    "system": "Custom"
                }
            ]
        },
        {
            "question": "Allergies and Other Dangerous Reactions",
            "questionCode": "allergies",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Name",
                    "questionCode": "allergy_name",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": [
                        {
                            "code": "food",
                            "text": "Food allergies"
                        },
                        {
                            "code": "FOOD-2",
                            "text": "Chocolate",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.mayoclinic.com/health/food-allergy/DS00082"
                        },
                        {
                            "code": "FOOD-22",
                            "text": "Crab",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/shellfish-allergy"
                        },
                        {
                            "code": "FOOD-4",
                            "text": "Egg",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/egg-allergy"
                        },
                        {
                            "code": "FOOD-5",
                            "text": "Fish",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/fish-allergy"
                        },
                        {
                            "code": "FOOD-7",
                            "text": "Gluten",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/wheat-allergy"
                        },
                        {
                            "code": "FOOD-19",
                            "text": "Milk",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/page/milk-allergy"
                        },
                        {
                            "code": "FOOD-16",
                            "text": "Monosodium Glutamate (MSG)",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/001126.htm"
                        },
                        {
                            "code": "FOOD-9",
                            "text": "Peanut",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/peanut-allergy"
                        },
                        {
                            "code": "FOOD-10",
                            "text": "Pork",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/other-allergens"
                        },
                        {
                            "code": "FOOD-18",
                            "text": "Sesame",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/other-allergens"
                        },
                        {
                            "code": "FOOD-12",
                            "text": "Shellfish",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/shellfish-allergy"
                        },
                        {
                            "code": "FOOD-21",
                            "text": "Shrimp",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/shellfish-allergy"
                        },
                        {
                            "code": "FOOD-13",
                            "text": "Soy",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/soy-allergy"
                        },
                        {
                            "code": "FOOD-14",
                            "text": "Tomatoes",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/other-allergens"
                        },
                        {
                            "code": "FOOD-17",
                            "text": "Tree Nuts",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/tree-nut-allergy"
                        },
                        {
                            "code": "FOOD-20",
                            "text": "Wheat",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.foodallergy.org/allergens/wheat-allergy"
                        },
                        {
                            "code": "FOOD-23",
                            "text": "Cochineal extract (Carmine) red dye",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000817.htm"
                        },
                        {
                            "code": "FOOD-24",
                            "text": "FD&C Blue No. 1 dye",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000817.htm"
                        },
                        {
                            "code": "FOOD-25",
                            "text": "FD&C Yellow No. 2 dye",
                            "parentAnswerCode": "food",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000817.htm"
                        },
                        {
                            "code": "environmental",
                            "text": "Environmental allergies"
                        },
                        {
                            "code": "OTHR-18",
                            "text": "Cat",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/pet-allergy/DS00859"
                        },
                        {
                            "code": "OTHR-4",
                            "text": "Cockroach",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.aafa.org/display.cfm?id=9&sub=22&cont=312"
                        },
                        {
                            "code": "OTHR-5",
                            "text": "Cold Weather",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/cold-urticaria/DS01160"
                        },
                        {
                            "code": "OTHR-17",
                            "text": "Dog",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/pet-allergy/DS00859"
                        },
                        {
                            "code": "OTHR-6",
                            "text": "Dust Mites",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/dust-mites/DS00842"
                        },
                        {
                            "code": "OTHR-7",
                            "text": "Hay Fever",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/hayfever.html"
                        },
                        {
                            "code": "OTHR-1",
                            "text": "Iodinated x-ray contrast",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "OTHR-2",
                            "text": "Latex",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/latexallergy.html"
                        },
                        {
                            "code": "OTHR-8",
                            "text": "Mold",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/mold-allergy/DS00773"
                        },
                        {
                            "code": "OTHR-9",
                            "text": "Nickel",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/nickel-allergy/DS00826"
                        },
                        {
                            "code": "OTHR-10",
                            "text": "Pet Dander",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/pet-allergy/DS00859"
                        },
                        {
                            "code": "OTHR-19",
                            "text": "Pollen",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/hayfever.html"
                        },
                        {
                            "code": "OTHR-11",
                            "text": "Ragweed",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.aafa.org/display.cfm?id=9&sub=19&cont=267"
                        },
                        {
                            "code": "OTHR-12",
                            "text": "Semen",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/semen-allergy/AN01225"
                        },
                        {
                            "code": "OTHR-13",
                            "text": "Sun",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.mayoclinic.com/health/sun-allergy/DS01178"
                        },
                        {
                            "code": "OTHR-3",
                            "text": "Wasp, hornet, bee sting",
                            "parentAnswerCode": "environmental",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000033.htm"
                        },
                        {
                            "code": "medClass",
                            "text": "Medication class allergies"
                        },
                        {
                            "code": "DRUG-CLASS-1",
                            "text": "ACE Inhibitors",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-2",
                            "text": "Aminoglycosides",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-3",
                            "text": "Antihistamines",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-4",
                            "text": "Benzodiazepines",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-5",
                            "text": "Beta Blockers",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-6",
                            "text": "Calcium Channel Blockers",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-7",
                            "text": "Cephalosporins",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "DRUG-CLASS-8",
                            "text": "Diuretics",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-9",
                            "text": "H2 Blockers",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-10",
                            "text": "Insulins",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "DRUG-CLASS-11",
                            "text": "Iodine Containing Medications",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "DRUG-CLASS-12",
                            "text": "Local Anesthetics",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-13",
                            "text": "Macrolides (like Erythromycin)",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "DRUG-CLASS-14",
                            "text": "Muscle Relaxants, Skeletal",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-15",
                            "text": "Narcotic Analgesics",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-16",
                            "text": "Nonsteroidal Anti Inflam. Agents (NSAID)",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.mayoclinic.com/health/aspirin-allergy/AN01467/METHOD=print"
                        },
                        {
                            "code": "DRUG-CLASS-24",
                            "text": "Penicillin and Derivatives",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.mayoclinic.com/print/penicillin-allergy/DS00620/DSECTION=all&METHOD=print"
                        },
                        {
                            "code": "DRUG-CLASS-17",
                            "text": "Phenothiazines",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-18",
                            "text": "Proton Pump Inhibitors",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-19",
                            "text": "Quinolone Antibiotics",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "DRUG-CLASS-20",
                            "text": "Serotonin Re-Uptake Inhibitors",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-21",
                            "text": "Statins",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "DRUG-CLASS-22",
                            "text": "Sulfa Drugs",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.mayoclinic.com/health/sulfa-allergy/AN01565/METHOD=print"
                        },
                        {
                            "code": "DRUG-CLASS-23",
                            "text": "Tetracycline",
                            "parentAnswerCode": "medClass",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "medication",
                            "text": "Medication allergies"
                        },
                        {
                            "code": "MED-57",
                            "text": "ALEVE (Naproxen)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/health/aspirin-allergy/AN01467/METHOD=print"
                        },
                        {
                            "code": "MED-2",
                            "text": "AMBIEN (Zolpedem)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-97",
                            "text": "Amoxicillin",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/print/penicillin-allergy/DS00620/DSECTION=all&METHOD=print"
                        },
                        {
                            "code": "MED-6",
                            "text": "Aspirin (ASA)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/health/aspirin-allergy/AN01467/METHOD=print"
                        },
                        {
                            "code": "MED-7",
                            "text": "ATIVAN  (Lorazapam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-8",
                            "text": "ATROVENT  (Ipartropium)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-55",
                            "text": "AVINZA (Morphine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-9",
                            "text": "Bacitracin",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-10",
                            "text": "BACTRIM  (Sulfamethoxazol/trimethaprim)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/health/sulfa-allergy/AN01565/METHOD=print"
                        },
                        {
                            "code": "MED-11",
                            "text": "BENADRYL  (Diphenhydramine )",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-13",
                            "text": "BUMEX  (Bumetanide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-16",
                            "text": "CARDIZEM  (Diltizzam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-99",
                            "text": "CEFZIL (Cefprozil)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-18",
                            "text": "CIPROFLOXACIN  (Cipro)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-19",
                            "text": "Codeine",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-20",
                            "text": "COLACE (Docusate Sodium)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-21",
                            "text": "COMPAZINE (Prochlorperazine Maleate)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-22",
                            "text": "COUMADIN (Warfarin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-23",
                            "text": "DALMANE  (Flurazepam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-52",
                            "text": "DEMEROL (Meperidine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-88",
                            "text": "DEPAKOTE ER (Valproic Acid)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-26",
                            "text": "DILANTIN (Phenytoin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-28",
                            "text": "DULCOLAX (Bisacodyl)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-29",
                            "text": "E-MYCIN (Erythromycin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-30",
                            "text": "GASTROGRAFIN(Diatrizoate Meglumine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-31",
                            "text": "GLUCOPHAGE (Metformin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-32",
                            "text": "HALCION (Triazolam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-33",
                            "text": "HALDOL (Haloperidol)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-35",
                            "text": "HUMALIN (human insulin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-37",
                            "text": "IMDUR (Isosorbide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-64",
                            "text": "ISONIAZID (Isoniazide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-41",
                            "text": "KAYEVELATE (Sodium Polystyrene Sulfonate)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-42",
                            "text": "KLONOPIN (Clonazepam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-43",
                            "text": "Lactose",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000276.htm"
                        },
                        {
                            "code": "MED-44",
                            "text": "LASIX (Furosemide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-45",
                            "text": "LEVAQUIN (Levofloxacin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-46",
                            "text": "LIBRIUM (Chlordiazepoxide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-47",
                            "text": "Lidocaine, Local",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-48",
                            "text": "LIPITOR (Atorvastatin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-49",
                            "text": "LOPRESSOR (Metroprolol)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-50",
                            "text": "LOVENOX (Enoxaparin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-51",
                            "text": "MELLARIL (Thioridazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-36",
                            "text": "MOTRIN/ADVIL (Ibuprofen)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/health/aspirin-allergy/AN01467/METHOD=print"
                        },
                        {
                            "code": "MED-59",
                            "text": "NORVASC (Amlodipine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-98",
                            "text": "OMNICEF (Cefdinir)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-96",
                            "text": "Penicillin",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/print/penicillin-allergy/DS00620/DSECTION=all&METHOD=print"
                        },
                        {
                            "code": "MED-61",
                            "text": "PEPCID (Famotidine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-62",
                            "text": "PERMITIL (Fluphenazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-65",
                            "text": "PLAVIX (Clopidogrel)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-67",
                            "text": "PREVACID (Lansoprazole)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-68",
                            "text": "PROLIXIN (Fluphenazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-70",
                            "text": "REGLAN (Metoclopramide)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-71",
                            "text": "RESTORIL (Temazepam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-53",
                            "text": "ROBAXIN (Methocarbamol)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-72",
                            "text": "SENOKOT (Senna)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-73",
                            "text": "SERAX (Oxazepam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-74",
                            "text": "SERENTIL (Mesoridazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-66",
                            "text": "SLOW-K (Potassium)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-75",
                            "text": "SOLU MEDROL (Methylprednisolone )",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-77",
                            "text": "STELAZINE (Trifluoperazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-79",
                            "text": "SYNTHROID (Thyroxin)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-15",
                            "text": "TEGRETOL (Carbamazepine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-82",
                            "text": "THORAZINE (Chlorpromazine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-83",
                            "text": "TOPROL (Metoprolol)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-84",
                            "text": "TRANXENE (Clorazepate)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-85",
                            "text": "TRILAFON (Perphenazie)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-86",
                            "text": "TYLENOL (Acetaminophen)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.mayoclinic.com/health/aspirin-allergy/AN01467/METHOD=print"
                        },
                        {
                            "code": "MED-25",
                            "text": "VALIUM (Diastat)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-87",
                            "text": "VALIUM (Diazepam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-89",
                            "text": "VASOTEC (Enalapril)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-90",
                            "text": "VITAMIN K1 (Phytonadione)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-91",
                            "text": "XANAX (Alprazolam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-92",
                            "text": "ZAROXOLYN (Metolazone)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-93",
                            "text": "ZOLOFT (Sertraline)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        },
                        {
                            "code": "MED-94",
                            "text": "ZOSYN (Piperacillin/Tazobactam)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/ency/article/000819.htm"
                        },
                        {
                            "code": "MED-95",
                            "text": "ZYPREXA (Olanzapine)",
                            "parentAnswerCode": "medication",
                            "infoLink": "http://www.nlm.nih.gov/medlineplus/drugreactions.html"
                        }
                    ],
                    "displayControl": {
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/allergies/allergy_name",
                    "codeList": [
                        {
                            "code": "allergy_name",
                            "display": "Name",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Reaction",
                    "questionCode": "allergy_reaction",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": [
                        {
                            "code": "AL-REACT-19",
                            "text": "Anaphylaxis"
                        },
                        {
                            "code": "AL-REACT-1",
                            "text": "Stomach cramps and/or pain"
                        },
                        {
                            "code": "AL-REACT-5",
                            "text": "Diarrhea and/or vomiting"
                        },
                        {
                            "code": "AL-REACT-13",
                            "text": "Lip, tongue and/or throat swelling"
                        },
                        {
                            "code": "AL-REACT-21",
                            "text": "Eye swelling, itching and/or watering"
                        },
                        {
                            "code": "AL-REACT-4",
                            "text": "Coughing and/or wheezing"
                        },
                        {
                            "code": "AL-REACT-6",
                            "text": "Trouble breathing"
                        },
                        {
                            "code": "AL-REACT-15",
                            "text": "Sneezing or stuffy nose"
                        },
                        {
                            "code": "AL-REACT-9",
                            "text": "Hives and/or itching"
                        },
                        {
                            "code": "AL-REACT-20",
                            "text": "Eczema or other rash"
                        },
                        {
                            "code": "AL-REACT-23",
                            "text": "Loss of consciousness"
                        },
                        {
                            "code": "AL-REACT-11",
                            "text": "Confusion"
                        },
                        {
                            "code": "AL-REACT-7",
                            "text": "Dizziness"
                        },
                        {
                            "code": "AL-REACT-25",
                            "text": "Rapid pulse"
                        },
                        {
                            "code": "AL-REACT-8",
                            "text": "Headache"
                        }
                    ],
                    "displayControl": {
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/allergies/allergy_reaction",
                    "codeList": [
                        {
                            "code": "allergy_reaction",
                            "display": "Reaction",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Started",
                    "questionCode": "allergy_started",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/allergies/allergy_started",
                    "codeList": [
                        {
                            "code": "allergy_started",
                            "display": "Started",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Comment",
                    "questionCode": "allergy_comment",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "linkId": "/allergies/allergy_comment",
                    "codeList": [
                        {
                            "code": "allergy_comment",
                            "display": "Comment",
                            "system": "Custom"
                        }
                    ]
                }
            ],
            "questionCodeSystem": "Custom",
            "linkId": "/allergies",
            "codeList": [
                {
                    "code": "allergies",
                    "display": "Allergies and Other Dangerous Reactions",
                    "system": "Custom"
                }
            ]
        },
        {
            "question": "Major Surgeries and Implants",
            "questionCode": "procedures",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Surgery or Implant",
                    "questionCode": "procedure",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "externallyDefined": "https://clinicaltables.nlm.nih.gov/api/procedures/v3/search",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "30%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/procedures/procedure",
                    "codeList": [
                        {
                            "code": "procedure",
                            "display": "Surgery or Implant",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "When done",
                    "questionCode": "procedure_date",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/procedures/procedure_date",
                    "codeList": [
                        {
                            "code": "procedure_date",
                            "display": "When done",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Comments",
                    "questionCode": "procedure_comments",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "linkId": "/procedures/procedure_comments",
                    "codeList": [
                        {
                            "code": "procedure_comments",
                            "display": "Comments",
                            "system": "Custom"
                        }
                    ]
                }
            ],
            "linkId": "/procedures",
            "codeList": [
                {
                    "code": "procedures",
                    "display": "Major Surgeries and Implants"
                }
            ]
        },
        {
            "question": "Vaccinations",
            "questionCode": "vaccinations",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Vaccine name",
                    "questionCode": "vaccine_name",
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "header": false,
                    "editable": "1",
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    },
                    "dataType": "CWE",
                    "answers": [
                        {
                            "code": "adolescentAdult",
                            "text": "Adolescent/Adult"
                        },
                        {
                            "code": "118",
                            "text": "Cervarix (Human papilloma virus - bivalent)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "62",
                            "text": "Gardasil (Human papilloma virus - quadrivalent)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "114",
                            "text": "Meningococcal (MCV4)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "33",
                            "text": "Pneumococcal 23 (PPSV, pneumonia vaccine)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "115",
                            "text": "Tetanus/Diphtheria/Pertussis (Tdap)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "9",
                            "text": "Tetanus/Diphtheria (Td)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "121",
                            "text": "Zoster (Shingles)",
                            "parentAnswerCode": "adolescentAdult"
                        },
                        {
                            "code": "childhood",
                            "text": "Childhood"
                        },
                        {
                            "code": "20",
                            "text": "Diphtheria/Tetanus/Pertussis (DTaP)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "17",
                            "text": "Haemophilus influenzae type b (Hib)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "85",
                            "text": "Hepatitis A (pediatric)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "45",
                            "text": "Hepatitis B",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "3",
                            "text": "Measles/Mumps/Rubella (MMR)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "94",
                            "text": "Measles/Mumps/Rubella-Varicella (MMRV)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "133",
                            "text": "Pneumococcal 13 (Prevnar13)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "33",
                            "text": "Pneumococcal 23 (for children at high risk)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "10",
                            "text": "Polio, injected (IPV)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "122",
                            "text": "Rotavirus",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "21",
                            "text": "Varicella (Chickenpox)",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "50",
                            "text": "DTaP-Hib combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "130",
                            "text": "DTaP-IPV combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "110",
                            "text": "DTaP-IPV-Hep B combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "120",
                            "text": "DTaP-IPV-Hib combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "104",
                            "text": "Hepatitis A-Hepatitis B combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "51",
                            "text": "Hib-Hepatitis B combination",
                            "parentAnswerCode": "childhood"
                        },
                        {
                            "code": "flu",
                            "text": "Influenza"
                        },
                        {
                            "code": "141",
                            "text": "Influenza, injected (Flu)",
                            "parentAnswerCode": "flu"
                        },
                        {
                            "code": "140",
                            "text": "Influenza, injected, preservative-free (Flu)",
                            "parentAnswerCode": "flu"
                        },
                        {
                            "code": "111",
                            "text": "Influenza, intranasal (FluMist)",
                            "parentAnswerCode": "flu"
                        },
                        {
                            "code": "135",
                            "text": "Influenza, high-dose (Flu, for people 65 and older)",
                            "parentAnswerCode": "flu"
                        },
                        {
                            "code": "travel",
                            "text": "Travel"
                        },
                        {
                            "code": "85",
                            "text": "Hepatitis A (adult)",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "45",
                            "text": "Hepatitis B (adult)",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "134",
                            "text": "Japanese encephalitis (Ixiaro, for people > 16 years old)",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "41",
                            "text": "Typhoid, injected",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "25",
                            "text": "Typhoid, oral",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "18",
                            "text": "Rabies",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "37",
                            "text": "Yellow fever (YF)",
                            "parentAnswerCode": "travel"
                        },
                        {
                            "code": "uncommon",
                            "text": "Not commonly used or not available in U.S.",
                            "parentAnswerCode": ""
                        },
                        {
                            "code": "24",
                            "text": "Anthrax",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "28",
                            "text": "Diphtheria/Tetanus (DT)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "39",
                            "text": "Japanese encephalitis (JE-VAX, not available since May 2011)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "66",
                            "text": "Lyme disease",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "5",
                            "text": "Measles",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "7",
                            "text": "Mumps",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "100",
                            "text": "Pneumococcal 7 (replaced by Pneumococcal 13 in 2010)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "2",
                            "text": "Polio, oral (OPV)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "6",
                            "text": "Rubella",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "35",
                            "text": "Tetanus (TT)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "19",
                            "text": "Tuberculosis (BCG)",
                            "parentAnswerCode": "uncommon"
                        },
                        {
                            "code": "75",
                            "text": "Vaccinia (smallpox)",
                            "parentAnswerCode": "uncommon"
                        }
                    ],
                    "displayControl": {
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/vaccinations/vaccine_name",
                    "codeList": [
                        {
                            "code": "vaccine_name",
                            "display": "Vaccine name",
                            "system": "Custom"
                        }
                    ]
                },
                {
                    "question": "Date",
                    "questionCode": "vaccine_date",
                    "header": false,
                    "editable": "1",
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/vaccinations/vaccine_date",
                    "codeList": [
                        {
                            "code": "vaccine_date",
                            "display": "Date",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Next due",
                    "questionCode": "vaccine_next",
                    "header": false,
                    "editable": "1",
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/vaccinations/vaccine_next",
                    "codeList": [
                        {
                            "code": "vaccine_next",
                            "display": "Next due",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Comment",
                    "questionCode": "vaccine_comment",
                    "header": false,
                    "editable": "1",
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "45%"
                            }
                        ]
                    },
                    "linkId": "/vaccinations/vaccine_comment",
                    "codeList": [
                        {
                            "code": "vaccine_comment",
                            "display": "Comment",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                }
            ],
            "linkId": "/vaccinations",
            "codeList": [
                {
                    "code": "vaccinations",
                    "display": "Vaccinations"
                }
            ]
        },
        {
            "question": "Medical Contacts",
            "questionCode": "contacts",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Name",
                    "questionCode": "contact_name",
                    "header": false,
                    "editable": "1",
                    "dataType": "ST",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "12%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_name",
                    "codeList": [
                        {
                            "code": "contact_name",
                            "display": "Name",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Type",
                    "questionCode": "contact_type",
                    "header": false,
                    "editable": "1",
                    "dataType": "CWE",
                    "questionCodeSystem": "Custom",
                    "answers": [
                        {
                            "code": "ALLE",
                            "text": "Allergist"
                        },
                        {
                            "code": "CARD",
                            "text": "Cardiologist"
                        },
                        {
                            "code": "CLIN",
                            "text": "Clinical psychologist"
                        },
                        {
                            "code": "DENT",
                            "text": "Dentist"
                        },
                        {
                            "code": "DERM",
                            "text": "Dermatologist"
                        },
                        {
                            "code": "EAR",
                            "text": "ENT"
                        },
                        {
                            "code": "FP",
                            "text": "Family practitioner"
                        },
                        {
                            "code": "GI",
                            "text": "Gastroenterologist"
                        },
                        {
                            "code": "HEME",
                            "text": "Hematologist"
                        },
                        {
                            "code": "HOSP",
                            "text": "Hospital"
                        },
                        {
                            "code": "IMM",
                            "text": "Immunologist"
                        },
                        {
                            "code": "INTE",
                            "text": "Internist"
                        },
                        {
                            "code": "MEDI",
                            "text": "Medical equipment supplier"
                        },
                        {
                            "code": "NEPH",
                            "text": "Nephrologist"
                        },
                        {
                            "code": "NEUR",
                            "text": "Neurologist"
                        },
                        {
                            "code": "NURS",
                            "text": "Nurse"
                        },
                        {
                            "code": "NURSP",
                            "text": "Nurse practitioner"
                        },
                        {
                            "code": "NURSH",
                            "text": "Nursing Home"
                        },
                        {
                            "code": "OBGY",
                            "text": "Obstetrician/Gynecologist"
                        },
                        {
                            "code": "OT",
                            "text": "Occupational therapist"
                        },
                        {
                            "code": "ONC",
                            "text": "Oncologist"
                        },
                        {
                            "code": "OPHT",
                            "text": "Ophthalmologist"
                        },
                        {
                            "code": "OPTO",
                            "text": "Optometrist"
                        },
                        {
                            "code": "ODO",
                            "text": "Orthodontist"
                        },
                        {
                            "code": "ORTH",
                            "text": "Orthopedist"
                        },
                        {
                            "code": "PEDI",
                            "text": "Pediatrician"
                        },
                        {
                            "code": "PHAR",
                            "text": "Pharmacy"
                        },
                        {
                            "code": "PHMO",
                            "text": "Pharmacy - mail order"
                        },
                        {
                            "code": "PHAR24",
                            "text": "Pharmacy- 24 hour"
                        },
                        {
                            "code": "PMR",
                            "text": "Physical medicine and rehabilitation (PM&R)"
                        },
                        {
                            "code": "PT",
                            "text": "Physical therapist"
                        },
                        {
                            "code": "PLS",
                            "text": "Plastic surgeon"
                        },
                        {
                            "code": "POD",
                            "text": "Podiatrist"
                        },
                        {
                            "code": "PRIM",
                            "text": "Primary care physician"
                        },
                        {
                            "code": "PSYC",
                            "text": "Psychiatrist"
                        },
                        {
                            "code": "PULM",
                            "text": "Pulmonologist"
                        },
                        {
                            "code": "RHEU",
                            "text": "Rheumatologist"
                        },
                        {
                            "code": "SOCI",
                            "text": "Social worker"
                        },
                        {
                            "code": "SLT",
                            "text": "Speech and language therapist"
                        },
                        {
                            "code": "SURG",
                            "text": "Surgeon"
                        },
                        {
                            "code": "URGE",
                            "text": "Urgent care facility"
                        },
                        {
                            "code": "UROL",
                            "text": "Urologist"
                        }
                    ],
                    "linkId": "/contacts/contact_type",
                    "codeList": [
                        {
                            "code": "contact_type",
                            "display": "Type",
                            "system": "Custom"
                        }
                    ],
                    "displayControl": {
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Telephone",
                    "questionCode": "contact_phone",
                    "header": false,
                    "editable": "1",
                    "dataType": "PHONE",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "10%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_phone",
                    "codeList": [
                        {
                            "code": "contact_phone",
                            "display": "Telephone",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Fax",
                    "questionCode": "contact_fax",
                    "header": false,
                    "editable": "1",
                    "dataType": "PHONE",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "10%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_fax",
                    "codeList": [
                        {
                            "code": "contact_fax",
                            "display": "Fax",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Email",
                    "questionCode": "contact_email",
                    "header": false,
                    "editable": "1",
                    "dataType": "EMAIL",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "12%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_email",
                    "codeList": [
                        {
                            "code": "contact_email",
                            "display": "Email",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Next appt.",
                    "questionCode": "contact_appt",
                    "header": false,
                    "editable": "1",
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_appt",
                    "codeList": [
                        {
                            "code": "contact_appt",
                            "display": "Next appt.",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Appt. time",
                    "questionCode": "contact_appt_time",
                    "header": false,
                    "editable": "1",
                    "dataType": "TM",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "7%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/contacts/contact_appt_time",
                    "codeList": [
                        {
                            "code": "contact_appt_time",
                            "display": "Appt. time",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Comment",
                    "questionCode": "contact_comment",
                    "editable": "1",
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "header": false,
                    "linkId": "/contacts/contact_comment",
                    "codeList": [
                        {
                            "code": "contact_comment",
                            "display": "Comment",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                }
            ],
            "linkId": "/contacts",
            "codeList": [
                {
                    "code": "contacts",
                    "display": "Medical Contacts"
                }
            ]
        },
        {
            "question": "Questions to Ask Your Doctor",
            "questionCode": "questions",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "answerCardinality": {
                "min": "0",
                "max": "1"
            },
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Date entered",
                    "questionCode": "question_date",
                    "header": false,
                    "editable": "1",
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/questions/question_date",
                    "codeList": [
                        {
                            "code": "question_date",
                            "display": "Date entered",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Category",
                    "questionCode": "question_category",
                    "header": false,
                    "editable": "1",
                    "dataType": "CWE",
                    "questionCodeSystem": "Custom",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "20%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "answers": [
                        {
                            "code": "QUE-13",
                            "text": "Allergies"
                        },
                        {
                            "code": "QUE-21",
                            "text": "Disease risk based on family history"
                        },
                        {
                            "code": "QUE-7",
                            "text": "Exercise"
                        },
                        {
                            "code": "QUE-0",
                            "text": "General symptoms"
                        },
                        {
                            "code": "QUE-20",
                            "text": "Genetic testing"
                        },
                        {
                            "code": "QUE-8",
                            "text": "Herbal or alternative remedies"
                        },
                        {
                            "code": "QUE-16",
                            "text": "Infant or child development"
                        },
                        {
                            "code": "QUE-15",
                            "text": "Insurance"
                        },
                        {
                            "code": "QUE-11",
                            "text": "Lab tests and/or results"
                        },
                        {
                            "code": "QUE-5",
                            "text": "Medical conditions"
                        },
                        {
                            "code": "QUE-4",
                            "text": "Medical equipment and/or supplies"
                        },
                        {
                            "code": "QUE-3",
                            "text": "Medications"
                        },
                        {
                            "code": "QUE-6",
                            "text": "Nutrition"
                        },
                        {
                            "code": "QUE-12",
                            "text": "Preventive/screening tests"
                        },
                        {
                            "code": "QUE-14",
                            "text": "Referrals"
                        },
                        {
                            "code": "QUE-17",
                            "text": "School or learning issues"
                        },
                        {
                            "code": "QUE-18",
                            "text": "Sports injuries"
                        },
                        {
                            "code": "QUE-2",
                            "text": "Surgeries"
                        },
                        {
                            "code": "QUE-9",
                            "text": "Travel advice"
                        },
                        {
                            "code": "QUE-10",
                            "text": "Vaccines"
                        },
                        {
                            "code": "QUE-19",
                            "text": "X-ray or other radiology tests and/or results"
                        }
                    ],
                    "linkId": "/questions/question_category",
                    "codeList": [
                        {
                            "code": "question_category",
                            "display": "Category",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Status",
                    "questionCode": "question_status",
                    "header": false,
                    "editable": "1",
                    "dataType": "CNE",
                    "questionCodeSystem": "Custom",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "9%"
                            }
                        ],
                        "answerLayout": {
                            "type": "COMBO_BOX",
                            "columns": "0"
                        }
                    },
                    "answers": [
                        {
                            "code": "asked",
                            "text": "Asked"
                        },
                        {
                            "code": "not_asked",
                            "text": "Not Asked"
                        }
                    ],
                    "linkId": "/questions/question_status",
                    "codeList": [
                        {
                            "code": "question_status",
                            "display": "Status",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Question",
                    "questionCode": "question_text",
                    "header": false,
                    "editable": "1",
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "linkId": "/questions/question_text",
                    "codeList": [
                        {
                            "code": "question_text",
                            "display": "Question",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Answer",
                    "questionCode": "question_answer",
                    "header": false,
                    "editable": "1",
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "linkId": "/questions/question_answer",
                    "codeList": [
                        {
                            "code": "question_answer",
                            "display": "Answer",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                }
            ],
            "linkId": "/questions",
            "codeList": [
                {
                    "code": "questions",
                    "display": "Questions to Ask Your Doctor"
                }
            ]
        },
        {
            "question": "Notes",
            "questionCode": "notes",
            "displayControl": {
                "questionLayout": "horizontal"
            },
            "questionCardinality": {
                "min": "1",
                "max": "*"
            },
            "header": true,
            "editable": "1",
            "dataType": "SECTION",
            "items": [
                {
                    "question": "Date",
                    "questionCode": "note_date",
                    "header": false,
                    "editable": "1",
                    "dataType": "DT",
                    "displayControl": {
                        "colCSS": [
                            {
                                "name": "width",
                                "value": "11%"
                            }
                        ]
                    },
                    "questionCodeSystem": "Custom",
                    "linkId": "/notes/note_date",
                    "codeList": [
                        {
                            "code": "note_date",
                            "display": "Date",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                },
                {
                    "question": "Note",
                    "questionCode": "note_text",
                    "header": false,
                    "editable": "1",
                    "dataType": "TX",
                    "questionCodeSystem": "Custom",
                    "linkId": "/notes/note_text",
                    "codeList": [
                        {
                            "code": "note_text",
                            "display": "Note",
                            "system": "Custom"
                        }
                    ],
                    "questionCardinality": {
                        "min": "1",
                        "max": "1"
                    },
                    "answerCardinality": {
                        "min": "0",
                        "max": "1"
                    }
                }
            ],
            "linkId": "/notes",
            "codeList": [
                {
                    "code": "notes",
                    "display": "Notes"
                }
            ],
            "answerCardinality": {
                "min": "0",
                "max": "1"
            }
        }
    ],
    "templateOptions": {
        "showQuestionCode": false,
        "showCodingInstruction": true,
        "tabOnInputFieldsOnly": false,
        "hideFormControls": false,
        "showFormOptionPanel": false,
        "showFormOptionPanelButton": true,
        "showItemOptionPanelButton": true,
        "hideUnits": true,
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
    "extension": [],
    "hasSavedData": true
};

module.exports = {
    LOINC_PHR
}