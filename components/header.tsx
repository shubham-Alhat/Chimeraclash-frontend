"use client";

import type { JSX } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-background px-3 py-2 rounded-lg border border-primary/50">
                <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ChimeraClash
                </span>
              </div>
            </div>
          </motion.div>

          {/* Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="ghost"
              className="text-sm md:text-base cursor-pointer hidden sm:inline-flex hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              className="text-sm md:text-base bg-gradient-to-r cursor-pointer from-primary to-secondary hover:opacity-90 transition-opacity"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
