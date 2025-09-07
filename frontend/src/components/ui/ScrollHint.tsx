"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollHintProps {
  shouldShow: boolean;
}

export default function ScrollHint({ shouldShow }: ScrollHintProps) {
  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ bottom: 'calc(var(--spacing-navbar) * 0.5)', height: 'var(--spacing-navbar)' }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-gray-600 text-base font-medium text-center px-4">
          Scrollen um zu erkunden
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </div>
    </motion.div>
  );
}
