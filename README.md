# Unix domain socket with Node.js

No need to install deps because this code is using built-in modules(`node:net`, `node:fs`).

But if you want to edit code and need types, you can install `@types/node` with `pnpm i`.

## How to use

Run `server.js` and `client.js`. `server.js` will make socket named `test.sock`.

The client sends the message `Count is ${number}` and the server echoes it.
