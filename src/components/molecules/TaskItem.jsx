import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import { taskService } from "@/services/api/taskService";

const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await taskService.toggleComplete(task.Id);
      if (updatedTask) {
        onUpdate(updatedTask);
        toast.success(
          updatedTask.completed 
            ? "Task completed! 🎉" 
            : "Task marked as incomplete"
        );
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await taskService.delete(task.Id);
      onDelete(task.Id);
      toast.info("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
      setIsDeleting(false);
    }
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggleComplete}
              />
            </div>

<div className="flex-1 min-w-0">
              <h3 
                className={`font-semibold text-gray-900 mb-2 transition-all duration-200 cursor-pointer hover:text-primary ${
                  task.completed 
                    ? "line-through text-gray-500" 
                    : ""
                }`}
                onClick={() => onEdit && onEdit(task)}
                title="Click to edit"
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-gray-600 mb-3 leading-relaxed transition-all duration-200 ${
                  task.completed ? "opacity-60" : ""
                }`}>
                  {truncateDescription(task.description)}
                </p>
              )}
<div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <ApperIcon name="Calendar" className="w-3 h-3" />
                  <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                </div>
                {task.dueDate && (
                  <div className={`flex items-center gap-1 ${
                    new Date(task.dueDate) < new Date().setHours(0,0,0,0) 
                      ? 'text-error' 
                      : 'text-warning'
                  }`}>
                    <ApperIcon name="Clock" className="w-3 h-3" />
                    <span>Due {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                  </div>
                )}
                {task.completed && (
                  <div className="flex items-center gap-1">
                    <ApperIcon name="CheckCircle" className="w-3 h-3 text-success" />
                    <span className="text-success">Completed</span>
                  </div>
                )}
              </div>
            </div>

<motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit && onEdit(task)}
              className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Edit task"
            >
              <ApperIcon name="Edit3" className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskItem;