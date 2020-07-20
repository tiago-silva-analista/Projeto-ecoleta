import path from 'path';



module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
        // host: 'ec2-18-214-119-135.compute-1.amazonaws.com',
        // database: 'd5590fgf39adp7',
        // user: 'louxpxzvjhkmkx',
        // password: '0b4dcc588a32873f125d19e8fc3d17e983a6b808e96f51542d263aaaf4895556'
    //},
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
}