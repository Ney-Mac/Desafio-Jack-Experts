import { Task } from '../../components/Task/Task';
import { Button } from '../../components/Button/Button';

import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import './home.scss';

export default function HomePage() {
    const tasks = [
        { title: 'Tarefa 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eligendi accusantium harum eos necessitatibus, laborum atque dolores vel quas voluptatum odio commodi iusto nihil quia quibusdam officiis modi facilis rerum!' },
        { title: 'Tarefa 2', description: 'Descricao da tarefa 2.' },
        { title: 'Tarefa 3', description: 'Descricao da tarefa 3.' },
        { title: 'Tarefa 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eligendi accusantium harum eos necessitatibus, laborum atque dolores vel quas voluptatum odio commodi iusto nihil quia quibusdam officiis modi facilis rerum!' },
        { title: 'Tarefa 5', description: 'Descricao da tarefa 5.' },
        { title: 'Tarefa 6', description: 'Descricao da tarefa 6.' },
    ]

    return (
        <main className="container">
            <div className="row-user">
                <div className="user-data">
                    <p className="r-label">Usuário: </p>
                    <p className="r-email">email@gmail.com</p>
                </div>

                <button className='logout-btn'>
                    <MdLogout className='logout-icon' />
                    sair
                </button>
            </div>

            <div className="tasks-container">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        title={task.title}
                        description={task.description}
                    />
                ))}
            </div>

            <div className="create-task-btn">
                <Button>
                    <FaPlus />
                    Criar Nova Tarefa
                </Button>
            </div>

        </main>
    )
}