export enum AuthorizationStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    CANCELED = "canceled",
}

export enum AuthorizationCurrency {
    USD = "USD",
}

export type MerchantAddress = {
    city: string | null;
    country: string | null;
    state: string | null;
    postalCode: string | null;
};

/**
 * Domain model for a cardholder's attempt to make a purchase on a card.
 */
export interface Authorization {
    /** (PK) UUID. */
    _id: string;

    /**
     * Unique identifier of authorization from payment processor (Stripe).
     */
    paymentProcessorId: string;

    /**
     * The customer who initiated the authorization request.
     * (FK) UUID.
     */
    customerId: string;

    /**
     * The card associated with the authorization.
     * (FK) UUID.
     */
    cardId: string;

    /**
     * The current status of the authorization: completed (authorization approved
     * or rejected), pending (awaiting decision or capture), or canceled (expired
     * or merchant reversed).
     */
    status: AuthorizationStatus;

    /**
     * The total amount that was authorized or rejected, in lowest currency unit.
     */
    amount: number;

    /**
     * The currency of the cardholder.
     * Only `USD` supported for now.
     */
    currency: AuthorizationCurrency;

    /**
     * Whether the authorization was approved or declined.
     */
    approved: boolean;

    /**
     * Decline reason if authorization rejected.
     */
    declineReason: string;

    /**
     * Raw name of seller associated with authorization.
     */
    merchantName: string | null;

    /**
     * Address of seller associated with authorization.
     */
    merchantAddress: MerchantAddress;

    /**
     * Merchant category code of seller.
     */
    merchantCategoryCode: string;

    /**
     * Categorization of the seller's type of business as determined by the
     * payment processor (Stripe).
     */
    merchantCategory: string;

    /**
     * Identifier assigned to the seller by the card network.
     */
    merchantNetworkId: string;

    /**
     * Timestamp of when authorization record was created in our system.
     */
    createdAt: Date;

    /**
     * Timestamp of when authorization record was last updated in our system.
     */
    updatedAt: Date;
}
