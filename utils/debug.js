const { debugEnabled } =require ("../config.js")

function debug(message) {
    if(debugEnabled == true){
        console.log("[DEBUG] ", message)
    }
}

function debugError(message) {
    console.log("[ERROR] ", message)
}

module.exports = {debug, debugError}