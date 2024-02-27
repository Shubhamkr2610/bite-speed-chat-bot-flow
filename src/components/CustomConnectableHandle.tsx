import React, { useMemo } from "react";
import {
  Edge,
  getConnectedEdges,
  Handle,
  HandleProps,
  Node,
  useNodeId,
  useStore,
} from "reactflow";

export interface SelectorsProps {
  nodeInternals?: Map<string, Node>;
  edges?: Edge[];
}

export interface CustomHandleProps extends Omit<HandleProps, "isConnectable"> {
  isConnectable?: boolean | number;
}

// Selector function to extract necessary data from the react-flow store
const selector = (s: SelectorsProps) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});
// CustomConnectableHandle component creates a customized handle for sendMessageNode
const CustomConnectableHandle: React.FC<CustomHandleProps> = (props) => {
  const { nodeInternals, edges } = useStore(selector); // Accessing nodeInternals and edges from the react-flow store
  const nodeId: any = useNodeId();

  // Function to determine if the handle is connectable based on the number of connections
  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "number") {
      let sourceConnection = 0;
      const node = nodeInternals?.get(nodeId); // Get the node using its ID
      const connectedEdges = getConnectedEdges(node ? [node] : [], edges || []); // Get the edges connected to the node
      // Count the number of outgoing connections from the node
      connectedEdges.forEach((edge) => {
        if (edge.source === nodeId) {
          sourceConnection++;
        }
      });
      return sourceConnection < props.isConnectable;
    }
    return !!props.isConnectable;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable} />;
};

export default CustomConnectableHandle;
