import express from 'express';
import cors from 'cors';

import {
    getVoteItems,
    addVoteItem,
    start,
    stop,
    vote,
    deleteItem,
    getIsStarted,
    isCanVote,
} from './routes.mjs';

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/voteItems', getVoteItems);
app.get('/api/isStarted', getIsStarted);
app.get('/api/votedUsers', getVoteItems);
app.get('/api/canVote/:id', isCanVote);
app.post('/api/voteItems', addVoteItem);
app.get('/api/start', start);
app.get('/api/stop', stop);
app.put('/api/voteItems/:id', vote);
app.delete('/api/voteItems/:id', deleteItem);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));