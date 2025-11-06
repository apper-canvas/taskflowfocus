import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
          <ApperIcon name="CheckSquare" className="w-7 h-7 text-white" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          TaskFlow
        </motion.h1>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed"
      >
        Simple task management that helps you stay organized and productive
      </motion.p>
    </motion.header>
  );
};

export default Header;