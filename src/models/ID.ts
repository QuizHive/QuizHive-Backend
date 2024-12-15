import mongoose from "mongoose";

export default class ID {

    // Validate if the string is a valid MongoDB ObjectId
    public static isValid(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    // Static method to create an ID instance
    public static from(id: string): ID {
        return new ID(id);
    }
    private readonly value: string;

    constructor(id: string) {
        if (!ID.isValid(id))
            throw new Error(`Invalid ID: ${id}`);
        this.value = id;
    }

    // Convert the ID instance back to a string
    public toString(): string {
        return this.value;
    }

    // Return the value as a MongoDB ObjectId (if needed for Mongoose queries)
    public toObjectId(): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(this.value);
    }

    // Compare two ID instances
    equals(other: ID): boolean {
        return this.value === other.value;
    }
}
