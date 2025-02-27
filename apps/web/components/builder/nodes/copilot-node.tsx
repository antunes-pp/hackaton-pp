"use client";

import { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";
import { Bot } from "lucide-react";

import { BaseNode } from "@workspace/ui/components/base-node";
import { BaseHandle } from "@workspace/ui/components/base-handle";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
  NodeHeaderDeleteAction,
} from "@workspace/ui/components/node-header";

export const CopilotNode = memo(({ data, selected }: NodeProps) => {
  // Type assertion with safety checks
  const nodeData = {
    label: (data as any)?.label || "Copilot",
  };

  return (
    <BaseNode selected={selected} className="w-64">
      <NodeHeader>
        <NodeHeaderIcon>
          <Bot />
        </NodeHeaderIcon>
        <NodeHeaderTitle>{nodeData.label}</NodeHeaderTitle>
        <NodeHeaderDeleteAction />
      </NodeHeader>

      <div className="p-3">
        <p className="text-muted-foreground text-sm">
          AI assistant that uses connected context
        </p>
      </div>

      {/* Input handle */}
      <BaseHandle
        type="target"
        position={Position.Left}
        id="input"
        className="left-0"
      />
    </BaseNode>
  );
});

CopilotNode.displayName = "CopilotNode";
