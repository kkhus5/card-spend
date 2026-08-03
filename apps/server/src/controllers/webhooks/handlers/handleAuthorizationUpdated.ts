import Stripe from "stripe";

/**
 * Handles the `issuing_authorization.updated` webhook event.
 *
 * Fired when an existing authorization is modified — e.g. incremental
 * authorizations, partial reversals, or status transitions. Use this to
 * sync the latest authorization state to the database.
 */
export function handleAuthorizationUpdated(
    authorization: Stripe.Issuing.Authorization,
) {
    console.log(
        "[Stripe Webhook] issuing_authorization.updated",
        authorization.id,
    );
    // TODO: update authorization record
}
