var ws = require("ws")

var server = new ws.Server({ port:4545})

server.on("connection", client => {
    client.on("message", message => {
        let data = message
        console.log(data.toString())
    })
    client.on("close", (code, reason) => {
        console.log(code, reason)
    })
    client.send(JSON.stringify({"test": "test"}))
})
