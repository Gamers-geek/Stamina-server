const { readdirSync } = require ('fs');
const methods = {}

const methodFiles = readdirSync('./methods').filter(file => file.endsWith('.js'));

for (const file of methodFiles) {
    const method = require(`./methods/${file}`);
    console.log(method)
    methods[method.name] = method;
    console.log('Loaded method ' + method.name)
}

module.exports = methods