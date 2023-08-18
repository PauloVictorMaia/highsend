/* eslint-disable react/prop-types */
import { Container, SaveButton } from "./PanelButtons.style"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function PanelButtons({ save }) {
  return (
    <Container>
      <SaveButton onClick={() => save()}>
        <SaveOutlinedIcon style={{ fontSize: "large", width: "100%", height: "auto", color: "#333" }} />
      </SaveButton>
    </Container>
  )
}

export default PanelButtons;