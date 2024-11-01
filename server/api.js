const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/api',(req,res,next) => {
    res.send('Welcome')
})

module.exports = apiRouter;
