let jsonData = require("../../ctr-dsu-wizard/formDefs").LOINC_PHR;

//console.log(jsonObj);
let items = jsonData.items;

items.forEach((item) => {
    let choices = "";
    let sep = "";
    if (item.dataType==="CNE") {
        item.answers.forEach((answer) => {
            choices += sep + answer.text+"/"+answer.code;
            sep = "|";
        });
    }
    if (!item.help) item.help="";
    console.log(item.linkId
        +","+item.dataType
        +","+choices
        +","+item.answerCardinality.min
        +","+item.answerCardinality.max
        +","+item.question
        +","+item.help);
});