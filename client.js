import net from 'net';

const SOCK_PATH = 'test.sock'; //? ./test.sock

/** @type {net.Socket | null} */
let client = null;

const reconect_delay = 1000;
/** @type {NodeJS.Timeout | null} */
let reconnectTimer = null;
let reconnecting = false;

let i = 0;
/** @type {NodeJS.Timeout | null} */
let msgInterval = null;

const connect = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  client = net.createConnection(SOCK_PATH);

  client.on('connect', () => {
    console.log('connected');
    reconnecting = false;
    msgInterval = setInterval(() => {
      client.write(`Count is ${i}`);
      i++;
    }, 1000);
  });
  client.on('data', (data) => {
    console.log(data.toString());
  });
  client.on('end', () => {
    console.log('disconnected.');
    clearInterval(msgInterval);
    msgInterval = null;
    reconnecting = true;
    reconnectTimer = setTimeout(connect, reconect_delay);
  });
  client.on('error', (err) => {
    if (err.message.startsWith('connect ENOENT')) {
      console.log('Cannot find socket (is server.js not running?)');
      if (reconnecting) {
        reconnectTimer = setTimeout(connect, reconect_delay);
        return;
      }
      process.exit(1);
    }
    console.error('[err]', err.message);
  });
};

connect();
