const ws = require("ws")
const { port } = require('config.js')
const server = new ws.Server({ port: port})

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
