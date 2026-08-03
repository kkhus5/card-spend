import Stripe from "stripe";

/**
 * Handles the `issuing_authorization.request` webhook event.
 *
 * Fired in real time when an issued card is used and Stripe is awaiting an
 * approve/decline decision. This handler must respond quickly (within ~2s)
 * by calling `stripeClient.issuing.authorizations.approve()` or `.decline()`.
 */
export function handleAuthorizationRequest(
    authorization: Stripe.Issuing.Authorization,
) {
    console.log(
        "[Stripe Webhook] issuing_authorization.request",
        authorization.id,
    );
    // TODO: approve/decline the real-time authorization
}
