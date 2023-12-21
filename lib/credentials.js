import dotenv from "dotenv";
dotenv.config();

import fs from "fs"

const appCredentials = {
  id: parseInt(process.env.GITHUB_APP_ID, 10),
  privateKey: Buffer.from(fs.readFileSync('terminal-search.2023-12-21.private-key.pem'), 'base64').toString(),
  installationId: parseInt(process.env.GITHUB_APP_INSTALLATION_ID, 10),
  type: 'installation',
};

export default appCredentials;
