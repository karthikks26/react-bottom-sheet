"use client";

import type React from "react";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomSheetProps {
  isOpen: boolean;
  snapPoint: "closed" | "half" | "full";
  onSnapPointChange: (point: "closed" | "half" | "full") => void;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  isOpen,
  snapPoint,
  onSnapPointChange,
  onClose,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Snap point positions (percentage of viewport height)
  const snapPoints = {
    closed: 100, // Fully hidden
    half: 50, // Half visible
    full: 10, // Almost fully visible (leaving some space at top)
  };

  // Get current snap point position
  const getSnapPointPosition = useCallback(
    (point: "closed" | "half" | "full") => {
      return (windowHeight * snapPoints[point]) / 100;
    },
    [windowHeight]
  );

  // Apply transform with spring animation
  const applyTransform = useCallback(
    (translateY: number, animate = true) => {
      if (!sheetRef.current) return;

      if (animate && !isDragging) {
        setIsAnimating(true);
        sheetRef.current.style.transition =
          "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)";
        setTimeout(() => setIsAnimating(false), 400);
      } else {
        sheetRef.current.style.transition = "none";
      }

      sheetRef.current.style.transform = `translateY(${translateY}px)`;
      setCurrentTranslateY(translateY);
    },
    [isDragging]
  );

  // Find nearest snap point
  const findNearestSnapPoint = useCallback(
    (currentY: number): "closed" | "half" | "full" => {
      const distances = {
        closed: Math.abs(currentY - getSnapPointPosition("closed")),
        half: Math.abs(currentY - getSnapPointPosition("half")),
        full: Math.abs(currentY - getSnapPointPosition("full")),
      };

      return Object.keys(distances).reduce((a, b) =>
        distances[a as keyof typeof distances] <
        distances[b as keyof typeof distances]
          ? a
          : b
      ) as "closed" | "half" | "full";
    },
    [getSnapPointPosition]
  );

  // Handle drag start
  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    setDragStartY(clientY);
  }, []);

  // Handle drag move
  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;

      const deltaY = clientY - dragStartY;
      const currentSnapPosition = getSnapPointPosition(snapPoint);
      const newTranslateY = Math.max(
        getSnapPointPosition("full"),
        Math.min(getSnapPointPosition("closed"), currentSnapPosition + deltaY)
      );

      applyTransform(newTranslateY, false);
    },
    [isDragging, dragStartY, snapPoint, getSnapPointPosition, applyTransform]
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    const nearestPoint = findNearestSnapPoint(currentTranslateY);
    onSnapPointChange(nearestPoint);
  }, [isDragging, currentTranslateY, findNearestSnapPoint, onSnapPointChange]);

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientY);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleDragMove(e.clientY);
    },
    [handleDragMove]
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleDragStart(e.touches[0].clientY);
    },
    [handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientY);
    },
    [handleDragMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Update position when snap point changes
  useEffect(() => {
    if (isMounted && !isAnimating && !isDragging) {
      const targetPosition = getSnapPointPosition(snapPoint);
      applyTransform(targetPosition, true);
    }
  }, [
    isMounted,
    snapPoint,
    getSnapPointPosition,
    applyTransform,
    isAnimating,
    isDragging,
  ]);

  // Handle initial positioning
  useEffect(() => {
    if (isMounted && isOpen) {
      const targetPosition = getSnapPointPosition(snapPoint);
      applyTransform(targetPosition, true);
    }
  }, [isMounted, isOpen, snapPoint, getSnapPointPosition, applyTransform]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (snapPoint === "closed") onSnapPointChange("half");
          else if (snapPoint === "half") onSnapPointChange("full");
          break;
        case "ArrowDown":
          e.preventDefault();
          if (snapPoint === "full") onSnapPointChange("half");
          else if (snapPoint === "half") onSnapPointChange("closed");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, snapPoint, onSnapPointChange, onClose]);

  // Early return after all hooks are called
  if (!isMounted) {
    return null;
  }

  if (!isOpen && snapPoint === "closed") {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen && snapPoint !== "closed"
            ? "opacity-50"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden"
        style={{
          transform: `translateY(${getSnapPointPosition("closed")}px)`,
          willChange: "transform",
        }}
      >
        {/* Handle Area */}
        <div
          className="flex flex-col items-center py-4 px-6 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />

          {/* Header with Close Button */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500 font-medium">
                {snapPoint === "full"
                  ? "Fully Open"
                  : snapPoint === "half"
                  ? "Half Open"
                  : "Closed"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] overscroll-contain">
          {children}
        </div>

        {/* Snap Point Indicators */}
        <div className="absolute right-4 top-20 flex flex-col gap-2">
          {(["full", "half", "closed"] as const).map((point) => (
            <button
              key={point}
              onClick={() => onSnapPointChange(point)}
              className={`w-2 h-2 rounded-full transition-colors ${
                snapPoint === point
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Snap to ${point} position`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
