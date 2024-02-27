import { createContext, useContext, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  NodeChange,
  Edge,
  OnEdgesChange,
  Node,
} from "reactflow";

interface AppContext {
  settingsPanelOpen: boolean;
  selectedNode: Node | null;
  setSettingsPanelOpen: (arg1: boolean) => void;
  setSelectedNode: (arg1: Node) => void;
  checkNodesConnection?: (arg1: number) => boolean;
  nodes: Node<any, string | undefined>[] | undefined;
  setNodes: (nodes: any) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  edges: Edge<any>[] | undefined;
  setEdges: (eds: any) => void;
  onEdgesChange: OnEdgesChange | undefined;
}
const initialNodes = [
  {
    id: "1",
    type: "sendMessage",
    data: { label: "default node" },
    position: { x: 120, y: 100 },
  },
];

const AppContext = createContext<AppContext>({} as AppContext);

//AppContextProvider holds all the necessary values/functions that are required across different components in the application.
export const AppContextProvider = (props: any) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const checkNodesConnection = (val: number): boolean => {
    const nodeIds = nodes.map((node) => node.id);
    edges.map((edge) => {
      if (nodeIds.includes(edge.target)) {
        const index = nodeIds.indexOf(edge.target);
        if (index !== -1) {
          nodeIds.splice(index, 1);
        }
      }
    });
    if (nodeIds.length > val) return false;
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        settingsPanelOpen,
        selectedNode,
        setSettingsPanelOpen,
        setSelectedNode,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        checkNodesConnection,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
