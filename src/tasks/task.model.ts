export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'OPEN',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
