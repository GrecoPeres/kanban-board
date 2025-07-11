import { useState } from 'react';
import BoardColumn from '../components/BoardColumn';
import FloatingButton from '../components/FloatingButton';
import TaskModal from '../components/TaskModal';

const sampleTasks = {
  'To-do': [
    {
      id: '1',
      title: 'Criação de wireframes',
      category: 'Wireframes',
      subtasksDone: 1,
      subtasksTotal: 3,
      members: ['A', 'M'],
      attachments: 3,
      comments: 1,
      daysLeft: 7,
    },
    {
      id: '2',
      title: 'Limpeza de dados',
      category: 'Data Entry',
      subtasksDone: 2,
      subtasksTotal: 5,
      members: ['B', 'C'],
      attachments: 2,
      comments: 2,
      daysLeft: 6,
    },
    {
      id: '3',
      title: 'Agendamento de mídia social',
      category: 'Media',
      subtasksDone: 2,
      subtasksTotal: 4,
      members: ['D', 'E', 'F'],
      attachments: 1,
      comments: 0,
      daysLeft: 1,
    },
  ],
  'Em progresso': [
    {
      id: '4',
      title: 'Edição de design gráfico',
      category: 'Graphic Design',
      subtasksDone: 1,
      subtasksTotal: 3,
      members: ['G', 'H'],
      attachments: 0,
      comments: 0,
      daysLeft: 3,
    },
    {
      id: '5',
      title: 'Design de slides de apresentação',
      category: 'UI Design',
      subtasksDone: 1,
      subtasksTotal: 2,
      members: ['I', 'J'],
      attachments: 1,
      comments: 1,
      daysLeft: 1,
    },
  ],
};

export default function Home() {
  const [data] = useState(sampleTasks);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <div className="flex flex-row gap-6 overflow-x-auto">
        {Object.entries(data).map(([status, tasks]) => (
          <BoardColumn key={status} title={status} tasks={tasks} />
        ))}
      </div>
    </div>
    <FloatingButton onClick={() => setModalOpen(true)} />
      <TaskModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
