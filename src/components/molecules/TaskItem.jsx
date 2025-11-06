import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";

const TaskItem = ({ task, onUpdate, onDelete, onEdit, selectionMode, isSelected, onToggleSelection }) => {
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
className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
            task.priority === 'High' ? 'border-l-4 border-l-red-500 border-red-100' :
            task.priority === 'Medium' ? 'border-l-4 border-l-yellow-500 border-yellow-100' :
            task.priority === 'Low' ? 'border-l-4 border-l-green-500 border-green-100' :
            'border-gray-100'
          }`}
        >
<div className="flex items-start gap-4">
            {selectionMode && (
              <div className="pt-1">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={onToggleSelection}
                  className="border-blue-300"
                />
              </div>
            )}
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
              
              {/* Category Badge */}
              {task.category && (
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  task.category === 'Work' ? 'bg-blue-100 text-blue-800' :
                  task.category === 'Personal' ? 'bg-green-100 text-green-800' :
                  task.category === 'Health' ? 'bg-red-100 text-red-800' :
                  task.category === 'Shopping' ? 'bg-purple-100 text-purple-800' :
                  task.category === 'Learning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.category}
                </span>
              )}
<div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
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
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    task.priority === 'Low' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority || 'Medium'}
                  </span>
                  
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
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskItem;