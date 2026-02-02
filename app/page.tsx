"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

// Type for floating heart config
type FloatingHeart = {
  id: number;
  initialX: number;
  initialScale: number;
  duration: number;
  delay: number;
};

// ============================================================
// PHOTO COLLAGE DATA - Replace the placeholder paths with your actual image paths
// Position values are percentages (0-100) for where each photo appears in the collage
// ============================================================
const PHOTO_COLLAGE = [
  { id: 1, src: "/photos/photo-1.jpg", alt: "Our memory 1", top: 5, left: 5, width: 30, rotate: -8 },
  { id: 2, src: "/photos/photo-2.jpg", alt: "Our memory 2", top: 8, left: 68, width: 28, rotate: 6 },
  { id: 3, src: "/photos/photo-3.jpg", alt: "Our memory 3", top: 55, left: 2, width: 25, rotate: 4 },
  { id: 4, src: "/photos/photo-4.jpg", alt: "Our memory 4", top: 60, left: 72, width: 26, rotate: -5 },
  { id: 5, src: "/photos/photo-5.jpg", alt: "Our memory 5", top: 25, left: 75, width: 22, rotate: 12 },
  { id: 6, src: "/photos/photo-6.jpg", alt: "Our memory 6", top: 70, left: 35, width: 24, rotate: -3 },
];

// Collage photo component
function CollagePhoto({ photo, index }: { photo: (typeof PHOTO_COLLAGE)[0]; index: number }) {
  const [imageError, setImageError] = useState(true);

  return (
    <motion.div
      className="absolute overflow-hidden rounded-lg bg-white p-2 shadow-xl"
      style={{
        top: `${photo.top}%`,
        left: `${photo.left}%`,
        width: `${photo.width}%`,
        rotate: `${photo.rotate}deg`,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: photo.rotate - 20 }}
      animate={{ opacity: 1, scale: 1, rotate: photo.rotate }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <div className="aspect-square overflow-hidden rounded bg-gradient-to-br from-[var(--valentine-blush)] to-[var(--valentine-pink)]">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-2 text-[var(--valentine-deep)]">
            <Heart className="mb-1 h-8 w-8 opacity-40" />
            <span className="text-center text-[10px] opacity-60 leading-tight">
              {photo.src.split("/").pop()}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Generate floating hearts on client side only to avoid hydration mismatch
function useFloatingHearts(): FloatingHeart[] {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Use queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      setHearts(
        Array.from({ length: 15 }, (_, i) => ({
          id: i,
          initialX: Math.random() * 100,
          initialScale: 0.5 + Math.random() * 0.5,
          duration: 10 + Math.random() * 10,
          delay: Math.random() * 10,
        }))
      );
    });
  }, []);

  return hearts;
}

export default function ProposalPage() {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const floatingHearts = useFloatingHearts();

  // Fire confetti effect
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FDA4AF", "#FB7185", "#E11D48", "#FFF8F0", "#FFE4E6"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FDA4AF", "#FB7185", "#E11D48", "#FFF8F0", "#FFE4E6"],
      });
    }, 250);
  }, []);

  // Handle Yes button click
  const handleYesClick = useCallback(() => {
    fireConfetti();
    setTimeout(() => {
      router.push("/itinerary");
    }, 1500);
  }, [fireConfetti, router]);

  // Move the No button to a random position anywhere on the screen
  const moveNoButton = useCallback(() => {
    if (!noButtonRef.current) return;

    const button = noButtonRef.current;
    const buttonRect = button.getBoundingClientRect();

    // Use entire viewport
    const maxX = window.innerWidth - buttonRect.width - 20;
    const maxY = window.innerHeight - buttonRect.height - 20;

    // Generate random position within screen bounds
    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);

    setNoButtonPosition({ x: newX, y: newY });
    setHasMovedNo(true);
  }, []);

  // Reset position on window resize if button has moved
  useEffect(() => {
    const handleResize = () => {
      if (hasMovedNo) {
        moveNoButton();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasMovedNo, moveNoButton]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[var(--valentine-cream)]">
      {/* Photo Collage Background */}
      <div className="absolute inset-0">
        {PHOTO_COLLAGE.map((photo, index) => (
          <CollagePhoto key={photo.id} photo={photo} index={index} />
        ))}
      </div>

      {/* Floating hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-[var(--valentine-pink)]"
            initial={{
              x: `${heart.initialX}vw`,
              y: "110vh",
              opacity: 0.3,
              scale: heart.initialScale,
            }}
            animate={{
              y: "-10vh",
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}
          >
            <Heart className="h-6 w-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--valentine-cream)]/60 via-[var(--valentine-cream)]/80 to-[var(--valentine-cream)]/60" />

      {/* Centered Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Animated heart icon */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 text-[var(--valentine-rose)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-6 w-6" />
          <Heart className="h-10 w-10 fill-current md:h-12 md:w-12" />
          <Sparkles className="h-6 w-6" />
        </motion.div>

        {/* The Question */}
        <motion.h1
          className="mb-4 text-center font-serif text-4xl font-bold tracking-tight text-[var(--valentine-deep)] drop-shadow-sm md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Will you be my Valentine?
        </motion.h1>

        <motion.p
          className="mb-8 max-w-md text-center text-lg text-[var(--valentine-text-light)] md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          You make every day feel like Valentine&apos;s Day.
        </motion.p>

        {/* Horizontal Buttons - using fixed width container so Yes stays in place */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            className="rounded-full bg-gradient-to-r from-[var(--valentine-rose)] to-[var(--valentine-red)] px-10 py-4 text-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl md:px-14 md:py-5 md:text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes!
          </motion.button>

          {/* No Button - Initial position (before it runs away) - invisible placeholder keeps Yes centered */}
          <motion.button
            ref={!hasMovedNo ? noButtonRef : undefined}
            onMouseEnter={!hasMovedNo ? moveNoButton : undefined}
            onTouchStart={!hasMovedNo ? moveNoButton : undefined}
            className={`rounded-full px-8 py-4 text-xl font-medium shadow-md md:px-10 md:py-5 ${
              hasMovedNo
                ? "pointer-events-none invisible"
                : "bg-[var(--valentine-blush)] text-[var(--valentine-text-light)] transition-colors hover:bg-[var(--valentine-pink)]"
            }`}
            whileHover={!hasMovedNo ? { scale: 1.02 } : undefined}
          >
            No
          </motion.button>
        </motion.div>

        {/* Subtle hint text */}
        <motion.p
          className="mt-8 text-center text-sm text-[var(--valentine-rose)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2 }}
        >
          (There&apos;s really only one right answer here...)
        </motion.p>
      </div>

      {/* No Button - After it escapes (fixed position, can go anywhere) */}
      {hasMovedNo && (
        <motion.button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="fixed z-50 rounded-full bg-[var(--valentine-blush)] px-8 py-4 text-xl font-medium text-[var(--valentine-text-light)] shadow-md transition-colors hover:bg-[var(--valentine-pink)] md:px-10 md:py-5"
          initial={{ opacity: 1 }}
          animate={{
            left: noButtonPosition.x,
            top: noButtonPosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          No
        </motion.button>
      )}
    </main>
  );
}
