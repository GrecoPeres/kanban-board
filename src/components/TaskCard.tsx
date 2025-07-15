import { FaPaperclip, FaRegComment, FaRegClock, FaTrash } from 'react-icons/fa';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    category: string;
    subtasksDone: number;
    subtasksTotal: number;
    members: string[];
    attachments: number;
    comments: number;
    daysLeft: number;
  };
  onClick?: () => void;
  isDeleting?: boolean;
  onDelete?: () => void;
}

export default function TaskCard({ task, onClick, isDeleting, onDelete }: TaskCardProps) {
  const progress = (task.subtasksDone / task.subtasksTotal) * 100;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 cursor-pointer relative"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{task.title}</h3>
      <div className="text-xs text-gray-500 dark:text-gray-400 my-1">
        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
          {task.category}
        </span>
      </div>

      <div className="text-xs text-gray-500 mt-2">Subtasks</div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 my-1">
        <div
          className="bg-blue-500 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs mt-2 text-gray-500 dark:text-gray-300">
        <div className="flex -space-x-2">
          {task.members.map((member, idx) => (
            <img
              key={idx}
              src={`https://randomuser.me/api/portraits/thumb/${idx % 2 === 0 ? 'men' : 'women'}/${idx}.jpg`}
              alt={member}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
              title={member}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <FaPaperclip /> {task.attachments}
          </div>
          <div className="flex items-center gap-1">
            <FaRegComment /> {task.comments}
          </div>
          <div className="flex items-center gap-1">
            <FaRegClock /> {task.daysLeft}d
          </div>
        </div>
      </div>

      {isDeleting && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita abrir o modal
            onDelete?.();
          }}
          title="Deletar tarefa"
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}
