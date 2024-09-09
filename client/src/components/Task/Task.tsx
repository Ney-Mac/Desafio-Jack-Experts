import { useState } from 'react';

import { TaskType } from '../../types/TaskType';
import { EditTaskModal } from '../EditTaskModal/EditTaskModal';

import { SmallButton } from '../Button/SmallButton';
import { DeleteTaskModal } from '../DeleteTaskModal/DeleteTaskModal';

import './task.scss';

export const Task = ({ title, description, id }: TaskType) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onEditClick = () => {
        setShowModal(true);
    }

    const onDeleteClick = () => {
        setShowDeleteModal(true);
    }

    return (
        <div className="task-container">
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>

            <div className="btn-container">
                <SmallButton type='success' onClick={onEditClick}>Editar</SmallButton>
                <SmallButton type='error' onClick={onDeleteClick}>Apagar</SmallButton>
            </div>

            <EditTaskModal
                open={showModal}
                setOpen={setShowModal}
                id={id}
                title={title}
                description={description}
            />

            <DeleteTaskModal
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                id={id}
            />
        </div>
    )
}