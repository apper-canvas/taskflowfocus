import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="CheckSquare" className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">No tasks yet</h3>
          <p className="text-gray-600 leading-relaxed">
            Get started by adding your first task. Stay organized and productive with TaskFlow.
          </p>
        </div>

        <button
          onClick={onAddTask}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          Add Your First Task
        </button>
      </div>
    </motion.div>
  );
};

export default Empty;