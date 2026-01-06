"use client";

import type React from "react";
import type { JSX } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap, Sparkles, Sword, Crown } from "lucide-react";

const features: Array<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "AI Generation",
    description:
      "Describe your creature in natural language. Our AI instantly creates unique, battle-ready characters with auto-generated abilities.",
    color: "from-primary to-blue-500",
  },
  {
    icon: <Sword className="w-8 h-8" />,
    title: "Turn-Based Battles",
    description:
      "Compete in fast-paced turn-based combat. Every battle is unique with AI-generated tactics and strategies.",
    color: "from-secondary to-purple-500",
  },
  {
    icon: <Crown className="w-8 h-8" />,
    title: "NFT Minting",
    description:
      "Own your creation. Mint your creatures as NFTs and build your exclusive collection on the blockchain.",
    color: "from-accent to-cyan-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Trade & Compete",
    description:
      "Trade your creatures with other players, climb the leaderboards, and prove you are the ultimate trainer.",
    color: "from-yellow-400 to-orange-500",
  },
];

export default function FeaturesSection(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Players Love{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ChimeraClash
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of gaming where AI meets imagination
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card className="relative h-full p-6 sm:p-8 border border-primary/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 hover:border-primary/50">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4 text-primary group-hover:text-secondary transition-colors"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
