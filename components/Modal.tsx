"use client";

import React, { forwardRef, memo, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  value: string;
  error?: string;
  confirmText?: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = memo(function Modal({
  open,
  title,
  value,
  error,
  confirmText = "Save",
  onChange,
  onCancel,
  onConfirm,
}: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onCancel}>
      <div
        className="modalBox"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="modalTitle">{title}</h3>

        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Enter name..."
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onConfirm();
            if (e.key === "Escape") onCancel();
          }}
        />

        {error && <div className="modalError">{error}</div>}

        <div className="modalBtns">
          <button className="cancelBtn" onClick={onCancel}>
            Cancel
          </button>

          <button className="saveBtn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;