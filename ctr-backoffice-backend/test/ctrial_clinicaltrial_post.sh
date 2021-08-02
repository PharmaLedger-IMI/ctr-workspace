#!/bin/bash -x
#
# Example of inserting a ClinicalTrial
# for 2 conditions:
#  10180 Diabetes - type 2 (adult, non-insulin-independent)
# 104000 Non-alcohol fatty liver disease (NAFLD)
#
# The ordering property is just an integer number to specify in which
# order the medical conditions should be displayed. (lower comes first).
#
# The ClinicalTrial returned is filled up with the new IDs of the entities
# created.
#
curl -0 -v -X POST http://localhost:3000/borest/ctrial/clinicaltrial \
-H "Expect:" \
-H 'Content-Type: application/json; charset=utf-8' \
--data-binary @- << EOF
{
    "name": "Test Trial Name",
    "description": "Test Trial Description",
    "nctNumber": "NCT12345",
    "purpose": null,
    "phase": null,
    "timeCommitment": null,
    "physicalCommitment": null,
    "travelStipends": null,
    "eligibilityCriteria": null,
    "status": {
        "code": "REC"
    },
    "clinicalSite": {
        "id": "485a1939-b5cc-476b-b055-3e481ace315e"
    },
    "sponsor": {
        "id": "8f0759f0-357f-499f-86f1-db6486f72759"
    },
    "clinicalTrialMedicalConditions": [
        {
          "ordering": 1000,
          "medicalCondition": {
            "code": "104000"
          }
        },
        {
          "ordering": 2000,
          "medicalCondition": {
            "code": "10180"
          }
        }
      ]
}
EOF
