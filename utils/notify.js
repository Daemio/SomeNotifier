const dbUtils = require('./dbUtils');
const vkApi = require('../api');
const {maxPlayersPerRequest: LIMIT, APIRequestTimeout: TIMEOUT} = require('../config.json').vkApi
const {from} = require('rxjs');
const {concatMap, delay} = require('rxjs/operators');
const _ = require('lodash');
const logger = require('../logger');

async function notify(template) {
    const blocksToExecute = await _getBlocksToExecute();

    const offsetObservable = from(blocksToExecute).pipe(
        concatMap(item => from([item]).pipe(delay(TIMEOUT))),
        );

    const tasksObservable = offsetObservable.pipe(concatMap(offset => from(_executeBlock(offset, template))));

    const subscription = tasksObservable.subscribe({
        next: message => logger.info(message),
        error: _ => subscription.unsubscribe(),
        complete: _ => logger.info('Every player has been notified')
    });
}

async function _getBlocksToExecute() {
    const count = await dbUtils.getPlayersCount();
    let taskCount = Math.ceil(count / LIMIT);
    const completedTasks = await dbUtils.getCompletedTasks();
    const completedOffsets = completedTasks.map((task) => task.offset);
    let blocksToExecute = [];
    
    for (let i = 0; i < taskCount; i++) {
        blocksToExecute[i] = i * LIMIT;
    }
    
    return _.difference(blocksToExecute, completedOffsets);
}

async function _executeBlock(offset, template) {
    let ids, log;
    try{
        ids = await dbUtils.getIdsBlock(offset);
        log = await vkApi.sendNotification(ids, template);
        await dbUtils.completeTask(offset, ids);
        return log;
    } catch (err) {
        logger.error(`Block execution with offset=${offset} failed.\nReason:${JSON.stringify(err)}`);
        throw(err);
    }
}

module.exports = notify;