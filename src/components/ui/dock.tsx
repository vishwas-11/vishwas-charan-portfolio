"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps extends HTMLMotionProps<"div"> {
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
      distance = 100,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          // Do not pass custom framer-motion props to native HTML elements
          if (typeof child.type === "string") {
            return child;
          }
          return React.cloneElement(child, {
            mouseX,
            magnification,
            distance,
          } as React.Attributes);
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-14 items-center gap-1 md:gap-1.5 rounded-full px-2.5 backdrop-blur-md shadow-2xl",
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

export interface DockIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue;
  className?: string;
  children?: React.ReactNode;
}

export const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      size = 36,
      magnification = 52,
      distance = 100,
      mouseX,
      className,
      children,
      ...props
    },
    refOuter
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const defaultMouseX = useMotionValue(Infinity);
    const resolvedMouseX = mouseX ?? defaultMouseX;

    const distanceCalc = useTransform(resolvedMouseX, (val: number) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [size, magnification, size]);

    const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 14,
    });

    return (
      <motion.div
        ref={refOuter || ref}
        style={{ width, height: width }}
        className={cn("flex aspect-square items-center justify-center rounded-full hover:bg-neutral-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
DockIcon.displayName = "DockIcon";
