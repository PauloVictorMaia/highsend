/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */


export default () => {
  const onDragStart = (event, nodeType, parentNode, extent) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('parentNode', parentNode);
    event.dataTransfer.setData('extent', extent);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'group')} draggable>
        Group
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default', 'start node', 'parent')} draggable>
        Son
      </div>
    </aside>
  );
};
