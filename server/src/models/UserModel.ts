import { Schema, model, Document } from 'mongoose';
import { UserDTO } from '../dtos/UserDTO';

interface IUser extends Document {
    email: string;
    password: string;
};

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        unique: true
    }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;