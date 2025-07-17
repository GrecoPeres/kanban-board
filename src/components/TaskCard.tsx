import { FaRegComment, FaRegClock, FaTrash } from 'react-icons/fa';
import { FaPaperclip } from "react-icons/fa6";
import type { Subtask } from '../types';
import { GoFileDirectory } from 'react-icons/go';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    category: string;
    assignees: string[];
    daysLeft: number;
    subtasks: Subtask[];
  };
  onClick?: () => void;
  isDeleting?: boolean;
  onDelete?: () => void;
}

export default function TaskCard({ task, onClick, isDeleting, onDelete }: TaskCardProps) {
  const total = task.subtasks?.length || 0;
  const done = task.subtasks?.filter((s) => s.done).length || 0;
  const progress = total > 0 ? (done / total) * 100 : 0;  

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 cursor-pointer relative"
    >
      {/* Título */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{task.title}</h3>

      {/* Categoria */}
      <div className="text-xs text-gray-500 dark:text-gray-400 my-1">
        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
          {task.category}
        </span>
      </div>

      {/* Barra de progresso */}
      {total > 0 && (
        <>
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span className="mr-2">
              Subtasks
            </span>
            <span className="ml-2">{done}/{total}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 my-1">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

      {/* Infos extras */}
      <div className="flex justify-between items-center text-xs mt-2 text-gray-500 dark:text-gray-300">
        <div className="flex -space-x-2">
          {task.assignees?.map((member, idx) => (
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
          {/* Arquivos */}
          {task.subtasks?.some((s) => s.fileUrl) && (
            <div className="flex items-center gap-1">
              <GoFileDirectory /> {task.subtasks?.filter(s => s.fileUrl).length}
            </div>
          )}
          {/* Links */}
          {task.subtasks?.some((s) => s.link) && (
            <div className="flex items-center gap-1">
              <FaPaperclip /> {task.subtasks?.filter(s => s.link).length}
            </div>
          )}
          {/* Comentários */}
          {task.subtasks?.some((s) => s.comment) && (
            <div className="flex items-center gap-1">
              <FaRegComment /> {task.subtasks?.filter(s => s.comment).length}
            </div>
          )}
          {/* Dias restantes */}
          <div className="flex items-center gap-1">
            <FaRegClock /> {task.daysLeft}d
          </div>
        </div>
      </div>

      {/* Botão de deletar se estiver no modo delete */}
      {isDeleting && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita abrir o modal
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
