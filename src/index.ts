import dotenv from 'dotenv';

import startScript from './startScript';
dotenv.config();

(async () => {
  if (!process.env.TWITTER_BEARER_TOKEN)
    throw new Error('Missing TWITTER_BEARER_TOKEN in environment.');

  try {
    await startScript(process.env.TWITTER_BEARER_TOKEN);
  } catch (e) {
    console.log('An error occurred executing the script.');
  }
})();
