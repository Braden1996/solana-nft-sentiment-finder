import { orderBy } from 'lodash';
import { TwitterResponse } from './twitterTypes';

export const TWITTER_URL = 'https://twitter.com/';

const twitterUrlToId = (id: string) => {
  const withoutUrlStart = id.slice(TWITTER_URL.length);
  return withoutUrlStart.includes('?')
    ? withoutUrlStart.slice(0, withoutUrlStart.indexOf('?'))
    : withoutUrlStart;
};

export const twitterUrlsToIds = (twitterUrls: string[]) =>
  twitterUrls
    .map(twitterUrlToId)
    .filter(id => id.match('^[A-Za-z0-9_]{1,15}$'))
    .filter((id, idx, slf) => idx === slf.lastIndexOf(id));

export const sortFollowers = (followers: TwitterResponse[]) =>
  orderBy(followers, [user => user.public_metrics.followers_count], ['desc']);
