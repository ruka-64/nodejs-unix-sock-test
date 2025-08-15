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
  console.log('reconnecting...');
  while (client.readyState !== 'open') {
    try {
      client.connect();
    } catch {}
  }
});
client.on('error', (err) => {
  console.error('[err]', err.message);
});

let i = 0;
setInterval(() => {
  client.write(`Count is ${i}`);
  i++;
}, 1000);
