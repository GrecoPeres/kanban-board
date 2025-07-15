import { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaFilter, FaPlus, FaTrash } from 'react-icons/fa';
import TaskCard from './TaskCard';
import { TbColumnRemove } from 'react-icons/tb';

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
  onEdit: (task: Task) => void;
  onAddTask: () => void;
  onDeleteColumn: () => void;
  onFilterColumn: () => void;
  onDeleteTask: () => void;
}

export default function BoardColumn({
  title,
  tasks,
  onEdit,
  onAddTask,
  onDeleteColumn,
  onFilterColumn,
  onDeleteTask,
}: BoardColumnProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (showMenu) {
      const timer = setTimeout(() => setMenuVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setMenuVisible(false);
    }
  }, [showMenu]);

  return (
    <div className="w-72 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700 dark:text-white">
          {title} <span className="text-sm text-gray-400">({tasks.length})</span>
        </h2>
        <div className="relative flex gap-2">
          {/* btn add */}
          <button
            onClick={onAddTask}
            className="text-blue-600 hover:text-blue-800 text-sm"
            title="Nova Tarefa"
          >
            <FaPlus />
          </button>

          {/* btn opções */}
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-sm"
            title="Opções"
          >
            <BsThreeDots />
          </button>

          {/* dropdown */}
          {showMenu && (
            <div
              className={`absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 divide-y divide-gray-100 dark:divide-gray-700
                transition-all duration-200 ease-out transform
                ${menuVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
            >
              <button
                onClick={() => {
                  onFilterColumn();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaFilter />
                Filtrar
              </button>
              <button
                onClick={() => {
                  onDeleteTask();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400"
              >
                <FaTrash />
                Deletar Tarefa
              </button>
              <button
                onClick={() => {
                  onDeleteColumn();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400"
              >
                <TbColumnRemove />
                Deletar Coluna
              </button>
            </div>
          )}
        </div>
      </div>

      {/* lista de tarefas */}
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onClick={() => onEdit(task)} />
      ))}
    </div>
  );
}
