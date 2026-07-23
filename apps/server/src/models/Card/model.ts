import { HydratedDocument, model, Schema, Types } from "mongoose";

import { Card, CardStatus } from "./types.js";

/**
 * Document fields with `_id` as `ObjectId` instead of `string`.
 */
export type CardDocumentFields = Omit<Card, "_id" | "customerId"> & {
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
};

/**
 * Mongoose document type for `Card` model.
 */
export type CardDocument = HydratedDocument<CardDocumentFields>;

const CardSchema = new Schema<CardDocumentFields>(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        paymentProcessorId: { type: String, required: true, unique: true },
        status: {
            type: String,
            required: true,
            enum: Object.values(CardStatus),
        },
        freezeReason: { type: String, required: false, default: null },
    },
    { timestamps: true },
);

CardSchema.index({ customerId: 1 });

/**
 * Mongoose model for the `Card` collection.
 */
export const CardModel = model<CardDocumentFields>("Card", CardSchema);
