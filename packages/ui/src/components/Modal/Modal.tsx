import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { clsx } from "clsx";
import { createPortal } from "react-dom";

export type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  classNames?: Partial<Record<
    "overlay" | "content",
    string
  >>;
  portalNode?: Element | DocumentFragment
}

export function Modal({ portalNode, classNames, children, isOpen, onRequestClose }: React.PropsWithChildren<ModalProps>) {
  const render = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(
            "fixed inset-0 bg-black/50 backdrop-blur-xs grid place-items-center overflow-auto",
            classNames?.overlay
          )}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onRequestClose()}
        >
          <motion.div
            className={clsx(
              "p-4",
              classNames?.content,
            )}
            onClick={(ev) => ev.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(render, portalNode ?? document.body);
}