import { BsThreeDots } from 'react-icons/bs';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  category: string;
  subtasksDone: number;
  subtasksTotal: number;
  members: string[];
  attachments: number;
  comments: number;
  daysLeft: number;
}

interface BoardColumnProps {
  title: string;
  tasks: Task[];
}

export default function BoardColumn({ title, tasks }: BoardColumnProps) {
  return (
    <div className="w-72 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700 dark:text-white">
          {title} <span className="text-sm text-gray-400">{tasks.length}</span>
        </h2>
        <BsThreeDots className="text-gray-500 cursor-pointer" />
      </div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
