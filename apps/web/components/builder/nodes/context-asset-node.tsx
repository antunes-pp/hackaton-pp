"use client";

import { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

import { BaseNode } from "@workspace/ui/components/base-node";
import { BaseHandle } from "@workspace/ui/components/base-handle";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
  NodeHeaderDeleteAction,
} from "@workspace/ui/components/node-header";

// Define the data structure for context asset nodes
interface ContextAssetData {
  label: string;
  icon: string;
  service: string;
}

const iconMap = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
};

export const ContextAssetNode = memo(({ data, selected }: NodeProps) => {
  // Type assertion with safety checks
  const nodeData = {
    label: (data as any)?.label || "Context Asset",
    icon: (data as any)?.icon || "mail",
    service: (data as any)?.service || "unknown",
  };

  const Icon = iconMap[nodeData.icon as keyof typeof iconMap] || Mail;

  return (
    <BaseNode selected={selected} className="w-60">
      <NodeHeader>
        <NodeHeaderIcon>
          <Icon />
        </NodeHeaderIcon>
        <NodeHeaderTitle>{nodeData.label}</NodeHeaderTitle>
        <NodeHeaderDeleteAction />
      </NodeHeader>

      <div className="p-3">
        <p className="text-muted-foreground text-sm">
          Provides context from {nodeData.service}
        </p>
      </div>

      {/* Output handle */}
      <BaseHandle
        type="source"
        position={Position.Right}
        id="output"
        className="right-0"
      />
    </BaseNode>
  );
});

ContextAssetNode.displayName = "ContextAssetNode";
