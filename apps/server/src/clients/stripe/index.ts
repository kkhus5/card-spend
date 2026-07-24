import { createCard } from "./createCard.js";
import { createCardholder } from "./createCardholder.js";

/**
 * Client for the Stripe API.
 *
 * @example
 *
 * ```typescript
 * const cardholder = await StripeClient.createCardholder({ ... });
 * const card = await StripeClient.createCard({ ... });
 * ```
 */
export const StripeClient = {
    /**
     * Creates a new Issuing Cardholder object that can be issued cards.
     *
     * @see https://docs.stripe.com/api/issuing/cardholders/create
     */
    createCardholder,

    /**
     * Creates a new Issuing Card object.
     *
     * @see https://docs.stripe.com/api/issuing/cards/create
     */
    createCard,
};
