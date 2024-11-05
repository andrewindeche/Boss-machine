const express = require('express');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideaRouter =  express.Router();
const meetingsRouter = express.Router();
const { shallowEqual } = require('react-redux');
const { getAllFromDatabase,
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase,
    deleteAllFromDatabase, 
    createMeeting, 
    deleteFromDatabasebyId } = require('./db');

apiRouter.param('id',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id)
    minion 
        ?(req.minion = minion,next()) 
        :res.status(404).send('Minion not found');
});

ideaRouter.param('id',(req,res,next,id) => {
    const idea = getFromDatabaseById('ideas',id);
    idea
        ?(req.idea = idea,next())
        :res.status(404).send();
});

meetingsRouter.param('id',(req,res,next,id) => {
    const meeting = getFromDatabaseById('meetings',id);
    meeting
        ?(req.meeting = meeting, next())
        :res.status(404).send('Meetings not found');
});

apiRouter.get('/minions',(req,res) => {
    const getAllMinions = getAllFromDatabase('minions');
    console.log('getAllMinions:', getAllMinions);
    if (Array.isArray(getAllMinions) && getAllMinions.length > 0) {
        res.status(200).send(getAllMinions);
    } else {
        res.status(500).send('Error retrieving minions');
    }
});

apiRouter.post('/minions',(req,res) => {
    const newMinion = addToDatabase('minions',req.body);
    res.status(201).send(newMinion);
});

apiRouter.get('/:id',(req,res) => {
    res.send(req.minion);
});

apiRouter.put('/:id',(req,res) => {
    const updatedMinion = req.body;
    updatedMinion.id = req.minion.id;
    const isUpdated = updateInstanceInDatabase('minions',updatedMinion);
    isUpdated ? res.status(201).send(updatedMinion): res.status(500).send("not updated");
});

apiRouter.delete('/:id',(req,res) => {
 const deleteMinion = deleteFromDatabasebyId('minions',req.minion.id);
    deleteMinion 
        ?(res.status(204).send("Deleted"))
        :(res.status(500).send("Failed to delete"));
});

ideaRouter.get('/',(req,res) => {
    const getAll = getAllFromDatabase('ideas');
    getAll ? res.status.send(getAll) : res.status(500).send("Not found");
});

ideaRouter.post('/ideas',checkMillionDollarIdea,(req,res) => {
    const newIdea = addToDatabase('ideas',req.body);
    newIdea ? res.status(201).send(newIdea): res.status(400).send('Error')
});

ideaRouter.get('/id',(req,res) => {
    const getIdeaById = getFromDatabaseById('idea',req.idea.id);
    getIdeaById ? res.status(200).send(req.idea) : res.status(500).send()
});

ideaRouter.put('/:id',(req,res) => {
    const updatedIdea = req.body;
    updatedIdea.id = req.idea.id;
    const isIdea = updateInstanceInDatabase('ideas',updatedIdea);
    isIdea ? 
        (res.status(200).send(isIdea))
        :res.status(500).send('Error updating Idea');

});

ideaRouter.delete('/:id',(req,res) => {
    const deleteIdea = deleteFromDatabasebyId('idea',req.idea.id);
    deleteIdea 
        ?(res.status(204).send())
        :(res.status(500).send("idea not deleted"));
});

meetingsRouter.get('/',(req,res) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/',(req,res) => {
    const newMeetings = createMeeting()
    const addedMeeting = addToDatabase('meetings', newMeetings)
    res.status(201).send(addedMeeting);
});

meetingsRouter.delete('/:id',(req,res) => {
    const deleteMeeting = deleteFromDatabasebyId('meetings',req.meeting.id);
    deleteMeeting
        ?(res.status(204).send("meeting deleted"))
        :(res.status(500).send("meeting not deleted"))
});

meetingsRouter.delete('/',(req,res) => {
    const deleteAllMeetings = deleteAllFromDatabase('meetings');
    deleteAllMeetings? res.status(204).send(): res.status(500).send("Not succesful")
});

module.exports = apiRouter;
module.exports = ideaRouter;
module.exports = meetingsRouter;
