import styled from "styled-components";
import CycloneIcon from "@mui/icons-material/Cyclone";
import { useState } from "react";
import ChoseForMeModal from "./ChoseForMeModal";
import { commonButtonStyles } from "../common/CommonButtonStyles";

export const StyledButton = styled.button`
  ${commonButtonStyles}
`;

interface ChoseForMeButtonProps {
  label: string;
  watcherId: string;
  listCategory: string;
}

const ChoseForMeButton = ({
  label,
  watcherId,
  listCategory,
}: ChoseForMeButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledButton onClick={handleOpen}>
        <CycloneIcon /> <span>{label}</span>
      </StyledButton>
      {open && (
        <ChoseForMeModal
          open={open}
          handleClose={handleClose}
          watcherId={watcherId}
          listCategory={listCategory}
        />
      )}
    </>
  );
};

export default ChoseForMeButton;
