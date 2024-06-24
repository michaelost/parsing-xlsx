import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { FileRoute } from '@routes/files.route';
import { ValidateEnv } from '@utils/validateEnv';

import https from 'https';
import fs from 'fs';
import path from 'path';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new FileRoute()]);

app.listen();

/*
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};
  
https.createServer(sslOptions, app.getServer()).listen(app.port, () => {
  console.log(`HTTPS Server running at https://localhost:${app.port}/`);
});
*/
