const SOCK_PATH = 'test.sock'; //? ./test.sock
import { unlinkSync } from 'fs';
import net from 'net';

const server = net.createServer((conn) => {
  console.log('Connected.');
  conn.on('close', () => console.log('disconnected'));
  conn.on('data', (data) => {
    console.log('[data]', data.toString());
    if (data.toString() == 'close') {
      conn.end();
      end();
    }
    conn.write(data);
    return;
  });
  conn.on('error', (err) => console.error('[err]', err));
});

const end = () => {
  try {
    console.log('Shutting down...');
    unlinkSync(SOCK_PATH);
    console.log('Bye');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

server.listen(SOCK_PATH);

process.on('SIGINT', end);
process.on('SIGTERM', end);
