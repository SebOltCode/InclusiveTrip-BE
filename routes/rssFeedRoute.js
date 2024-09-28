import { Router } from 'express';
import axios from 'axios';

const rssFeedRouter = Router();

rssFeedRouter.get('/rss-feed', async (req, res) => {
    try {
        const feedUrl = 'https://www.barrierefrei-aufgerollt.at/feed/';
        const response = await axios.get(feedUrl);
        res.json({ feed: response.data });
    } catch (error) {
        console.error('Fehler beim Abrufen des RSS-Feeds:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des RSS-Feeds' });
    }
});

export default rssFeedRouter;
