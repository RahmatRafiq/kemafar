/**
 * Timeline Component
 * Display company history timeline
 */

'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: readonly TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line - centered on desktop, left on mobile */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary-200 origin-top"
      />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={`${item.year}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Desktop Layout (>= md) */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                {/* Left side content or empty space */}
                {isLeft ? (
                  <div className="flex items-start justify-end pr-8">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 max-w-md w-full"
                    >
                      <div className="text-sm text-primary-600 font-semibold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>
                ) : (
                  <div />
                )}

                {/* Right side content or empty space */}
                {!isLeft ? (
                  <div className="flex items-start justify-start pl-8">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 max-w-md w-full"
                    >
                      <div className="text-sm text-primary-600 font-semibold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>
                ) : (
                  <div />
                )}

                {/* Year badge - centered on line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full font-bold text-lg shadow-xl border-4 border-white">
                    {item.year.slice(-2)}
                  </div>
                </div>
              </div>

              {/* Mobile Layout (< md) */}
              <div className="md:hidden flex gap-6">
                {/* Year badge on left */}
                <div className="flex-shrink-0">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full font-bold text-lg shadow-xl border-4 border-white">
                    {item.year.slice(-2)}
                  </div>
                </div>

                {/* Content on right */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                    <div className="text-sm text-primary-600 font-semibold mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
