
const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.json());

// Helper functions
function calculateSum(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function calculateFactorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function reverseText(text) {
    return Array.from(text).reverse().join("");
}

function validNumber(n, max = 100000) {
    return Number.isSafeInteger(n) && n >= 0 && n <= max;
}

// Home route
app.get("/", (req, res) => {
    res.json({ message: "Six API Project is running!" });
});

// GET 1: Factorial
app.get("/api/factorial", (req, res) => {
    const n = Number(req.query.n);

    if (!validNumber(n, 18)) {
        return res.status(400).json({ error: "n must be an integer from 0 to 18" });
    }

    res.json({ number: n, factorial: calculateFactorial(n) });
});

// GET 2: Sum
app.get("/api/sum", (req, res) => {
    const n = Number(req.query.n);

    if (!validNumber(n)) {
        return res.status(400).json({ error: "n must be a non-negative integer up to 100000" });
    }

    res.json({ number: n, sum: calculateSum(n) });
});

// GET 3: Reverse text
app.get("/api/reverse", (req, res) => {
    const text = req.query.text;

    if (typeof text !== "string") {
        return res.status(400).json({ error: "Provide text using ?text=hello" });
    }

    res.json({ original: text, reversed: reverseText(text) });
});

// POST 1: Factorial
app.post("/api/factorial", (req, res) => {
    const n = req.body.n;

    if (!validNumber(n, 18)) {
        return res.status(400).json({ error: "n must be an integer from 0 to 18" });
    }

    res.json({ number: n, factorial: calculateFactorial(n) });
});

// POST 2: Sum
app.post("/api/sum", (req, res) => {
    const n = req.body.n;

    if (!validNumber(n)) {
        return res.status(400).json({ error: "n must be a non-negative integer up to 100000" });
    }

    res.json({ number: n, sum: calculateSum(n) });
});

// POST 3: Reverse text
app.post("/api/reverse", (req, res) => {
    const text = req.body.text;

    if (typeof text !== "string") {
        return res.status(400).json({ error: "Provide text as a string in the JSON body" });
    }

    res.json({ original: text, reversed: reverseText(text) });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
