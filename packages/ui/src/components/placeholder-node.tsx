import React, { useCallback, ReactNode, forwardRef } from "react";
import {
  useReactFlow,
  useNodeId,
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import { BaseNode } from "@workspace/ui/components/base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
  ({ selected, children }, ref) => {
    const id = useNodeId();
    const { setNodes, setEdges } = useReactFlow();

    const handleClick = useCallback(() => {
      if (!id) return;

      setEdges((edges) =>
        edges.map((edge) =>
          edge.target === id ? { ...edge, animated: false } : edge
        )
      );

      setNodes((nodes) => {
        const updatedNodes = nodes.map((node) => {
          if (node.id === id) {
            // Customize this function to update the node's data as needed.
            // For example, you can change the label or other properties of the node.
            return {
              ...node,
              data: { ...node.data, label: "Node" },
              type: "default",
            };
          }
          return node;
        });
        return updatedNodes;
      });
    }, [id, setEdges, setNodes]);

    return (
      <BaseNode
        ref={ref}
        selected={selected}
        className="bg-card shadow-none p-2 border-gray-400 border-dashed w-[150px] text-gray-400 text-center"
        onClick={handleClick}
      >
        {children}
        <Handle
          type="target"
          style={{ visibility: "hidden" }}
          position={Position.Top}
          isConnectable={false}
        />
        <Handle
          type="source"
          style={{ visibility: "hidden" }}
          position={Position.Bottom}
          isConnectable={false}
        />
      </BaseNode>
    );
  }
);

PlaceholderNode.displayName = "PlaceholderNode";
