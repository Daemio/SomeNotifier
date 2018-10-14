const ERR = [
    {code: 1, description: 'Too frequently'},
    {code: 2, description: 'Server fatal error'},
    {code: 3, description: 'Invalid data'}
];
const REQUEST_TIME = 200;
const FATAL_ERR_PROBABILYTY = 0.1;

const wait = (delay) => new Promise(
        resolve => setTimeout(resolve, delay)
    );

async function doSomeWork() {
    await wait(REQUEST_TIME);
}

async function sendNotification(ids, message) {   
    if((!Array.isArray(ids)) || typeof(message) !== 'string') {
        throw ERR[2];
    }
            
    const prob = Math.random();
    
    if(prob < FATAL_ERR_PROBABILYTY) {
        throw ERR[1];
    }
    
    await doSomeWork();

    //let's assume all notifications are turned on
    //I can add some probabilities of users who turn them off, if needed
    return JSON.stringify(ids);
}

module.exports.sendNotification = sendNotification;