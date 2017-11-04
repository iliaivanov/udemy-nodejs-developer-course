# The Complete Node.js Developer Course   

TODO:
- lowercased room names
- unique names
- list chatrooms (dropdown on login form)

Udemy course sode stuff: https://www.udemy.com/the-complete-nodejs-developer-course-2   

## MongoDB part
- [Mongo homepage](https://www.mongodb.com/)   
- [MongoDB GUI](https://robomongo.org/)

### Mongo
Mongo ID contains dates! Like created: `result.ops[0]._id.getTimestamp()`   

Update operators: https://docs.mongodb.com/manual/reference/operator/update/

mLab mongodb hosting: https://mlab.com

### Mongoose
Docs: http://mongoosejs.com/docs/guide.html   
Middleware: http://mongoosejs.com/docs/middleware.html

#### Command executed form the mongo _bin_ folder:   
- Start server: `./mongod --dbpath ~/Study/mongo-data/`   
- Mongo CLI: `./mongo`   

### Crypting
Crypting passwords - https://www.npmjs.com/package/bcryptjs
Tokens - https://www.npmjs.com/package/jsonwebtoken

### Heroku
`heroku config:get %VAR_NAME%`   
`heroku config:set %VAR_NAME%=%VALUE%`   
`heroku config:unset %VAR_NAME%`   

### Node
Node path https://nodejs.org/api/path.html
Serving static stuff with express http://expressjs.com/ru/starter/static-files.html

* socket.emit - sends event only to current socket/user
* socket.broadcast - sends event for all, but current socket/user
* socket.join('%name%') - join particular "channel"
* socket.broadcast.to('%name%').emit - send event to particular channel for all sockets connected, but except you
* io - sends event for all connected sockets
* io.broadcast.to('%name%').emit - send event to particular channel for all sockets connected

### Socket.io
Adding this libraru also automatically addes http://localhost:3000/socket.io/socket.io.js asset to the web app.