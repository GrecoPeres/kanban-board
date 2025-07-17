export type TaskStatus = 'Em fila' | 'Em progresso' | 'Finalizado';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
  link?: string;
  fileUrl?: string;
  comment?: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: TaskStatus;
  subtasks: Subtask[];
  attachments: number;
  links: string[];
  files: string[];
  comments: number;
  createdAt: string;
  dueDate: string;
  owner: string;
  assignees: string[];
  priority: 'Low' | 'Medium' | 'High';
  archived: boolean;
  subtasksDone: number;
  subtasksTotal: number;
}