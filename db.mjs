const { Pool } = require('pg');


const pool = new Pool({
    connectionString: 'postgres://ahiwzuqh:t967ql1o0UmsSH_6kMFhP3xcwb-RcL9W@kesavan.db.elephantsql.com/ahiwzuqh',
});


pool.on('connect', () => {
    console.log('Conectado ao banco de dados ElephantSQL com sucesso!');
});

module.exports = pool;