import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = overlayRef.current;
    if (isOpen && div) {
      div.focus();
    }
  }, [isOpen]);

  const render = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className={clsx(
            "fixed z-50 inset-0 bg-black/50 backdrop-blur-xs grid place-items-center overflow-auto",
            classNames?.overlay
          )}
          data-is="modal"
          tabIndex={0}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onRequestClose()}
          onKeyDown={(ev) => {
            if (ev.key === "Escape") {
              onRequestClose();
            }
          }}
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

  if (typeof window === "undefined") {
    return render;
  }

  return createPortal(render, portalNode ?? document.body);
}