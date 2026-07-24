import Stripe from "stripe";

export type StripeErrorType =
    "api_error" | "card_error" | "idempotency_error" | "invalid_request_error";

/**
 * Structured error from a failed Stripe API call.
 */
export class StripeApiError extends Error {
    readonly type: StripeErrorType;
    readonly statusCode: number;
    readonly code: string | undefined;
    readonly param: string | undefined;
    readonly declineCode: string | undefined;
    readonly requestId: string | undefined;

    constructor(raw: Stripe.errors.StripeAPIError) {
        const msg = raw.message || "An unknown Stripe error occurred";
        super(msg);

        this.name = "StripeApiError";
        this.type = (raw.type as StripeErrorType) ?? "api_error";
        this.statusCode = raw.statusCode ?? 500;
        this.code = raw.code ?? undefined;
        this.param =
            raw.rawType === "invalid_request_error"
                ? (raw as unknown as { param?: string }).param
                : undefined;
        this.declineCode =
            (raw as unknown as { decline_code?: string }).decline_code ??
            undefined;
        this.requestId = raw.headers?.["request-id"] as string | undefined;
    }

    get isRetryable(): boolean {
        return (
            this.statusCode === 429 ||
            this.statusCode >= 500 ||
            this.type === "api_error"
        );
    }
}
