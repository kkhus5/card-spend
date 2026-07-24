import { callStripe, stripeClient } from "./shared.js";

type CreateCardParams = {
    /**
     * The Stripe cardholder ID (e.g. "ich_...").
     */
    cardholderId: string;

    /**
     * Card type: virtual (no physical card) or physical (printed and shipped).
     */
    type: "virtual" | "physical";

    /**
     * Whether authorizations can be approved on this card. Defaults to "inactive".
     */
    status?: "active" | "inactive";
};

/**
 * Creates a new Issuing Card object.
 *
 * @see https://docs.stripe.com/api/issuing/cards/create
 */
export const createCard = async (params: CreateCardParams): Promise<string> => {
    const card = await callStripe(
        () =>
            stripeClient.issuing.cards.create({
                cardholder: params.cardholderId,
                currency: "usd",
                type: params.type,
                status: params.status ?? "inactive",
            }),
        { operation: "createCard" },
    );

    return card.id;
};
