import { Types } from "mongoose";

export const isSameUser = (taskCreatorId: Types.ObjectId, userEditorId: string) => {
    return String(taskCreatorId) === userEditorId;
}