#!/usr/bin/env node
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

import { App } from 'octokit';

import appCredentials from './lib/credentials.js';

async function main() {
  try {
    // Instantiate new Octokit client
    const app = new App({
      appId: appCredentials.id,
      privateKey: appCredentials.privateKey
    });
    const octokit = await app.getInstallationOctokit(appCredentials.installationId);

    // Create issue in demo-days/Spoon-Knife
    // https://docs.github.com/en/rest/reference/issues#create-an-issue
    const issue = await octokit.request('POST /repos/:owner/:repo/issues', {
      owner: 'brunoan99',
      repo: 'test-github-app',
      title: 'Hello world',
      body:
        ':wave: :earth_americas:\n\n![fellowshipoftheclaps](https://user-images.githubusercontent.com/27806/91333726-91c46f00-e793-11ea-9724-dc2e18ca28d0.gif)'
    });
    logger.trace(issue);

    process.stdout.write(`${issue.data.html_url} 🚀\n`);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}

main();
