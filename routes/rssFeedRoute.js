import { Router } from 'express';
import axios from 'axios';
import { parseString } from 'xml2js';

const rssFeedRouter = Router();

rssFeedRouter.get('/rss-feed', async (req, res) => {
    try {
        const feedUrl = 'https://www.barrierefrei-aufgerollt.at/feed/';
        const response = await axios.get(feedUrl);

        parseString(response.data, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Fehler beim Parsen des RSS-Feeds' });
            }

            const feedItems = result.rss.channel[0].item.map(item => ({
                title: item.title[0],
                link: item.link[0],
                description: item.description[0],
                pubDate: item.pubDate[0],
                author: item['dc:creator'] ? item['dc:creator'][0] : null,
            }));

            res.json({ feed: feedItems });
        });
    } catch (error) {
        console.error('Fehler beim Abrufen des RSS-Feeds:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des RSS-Feeds' });
    }
});

export default rssFeedRouter;
