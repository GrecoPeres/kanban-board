import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
  
  interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newTask: Task) => Promise<void>;
    taskToEdit?: Task | null;
  }

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [members, setMembers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setCategory(taskToEdit.category);
        setMembers(taskToEdit.members.join(', '));
        setStartDate('');
        setEndDate('');
      } else {
        // reseto os campos se n for edição
        setTitle('');
        setCategory('');
        setMembers('');
        setStartDate('');
        setEndDate('');
        setPriority('Baixa');
      }
    }
  }, [isOpen, taskToEdit]);
  
  const saveTask = async () => {
    if (!title.trim() || !category.trim() || !members.trim()) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
  
    const updatedTask: Task = {
      id: taskToEdit?.id || crypto.randomUUID(),
      title,
      category,
      subtasksDone: taskToEdit?.subtasksDone || 0,
      subtasksTotal: taskToEdit?.subtasksTotal || 1,
      members: members.split(',').map(m => m.trim().toUpperCase()),
      attachments: taskToEdit?.attachments || 0,
      comments: taskToEdit?.comments || 0,
      daysLeft: Math.ceil(
        (new Date(endDate || new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      ),
    };
  
    await toast.promise(
        async () => await onSave(updatedTask),
        {
          loading: 'Salvando...',
          success: <b>Tarefa salva!</b>,
          error: <b>Erro ao salvar.</b>,
        }
      );          
  
    onClose();
    setTitle('');
    setCategory('');
    setPriority('Baixa');
    setMembers('');
    setStartDate('');
    setEndDate('');
  };
  

  const updatedTask: Task = {
    id: taskToEdit?.id || crypto.randomUUID(),
    title,
    category,
    subtasksDone: taskToEdit?.subtasksDone || 0,
    subtasksTotal: taskToEdit?.subtasksTotal || 1,
    members: members.split(',').map(m => m.trim().toUpperCase()),
    attachments: taskToEdit?.attachments || 0,
    comments: taskToEdit?.comments || 0,
    daysLeft: Math.ceil(
      (new Date(endDate || new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                Título
            </label>
          <input
            type="text"
            placeholder="Título da tarefa"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                    Categoria
                </label>
          <input
            type="text"
            placeholder="Categoria (ex: Web, Mobile)"
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="members">
                Responsáveis
            </label>
          <input
            type="text"
            placeholder="Responsáveis (ex: Arthur, Matheus, Carlos)"
            className="w-full p-2 border border-gray-300 rounded"
            value={members}
            onChange={e => setMembers(e.target.value)}
          />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="priority">
                Prioridade
            </label>
          <select
            id="priority"
            className="w-full p-2 border border-gray-300 rounded"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
          </div>
          <div className="flex gap-2">
            <div className='w-full'>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
                Data Início
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />

            </div>
            <div className='w-full'>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endDate">
                Data Fim
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          </div>
          <button
            onClick={saveTask}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {taskToEdit ? 'Salvar Alterações' : 'Criar Tarefa'}
          </button>
        </div>
      </div>
    </div>
  );
}