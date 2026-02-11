const express = require("express");
const pool = require("./db");
const redis = require("./redis");
const client = require("prom-client");

const app = express();
const register = new client.Registry();

const httpRequests = new client.Counter({
    name: "http_requests_total",
    help: "Total requests",
});
register.registerMetric(httpRequests);

app.get("/result/:roll", async(req, res) => {
    httpRequests.inc();
    const roll = req.params.roll;

    const cache = await redis.get(roll);
    if (cache) return res.json(JSON.parse(cache));

    const data = await pool.query(
        "SELECT * FROM results WHERE roll_no=$1", [roll]
    );

    await redis.set(roll, JSON.stringify(data.rows[0]));
    res.json(data.rows[0]);
});

app.get("/metrics", async(req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.listen(3000, () => console.log("Server running on 3000"));