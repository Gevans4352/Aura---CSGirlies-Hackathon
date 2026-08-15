import { useEffect, useState } from "react";
import { getQuietMode } from "../lib/quietMode";

export function useQuietMode() {
  const [quiet, setQuiet] = useState(getQuietMode);

  useEffect(() => {
    const sync = () => setQuiet(getQuietMode());
    window.addEventListener("quiet-mode-change", sync);
    return () => window.removeEventListener("quiet-mode-change", sync);
  }, []);

  return quiet;
}
