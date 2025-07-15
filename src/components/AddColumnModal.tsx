import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, order: number) => void;
}

export default function AddColumnModal({ isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState(0);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave(title.trim(), order);
    setTitle('');
    setOrder(0);
    toast.success('Coluna adicionada com sucesso!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Nova Coluna</h2>
        <input
          type="text"
          placeholder="Nome da Coluna"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ordem de exibição"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">Cancelar</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
