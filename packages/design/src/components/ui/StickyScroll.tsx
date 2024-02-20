"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    image?: string;
  }[];
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const cardLength = content.length;
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const componentTop = componentRef.current?.getBoundingClientRect().top + window.scrollY || 0;
      const componentHeight = componentRef.current?.offsetHeight ?? 0;
      const windowHeight = window.innerHeight;

      const scrollStart = componentTop;
      const scrollEnd = componentTop + componentHeight - windowHeight;
      const normalizedScroll = Math.max(scrollPosition - scrollStart, 0);
      const maxScroll = Math.max(scrollEnd - scrollStart, 1); // Ensure non-zero for division
      const scrollProgress = normalizedScroll / maxScroll;

      // Adjust breakpoint calculation to ensure smoother transitions
      const cardsBreakpoints = content.map((_, index) => (index / (cardLength - 1)));
      let newActiveCard = activeCard;
      for (let i = 0; i < cardsBreakpoints.length; i++) {
        if (scrollProgress < cardsBreakpoints[i] + (1 / (cardLength - 1))) {
          newActiveCard = i;
          break;
        }
      }

      setActiveCard(newActiveCard);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content, cardLength, activeCard]);

  const backgroundColors = [
    "var(--black)",
    "var(--slate-900)",
    "var(--gray-900)",
    "var(--black)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--blue-500), var(--purple-500))",
    "linear-gradient(to bottom right, var(--primary), var(--secondary))",
  ];

  return (
    <div
      ref={componentRef}
      style={{
        // "&::before": { 
        //   background: backgroundColors[activeCard % backgroundColors.length],
        // }
      }} 
      className="before:absolute before:inset-0 before:min-h-full before:w-full min-h-full w-full flex justify-center relative space-x-10 rounded-md p-10 py-24"
    >
     
      <div className="relative flex items-start px-4">
        <div className="w-full max-w-screen-2xl space-y-16">
          {content.map((item, index) => (
            <div key={item.title + index}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg leading-loose text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="hidden lg:block h-96 w-96 rounded-md bg-white sticky top-32 overflow-hidden"
        ></motion.div>
      </div>
    );
  };