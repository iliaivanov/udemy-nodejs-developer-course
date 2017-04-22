let env = process.env.NODE_ENV || 'dev';
console.log(`Running in ${env} mode`);

if (env === 'dev') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
} // production env variables should be set by hosting (heroku)
