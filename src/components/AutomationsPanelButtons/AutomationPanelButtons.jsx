/* eslint-disable react/prop-types */
import { Container, Label, Button, SwitchContainer } from "./AutomationPanelButtons.style";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Ring } from "@uiball/loaders";
import { useStateContext } from "../../contexts/ContextProvider";
import { Switch } from "@mui/material";
import api from "../../api";
import { useParams } from "react-router-dom";

function AutomationsPanelButtons({ save, hasChanges, copyURL, isLoading, active, setActive }) {

  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const params = useParams();
  const token = localStorage.getItem('token');

  const handleActive = async () => {
    try {
      await api.patch(`/automations/handle-active/${params.flowId}`, { active: !active },
        { headers: { authorization: token } });
    } catch (error) {
      console.log("Erro ao alterar status da automação.", error);
    }
  }

  return (
    <Container onClick={() => setNodeMenuIsOpen(!nodeMenuIsOpen)}>
      <Button disabled={!hasChanges} onClick={() => save()} color={hasChanges}>
        {isLoading ? <Ring color="#333" /> : <SaveOutlinedIcon />}
        <Label color={hasChanges}>Salvar</Label>
      </Button>

      <Button onClick={() => copyURL()}>
        <CopyAllIcon />
        <Label>Webhook</Label>
      </Button>

      <SwitchContainer>
        <Switch
          size="small"
          checked={active}
          onChange={() => {
            setActive(!active);
            handleActive();
          }}
        />
        <span>Ativo</span>
      </SwitchContainer>

    </Container >
  )
}

export default AutomationsPanelButtons;