import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">Something went wrong</h3>
          <p className="text-gray-600">
            {message || "We encountered an error while loading your tasks. Please try again."}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;