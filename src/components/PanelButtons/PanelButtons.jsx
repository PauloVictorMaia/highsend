/* eslint-disable react/prop-types */
import { Container, Label, Button } from "./PanelButtons.style"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import SettingsIcon from '@mui/icons-material/Settings';

function PanelButtons({ save, hasChanges }) {
  return (
    <Container>
      <Button disabled={!hasChanges} onClick={() => save()} color={hasChanges}>
        <SaveOutlinedIcon />
        <Label color={hasChanges}>Salvar</Label>
      </Button>

      <Button>
        <IosShareIcon />
        <Label>Exportar</Label>
      </Button>

      <Button>
        <SettingsIcon />
        <Label>Configurar</Label>
      </Button>
    </Container>
  )
}

export default PanelButtons;