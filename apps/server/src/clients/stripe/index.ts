import { createCardholder } from "./createCardholder.js";

/**
 * Client for the Stripe API.
 *
 * @example
 *
 * ```typescript
 * const cardholder = await StripeClient.createCardholder({ ... });
 * ```
 */
export const StripeClient = {
    /**
     * Creates a new Issuing Cardholder object that can be issued cards.
     *
     * @see https://docs.stripe.com/api/issuing/cardholders/create
     */
    createCardholder,
};
