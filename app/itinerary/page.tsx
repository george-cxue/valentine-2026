"use client";

import { motion } from "framer-motion";
import { Heart, Clock, MapPin, Utensils, Film, Music, Gift, Coffee, Star } from "lucide-react";
import Link from "next/link";

// ============================================================
// ITINERARY DATA - Edit this array to customize your Valentine's Day schedule
// Each item has: time, title, description, and an optional icon key
// Available icons: "utensils", "film", "music", "gift", "coffee", "star", "heart", "mappin"
// ============================================================
const ITINERARY_DATA = [
  {
    time: "10:00 AM",
    title: "Breakfast in Bed",
    description: "Starting our special day with your favorite pancakes and fresh coffee.",
    icon: "coffee",
  },
  {
    time: "12:00 PM",
    title: "Surprise Activity",
    description: "Something fun I've been planning... you'll have to wait and see!",
    icon: "gift",
  },
  {
    time: "3:00 PM",
    title: "Afternoon Treat",
    description: "A little sweet stop at that bakery you love.",
    icon: "coffee",
  },
  {
    time: "6:00 PM",
    title: "Dinner Reservation",
    description: "That Italian place you've been wanting to try. I made reservations!",
    icon: "utensils",
  },
  {
    time: "8:30 PM",
    title: "Movie Night",
    description: "Your pick! I'll even watch a rom-com without complaining.",
    icon: "film",
  },
  {
    time: "11:00 PM",
    title: "Stargazing",
    description: "Ending our perfect day under the stars together.",
    icon: "star",
  },
];

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  utensils: Utensils,
  film: Film,
  music: Music,
  gift: Gift,
  coffee: Coffee,
  star: Star,
  heart: Heart,
  mappin: MapPin,
};

export default function ItineraryPage() {
  return (
    <main className="min-h-screen bg-[var(--valentine-cream)]">
      {/* Header Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-[var(--valentine-blush)] to-[var(--valentine-cream)] px-4 py-16 text-center md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[var(--valentine-pink)]"
              style={{
                left: `${(i * 12.5) + 6}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="h-4 w-4 fill-current opacity-30 md:h-6 md:w-6" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-6 inline-flex items-center justify-center rounded-full bg-white/50 p-4 shadow-lg backdrop-blur-sm"
        >
          <Heart className="h-12 w-12 fill-[var(--valentine-rose)] text-[var(--valentine-rose)] md:h-16 md:w-16" />
        </motion.div>

        <motion.h1
          className="mb-4 font-serif text-4xl font-bold text-[var(--valentine-deep)] md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          She Said Yes!
        </motion.h1>

        <motion.p
          className="mx-auto max-w-md text-lg text-[var(--valentine-text-light)] md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Here&apos;s what I have planned for our special day together
        </motion.p>
      </motion.section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[var(--valentine-pink)] via-[var(--valentine-rose)] to-[var(--valentine-red)] md:left-1/2 md:block md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {ITINERARY_DATA.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Heart;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } md:items-center`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <motion.div
                      className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`mb-2 flex items-center gap-2 text-[var(--valentine-rose)] ${isEven ? "md:justify-end" : ""}`}>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-semibold">{item.time}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[var(--valentine-deep)]">
                        {item.title}
                      </h3>
                      <p className="text-[var(--valentine-text-light)]">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--valentine-rose)] to-[var(--valentine-red)] text-white shadow-lg md:static md:mx-4">
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>

          {/* End heart */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: ITINERARY_DATA.length * 0.1 + 0.3 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--valentine-rose)] to-[var(--valentine-red)] shadow-lg">
              <Heart className="h-8 w-8 fill-white text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-[var(--valentine-blush)] px-4 py-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="mb-4 text-lg text-[var(--valentine-text-light)]">
          Can&apos;t wait to spend this day with you!
        </p>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="mx-auto h-8 w-8 fill-[var(--valentine-rose)] text-[var(--valentine-rose)]" />
        </motion.div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--valentine-text-light)] shadow-md transition-all hover:shadow-lg"
        >
          ← Back to Proposal
        </Link>
      </motion.footer>
    </main>
  );
}
