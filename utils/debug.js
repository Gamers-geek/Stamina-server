const { debugEnabled } = require("../config");

function debug(message) {
    if(debugEnabled){
        console.log("[DEBUG] ", message)
    }
}

function debugError(message) {
    console.log("[ERROR] ", message)
}

module.exports = {debug, debugError}