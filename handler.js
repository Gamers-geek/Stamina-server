const fs = require('fs');
const methods = {}

const methodFiles = fs.readdirSync('./methods').filter(file => file.endsWith('.js'));

for (const file of methodFiles) {
    const method = require(`./methods/${file}`);
    methods[method.name] = method;
    console.log('Loaded method ' + method.name)
}

module.exports = methods;