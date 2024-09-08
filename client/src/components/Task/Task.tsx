import { TaskType } from '../../types/TaskType';
import './task.scss';

export const Task = ({ title, description }: TaskType) => {
    return (
        <div className="task-container">
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>
        </div>
    )
}