import { Schema, model, Document, Types } from "mongoose";

interface ITask extends Document {
    title: string;
    description: string;
    userId: Types.ObjectId;
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
    }
});

const TaskModel = model<ITask>('Task', taskSchema);

export default TaskModel;