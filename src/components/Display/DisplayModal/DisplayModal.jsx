import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function DisplayModal({ isOpen, onClose, title, children }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: 800,
          width: '90%',
          maxHeight: '80vh',
          p: 0,
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <h2 id="modal-title" className="josefin-bold font-bold text-xl" >
            {title}
          </h2>
          <IconButton onClick={onClose} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{
          p: 3,
          overflowY: 'auto',
          maxHeight: 'calc(80vh - 96px)'
        }}
          id="modal-description">
          {children}
        </Box>
      </Box>
    </Modal>
  );
}