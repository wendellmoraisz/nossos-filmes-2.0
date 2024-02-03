import styled from "styled-components";
import CycloneIcon from "@mui/icons-material/Cyclone";
import { useState } from "react";
import ChoseForMeModal from "./ChoseForMeModal";

export const StyledButton = styled.button`
    text-align: center;
    font-size: 16px;
    border: 1px solid #32E0C4;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    background-color: transparent;

    &:hover {
        background-color: rgba(50, 224, 196, .1);
    }
`;

interface ChoseForMeButtonProps {
    label: string;
    watcherId: string;
    listCategory: string;
}

const ChoseForMeButton = ({ label, watcherId, listCategory }: ChoseForMeButtonProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <StyledButton onClick={handleOpen}>
                <CycloneIcon /> {label}
            </StyledButton>
            {
                open && (
                    <ChoseForMeModal
                        open={open}
                        handleClose={handleClose}
                        watcherId={watcherId}
                        listCategory={listCategory}
                    />
                )
            }
        </>
    )
}

export default ChoseForMeButton;