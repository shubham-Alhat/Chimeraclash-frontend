"use client";

import type React from "react";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Lock, User, ChevronLeftCircle } from "lucide-react";
import OAuthButtons from "@/components/oauth-buttons";
import useAuthStore from "@/store/userAuthStore";
import { toast } from "sonner";
import api, { BackendResponse, isCustomError } from "@/utils/api";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isLoginLoading = useAuthStore((state) => state.isLoginLoading);
  const setIsLoginLoading = useAuthStore((state) => state.setIsLoginLoading);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // check for redirect error
  useEffect(() => {
    if (error) {
      toast.error("Error while Login");
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      toast.error("All fields are required");
      return;
    }

    setIsLoginLoading(true);

    try {
      const res: BackendResponse = await api.post("/auth/login", {
        username: username.trim(),
        password: password.trim(),
      });

      console.log(res);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      if (isCustomError(error)) {
        toast.error(error.message);
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back to home */}
        <motion.button
          variants={itemVariants}
          onClick={() => router.push("/")}
          className="mb-8 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <span className="flex items-center gap-1.5">
            <span>
              <ChevronLeftCircle />
            </span>{" "}
            Back to Home
          </span>
        </motion.button>

        {/* Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-primary/30 bg-card/50 backdrop-blur-md border-2">
            {/* Header */}
            <div className="p-8 border-b border-primary/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Enter the Arena
                </span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your ChimeraClash account
              </p>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* OAuth Buttons */}
              <motion.div variants={itemVariants}>
                <OAuthButtons />
              </motion.div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-card/50 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Username & Password Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-input border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isLoginLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-semibold cursor-pointer"
                  >
                    {isLoginLoading ? "Entering Arena..." : "Sign In"}
                    {!isLoginLoading && (
                      <ChevronRight className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 text-sm text-center"
              >
                <Link
                  href="/forgot-password"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Forgot password?
                </Link>
                <p className="text-muted-foreground">
                  No account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Create one now
                  </Link>
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
