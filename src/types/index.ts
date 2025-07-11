export type TaskStatus = 'A fazer' | 'Em progresso' | 'Finalizado';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
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
  attachments: string[];
  comments: Comment[];
  createdAt: string;
  dueDate: string;
  owner: string;
  assignees: string[];
  priority: 'Low' | 'Medium' | 'High';
  archived: boolean;
}
