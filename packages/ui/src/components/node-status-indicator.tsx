import { ReactNode } from "react";
import clsx from "clsx";

export type NodeStatusIndicatorProps = {
  status?: "loading" | "success" | "error" | "initial";
  children: ReactNode;
};

export const LoadingIndicator = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="-top-[1px] -left-[1px] absolute w-[calc(100%+2px)] h-[calc(100%+2px)]">
        <style>
          {`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .spinner {
          animation: spin 2s linear infinite;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 140%;
          aspect-ratio: 1;
          transform-origin: center;
        }
      `}
        </style>
        <div className="absolute inset-0 rounded-[7px] overflow-hidden">
          <div className="bg-[conic-gradient(from_0deg_at_50%_50%,_rgb(42,67,233)_0deg,_rgba(42,138,246,0)_360deg)] rounded-full spinner" />
        </div>
      </div>
      {children}
    </>
  );
};

const StatusBorder = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={clsx(
          "-top-[1px] -left-[1px] absolute border-2 rounded-[7px] w-[calc(100%+2px)] h-[calc(100%+2px)]",
          className
        )}
      />
      {children}
    </>
  );
};

export const NodeStatusIndicator = ({
  status,
  children,
}: NodeStatusIndicatorProps) => {
  switch (status) {
    case "loading":
      return <LoadingIndicator>{children}</LoadingIndicator>;
    case "success":
      return (
        <StatusBorder className="border-emerald-600">{children}</StatusBorder>
      );
    case "error":
      return <StatusBorder className="border-red-400">{children}</StatusBorder>;
    default:
      return <>{children}</>;
  }
};
