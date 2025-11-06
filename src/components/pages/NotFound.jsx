import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Search" className="w-10 h-10 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
            <p className="text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist. Let's get you back to managing your tasks.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to TaskFlow
          </Button>
          
          <p className="text-sm text-gray-500">
            Or start fresh with a new task list
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;