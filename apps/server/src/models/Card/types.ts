export enum CardStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    FROZEN = "frozen",
}

/**
 * Domain model for a card issued to a customer/cardholder.
 */
export interface Card {
    /** (PK) UUID. */
    _id: string;

    /**
     * The customer/cardholder this card belongs to.
     * (FK) UUID.
     */
    customerId: string;

    /**
     * Unique identifier of card from payment processor (Stripe).
     */
    paymentProcessorId: string;

    /**
     * The status of the card: active (card can initiate authorizations),
     * inactive (card closed or canceled and unable to initiate authorizations),
     * or frozen (card frozen and unable to initiate authorizations, possibly due
     * to fraud reasons).
     */
    status: CardStatus;

    /**
     * If card frozen, then optional reason for frozen status.
     */
    freezeReason: string | null;
}
