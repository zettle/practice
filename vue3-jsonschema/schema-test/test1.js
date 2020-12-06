const Ajv = require('ajv');

const schema = {
    type: 'string',
    minLength: 10
};
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);
const valid = validate('sdfjk');
if (!valid) console.log(validate.errors);