import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./SearchFilters.module.css";
import { Minus, Plus } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>
        <button
          type="button"
          className={styles.sectionToggle}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${title} filter options`}
        >
          {title}
          <span className={styles.chevron} aria-hidden="true">
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>
      </legend>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.sectionContent}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </fieldset>
  );
}

export { FilterSection };
