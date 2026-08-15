import { motion } from "framer-motion";
import "../../styles/Toast.css";

export default function Toast({ message }) {
  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}