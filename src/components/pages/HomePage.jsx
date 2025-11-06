import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Checkbox from "@/components/atoms/Checkbox";
import EditTaskModal from "@/components/organisms/EditTaskModal";
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
const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('dueDate');
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
const filterTasks = (tasks, filter, search = '') => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // First apply search filter if search term exists
    let filteredTasks = tasks;
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filteredTasks = tasks.filter(task => 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.category?.toLowerCase().includes(searchLower)
      );
    }
    
    // Then apply status/priority filters
    switch (filter) {
      case 'active':
        return filteredTasks.filter(task => !task.completed);
      case 'completed':
        return filteredTasks.filter(task => task.completed);
      case 'due-today':
        return filteredTasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDue = new Date(task.dueDate);
          taskDue.setHours(0, 0, 0, 0);
          return taskDue.getTime() === today.getTime();
        });
      case 'high-priority':
        return filteredTasks.filter(task => task.priority === 'high');
      case 'low-priority':
        return filteredTasks.filter(task => task.priority === 'low');
      default:
        return filteredTasks;
    }
  };

const filteredTasks = filterTasks(tasks, activeFilter, searchTerm);
  const sortedTasks = taskService.sortTasks(filteredTasks, sortOrder);
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

const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

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
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ApperIcon name="Search" size={20} className="text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search tasks by title, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                
                {/* Filter Section */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Filter & Sort Tasks</h3>
                </div>
                
                {/* Sort Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                  <div className="relative">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ApperIcon 
                      name="ChevronDown" 
                      size={16} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                    />
                  </div>
                </div>
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
                  tasks={sortedTasks}
                  onUpdateTask={handleTaskUpdate}
                  onDeleteTask={handleTaskDelete}
                  onEditTask={handleTaskEdit}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Add Task Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <AddTaskModal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onTaskAdded={handleTaskAdded}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editingTaskId && (
            <EditTaskModal
              isOpen={!!editingTaskId}
              onClose={() => setEditingTaskId(null)}
              task={tasks.find(t => t.Id === editingTaskId)}
              onTaskUpdated={handleTaskUpdate}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;