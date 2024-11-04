const express = require('express');
const apiRouter = express.Router();
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

app.use('/api/minions', apiRouter);
app.use('/api/ideas', ideaRouter);
app.use('/api/meetings', meetingsRouter);

apiRouter.param('minionId',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id)
    minion 
        ?(req.minion = minion,next()) 
        :res.status(404).send('Minion not found');
        next();
});

ideaRouter.param('ideaId',(req,res,next,id) => {
    const idea = getFromDatabaseById('idea',id);
    idea
        ?(req.idea = idea,next())
        :res.status(404).send('Ideas not found');
        next()
});

meetingsRouter.param('meetingsId',(req,res,next,id) => {
    const meeting = getFromDatabaseById('meeting',id);
    meeting
        ?(req.meeting = meeting, next())
        :res.status(404).send('Meetings not found');
        next();
});

apiRouter.get('/',(req,res) => {
    res.send(getAllFromDatabase(minions));
});

apiRouter.post('/',(req,res) => {
    const newMinion = addToDatabase('minions',req.body);
    res.status(201).send(newMinion);
});

apiRouter.get('/:minionId',(req,res) => {
    res.send(req.minion);
});

apiRouter.put('/:minionId',(req,res) => {
    const updatedMinion = req.body;
    updatedMinion.id = req.minion.id;
    const isUpdated = updateInstanceInDatabase('minions',updatedMinion);
    isUpdated ? res.status(201).send(updatedMinion): res.status(500).send("not updated");
});

apiRouter.delete('/:minionId',(req,res) => {
 const deleteMinion = deleteFromDatabasebyId('minions',req.minion.id);
    deleteMinion 
        ?(res.status(204).send("Deleted"))
        :(res.status(500).send("Failed to delete"));
});

ideaRouter.get('/',(req,res) => {
    res.send(getAllFromDatabase(ideas));
});

ideaRouter.post('/',(req,res) => {
    const newIdea = addToDatabase('ideas',req.body);
    res.status(201).send(newIdea);
});

ideaRouter.get('/:idea',(req,res) => {
    res.send(req.idea);
});

ideaRouter.put('/:idea',(req,res) => {
    const updatedIdea = req.body.id;
    updatedIdea.id = req.idea.id;
    const isIdea = updateInstanceInDatabase('idea',updatedIdea);
    isIdea ? 
        (res.status(200).send('Idea Updated'))
        :res.status(500).send('Error updating Idea');

});

ideaRouter.delete('/:idea',(req,res) => {
    const deleteIdea = deleteFromDatabasebyId('idea',req.idea.id);
    deleteIdea 
        ?(res.status(200).send("idea deleted"))
        :(res.status(500).send("idea not deleted"));
});

meetingsRouter.get('/',(req,res) => {
    res.send(getFromDatabaseById(meetings))
});

meetingsRouter.post('/',(req,res) => {
    const newMeetings = createMeeting()
    const addedMeeting = addToDatabase('meetings', newMeetings)
    res.status(201).send(addedMeeting);
});

meetingsRouter.delete(':/meetings',(req,res) => {
    const deleteMeeting = deleteFromDatabasebyId('meeting',req.meeting.id);
    deleteMeeting
        ?(res.status(200).send("meeting deleted"))
        :(res.status(500).send("meeting not deleted"))
});

module.exports = apiRouter;
module.exports = ideaRouter;
module.exports = meetingsRouter;
