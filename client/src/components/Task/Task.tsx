import './task.scss';

type Props = {
    title: string;
    description: string;
}

export const Task = ({ title, description }: Props) => {
    return (
        <div className="task-container">
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>
        </div>
    )
}