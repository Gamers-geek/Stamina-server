const debug = require("../utils/debug")
const THREE = require("three")


module.exports = {
    name: "ValidateUserPosition",
    description: "Permet de valider la prochaine position du joueur",
    run: function (message, socket, client) {
        let data = message.data;
            var Userposition = new THREE.Vector3()
            Userposition = data.position
    }
}