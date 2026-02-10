"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Clock,
  MapPin,
  Utensils,
  Film,
  Music,
  Gift,
  Coffee,
  Star,
} from "lucide-react";
import Link from "next/link";

// ============================================================
// ITINERARY DATA - Edit this array to customize your Valentine's Day schedule
// Each item has: time, title, description, and an optional icon key
// Available icons: "utensils", "film", "music", "gift", "coffee", "star", "heart", "mappin"
// ============================================================
const ITINERARY_DATA = [
  {
    time: "1:00 PM",
    title: "Lunch",
    description: "Who knows what we'll eat but I hope it's good though",
    icon: "coffee",
  },
  // {
  //   time: "1:00 PM",
  //   title: "Activity #1",
  //   description: "This is a mystery, but it will be fun, here is a hint:",
  //   icon: "gift",
  // },
  {
    time: "2:00 PM",
    title: "Dance",
    description: "Live Love Laugh to our Pan Asian obligations",
    icon: "music",
  },
  {
    time: "6:00 PM",
    title: "Activity #1",
    description:
      "This is a mystery, but it will be fun, here is a hint: crafts",
    icon: "gift",
  },
  {
    time: "9:30 PM",
    title: "Yuhiro Sushi",
    description: "Valentine's special omakase course",
    icon: "utensils",
  },
  {
    time: "11:39 PM",
    title: "just a tini bit older + galentini",
    description: "Kat's celebration of growing older and galentines",
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
    <main className="min-h-screen bg-cream">
      {/* Header Section */}
      <motion.section
        className="relative overflow-hidden bg-linear-to-b px-4 pt-8 pb-4 text-center md:pt-12 md:pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-6 inline-flex items-center justify-center rounded-full bg-white/50 p-4 shadow-lg backdrop-blur-sm"
        >
          <Heart className="h-12 w-12 fill-rose text-rose md:h-16 md:w-16" />
        </motion.div>

        <motion.h1
          className="mb-4 font-serif text-4xl font-bold text-deep md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          YAYY!
        </motion.h1>

        <motion.p
          className="mx-auto max-w-md font-sans text-lg text-text-light md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          here&apos;s what I have planned for our special day
        </motion.p>
      </motion.section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-12 md:py-12">
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-linear-to-b from-pink via-rose to-red md:left-1/2 md:block md:-translate-x-1/2" />

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
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8"}`}
                  >
                    <motion.div
                      className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`mb-2 flex items-center gap-2 text-rose ${isEven ? "md:justify-end" : ""}`}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {item.time}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-deep">
                        {item.title}
                      </h3>
                      <p className="text-text-light">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-rose to-red text-white shadow-lg md:static md:mx-4">
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
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-rose to-red shadow-lg z-10">
              <Heart className="h-8 w-8 fill-white text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="px-4 pt-6 pb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="mb-4 text-lg text-text-light">
          can&apos;t wait to spend this day with you!
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-text-light shadow-md transition-all hover:shadow-lg"
        >
          ← back to home
        </Link>
      </motion.footer>
    </main>
  );
}
