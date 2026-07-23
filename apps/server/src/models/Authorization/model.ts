import { HydratedDocument, model, Schema, Types } from "mongoose";

import {
    Authorization,
    AuthorizationCurrency,
    AuthorizationStatus,
    MerchantAddress,
} from "./types.js";

/**
 * Document fields with `_id` as `ObjectId` instead of `string`.
 */
export type AuthorizationDocumentFields = Omit<
    Authorization,
    "_id" | "customerId" | "cardId"
> & {
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
    cardId: Types.ObjectId;
};

/**
 * Mongoose document type for `Authorization` model.
 */
export type AuthorizationDocument =
    HydratedDocument<AuthorizationDocumentFields>;

const MerchantAddressSchema = new Schema<MerchantAddress>(
    {
        city: { type: String, required: false, default: null },
        country: { type: String, required: false, default: null },
        state: { type: String, required: false, default: null },
        postalCode: { type: String, required: false, default: null },
    },
    { _id: false, timestamps: false },
);

const AuthorizationSchema = new Schema<AuthorizationDocumentFields>(
    {
        paymentProcessorId: { type: String, required: true, unique: true },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        cardId: { type: Schema.Types.ObjectId, ref: "Card", required: true },
        status: {
            type: String,
            required: true,
            enum: Object.values(AuthorizationStatus),
        },
        amount: { type: Number, required: true },
        currency: {
            type: String,
            required: true,
            enum: Object.values(AuthorizationCurrency),
        },
        approved: { type: Boolean, required: true },
        declineReason: { type: String, required: false, default: "" },
        merchantName: { type: String, required: false, default: null },
        merchantAddress: { type: MerchantAddressSchema, required: true },
        merchantCategoryCode: { type: String, required: true },
        merchantCategory: { type: String, required: true },
        merchantNetworkId: { type: String, required: true },
    },
    { timestamps: true },
);

AuthorizationSchema.index({ customerId: 1 });
AuthorizationSchema.index({ cardId: 1 });

/**
 * Mongoose model for the `Authorization` collection.
 */
export const AuthorizationModel = model<AuthorizationDocumentFields>(
    "Authorization",
    AuthorizationSchema,
);
