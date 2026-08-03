import type { Request, Response } from "express";
import expressRouter from "express-promise-router";
import Stripe from "stripe";

import { stripeWebhookSecret } from "../../config/index.js";
import { stripeClient } from "../../clients/stripe/shared.js";
import {
    handleAuthorizationCreated,
    handleAuthorizationRequest,
    handleAuthorizationUpdated,
    handleTransactionCreated,
    handleTransactionUpdated,
} from "../../controllers/webhooks/index.js";

export const stripeWebhooksRouter = expressRouter();

stripeWebhooksRouter.post("/", (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
        res.status(400).json({ error: "Missing stripe-signature header." });
        return;
    }

    let event: Stripe.Event;
    try {
        event = stripeClient.webhooks.constructEvent(
            req.body,
            signature,
            stripeWebhookSecret,
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error.";

        console.error(
            "[Stripe Webhook] Signature verification failed:",
            message,
        );

        res.status(400).json({
            error: "Webhook signature verification failed.",
        });
        return;
    }

    switch (event.type) {
        case "issuing_authorization.created":
            handleAuthorizationCreated(event.data.object);
            break;
        case "issuing_authorization.request":
            handleAuthorizationRequest(event.data.object);
            break;
        case "issuing_authorization.updated":
            handleAuthorizationUpdated(event.data.object);
            break;
        case "issuing_transaction.created":
            handleTransactionCreated(event.data.object);
            break;
        case "issuing_transaction.updated":
            handleTransactionUpdated(event.data.object);
            break;
        default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.sendStatus(200);
});
