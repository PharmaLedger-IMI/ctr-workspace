
function Init(server){
    require('./ctrms-middleware')(server);
}

module.exports = {
    Init
}