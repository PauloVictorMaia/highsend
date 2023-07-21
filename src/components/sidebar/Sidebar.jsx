/* eslint-disable react/display-name */

import { SidebarContainer } from "./Sidebar.style";

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <div onDragStart={(event) => onDragStart(event, 'defaultNode')} draggable>
        Default
      </div>
    </SidebarContainer>
  );
};
