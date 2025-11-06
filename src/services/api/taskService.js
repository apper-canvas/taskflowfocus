import mockTasks from "../mockData/tasks.json";
import React from "react";
import Error from "@/components/ui/Error";
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
          category: taskData.category || 'Work',
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
            category: taskData.category !== undefined ? taskData.category : tasks[taskIndex].category,
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
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const completedTasks = tasks.filter(t => t.completed);
    const completedToday = completedTasks.filter(t => {
      if (!t.completedAt) return false;
      const completedDate = new Date(t.completedAt);
      return completedDate >= startOfToday;
    });
    
    const overdueTasks = tasks.filter(t => {
      if (t.completed || !t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate < startOfToday;
    });
    
    return {
      total: tasks.length,
      completed: completedTasks.length,
      pending: tasks.filter(t => !t.completed).length,
      completedToday: completedToday.length,
      overdue: overdueTasks.length
    };
  }

  // Bulk operations
  async markMultipleComplete(taskIds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!Array.isArray(taskIds) || taskIds.length === 0) {
          reject(new Error('Task IDs must be a non-empty array'));
          return;
        }

        const validIds = taskIds.filter(id => Number.isInteger(id) && id > 0);
        if (validIds.length !== taskIds.length) {
          reject(new Error('All task IDs must be positive integers'));
          return;
        }

        const tasks = this.getTasks();
        const updatedTasks = tasks.map(task => 
          validIds.includes(task.Id) 
            ? { ...task, completed: true, updatedAt: new Date().toISOString() } 
            : task
        );
        
        localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
        resolve(validIds);
      }, 300);
    });
  }

  async deleteMultiple(taskIds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!Array.isArray(taskIds) || taskIds.length === 0) {
          reject(new Error('Task IDs must be a non-empty array'));
          return;
        }

        const validIds = taskIds.filter(id => Number.isInteger(id) && id > 0);
        if (validIds.length !== taskIds.length) {
          reject(new Error('All task IDs must be positive integers'));
          return;
        }

        const tasks = this.getTasks();
        const remainingTasks = tasks.filter(task => !validIds.includes(task.Id));
        localStorage.setItem(this.storageKey, JSON.stringify(remainingTasks));
        resolve(validIds);
      }, 400);
    });
  }

  async updateMultipleCategory(taskIds, newCategory) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!Array.isArray(taskIds) || taskIds.length === 0) {
          reject(new Error('Task IDs must be a non-empty array'));
          return;
        }
        
        if (!newCategory || typeof newCategory !== 'string') {
          reject(new Error('Category must be a non-empty string'));
          return;
        }

        const validIds = taskIds.filter(id => Number.isInteger(id) && id > 0);
        if (validIds.length !== taskIds.length) {
          reject(new Error('All task IDs must be positive integers'));
          return;
        }

        const tasks = this.getTasks();
        const updatedTasks = tasks.map(task => 
          validIds.includes(task.Id) 
            ? { ...task, category: newCategory, updatedAt: new Date().toISOString() } 
            : task
        );
        
        localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
        resolve(validIds);
      }, 350);
}, 350);
    });
  }
sortTasks(tasks, sortOrder) {
    if (!tasks || tasks.length === 0) return tasks;
    
    const tasksCopy = [...tasks];
    
    switch (sortOrder) {
      case 'dueDate':
        return tasksCopy.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1; // Tasks without due date go to end
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        
      case 'priority':
        const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        return tasksCopy.sort((a, b) => {
          const aPriority = priorityOrder[a.priority] ?? 3;
          const bPriority = priorityOrder[b.priority] ?? 3;
          return aPriority - bPriority;
        });
        
      case 'createdAt':
        return tasksCopy.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
        });
        
      case 'alphabetical':
        return tasksCopy.sort((a, b) => {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        });
        
      default:
        return tasksCopy;
    }
  }
}

export const taskService = new TaskService();