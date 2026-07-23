import { HydratedDocument, model, Schema, Types } from "mongoose";

import { Address, Customer } from "./types.js";

/**
 * Document fields with `_id` as `ObjectId` instead of `string`.
 */
export type CustomerDocumentFields = Omit<Customer, "_id"> & {
    _id: Types.ObjectId;
};

/**
 * Mongoose document type for `Customer` model.
 *
 * Represents a customer/cardholder in our system.
 */
export type CustomerDocument = HydratedDocument<CustomerDocumentFields>;

const AddressSchema = new Schema<Address>(
    {
        line1: { type: String, required: true },
        line2: { type: String, required: false },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: false },
        postalCode: { type: String, required: true },
    },
    { timestamps: false },
);

const CustomerSchema = new Schema<CustomerDocumentFields>(
    {
        paymentProcessorId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        primaryAddress: { type: AddressSchema, required: true },
        secondaryAddress: { type: AddressSchema, required: false },
    },
    { timestamps: true },
);

/**
 * Mongoose model for the `Customer` collection.
 */
export const CustomerModel = model<CustomerDocumentFields>(
    "Customer",
    CustomerSchema,
);
