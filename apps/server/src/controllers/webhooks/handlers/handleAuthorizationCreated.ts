import Stripe from "stripe";

/**
 * Handles the `issuing_authorization.created` webhook event.
 *
 * Fired when a new authorization is created on an issued card, regardless of
 * whether it was approved or declined. Use this to persist the initial
 * authorization record in the database.
 */
export function handleAuthorizationCreated(
    authorization: Stripe.Issuing.Authorization,
) {
    console.log(
        "[Stripe Webhook] issuing_authorization.created",
        authorization.id,
    );
    // TODO: persist authorization record
}
