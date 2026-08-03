import Stripe from "stripe";

/**
 * Handles the `issuing_transaction.created` webhook event.
 *
 * Fired when a completed purchase settles into a transaction (i.e. funds are
 * actually captured). Use this to persist the transaction record and update
 * any related balance or spending tracking.
 */
export function handleTransactionCreated(
    transaction: Stripe.Issuing.Transaction,
) {
    console.log("[Stripe Webhook] issuing_transaction.created", transaction.id);
    // TODO: persist transaction record
}
