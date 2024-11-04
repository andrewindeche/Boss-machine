const express = require('express');
const apiRouter = express.Router();
const { shallowEqual } = require('react-redux');
const { getAllFromDatabase,
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase,
    deleteAllFromDatabase, 
    createMeeting, 
    deleteFromDatabasebyId } = require('./db');

apiRouter.param('/api/minions',(req,res) => {
    const minion = getFromDatabaseById('minion',id)
    minion 
        ? (req.minion = minion,next()) 
        : res.status(404).send('Minion not found');
});

apiRouter.get('/',(req,res) => {
    res.send(getAllFromDatabase(minions));
});

apiRouter.post('/',(req,res) => {
    const newMinion = req.body;
    res.send(addToDatabase(newMinion));
});

apiRouter.get('/minionId',(req,res) => {
    res.send(req.minion);
});

apiRouter.put('/:minionId',(req,res) => {
    const updatedMinion = req.body;
    updatedMinion.id = req.minion.id;
    const isUpdated = updateInstanceInDatabase('minions',updatedMinion);
    isUpdated ? res.status(200).send(updatedMinion): res.status(500).send("not updated");
});

apiRouter.delete('/:minionId',(req,res) => {
 const deleteMinion = deleteFromDatabasebyId('minion',req.minion.id);
    deleteMinion 
        ?(res.status(204).send("Deleted"))
            :(res.status(500).send("Failed to delete"));

});
module.exports = apiRouter;
