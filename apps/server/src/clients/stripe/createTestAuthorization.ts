import {
    Authorization,
    AuthorizationCurrency,
} from "../../models/Authorization/types.js";
import { callStripe, mapStripeAuthorization, stripeClient } from "./shared.js";

type CreateTestAuthorizationParams = {
    /**
     * The Stripe card ID (e.g. "ic_...").
     */
    cardId: string;

    /**
     * Amount in smallest currency unit (e.g. cents). Defaults to 100 if not provided.
     */
    amount?: number;

    /**
     * Currency code. Defaults to "usd".
     */
    currency?: AuthorizationCurrency;
};

/**
 * Creates a test-mode Issuing authorization to simulate a cardholder purchase.
 *
 * WARNING: This function uses Stripe Test Helpers and must NEVER be called in
 * production. It exists solely to simulate real-world authorization events
 * that would normally originate from the card network.
 *
 * @see https://docs.stripe.com/api/issuing/authorizations/create_test_mode
 */
export const createTestAuthorization = async (
    params: CreateTestAuthorizationParams,
): Promise<
    Omit<
        Authorization,
        "_id" | "customerId" | "cardId" | "createdAt" | "updatedAt"
    >
> => {
    const authorization = await callStripe(
        () =>
            stripeClient.testHelpers.issuing.authorizations.create({
                card: params.cardId,
                amount: params.amount ?? 100,
                currency: params.currency ?? "usd",
            }),
        { operation: "createTestAuthorization" },
    );

    return mapStripeAuthorization(authorization);
};
