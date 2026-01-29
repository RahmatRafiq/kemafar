'use client';

import Image from 'next/image';
import { User } from 'lucide-react';
import { getActiveLeadership, type LeadershipMember } from '@/lib/api/leadership';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * Format position string for display
 * Examples: 'ketua' → 'Ketua', 'wakil-ketua' → 'Wakil Ketua', 'coordinator' → 'Koordinator'
 */
function formatPosition(position: string): string {
  return position
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format division string for display
 * Examples: 'internal-affairs' → 'Internal Affairs', 'media-information' → 'Media Information'
 */
function formatDivision(division: string): string {
  return division
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Core positions determined by absence of division (already dynamic)
const corePositions = ['ketua', 'wakil-ketua', 'sekretaris', 'bendahara'];

export default function LeadershipPage() {
  const [coreLeadership, setCoreLeadership] = useState<LeadershipMember[]>([]);
  const [groupedByDivision, setGroupedByDivision] = useState<Record<string, LeadershipMember[]>>({});
  const [_loading, setLoading] = useState(true);

  // Parallax Setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll(); // Use global scroll for sticky effect

  // Parallax transforms for the Hero Title
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Moves down slower than scroll to create parallax
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]); // Fade partially but stay visible
  const blur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]); // Stronger blur effect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await getActiveLeadership();

        // Split into core and division leadership
        const core = all.filter((member) => !member.division && corePositions.includes(member.position));
        const divisionLeadership = all.filter((member) => member.division);

        // Group by division
        const grouped = divisionLeadership.reduce((acc, member) => {
          const div = member.division ?? '';
          if (!acc[div]) {
            acc[div] = [];
          }
          acc[div].push(member);
          return acc;
        }, {} as Record<string, LeadershipMember[]>);

        setCoreLeadership(core);
        setGroupedByDivision(grouped);
      } catch (error) {
        console.error('Failed to fetch leadership:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-black" ref={containerRef}>
      {/* 
        FIXED BACKGROUND LAYER 
        Contains the Title "LEADERSHIP" which stays and gets blurred/covered
      */}
      <div className="fixed inset-0 z-0 flex items-start pt-32 justify-center pointer-events-none">
        <motion.div
          style={{ y, opacity, filter: blur }}
          className="text-center"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-white mb-4">
            Leadership
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
            The visionaries behind the movement.
          </p>
        </motion.div>

        {/* Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary-900/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-secondary-900/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 
        SCROLLABLE CONTENT LAYER 
        This div scrolls normally. We add a huge top margin (spacer) so we see the hero first.
        Then the content slides UP over the fixed background.
      */}
      <div className="relative z-10">

        {/* Spacer to show the Hero Title initially */}
        <div className="h-[60vh] w-full" />

        {/* Core Team - Slides over the title */}
        <section className="pb-20 md:pb-32 text-white min-h-screen">
          <div className="container-custom pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {coreLeadership.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group relative"
                >
                  {/* Poster Image */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-900 flex items-center justify-center">
                    {member.photo ? (
                      <>
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-700 group-hover:text-primary-500 transition-colors">
                        <User className="w-20 h-20 mb-4" />
                        <span className="text-xs uppercase tracking-widest">No Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Minimal Typography */}
                  <div className="border-t border-gray-800 pt-4 group-hover:border-white transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-1 tracking-tight text-white group-hover:text-primary-400 transition-colors">{member.name}</h3>
                    <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
                      {formatPosition(member.position)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Division Leadership Section */}
          <div className="container-custom mt-32">
            {Object.entries(groupedByDivision).map(([division, members]) => (
              <motion.div
                key={division}
                className="mb-24 last:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Division Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 mb-12">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/90">
                    {formatDivision(division)}
                  </h2>
                  <span className="text-xl font-mono text-gray-600 mt-4 md:mt-0">
                    {String(members.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Division Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                  {members.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      className="flex items-center gap-6 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {/* Avatar */}
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-800">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wide">
                          {formatPosition(member.position)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
