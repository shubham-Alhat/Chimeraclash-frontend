"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CTASection(): JSX.Element {
  const router = useRouter();

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 rounded-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Clash?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of players creating legendary creatures and battling
            for glory. Your next adventure starts now.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base font-semibold"
              onClick={() => router.push("/signup")}
            >
              Start Creating Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 border-primary/50 text-foreground hover:bg-primary/10 bg-transparent cursor-pointer hover:text-primary"
              onClick={() => router.push("/login")}
            >
              I Already Have Account
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
