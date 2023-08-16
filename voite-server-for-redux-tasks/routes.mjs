import {v4 as uuidv4} from 'uuid';
let voteItems = [];
let voteOnceByUserId = {};
let isStarted = false;

export function getVoteItems(req, res) {
    res.status(200).json(voteItems);
}
export function getIsStarted(req, res) {
    res.status(200).json(isStarted);
}

export function isCanVote(req, res) {
    const id = req.params.id;
    const isCanVote = !voteOnceByUserId[id];
    res.status(200).json(isCanVote);
}

export function addVoteItem(req, res) {
    if (isStarted) {
        res.status(403).json({ error: "Нельзя добавить элемент на голосование если оно началось" });
    }

    const voteItem = req.body;
    voteItems.push({...voteItem, id: uuidv4(), voted: []});
    res.status(200).json(voteItems);
}

export function start(req, res) {
    if (isStarted) {
        res.status(403).json({ error: "Нельзя запустить голосование повторно" });
    }
    voteOnceByUserId = {};
    voteItems = voteItems.map(item => ({
        ...item,
        voted: []
    }))
    isStarted = true;
    res.status(200).json(voteItems);
}

export function stop(req, res) {
    if (!isStarted) {
        res.status(403).json({ error: "Голосование еще не запущенно" });
    }
    isStarted = false;
    res.status(200).json(voteItems);
}

export function vote(req, res) {
    const id = req.params.id;
    const voteItem = voteItems.find(item => item.id === id);

    if (!isStarted) {
        res.status(403).json({ error: "Голосование еще не началось" });
    }

    const userName = req.get("X-Unique-Identifier");

    if (voteOnceByUserId[userName]) {
        res.status(403).json({ error: "Вы уже голосовали!" });
    } else {
        voteOnceByUserId[userName] = true;
    }

    if (voteItem) {
        const voted = voteItem.voted ?? [];
        voteItem.voted = [...voted, userName]
        res.json(voteItems);
    } else {
        res.status(404).json({ error: "Не удалось найти элемент" });
    }
}

export function deleteItem(req, res) {
    if (isStarted) {
        res.status(403).json({ error: "Нельзя удалить элемент на голосование если оно началось" });
    }
    const id = req.params.id;
    voteItems = voteItems.filter(item => item.id !== id);

    res.json(voteItems);
}