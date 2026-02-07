const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

//helper function for delay
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//callback example
app.get('/callback', (req, res) => {
    setTimeout(() => {
        try {
            const data = { id: 1, name: 'Amber' };
            res.json({ data });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }, 1000);
});

//promise example
app.get('/promise', (req, res) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 2, name: 'Amber' };
            resolve(data);
        }, 1000);
    })
    .then(data => res.json({ data }))
    .catch(e => res.status(500).json({ error: e.message }));
});

//async/await example
app.get('/async', async (req, res) => {
    try {
        await simulateDelay(1000);
        const data = { id: 3, name: 'Amber' };
        res.json({ data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//read file example
app.get('/file', async (req, res) => {
    try {
        const data = await fs.readFile('sample.txt', 'utf-8');
        res.json({ data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//chain example
app.get('/chain', async (req, res) => {
    try {
        const steps = [];

        await simulateDelay(500);
        steps.push("Login complete");

        await simulateDelay(500);
        steps.push("Fetched user data");

        await simulateDelay(500);
        steps.push("Rendered UI");

        res.json({ steps });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//start server
const start = () => { console.log("Server is running. http://localhost:3000/")}
app.listen(port,start);