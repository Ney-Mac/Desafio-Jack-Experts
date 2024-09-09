import { useState } from 'react';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import { createTask } from '../../api/createTask';
import { useAuth } from '../../utils/useAuth';
import { useRefresh } from '../../utils/useRefresh';

import './createTaskModal.scss';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputType = {
    text: string;
    error: string;
}

export const CreateTaskModal = ({ open, setOpen }: Props) => {
    const { user } = useAuth();
    const { setRefresh } = useRefresh();

    const [title, setTitle] = useState<InputType>({ text: '', error: '' });
    const [description, setDescription] = useState<InputType>({ text: '', error: '' });

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<InputType>>
    ) => {
        setState({ text: event.currentTarget.value, error: '' });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const titleError = title.text ? '' : 'Preencha este campo.';
        const descriptionError = description.text ? '' : 'Preencha este campo.';

        if (titleError || descriptionError) {
            setTitle((prev) => {
                return { ...prev, error: titleError }
            });

            setDescription((prev) => {
                return { ...prev, error: descriptionError }
            });

            return;
        }

        createTask(user?.token!, title.text, description.text)
        .then(() => {
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
                        label='Titulo'
                        inputProps={{
                            placeholder: 'Digite o titulo',
                            name: 'title',
                            onChange: (event => handleChange(event, setTitle)),
                            value: title.text
                        }}
                        error={title.error}
                    />

                    <Input
                        label='Descrição'
                        inputProps={{
                            placeholder: 'Descrição da tarefa.',
                            name: 'description',
                            onChange: (event => handleChange(event, setDescription)),
                            value: description.text
                        }}
                        error={description.error}
                    />

                    <Button
                        type='submit'
                    >
                        Criar Tarefa
                    </Button>
                </form>
            </div>
        }</>
    )
}