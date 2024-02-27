import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Connection,
  Edge,
  addEdge,
  Controls,
  MarkerType,
  ReactFlowInstance,
  ReactFlowProvider,
  NodeTypes,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import SendMessageNode from "../components/SendMessageNode";
import { useAppContext } from "../context/AppContext";
import { XYCoord, useDrop } from "react-dnd";

const nodeTypes: NodeTypes = {
  sendMessage: SendMessageNode,
};
export const HomePage = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [numOfNodes, setNumOfNodes] = useState(1);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const {
    selectedNode,
    setSelectedNode,
    setSettingsPanelOpen,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  } = useAppContext();

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds: Edge[]) => {
        return addEdge(
          { ...params, markerEnd: { type: MarkerType.Arrow } },
          eds
        );
      }),
    [setEdges]
  );

  //On dropping the message node from the settings panel in the home page a new node is created at the position of drop
  const [, drop] = useDrop(
    () => ({
      accept: "message",
      drop: (_, monitor) => {
        const num = numOfNodes + 1;
        //This is used to get the client offset of the drag source component's root DOM node
        const delta = monitor.getSourceClientOffset() as XYCoord;
        const reactFlowBounds =
          reactFlowWrapper.current?.getBoundingClientRect();

        const position = reactFlowInstance?.project({
          x: delta.x - (reactFlowBounds?.left || 0),
          y: delta.y - (reactFlowBounds?.top || 0),
        });
        setNodes((prevNodes: any[]) =>
          //adding a new node of type sendMessage
          prevNodes.concat({
            id: num.toString(10),
            position,
            type: "sendMessage",
            data: { label: "default node " + num.toString(10) },
            draggable: true,
          })
        );
        setNumOfNodes((prevNum) => prevNum + 1);
      },
    }),
    [numOfNodes, reactFlowInstance]
  );

  const handleNodeClick = (_event: any, node: Node) => {
    setSettingsPanelOpen(true);
    setSelectedNode(node);
  };

  //Updates the data label of the selected node when value of selectedNode changes from the appcontext
  useEffect(() => {
    setNodes((nds: any[]) =>
      nds.map((node: { id: string; data: any }) => {
        if (node.id === selectedNode?.id) {
          if (selectedNode)
            node.data = {
              ...node.data,
              label: selectedNode.data.label,
            };
        }
        return node;
      })
    );
  }, [selectedNode, setNodes]);
  return (
    <div className="w-full h-[calc(100vh-5rem)]" ref={drop}>
      <div className="h-full " ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick} //showing settings panel on clicking a node
            onPaneClick={() => setSettingsPanelOpen(false)}
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};
