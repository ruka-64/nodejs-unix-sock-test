import net from 'net';

const SOCK_PATH = 'test.sock'; //? ./test.sock
const delay = 1000;
let client = null;

let reconnecting = false;
let reconnectTimer = null;

let i = 0;
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
    reconnectTimer = setTimeout(connect, delay);
  });
  client.on('error', (err) => {
    if (err.message.startsWith('connect ENOENT')) {
      console.log("Cannot find socket (server.js isn't running?");
      if (reconnecting) {
        reconnectTimer = setTimeout(connect, delay);
        return;
      }
      process.exit(1);
    }
    console.error('[err]', err.message);
  });
};

connect();
