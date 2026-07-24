import expressRouter from "express-promise-router";

export const stripeWebhooksRouter = expressRouter();

stripeWebhooksRouter.post("/", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});
