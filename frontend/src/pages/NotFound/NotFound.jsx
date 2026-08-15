import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <motion.div
        className="nf-sphere"
        aria-hidden="true"
        animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="nf-content"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="nf-code">404</p>
        <h1 className="nf-title">Lost signal.</h1>
        <p className="nf-subtitle">
          Aura couldn&apos;t find anything at this address. Whatever you were
          looking for might have moved, or never existed.
        </p>

        <motion.button
          type="button"
          className="nf-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
