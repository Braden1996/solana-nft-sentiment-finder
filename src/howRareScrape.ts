import Nightmare from 'nightmare';
import { TWITTER_URL } from './twitter/twitterUtils';

const HOW_RARE_SOLANA_DROPS = 'https://howrare.is/drops';

const nightmare = new Nightmare();

export const getProjectTwitterUrls = () =>
  (nightmare
    .goto(HOW_RARE_SOLANA_DROPS)
    .evaluate(
      ((TWITTER_URL: string) => {
        const twitterIcons = document.querySelectorAll('.fa-twitter');

        const twitterLinks: string[] = [];
        twitterIcons.forEach(icon => {
          const closestLink = icon.closest('a');
          if (!closestLink || !closestLink.href.startsWith(TWITTER_URL)) return;
          twitterLinks.push(icon.closest('a')!.href);
        });

        return twitterLinks;

        // Note: we use Nightmare v3, but our types are V2.
      }) as any,
      TWITTER_URL as any
    )
    .end() as any) as Promise<string[]>;
