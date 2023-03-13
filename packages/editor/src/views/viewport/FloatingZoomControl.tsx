import React, { useCallback } from "react";
import { action } from "mobx";
import addIcon from "@iconify-icons/ic/add";
import removeIcon from "@iconify-icons/ic/remove";
import { twMerge } from "tailwind-merge";
import { IconButton } from "../../components/IconButton";
import { UnstyledInput } from "../../components/Input";
import { scrollState } from "../../state/ScrollState";
import { observer } from "mobx-react-lite";

export const ZoomControl: React.FC<{
  className?: string;
  percentage: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onChangePercentage: (percentage: number) => void;
}> = function ZoomControl({
  className,
  percentage,
  onZoomIn,
  onZoomOut,
  onChangePercentage,
}) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 bg-macaron-background border border-macaron-separator rounded-full px-2 py-0.5",
        className
      )}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <IconButton icon={removeIcon} onClick={onZoomOut} />
      <UnstyledInput
        className="w-10 h-6 rounded text-macaron-base text-macaron-text text-center bg-transparent outline-0 focus:ring-1 ring-inset ring-macaron-active"
        value={`${percentage}%`}
        onChangeValue={action((value) => {
          const newPercent = Number.parseFloat(value);
          if (isNaN(newPercent)) {
            return false;
          }
          onChangePercentage(newPercent);
          return true;
        })}
      />
      <IconButton icon={addIcon} onClick={onZoomIn} />
    </div>
  );
};

export const ZoomControlController: React.FC<{ className?: string }> = observer(
  ({ className }) => {
    const percentage = Math.round(scrollState.scale * 100);
    const onZoomOut = useCallback(
      action(() => scrollState.zoomOut()),
      []
    );
    const onZoomIn = useCallback(
      action(() => scrollState.zoomIn()),
      []
    );
    const onChangeZoomPercent = useCallback(
      action((percent: number) => scrollState.zoomAroundCenter(percent / 100)),
      []
    );
    return (
      <ZoomControl
        className={className}
        percentage={percentage}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onChangePercentage={onChangeZoomPercent}
      />
    );
  }
);