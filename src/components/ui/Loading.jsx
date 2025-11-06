import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
        />
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Loading your tasks...</h3>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;