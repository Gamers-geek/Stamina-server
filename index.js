var ws = require("ws")

var server = new ws.Server({ port:4545})

server.on("connection", client => {
    client.on("message", message => {
        try{
            let data = JSON.parse(message)

            console.log(data)
        } catch(error) {
            console.log(error)
        };
    })
    client.on("close", (code, reason) => {
        console.log(code, reason)
    })
    client.send(JSON.stringify({"test": "test"}))
})
