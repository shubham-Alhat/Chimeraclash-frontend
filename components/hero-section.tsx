"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection(): JSX.Element {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            AI-Powered Gaming Arena
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-foreground">Imagine Your</span>
          <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
            Perfect Creature
          </span>
          <span className="block text-foreground">Then Battle It</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Describe your dream pet in text, watch AI bring it to life instantly,
          battle opponents in real-time, and mint your creation as an NFT. No
          art skills needed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base font-semibold"
            onClick={() => router.push("/signup")}
          >
            Create Your Chimera
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-base font-semibold bg-transparent"
            onClick={() => router.push("/battles")}
          >
            Watch Battles
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              2.5K+
            </p>
            <p className="text-sm text-muted-foreground">Creatures Spawned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
              15K+
            </p>
            <p className="text-sm text-muted-foreground">Epic Battles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">
              $420K
            </p>
            <p className="text-sm text-muted-foreground">Traded Volume</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
