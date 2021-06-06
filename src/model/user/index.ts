import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

export const User: Model<IUser> = model('User', UserSchema);