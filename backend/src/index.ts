import express, { Request, Response, NextFunction } from 'express';
// const axios = require('axios');
import fetch from "node-fetch"


const app = express();
const port = 8080;

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/instagram/:handle', async (req: Request, res: Response) => {
    const { handle } = req.params;

    const url = `https://www.instagram.com/${handle}/?__a=1`

    const response = await fetch(url).then(res => res.json());

    // console.log(response.data);

    res.send(`'Hello World!' ${response}`)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});