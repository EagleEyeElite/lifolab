const dotenv = require('dotenv');


function loadEnvFiles() {
    const paths = process.env.NODE_ENV === 'production'
        ? ['../.env']
        : ['.env.local', '.env', '../.env'];
    dotenv.config({ path: paths });
}

module.exports = { loadEnvFiles };
