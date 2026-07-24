import Stripe from "stripe";

import { stripeSecretKey } from "../../config/index.js";
import { StripeApiError } from "./errors.js";

export const stripeClient = new Stripe(stripeSecretKey);

type StripeCallOptions = {
    /**
     * Context for logging (e.g. "createCardholder").
     */
    operation: string;
};

/**
 * Wraps a Stripe SDK call with structured error handling.
 *
 * @example
 * ```typescript
 * const cardholder = await callStripe(
 *     () => stripeClient.issuing.cardholders.create({ ... }),
 *     { operation: "createCardholder" }
 * );
 * ```
 */
export async function callStripe<T>(
    fn: () => Promise<T>,
    opts: StripeCallOptions,
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (error instanceof Stripe.errors.StripeAPIError) {
            const stripeError = new StripeApiError(error);

            console.error(`[Stripe] ${opts.operation} failed`, {
                type: stripeError.type,
                statusCode: stripeError.statusCode,
                code: stripeError.code,
                message: stripeError.message,
                declineCode: stripeError.declineCode,
                requestId: stripeError.requestId,
            });

            throw stripeError;
        }

        if (error instanceof Stripe.errors.StripeConnectionError) {
            console.error(`[Stripe] ${opts.operation} network error`, {
                message: (error as Error).message,
            });

            throw new StripeApiError(
                Object.assign(error, {
                    statusCode: 503,
                    type: "api_error",
                }) as unknown as Stripe.errors.StripeAPIError,
            );
        }

        console.error(`[Stripe] ${opts.operation} unexpected error`, { error });

        throw error;
    }
}
