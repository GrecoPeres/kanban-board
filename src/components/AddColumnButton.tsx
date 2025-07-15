import { FaPlus } from 'react-icons/fa';
interface AddColumnButtonProps {
    onClick: () => void;
  }
  
  export default function AddColumnButton({ onClick }: AddColumnButtonProps) {
    return (
      <div
        onClick={onClick}
        className="w-72 min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
      >
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
          <FaPlus /> Adicionar Coluna
        </button>
      </div>
    );
  }
  