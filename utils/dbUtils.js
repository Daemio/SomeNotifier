const mongoose = require('mongoose');
const Player = require('../models/player');
const Task = require('../models/task');
const maxPlayersPerRequest = require('../config.json').vkApi.maxPlayersPerRequest
const dbConfig = require('../config').db;
const logger = require('../logger');

async function connect() {
    try{
        await mongoose.connect(`mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}`,
            { useNewUrlParser: true });
        logger.info('Connected to DB');
    } catch (err) {
        logger.error(`Failed to connect to DB\nReason:${JSON.stringify(err)}`)
    }
}

async function getPlayersCount() {
    return await Player.countDocuments({});
}

async function getIdsBlock(offset) {
    const players = await Player.find({}, {_id: 0, id: 1}).skip(offset).limit(maxPlayersPerRequest);
    
    return players.map(p => p.id);
}

async function getCompletedTasks() {
    return await Task.find({}, {offset: 1, ids: 1, _id: 0});
}

async function completeTask(offset, ids) {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        offset,
        ids
    });

    await task.save();
}

async function removeAllTasks() {
    await Task.deleteMany({});
}

module.exports = {connect, getIdsBlock, getCompletedTasks, completeTask, removeAllTasks, getPlayersCount}