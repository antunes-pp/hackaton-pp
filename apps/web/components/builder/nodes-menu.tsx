"use client";

import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, Twitter, CloudUpload } from "lucide-react";

import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

type NodesMenuProps = {
  position: { x: number; y: number };
  onAddNode: (nodeType: string, nodeData: any) => void;
  onClose: () => void;
};

type NodeOption = {
  type: string;
  label: string;
  icon: React.ReactNode;
  data: any;
};

export function NodesMenu({ position, onAddNode, onClose }: NodesMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Available node options
  const nodeOptions: NodeOption[] = [
    {
      type: "contextAsset",
      label: "Upload",
      icon: <CloudUpload className="w-5 h-5" />,
      data: {
        label: "Context Asset - Upload",
        icon: "upload",
        service: "upload",
      },
    },
    {
      type: "contextAsset",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      data: {
        label: "Context Asset - LinkedIn",
        icon: "linkedin",
        service: "linkedin",
      },
    },
    {
      type: "contextAsset",
      label: "GitHub",
      icon: <Github className="w-5 h-5" />,
      data: {
        label: "Context Asset - GitHub",
        icon: "github",
        service: "github",
      },
    },
    {
      type: "contextAsset",
      label: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      data: {
        label: "Context Asset - Twitter",
        icon: "twitter",
        service: "twitter",
      },
    },
  ];

  return (
    <div
      ref={menuRef}
      className="z-10 absolute shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Card className="p-4 w-64">
        <h3 className="mb-3 font-semibold text-lg">Add Node</h3>
        <div className="gap-2 grid grid-cols-2">
          {nodeOptions.map((option) => (
            <Button
              key={`${option.type}-${option.label}`}
              variant="outline"
              className="flex flex-col justify-center items-center p-2 h-20"
              onClick={() => onAddNode(option.type, option.data)}
            >
              <div className="mb-1">{option.icon}</div>
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
