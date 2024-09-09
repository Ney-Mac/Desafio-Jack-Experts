import { useAuth } from '../../utils/useAuth';
import { useRefresh } from '../../utils/useRefresh';

import { deleteTask } from '../../api/deleteTask';

import { SmallButton } from '../Button/SmallButton';
import './deleteTaskModal.scss';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
}

export const DeleteTaskModal = ({ open, setOpen, id }: Props) => {
    const { user } = useAuth();
    const { setRefresh } = useRefresh();

    const handleClose = () => {
        setOpen(false);
    }

    const onDelete = () => {
        deleteTask(id, user?.token!).then(() => {
            setRefresh(true);
            handleClose();
        })
    }

    return (
        <>{open &&
            <div className="modal-container" onClick={handleClose}>
                <div className="delete-container" onClick={(event) => event.stopPropagation()}>
                    <p className="delete-text">Pretende apagar a tarefa?</p>

                    <div className="buttons">
                        <SmallButton type='error' onClick={onDelete}>Apagar</SmallButton>
                        <SmallButton type='success' onClick={handleClose}>Cancelar</SmallButton>
                    </div>
                </div>
            </div>
        }</>
    )
}