"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = 60,
      distance = 140,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        if (React.isValidElement(child)) {
          // Do not pass custom framer-motion props to native HTML elements
          if (typeof child.type === "string") {
            return child;
          }
          return React.cloneElement(child, {
            mouseX,
            magnification,
            distance,
          } as any);
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-16 items-center gap-2 md:gap-3 rounded-full border border-border/50 bg-background/90 px-4 backdrop-blur-md shadow-2xl",
          className
        )}
        {...props}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);
Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue;
  className?: string;
  children?: React.ReactNode;
}

export const DockIcon = ({
  size = 40,
  magnification = 55,
  distance = 140,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX ?? useMotionValue(Infinity), (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [size, magnification, size]);

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn("flex aspect-square items-center justify-center rounded-full hover:bg-muted/50 transition-colors cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
