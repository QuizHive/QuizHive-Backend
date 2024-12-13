import mongoose from 'mongoose';

export default class ID {
    private readonly value: string;

    constructor(id: string) {
        if (!ID.isValid(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        this.value = id;
    }

    // Validate if the string is a valid MongoDB ObjectId
    static isValid(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    // Static method to create an ID instance
    static from(id: string): ID {
        return new ID(id);
    }

    // Convert the ID instance back to a string
    toString(): string {
        return this.value;
    }

    // Return the value as a MongoDB ObjectId (if needed for Mongoose queries)
    toObjectId(): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(this.value);
    }
}
