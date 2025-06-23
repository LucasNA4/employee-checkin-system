import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

export const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Esta seguro?',
    message = 'Esta seguro que desea realizar esta accion?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
}) => (
    <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                {cancelText}
            </Button>
            <Button
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                color="primary"
                variant="contained"
                autoFocus
            >
                {confirmText}
            </Button>
        </DialogActions>
    </Dialog>
);