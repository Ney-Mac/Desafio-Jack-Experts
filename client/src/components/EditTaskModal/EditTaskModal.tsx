import { useState } from 'react';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import { useAuth } from '../../utils/useAuth';
import { editTask } from '../../api/editTask';
import { useRefresh } from '../../utils/useRefresh';

import { TaskType } from '../../types/TaskType';

import './editTaskModal.scss';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputType = {
    text: string;
    error: string;
    change: boolean;
}

export const EditTaskModal = ({ open, setOpen, id, title, description }: Props & TaskType) => {
    const { user } = useAuth();
    const { setRefresh } = useRefresh();

    const [newTitle, setNewTitle] = useState<InputType>({ text: title, error: '', change: false });
    const [newDescription, setNewDescription] = useState<InputType>({ text: description, error: '', change: false });

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<InputType>>
    ) => {
        setState({ text: event.currentTarget.value, error: '', change: true });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const titleError = newTitle.text ? '' : 'Preencha este campo.';
        const descriptionError = newDescription.text ? '' : 'Preencha este campo.';

        if (titleError || descriptionError) {
            setNewTitle((prev) => {
                return { ...prev, error: titleError }
            });

            setNewDescription((prev) => {
                return { ...prev, error: descriptionError }
            });

            return;
        }

        editTask(
            user?.token!,
            id,
            newTitle.change ? newTitle.text : undefined,
            newDescription.change ? newDescription.text : undefined
        ).then(() => {
            setOpen(false);
            setRefresh(true);
        });
    }

    return (
        <>{open &&
            <div className="modal-container" onClick={handleClose}>
                <form
                    className="task-form"
                    onClick={event => { event.stopPropagation() }}
                    onSubmit={handleSubmit}
                >
                    <Input
                        label='Novo titulo'
                        inputProps={{
                            placeholder: 'Editar o titulo da tarefa',
                            name: 'title',
                            onChange: (event => handleChange(event, setNewTitle)),
                            value: newTitle.text
                        }}
                        error={newTitle.error}
                    />

                    <Input
                        label='Nova descrição'
                        inputProps={{
                            placeholder: 'Editar descrição da tarefa.',
                            name: 'description',
                            onChange: (event => handleChange(event, setNewDescription)),
                            value: newDescription.text
                        }}
                        error={newDescription.error}
                    />

                    <Button
                        type='submit'
                    >
                        Salvar alterações
                    </Button>
                </form>
            </div>
        }</>
    )
}