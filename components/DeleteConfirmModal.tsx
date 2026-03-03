"use client";

import React, { memo } from "react";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = memo(function DeleteConfirmModal({
  open,
  title = "Delete Confirmation",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onCancel}>
      <div
        className="modalBox"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modalBtns">
          <button className="cancelBtn" onClick={onCancel}>
            Cancel
          </button>
          <button className="deleteBtn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default DeleteConfirmModal;