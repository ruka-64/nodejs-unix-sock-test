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
});
client.on('error', (err) => {
  console.error(err.message);
});

let i = 0;
setInterval(() => {
  client.write(`Count is ${i}`);
  i++;
}, 1000);
