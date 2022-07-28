const { readdirSync } = require ('fs');
const methods = {}
const {debug, debugError} = require("./utils/debug")

const methodFiles = readdirSync('./methods').filter(file => file.endsWith('.js'));

for (const file of methodFiles) {
    const method = require(`./methods/${file}`);
    methods[method.name] = method;
    debug('Loaded method ' + method.name)
}

module.exports = methods