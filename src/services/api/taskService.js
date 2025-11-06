import mockTasks from "../mockData/tasks.json";
class TaskService {
  constructor() {
    this.storageKey = "taskflow_tasks";
    this.initializeStorage();
  }

  initializeStorage() {
    const existingTasks = localStorage.getItem(this.storageKey);
    if (!existingTasks) {
      localStorage.setItem(this.storageKey, JSON.stringify(mockTasks));
    }
  }

  getTasks() {
    try {
      const tasks = localStorage.getItem(this.storageKey);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        resolve([...tasks]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.Id === parseInt(id));
        resolve(task ? { ...task } : null);
      }, 150);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
const tasks = this.getTasks();
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
        const newTask = {
          Id: maxId + 1,
          title: taskData.title,
          description: taskData.description,
          dueDate: taskData.dueDate || null,
          priority: taskData.priority || 'Medium',
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
        resolve({ ...newTask });
      }, 300);
    });
  }

  async update(id, taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
        
        if (taskIndex !== -1) {
const updatedTask = {
            ...tasks[taskIndex],
            ...taskData,
            dueDate: taskData.dueDate !== undefined ? taskData.dueDate : tasks[taskIndex].dueDate,
            priority: taskData.priority !== undefined ? taskData.priority : tasks[taskIndex].priority,
            updatedAt: new Date().toISOString()
          };
          tasks[taskIndex] = updatedTask;
          localStorage.setItem(this.storageKey, JSON.stringify(tasks));
          resolve({ ...updatedTask });
        } else {
          resolve(null);
        }
      }, 250);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
        localStorage.setItem(this.storageKey, JSON.stringify(filteredTasks));
        resolve(true);
      }, 200);
    });
  }

  async toggleComplete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
        
        if (taskIndex !== -1) {
          const updatedTask = {
            ...tasks[taskIndex],
            completed: !tasks[taskIndex].completed,
            updatedAt: new Date().toISOString()
          };
          tasks[taskIndex] = updatedTask;
          localStorage.setItem(this.storageKey, JSON.stringify(tasks));
          resolve({ ...updatedTask });
        } else {
          resolve(null);
        }
      }, 150);
    });
  }

  getStats() {
    const tasks = this.getTasks();
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length
    };
  }
}

export const taskService = new TaskService();