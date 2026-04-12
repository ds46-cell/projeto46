import express from 'express';

const app = express();
app.use(express.json());

app.post('/risk', (req, res) => {
    const { value, criticality } = req.body;

    const base = value / 1000 + (criticality || 1);

    res.json({
        risk_before: Number(base.toFixed(2)),
        risk_after: Number((base * 0.75).toFixed(2))
    });
});

app.get('/license/check', (req, res) => {
    res.json({ valid: true });
});

app.listen(4000, () => {
    console.log("🧠 CORE rodando na porta 4000");
});