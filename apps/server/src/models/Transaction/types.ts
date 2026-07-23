export enum TransactionType {
    CAPTURE = "capture",
    REFUND = "refund",
    REFUND_REVERSAL = "refund_reversal",
}

export enum TransactionCurrency {
    USD = "USD",
}

export type MerchantAddress = {
    city: string | null;
    country: string | null;
    state: string | null;
    postalCode: string | null;
};

/**
 * Domain model for card spend activity that results in funds leaving or
 * entering a cardholder's account.
 */
export interface Transaction {
    /** (PK) UUID. */
    _id: string;

    /**
     * Unique identifier of transaction from payment processor (Stripe).
     */
    paymentProcessorId: string;

    /**
     * The customer who made the transaction.
     * (FK) UUID.
     */
    customerId: string;

    /**
     * The card used to make the transaction.
     * (FK) UUID.
     */
    cardId: string;

    /**
     * The authorization/pre-capture details of the transaction.
     * `null` if no linked authorization request.
     * (FK) UUID.
     */
    authorizationId: string | null;

    /**
     * The transaction amount, in lowest currency unit (negative-normal
     * convention).
     */
    amount: number;

    /**
     * The currency of the cardholder.
     * Only `USD` supported for now.
     */
    currency: TransactionCurrency;

    /**
     * When transaction was created by payment processor (Stripe).
     */
    txnCreatedAt: Date;

    /**
     * The nature of the transaction: `capture` (funds debited), `refund` (funds
     * returned or credited), and `refund_reversal` (refund reversed).
     */
    type: TransactionType;

    /**
     * Raw name of seller involved in transaction.
     */
    merchantName: string | null;

    /**
     * Address of seller involved in transaction.
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
     * Domain categorization of the seller's type of business.
     */
    mappedCategory: string;

    /**
     * Timestamp of when transaction record was created in our system.
     */
    createdAt: Date;

    /**
     * Timestamp of when transaction record was last updated in our system.
     */
    updatedAt: Date;
}
