import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskCounter = ({ total, completed, pending }) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
            <ApperIcon name="Target" className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Task Progress</h2>
            <p className="text-sm text-gray-600">Keep up the great work!</p>
          </div>
        </div>
        <div className="text-right">
          <motion.div 
            key={completionRate}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            {completionRate}%
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <motion.div 
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-info mb-1"
          >
            {total}
          </motion.div>
          <p className="text-xs text-gray-600 font-medium">Total</p>
        </div>
        <div className="text-center">
          <motion.div 
            key={completed}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-success mb-1"
          >
            {completed}
          </motion.div>
          <p className="text-xs text-gray-600 font-medium">Done</p>
        </div>
        <div className="text-center">
          <motion.div 
            key={pending}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-warning mb-1"
          >
            {pending}
          </motion.div>
          <p className="text-xs text-gray-600 font-medium">Pending</p>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-success to-green-400 h-2 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCounter;