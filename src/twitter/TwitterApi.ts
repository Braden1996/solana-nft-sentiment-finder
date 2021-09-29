import axios, { AxiosInstance } from 'axios';
import { chunk } from 'lodash';
import { TwitterResponse } from './twitterTypes';

export class TwitterApi {
  private readonly api: AxiosInstance;

  constructor(bearerToken: string) {
    this.api = axios.create({
      baseURL: 'https://api.twitter.com/2',
      timeout: 1000,
      headers: {
        'User-Agent': 'v2UserLookupJS',
        authorization: `Bearer ${bearerToken}`,
      },
    });
  }

  async getFollowers(twitterIds: string[]) {
    let output: TwitterResponse[] = [];
    for (const twitterIdChunk of chunk(twitterIds, 100)) {
      try {
        const res = await this.api.get('/users/by', {
          params: {
            usernames: twitterIdChunk.join(','),
            'user.fields': 'public_metrics',
          },
        });
        output = output.concat(res.data.data);
      } catch {
        throw new Error('Unsuccessful request');
      }
    }

    return output;
  }
}
