import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import EditTaskModal from "@/components/organisms/EditTaskModal";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import AddTaskModal from "@/components/organisms/AddTaskModal";
import AddTaskButton from "@/components/molecules/AddTaskButton";
import TaskCounter from "@/components/molecules/TaskCounter";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const HomePage = () => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

const handleTaskAdded = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => 
      prev.map(task => task.Id === updatedTask.Id ? updatedTask : task)
    );
  };

  const handleTaskEdit = (task) => {
    setEditingTaskId(task.Id);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.Id !== taskId));
  };

const stats = taskService.getStats();

  // Filter functions
  const filterTasks = (tasks, filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'due-today':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDue = new Date(task.dueDate);
          taskDue.setHours(0, 0, 0, 0);
          return taskDue.getTime() === today.getTime();
        });
      case 'high-priority':
        return tasks.filter(task => task.priority === 'high');
      case 'low-priority':
        return tasks.filter(task => task.priority === 'low');
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks(tasks, activeFilter);

  const filterOptions = [
    { key: 'all', label: 'All Tasks' },
    { key: 'active', label: 'Active Tasks' },
    { key: 'completed', label: 'Completed Tasks' },
    { key: 'due-today', label: 'Due Today' },
    { key: 'high-priority', label: 'High Priority' },
    { key: 'low-priority', label: 'Low Priority' }
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Stats */}
          <TaskCounter 
            total={stats.total}
            completed={stats.completed}
            pending={stats.pending}
          />

          {/* Add Task Button */}
          <AddTaskButton 
            onClick={() => setIsModalOpen(true)}
          />

          {/* Task List or Empty State */}
{/* Filter Buttons */}
          {tasks.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Filter Tasks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <motion.button
                    key={option.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveFilter(option.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === option.key
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                    {activeFilter === option.key && (
                      <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                        {filteredTasks.length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {filteredTasks.length === 0 && tasks.length === 0 ? (
            <Empty onAddTask={() => setIsModalOpen(true)} />
          ) : filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <ApperIcon name="Filter" size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks match your filter</h3>
              <p className="text-gray-500 mb-4">Try selecting a different filter or add new tasks.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Show All Tasks
              </button>
            </motion.div>
          ) : (
<div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Tasks
                  {activeFilter !== 'all' && (
                    <span className="ml-2 text-sm font-normal text-blue-600">
                      ({filterOptions.find(f => f.key === activeFilter)?.label})
                    </span>
                  )}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              
<TaskList 
                tasks={filteredTasks}
                onUpdateTask={handleTaskUpdate}
                onDeleteTask={handleTaskDelete}
                onEditTask={handleTaskEdit}
              />
            </div>
          )}
        </motion.div>

        {/* Add Task Modal */}
<AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
        
        <EditTaskModal
          isOpen={!!editingTaskId}
          onClose={() => setEditingTaskId(null)}
          task={tasks.find(t => t.Id === editingTaskId)}
          onTaskUpdated={handleTaskUpdate}
        />
      </div>
    </div>
  );
};

export default HomePage;