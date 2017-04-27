let env = process.env.NODE_ENV || 'dev';
console.log(`Running in ${env} mode`);

if (env === 'dev' || env === 'test') {
    let config = require('./config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

 // production env variables should be set by hosting (heroku)
