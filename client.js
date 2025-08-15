import net from 'net';

const SOCK_PATH = 'test.sock'; //? ./test.sock

const client = net.createConnection(SOCK_PATH);

client.on('connect', () => {
  console.log('connected');
});
client.on('data', (data) => {
  console.log(data.toString());
});
client.on('end', () => {
  console.log('disconnected.');
  process.exit(0);
});
client.on('error', (err) => {
  if (err.message.startsWith('connect ENOENT')) {
    console.log("Cannot find socket (server.js isn't running?");
    process.exit(1);
  }
  console.error('[err]', err.message);
});

let i = 0;
setInterval(() => {
  client.write(`Count is ${i}`);
  i++;
}, 1000);
