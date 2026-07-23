import { HydratedDocument, model, Schema, Types } from "mongoose";

import {
    MerchantAddress,
    Transaction,
    TransactionCurrency,
    TransactionType,
} from "./types.js";

/**
 * Document fields with `_id` as `ObjectId` instead of `string`.
 */
export type TransactionDocumentFields = Omit<
    Transaction,
    "_id" | "customerId" | "cardId" | "authorizationId"
> & {
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
    cardId: Types.ObjectId;
    authorizationId: Types.ObjectId | null;
};

/**
 * Mongoose document type for `Transaction` model.
 */
export type TransactionDocument = HydratedDocument<TransactionDocumentFields>;

const MerchantAddressSchema = new Schema<MerchantAddress>(
    {
        city: { type: String, required: false, default: null },
        country: { type: String, required: false, default: null },
        state: { type: String, required: false, default: null },
        postalCode: { type: String, required: false, default: null },
    },
    { _id: false, timestamps: false },
);

const TransactionSchema = new Schema<TransactionDocumentFields>(
    {
        paymentProcessorId: { type: String, required: true, unique: true },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        cardId: { type: Schema.Types.ObjectId, ref: "Card", required: true },
        authorizationId: {
            type: Schema.Types.ObjectId,
            ref: "Authorization",
            required: false,
            default: null,
        },
        amount: { type: Number, required: true },
        currency: {
            type: String,
            required: true,
            enum: Object.values(TransactionCurrency),
        },
        txnCreatedAt: { type: Date, required: true },
        type: {
            type: String,
            required: true,
            enum: Object.values(TransactionType),
        },
        merchantName: { type: String, required: false, default: null },
        merchantAddress: { type: MerchantAddressSchema, required: true },
        merchantCategoryCode: { type: String, required: true },
        merchantCategory: { type: String, required: true },
        merchantNetworkId: { type: String, required: true },
        mappedCategory: { type: String, required: true },
    },
    { timestamps: true },
);

TransactionSchema.index({ customerId: 1 });
TransactionSchema.index({ cardId: 1 });
TransactionSchema.index({ authorizationId: 1 });

/**
 * Mongoose model for the `Transaction` collection.
 */
export const TransactionModel = model<TransactionDocumentFields>(
    "Transaction",
    TransactionSchema,
);
