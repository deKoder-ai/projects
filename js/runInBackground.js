const worker = new Worker('pomodoro.js');

worker.onmessage = event  => {
    console.log(`Received message from pomodoro: ${event.data}`);
};

worker.postMessage('start');