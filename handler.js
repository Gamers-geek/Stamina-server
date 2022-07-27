const { readdirSync } = require ('fs');
const methods = {}

const methodFiles = readdirSync('./methods').filter(file => file.endsWith('.js'));

for (const file of methodFiles) {
    const method = import (`./methods/${file}`);
    methods[method.name] = method;
    console.log('Loaded method ' + method.name)
}

module.exports = methods