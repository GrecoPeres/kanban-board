interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Nova Tarefa</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Aqui irei add os campos da nova tarefa.
          </p>
        </div>
      </div>
    );
  }
  