import expressRouter from "express-promise-router";

import { stripeWebhooksRouter } from "./stripe.js";

export const webhooksRouter = expressRouter();

webhooksRouter.use("/stripe", stripeWebhooksRouter);
