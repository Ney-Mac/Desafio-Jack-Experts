import { Schema, model, Document, Types } from "mongoose";

interface ITask extends Document {
    title: string;
    description: string;
    userId: Types.ObjectId;
    complete: boolean;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
});

const TaskModel = model<ITask>('Task', taskSchema);

export default TaskModel;