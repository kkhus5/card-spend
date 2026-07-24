import { Customer } from "../../models/Customer/types.js";
import { callStripe, stripeClient } from "./shared.js";

/**
 * Creates a new Issuing Cardholder object that can be issued cards.
 *
 * @see https://docs.stripe.com/api/issuing/cardholders/create
 */
export const createCardholder = async (customer: Customer): Promise<string> => {
    const cardholder = await callStripe(
        () =>
            stripeClient.issuing.cardholders.create({
                name: `${customer.firstName} ${customer.lastName}`,
                email: customer.email ?? undefined,
                phone_number: customer.phoneNumber,
                status: "active",
                type: "individual",
                individual: {
                    first_name: customer.firstName,
                    last_name: customer.lastName,
                    dob: {
                        day: customer.dob.day,
                        month: customer.dob.month,
                        year: customer.dob.year,
                    },
                },
                billing: {
                    address: {
                        line1: customer.primaryAddress.line1,
                        line2: customer.primaryAddress.line2 ?? undefined,
                        city: customer.primaryAddress.city,
                        state: customer.primaryAddress.state ?? undefined,
                        postal_code: customer.primaryAddress.postalCode,
                        country: customer.primaryAddress.country,
                    },
                },
            }),
        { operation: "createCardholder" },
    );

    return cardholder.id;
};
