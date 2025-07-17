import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { Task, Subtask, TaskStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from 'react-icons/fa';

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
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [members, setMembers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);  

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setCategory(taskToEdit.category);
        setMembers((taskToEdit.assignees || []).join(', '));
        setPriority(taskToEdit.priority === 'High' ? 'Alta' : taskToEdit.priority === 'Medium' ? 'Média' : 'Baixa');
        setStartDate(taskToEdit.createdAt ? taskToEdit.createdAt.split('T')[0] : '');
        setEndDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
        setSubtasks(taskToEdit.subtasks);
        setLinks(taskToEdit?.links || []);
        setFiles(taskToEdit?.files || []);   
      } else {
        setTitle('');
        setCategory('');
        setMembers('');
        setPriority('Baixa');
        setStartDate('');
        setEndDate('');
        setSubtasks([]);
        setLinks([]);
        setFiles([]);
      }
    }
  }, [isOpen, taskToEdit]);

  const addSubtask = () => {
    setSubtasks(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: '',
        done: false,
        link: '',
        comment: '',
        fileUrl: '',
      },
    ]);
  };

  const removeSubtask = (id: string) => {
    setSubtasks(prev => prev.filter(s => s.id !== id));
  };

  const updateSubtask = (id: string, key: keyof Subtask, value: string | boolean) => {
    setSubtasks(prev =>
      prev.map(s => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  const saveTask = async () => {
    if (!title.trim() || !category.trim() || !members.trim()) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
  
    const newTask: Task = {
      id: taskToEdit?.id || crypto.randomUUID(),
      title,
      description: '',
      category,
      status: taskToEdit?.status || 'Em fila',
      subtasks,
      attachments: subtasks.filter(s => s.fileUrl).length,
      comments: subtasks.filter(s => s.comment).length,
      createdAt: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
      dueDate: endDate ? new Date(endDate).toISOString() : new Date().toISOString(),
      owner: 'Você',
      assignees: members.split(',').map(m => m.trim()),
      priority: priority === 'Alta' ? 'High' : priority === 'Média' ? 'Medium' : 'Low',
      archived: false,
      links,
      files,
    };
  
    await toast.promise(onSave(newTask), {
      loading: 'Salvando...',
      success: <b>Tarefa salva!</b>,
      error: <b>Erro ao salvar.</b>,
    });
  
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Título */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Título da tarefa"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">Categoria</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Categoria"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          {/* Responsáveis */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">Responsáveis</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Arthur, Matheus"
              value={members}
              onChange={e => setMembers(e.target.value)}
            />
          </div>

          {/* Prioridade */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">Prioridade</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </div>

          {/* Links */}
          <div className='flex justify-between'>
            <label className="text-sm text-gray-700 dark:text-gray-300">Links</label>
            {links.map((l, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={l}
                  placeholder="https://..."
                  onChange={(e) => {
                    const updated = [...links];
                    updated[idx] = e.target.value;
                    setLinks(updated);
                  }}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm mt-1 flex items-center gap-1"
              onClick={() => setLinks([...links, ''])}
            >
              <FaPlus /> Adicionar link
            </button>
          </div>

          {/* Arquivos */}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <label className="text-sm text-gray-700 dark:text-gray-300">Arquivos</label>
              {files.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const updated = [...files];
                        updated[idx] = file.name;
                        setFiles(updated);
                        localStorage.setItem(`taskFile_${file.name}`, file.name);
                      }
                    }}
                  />
                  <span className="text-xs text-gray-600">{f}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm mt-1 flex items-center gap-1"
                onClick={() => setFiles([...files, ''])}
              >
                <FaPlus /> Adicionar arquivo
              </button>
            </div>
          </div>

          {/* Datas */}
          <div className="flex gap-2">
            <div className="w-full">
              <label className="text-sm text-gray-700 dark:text-gray-300">Início</label>
              <input
                type="date"
                className="w-full p-2 border rounded mt-1"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-700 dark:text-gray-300">Fim</label>
              <input
                type="date"
                className="w-full p-2 border rounded mt-1"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Subtarefas */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">Subtarefas</h3>
            {subtasks.length === 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400">Nenhuma subtarefa adicionada.</p>
            )}
            {subtasks.map(subtask => (
              <div key={subtask.id} className="border p-2 rounded mb-2 bg-gray-50 dark:bg-gray-800">
                <input
                  type="text"
                  placeholder="Título da subtarefa"
                  className="w-full p-1 mb-1 border rounded text-sm"
                  value={subtask.title}
                  onChange={e => updateSubtask(subtask.id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Link (opcional)"
                  className="w-full p-1 mb-1 border rounded text-sm"
                  value={subtask.link}
                  onChange={e => updateSubtask(subtask.id, 'link', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Comentário (opcional)"
                  className="w-full p-1 mb-1 border rounded text-sm"
                  value={subtask.comment}
                  onChange={e => updateSubtask(subtask.id, 'comment', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Arquivo (URL simulada)"
                  className="w-full p-1 mb-2 border rounded text-sm"
                  value={subtask.fileUrl}
                  onChange={e => updateSubtask(subtask.id, 'fileUrl', e.target.value)}
                />
                <button
                  onClick={() => removeSubtask(subtask.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remover subtarefa
                </button>
              </div>
            ))}
            <button
              onClick={addSubtask}
              className="text-blue-600 hover:underline text-sm mt-2"
              type="button"
            >
              + Adicionar subtarefa
            </button>
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
