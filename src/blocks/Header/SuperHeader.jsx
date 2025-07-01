import React from "react";
import Button from "@mui/material/Button";
import { KeyboardTabOutlined } from "@mui/icons-material";

export function SuperHeader({ onClose }) {
  return (
    <div className="flex w-full text-lg text-white bg-primary font-bold items-center justify-between">
      <span className="px-4 py-2 ">
        Preferences
      </span>
      {onClose && (
        <Button
          onClick={onClose}
          variant="text"
          sx={{
            minHeight: 0,
            minWidth: 0,
            color: 'white'
          }}
        >
          <KeyboardTabOutlined />
        </Button>
      )}
    </div>
  );
}