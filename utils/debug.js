const { debugEnabled, playerEnabled } =require ("../config.js")

function debug(message) {
    if(debugEnabled == true){
        console.log("[DEBUG] ", message)
    }
}

function debugError(message) {
    console.log("[ERROR] ", message)
}

function playerMessage(message) {
    if(playerEnabled == true){
        console.log("[PLAYER] ", message)
    }
}
module.exports = {debug, debugError, playerMessage}