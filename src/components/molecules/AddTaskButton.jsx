import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const AddTaskButton = ({ onClick, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        onClick={onClick}
        size="xl"
        className="w-full gap-3 shadow-lg hover:shadow-xl"
      >
        <ApperIcon name="Plus" className="w-6 h-6" />
        Add New Task
      </Button>
    </motion.div>
  );
};

export default AddTaskButton;