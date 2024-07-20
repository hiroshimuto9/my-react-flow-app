import React, { useCallback } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

import TextUpdaterNode from "./components/TextUpdaterNode";
import CustomEdge from "./components/CustomEdge";

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { "custom-edge": CustomEdge };

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "1",
    // type: "input",
    data: { label: "Node1" },
    position: { x: 100, y: 100 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Node2</div> },
    position: { x: 100, y: 200 },
  },
  {
    id: "3",
    // type: "output",
    data: { label: "Node3" },
    position: { x: 100, y: 300 },
  },
  // {
  //   id: "node-1",
  //   type: "textUpdater",
  //   position: { x: 0, y: 0 },
  //   data: { value: 123 },
  // },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "custom-edge" },
  { id: "e2-3", source: "2", target: "3", type: "custom-edge" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );
  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={rfStyle}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
