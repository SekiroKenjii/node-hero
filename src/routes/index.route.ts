import express, { Router } from "express";

const indexRoute: Router = express.Router();

// Root route
indexRoute.get('/', (req, res, next) => {
    return res.status(200).send("Node Server root route");
});

export default indexRoute;