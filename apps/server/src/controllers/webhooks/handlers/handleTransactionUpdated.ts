import Stripe from "stripe";

/**
 * Handles the `issuing_transaction.updated` webhook event.
 *
 * Fired when an existing transaction is modified — e.g. disputes, refunds,
 * or metadata changes. Use this to sync the latest transaction state to the
 * database.
 */
export function handleTransactionUpdated(
    transaction: Stripe.Issuing.Transaction,
) {
    console.log("[Stripe Webhook] issuing_transaction.updated", transaction.id);
    // TODO: update transaction record
}
