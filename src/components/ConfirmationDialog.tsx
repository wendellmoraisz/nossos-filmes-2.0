import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    open: boolean;
    title: string;
    content: string;
    confirmAction: () => void;
    cancelAction?: () => void;
}

const ConfirmationDialog = ({ open, title, content, confirmAction, cancelAction }: Props) => {

    return (
        <React.Fragment>
            <Dialog
                color="primary"
                open={open}
                onClose={cancelAction}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelAction}>Não</Button>
                    <Button variant="contained" onClick={confirmAction} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ConfirmationDialog;