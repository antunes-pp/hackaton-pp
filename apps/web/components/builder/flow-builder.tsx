"use client";

import { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowInstance,
  Node,
  Edge,
  NodeTypes,
  ConnectionLineType,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider, // Import this
} from "@xyflow/react";
import { Plus } from "lucide-react";

import { ZoomSlider } from "@workspace/ui/components/zoom-slider";
import { Button } from "@workspace/ui/components/button";
import { NodesMenu } from "./nodes-menu";
import { ContextAssetNode, CopilotNode } from "./nodes";

// Define node types
const nodeTypes: NodeTypes = {
  contextAsset: ContextAssetNode,
  copilot: CopilotNode,
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: "copilot-1",
    type: "copilot",
    position: { x: 600, y: 300 },
    data: { label: "Copilot" },
  },
];

const initialEdges: Edge[] = [];

// Create an internal component that uses the hooks
function FlowBuilderContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [showNodesMenu, setShowNodesMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const reactFlow = useReactFlow();

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
      );
    },
    [setEdges]
  );

  // Set the ReactFlow instance when it's ready
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  // Toggle the nodes menu
  const toggleNodesMenu = useCallback(() => {
    setShowNodesMenu((prev) => !prev);
    if (reactFlowWrapper.current) {
      const rect = reactFlowWrapper.current.getBoundingClientRect();
      setMenuPosition({ x: rect.left + 60, y: rect.top + 60 });
    }
  }, []);

  // Add a new node to the flow
  const onAddNode = useCallback(
    (nodeType: string, nodeData: any) => {
      if (!reactFlowInstance) return;

      const position = reactFlow.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 3,
      });

      const newNode: Node = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
      setShowNodesMenu(false);
    },
    [reactFlow, reactFlowInstance, setNodes]
  );

  return (
    <div className="w-full h-screen" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />

        <Panel position="top-left" className="flex flex-col gap-3 m-1">
          <div className="flex gap-1 bg-primary-foreground p-1 rounded-md text-foreground">
            <div className="flex items-center px-2 h-9">
              <h2 className="font-medium text-muted-foreground text-sm">
                AI LAB - Copilot Builder |{" "}
                <span className="text-foreground">Copiloto de onboarding</span>
              </h2>
            </div>
          </div>

          <div className="flex self-start gap-1 bg-primary-foreground p-1 rounded-md text-foreground">
            <Button size="icon" variant="ghost" onClick={toggleNodesMenu}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </Panel>

        <ZoomSlider position="bottom-left" />
      </ReactFlow>

      {/* Nodes Menu */}
      {showNodesMenu && (
        <NodesMenu
          position={menuPosition}
          onAddNode={onAddNode}
          onClose={() => setShowNodesMenu(false)}
        />
      )}
    </div>
  );
}

// Export the wrapped component with ReactFlowProvider
export function FlowBuilder() {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent />
    </ReactFlowProvider>
  );
}
