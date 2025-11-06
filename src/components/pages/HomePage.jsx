import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import TaskCounter from "@/components/molecules/TaskCounter";
import TaskList from "@/components/organisms/TaskList";
import AddTaskButton from "@/components/molecules/AddTaskButton";
import AddTaskModal from "@/components/organisms/AddTaskModal";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.Id !== taskId));
  };

  const stats = taskService.getStats();

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
          {tasks.length === 0 ? (
            <Empty onAddTask={() => setIsModalOpen(true)} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Tasks
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              
              <TaskList 
                tasks={tasks}
                onUpdateTask={handleTaskUpdate}
                onDeleteTask={handleTaskDelete}
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
      </div>
    </div>
  );
};

export default HomePage;