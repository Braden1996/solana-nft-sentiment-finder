import fs from 'fs';
import path from 'path';
import { getProjectTwitterUrls } from './howRareScrape';
import { TwitterApi } from './twitter/TwitterApi';
import { TwitterResponse } from './twitter/twitterTypes';
import { sortFollowers, twitterUrlsToIds } from './twitter/twitterUtils';

const outputResult = (followers: TwitterResponse[]) => {
  const outDirName = path.resolve(__dirname, '../out');
  if (!fs.existsSync(outDirName)) fs.mkdirSync(outDirName);

  const outPath = path.resolve(outDirName, 'sortedTwitterFollowers.json');
  fs.writeFileSync(outPath, JSON.stringify(followers, undefined, 2) + '\n');

  console.log(`Output written to: ${outPath}`);
};

export default async function start(twitterBearerToken: string) {
  const twitterUrls = await getProjectTwitterUrls();
  const twitterIds = twitterUrlsToIds(twitterUrls);

  const twitterApi = new TwitterApi(twitterBearerToken);
  const followers = await twitterApi.getFollowers(twitterIds);
  const sortedFollowers = sortFollowers(followers);

  outputResult(sortedFollowers);
}
