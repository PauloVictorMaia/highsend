/* eslint-disable react/prop-types */
import { ToolbarContainer } from "./Toolbar.style";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Toolbar(props) {
  return (
    <ToolbarContainer isvisible={props.selected}>
      <DeleteOutlineOutlinedIcon onClick={props.deleteFunction} />
    </ToolbarContainer>
  )
}

export default Toolbar;