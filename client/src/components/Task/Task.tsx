import { useState } from 'react';

import { TaskType } from '../../types/TaskType';
import { EditTaskModal } from '../EditTaskModal/EditTaskModal';

import { SmallButton } from '../Button/SmallButton';
import { DeleteTaskModal } from '../DeleteTaskModal/DeleteTaskModal';

import { Checkbox } from '../Checkbox/Checkbox';

import { completeTask } from '../../api/completeTask';

import { useAuth } from '../../utils/useAuth';

import './task.scss';

export const Task = ({ title, description, id, complete }: TaskType) => {
    const { user } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isChecked, setIsChecked] = useState(complete || false);

    const onEditClick = () => {
        setShowModal(true);
    }

    const onDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const onCheckClick = () => {
        completeTask(id, user?.token!, !isChecked).then(() => {
            setIsChecked(!isChecked);
        });
    }

    return (
        <div className="task-container">
            <div className="checkbox-container">
                <Checkbox
                    id={id}
                    isChecked={isChecked}
                    onClick={onCheckClick}
                    text={`${isChecked ? 'Concluido' : 'Concluir'}`}
                />
            </div>

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