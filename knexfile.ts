import path from 'path';



module.exports = {
    client: 'sqlite3',
    connection: process.env.DATABASE_URL
    },
    migrations: {
        directory: path.resolve(__dirname, 'src','database','migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src','database','seeds')
    },
    useNullAsDefault: true,
}