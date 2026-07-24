import { Authorization } from "../../models/Authorization/types.js";
import { callStripe, mapStripeAuthorization, stripeClient } from "./shared.js";

type CaptureTestAuthorizationParams = {
    /**
     * The Stripe authorization ID (e.g. "iauth_...").
     */
    authorizationId: string;

    /**
     * Amount to capture in smallest currency unit. If omitted, captures the full authorization amount.
     */
    captureAmount?: number;

    /**
     * Whether to close the authorization after capture. Defaults to true.
     */
    closeAuthorization?: boolean;
};

/**
 * Captures a test-mode Issuing authorization to simulate settlement.
 *
 * WARNING: This function uses Stripe Test Helpers and must NEVER be called in
 * production. It exists solely to simulate the capture/settlement of an
 * authorization that would normally be initiated by the merchant/acquirer.
 *
 * @see https://docs.stripe.com/api/issuing/authorizations/capture_test_mode
 */
export const captureTestAuthorization = async (
    params: CaptureTestAuthorizationParams,
): Promise<
    Omit<
        Authorization,
        "_id" | "customerId" | "cardId" | "createdAt" | "updatedAt"
    >
> => {
    const authorization = await callStripe(
        () =>
            stripeClient.testHelpers.issuing.authorizations.capture(
                params.authorizationId,
                {
                    capture_amount: params.captureAmount,
                    close_authorization: params.closeAuthorization,
                },
            ),
        { operation: "captureTestAuthorization" },
    );

    return mapStripeAuthorization(authorization);
};
