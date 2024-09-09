import { useEffect, useState } from 'react';

import { Task } from '../../components/Task/Task';
import { Button } from '../../components/Button/Button';

import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { PiEmpty } from "react-icons/pi";

import { useAuth } from '../../utils/useAuth';
import { useRefresh } from '../../utils/useRefresh';

import { TaskType } from '../../types/TaskType';
import { getTask } from '../../api/getTask';

import { CreateTaskModal } from '../../components/createTaskModal/CreateTaskModal';

import './home.scss';

export default function HomePage() {
    const { logout, user } = useAuth();
    const { refresh, setRefresh } = useRefresh();

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    useEffect(() => {
        if(refresh) {
            getTask(setTasks, user?.token!);
            setRefresh(false);
        }
    }, [refresh]);

    return (
        <main className="container">
            <div className="row-user">
                <div className="user-data">
                    <p className="r-label">Usuário: </p>
                    <p className="r-email">{user?.email}</p>
                </div>

                <button className='logout-btn' onClick={logout}>
                    <MdLogout className='logout-icon' />
                    sair
                </button>
            </div>

            <div className="tasks-container">
                {tasks.length > 0 ?
                    tasks.map((task, index) => (
                        <Task
                            key={index}
                            title={task.title}
                            description={task.description}
                            id={task.id}
                            complete={task.complete}
                        />
                    )
                    )
                    : <div className="empty-list">
                        <PiEmpty className='empty-icon' />
                        <p className="empty-text">Não há nenhuma tarefa na sua lista.</p>
                    </div>
                }
            </div>

            <div className="create-task-btn">
                <Button
                    onClick={() => { setShowCreateTaskModal(true) }}
                >
                    <FaPlus />
                    Criar Nova Tarefa
                </Button>
            </div>

            <CreateTaskModal
                setOpen={setShowCreateTaskModal}
                open={showCreateTaskModal}
            />
        </main>
    )
}