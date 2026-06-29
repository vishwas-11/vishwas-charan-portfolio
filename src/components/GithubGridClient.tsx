"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export interface Day {
  level: number;
  count: number;
  date: string;
}

export default function GithubGridClient({ cells }: { cells: Day[] }) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 0: return "bg-neutral-200 dark:bg-[#161b22] opacity-50"; 
      case 1: return "bg-[#0e4429]";
      case 2: return "bg-[#006d32]";
      case 3: return "bg-[#26a641]";
      case 4: return "bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.6)]";
      default: return "bg-neutral-200 dark:bg-[#161b22] opacity-50";
    }
  };

  // Sort cells by date to ensure proper consecutive ordering
  const sortedCells = [...cells].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Calculate day of the week for the first cell so we can pad to Sunday
  let paddedCells = [...sortedCells];
  if (sortedCells.length > 0 && sortedCells[0].date) {
    const firstDate = new Date(sortedCells[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday
    const padding = Array(firstDayOfWeek).fill({ level: 0, count: 0, date: "" });
    paddedCells = [...padding, ...sortedCells];
  }

  const columns: Day[][] = [];
  for (let i = 0; i < paddedCells.length; i += 7) {
    columns.push(paddedCells.slice(i, i + 7));
  }

  useEffect(() => {
    setMounted(true);
    
    // Auto-scroll to the area with the most contributions
    const timer = setTimeout(() => {
      if (!scrollRef.current || columns.length === 0) return;
      
      let maxCount = -1;
      let targetColIndex = columns.length - 1; // Default to right-most
      
      const windowSize = 8; 
      for (let i = 0; i <= columns.length - windowSize; i++) {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) {
          sum += columns[i + j].reduce((acc, cell) => acc + cell.count, 0);
        }
        if (sum > maxCount) {
          maxCount = sum;
          targetColIndex = i + Math.floor(windowSize / 2);
        }
      }
      
      // Calculate scroll position (each column is 14px + 6px gap = 20px)
      const scrollPos = (targetColIndex * 20) - (scrollRef.current.clientWidth / 2);
      scrollRef.current.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
    }, 800); // Wait for the entrance animation to settle

    return () => clearTimeout(timer);
  }, [columns.length]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX); // 1:1 scroll ratio for perfect smoothness
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const columnVariant = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  if (!mounted) {
    return <div className="h-40 w-full animate-pulse bg-accent/10 rounded-xl" />;
  }

  return (
    <div 
      ref={scrollRef}
      className="w-full max-w-[calc(100vw-2rem)] overflow-x-auto overflow-y-visible py-10 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="flex flex-col gap-2 mx-auto w-fit">
        <motion.div 
          className="flex gap-1.5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {columns.map((col, colIndex) => (
            <motion.div key={colIndex} variants={columnVariant} className="flex flex-col gap-1.5">
              {col.map((day, rowIndex) => {
                const isLastFew = colIndex > columns.length - 8;
                const isFirstFew = colIndex < 8;
                
                const tooltipAlignClass = isLastFew 
                  ? "right-1/2 translate-x-3" 
                  : isFirstFew 
                    ? "left-1/2 -translate-x-3" 
                    : "left-1/2 -translate-x-1/2";
                
                const arrowAlignClass = isLastFew 
                  ? "right-3" 
                  : isFirstFew 
                    ? "left-3" 
                    : "left-1/2 -translate-x-1/2";

                if (!day.date) {
                  return <div key={`${colIndex}-${rowIndex}`} className="h-[14px] w-[14px] flex-shrink-0 opacity-0" />;
                }

                return (
                  <div key={`${colIndex}-${rowIndex}`} className="group relative">
                    <div
                      className={`h-[14px] w-[14px] rounded-[3px] ${getColor(day.level)} transition-all hover:ring-2 hover:ring-white/70 hover:scale-125 hover:z-10 flex-shrink-0`}
                    />
                    <div className={`pointer-events-none absolute bottom-full mb-3 w-max opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium ${tooltipAlignClass}`}>
                      {day.count === 0 ? "No" : day.count} contribution{day.count !== 1 ? "s" : ""} on {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      <div className={`absolute top-full border-[5px] border-transparent border-t-foreground ${arrowAlignClass}`} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
