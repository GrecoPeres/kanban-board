import { FaPlus } from 'react-icons/fa';

interface Props {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-xl z-50"
      title="Criar tarefa"
    >
      <FaPlus />
    </button>
  );
}
