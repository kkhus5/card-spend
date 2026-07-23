export type Address = {
    line1: string;
    line2: string | null;
    city: string;
    country: string;
    state: string | null;
    postalCode: string;
};

/**
 * Domain type for a customer/cardholder in our system.
 */
export interface Customer {
    /** (PK) UUID. */
    _id: string;

    /**
     * Unique identifier of customer from payment processor (Stripe).
     */
    paymentProcessorId: string;

    /**
     * The customer's name.
     */
    name: string;

    /**
     * The customer's phone number.
     */
    phoneNumber: string;

    /**
     * The customer's email.
     */
    email: string | null;

    /**
     * Default/primary address of customer.
     */
    primaryAddress: Address;

    /**
     * Optional secondary address of customer.
     */
    secondaryAddress: Address | null;

    /**
     * Timestamp of when customer record was created in our system.
     */
    createdAt: Date;

    /**
     * Timestamp of when customer record was last updated in our system.
     */
    updatedAt: Date;
}
