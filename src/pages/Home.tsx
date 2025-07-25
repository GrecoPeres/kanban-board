import { useState } from 'react';
import BoardColumn from '../components/BoardColumn';
import FloatingButton from '../components/FloatingButton';
import TaskModal from '../components/TaskModal';
import type { Task } from '../types';
import AddColumnButton from '../components/AddColumnButton';
import AddColumnModal from '../components/AddColumnModal';
import toast from 'react-hot-toast';

const sampleTasks = {
  'Em fila': [
    {
      id: '1',
      title: 'Criar protótipo',
      category: 'UX',
      assignees: ['Lucas', 'Bruna'],
      link: 'https://figma.com/file/abc',
      fileUrl: 'https://figma.com/file/abc',
      subtasks: [
        {
          id: 's1',
          title: 'Criar tela de login',
          done: true,
          link: 'https://figma.com/file/abc',
          fileUrl: 'https://figma.com/file/abc',
          comment: 'Tela concluída'
        },
        {
          id: 's2',
          title: 'Validar com o time',
          done: false,
          comment: 'Esperando aprovação'
        }
      ],
      attachments: 1,
      comments: 2,
      daysLeft: 4
    },
    {
      id: '2',
      title: 'Limpeza de dados',
      category: 'Dados',
      assignees: ['Arthur', 'Carlos'],
      subtasks: [],
      attachments: 2,
      link: 'https://figma.com/file/abc',
      fileUrl: 'https://figma.com/file/abc',
      comments: 2,
      daysLeft: 6,
    },
    {
      id: '3',
      title: 'Agendamento de mídia social',
      category: 'Redes Sociais',
      assignees: ['Daniela', 'Eduardo', 'Fernanda'],
      subtasks: [],
      attachments: 1,
      comments: 0,
      daysLeft: 1,
    },
    {
      id: '4',
      title: 'Edição de design gráfico',
      category: 'Design Gráfico',
      assignees: ['Gustavo', 'Higor'],
      subtasks: [],
      attachments: 0,
      comments: 0,
      daysLeft: 3,
    }
  ],
  'Em progresso': [
    {
      id: '5',
      title: 'Edição de design gráfico',
      category: 'Design Gráfico',
      assignees: ['Greco'],
      subtasks: [],
      attachments: 0,
      comments: 0,
      daysLeft: 3,
    },
    {
      id: '6',
      title: 'Design de slides de apresentação',
      category: 'Design Gráfico',
      assignees: ['Greco'],
      subtasks: [],
      attachments: 1,
      comments: 1,
      daysLeft: 1,
    },
  ],
  'Concluído': [
    {
      id: '7',
      title: 'Design de slides de apresentação',
      category: 'Design Gráfico',
      assignees: ['Ingrid', 'Julio'],
      subtasks: [],
      attachments: 1,
      comments: 1,
      daysLeft: 1,
    },
  ],
};

export default function Home() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('kanbanData');
    return saved ? JSON.parse(saved) : sampleTasks;
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('Em fila');
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [deletingColumn, setDeletingColumn] = useState<string | null>(null);

  const handleSaveTask = (newTask: Task) => {
    const updated = { ...data };
    const column = selectedColumn;

    const index = updated[column].findIndex((t: Task) => t.id === newTask.id);
    if (index >= 0) {
      updated[column][index] = newTask;
    } else {
      updated[column].push(newTask);
    }

    setData(updated);
    localStorage.setItem('kanbanData', JSON.stringify(updated));
  };

  const handleAddColumn = (title: string, order: number) => {
    if (!title || data[title]) return;
  
    const newColumn = { [title]: [] };
  
    const entries = Object.entries(data);
    entries.splice(order, 0, [title, []]);
  
    const updated = Object.fromEntries(entries);
    setData(updated);
    localStorage.setItem('kanbanData', JSON.stringify(updated));
  };

  const handleDeleteTask = (columnTitle: string, taskId: string) => {
    const updated = {
      ...data,
      [columnTitle]: data[columnTitle].filter((task) => task.id !== taskId),
    };
    setData(updated);
    localStorage.setItem('kanbanData', JSON.stringify(updated));
  };  

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
        <div className="flex flex-row gap-6 overflow-x-auto">
          {Object.entries(data).map(([status, tasks]) => (
            <BoardColumn
              key={status}
              title={status}
              tasks={tasks}
              onEdit={(task) => {
                setSelectedColumn(status);
                setTaskToEdit(task);
                setModalOpen(true);
              }}
              onAddTask={() => {
                setSelectedColumn(status);
                setModalOpen(true);
              }}
              onDeleteColumn={() => {
                const { [status]: removed, ...rest } = data;
                setData(rest);
                localStorage.setItem('kanbanData', JSON.stringify(rest))
                toast.success('Coluna deletada com sucesso!');
              }}
              onFilterColumn={() => alert(`Filtrar tarefas de ${status}`)}
              onDeleteTask={(taskId?: string) => {
                if (!taskId) {
                  // entra no modo exclusão
                  setDeletingColumn(status);
                  // toast('Modo deletar ativado! Clique nas lixeiras para excluir.');
                  toast((t) => (
                    <span>
                      Modo exclusão ativado! <b>bold</b>
                      <button onClick={() => setDeletingColumn(null)}>
                        Desativar Modo
                      </button>
                    </span>
                  ));
                } else {
                  // deleta tarefa
                  handleDeleteTask(status, taskId);
                  toast.success('Tarefa deletada!');
                  // se não sobrar tarefas, sair modo
                  if (data[status].length === 1) setDeletingColumn(null);
                }
              }}
              isDeleting={deletingColumn === status}
            />

          ))}

          {Object.keys(data).length < 6 && (
            <AddColumnButton onClick={() => setIsAddColumnOpen(true)} />
          )}

        </div>
      </div>

      <FloatingButton onClick={() => {
        setSelectedColumn('Em fila');
        setModalOpen(true);
      }} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={async (newTask) => {
          await handleSaveTask(newTask);
        }}
        taskToEdit={taskToEdit}
      />

      <AddColumnModal
        isOpen={isAddColumnOpen}
        onClose={() => setIsAddColumnOpen(false)}
        onSave={(title, order) => {
          handleAddColumn(title, order);
          setIsAddColumnOpen(false);
        }}
      />
    </>
  );
}
