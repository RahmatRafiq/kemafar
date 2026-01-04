/**
 * FeaturesSection Component
 * Highlight key features
 */

'use client';

import { Leaf, Users, GraduationCap, Heart, LucideIcon } from 'lucide-react';
import homeData from '../../../../public/data/home.json';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Users,
  GraduationCap,
  Heart,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  const { features } = homeData;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {features.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {features.description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Leaf;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="relative text-center p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-xl">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-5 rounded-2xl ${feature.color} mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
