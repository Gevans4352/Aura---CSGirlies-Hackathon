import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/AmbientQuote.css";

const QUOTES = [
  "Roots don't rush toward water. They keep growing until they find it.",
  "A star's light reaches us long after it was made patience is written into physics.",
  "Coral grows a few centimeters a year, and outlasts empires.",
  "The nervous system doesn't ask permission to rest. It just does, eventually.",
  "Tides don't fight the moon. They move with it.",
  "Even in darkness, a leaf keeps working beneath the surface.",
];

const ROTATE_MS = 9000;

export default function AmbientQuote() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="aq-wrap" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="aq-text"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {QUOTES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
