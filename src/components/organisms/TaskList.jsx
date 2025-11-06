import { motion } from "framer-motion";
import TaskItem from "@/components/molecules/TaskItem";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {tasks.map((task, index) => (
        <motion.div
          key={task.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TaskItem
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TaskList;