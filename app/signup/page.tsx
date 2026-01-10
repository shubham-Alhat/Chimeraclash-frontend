"use client";

import type React from "react";
import { isCustomError, BackendResponse } from "@/utils/api";
import type { JSX } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Mail,
  Lock,
  User,
  Sparkles,
  ChevronLeftCircle,
} from "lucide-react";
import OAuthButtons from "@/components/oauth-buttons";
import useAuthStore from "@/store/userAuthStore";
import { toast } from "sonner";
import api from "@/utils/api";

export default function SignupPage(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isSignUpLoading = useAuthStore((state) => state.isSignUpLoading);
  const setIsSignUpLoading = useAuthStore((state) => state.setIsSignUpLoading);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (formData.username.length < 6) {
      toast.error("Username must be at least 6 characters long");
    }

    setIsSignUpLoading(true);

    try {
      const res: BackendResponse = await api.post("/auth/signup", formData);
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
      setIsSignUpLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
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
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                  <Sparkles className="w-5 h-5 text-background" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Join ChimeraClash
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Create your account and start battling
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

              {/* Form Fields */}
              <form onSubmit={handleSignup} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Username
                  </label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Your gaming handle"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-input border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="chimera@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-input border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-input border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Terms & Conditions */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-primary/50 bg-input cursor-pointer accent-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      terms and conditions
                    </Link>
                  </label>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isSignUpLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-semibold cursor-pointer"
                  >
                    {isSignUpLoading ? "Creating Account..." : "Create Account"}
                    {!isSignUpLoading && (
                      <ChevronRight className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="text-center text-sm text-muted-foreground"
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Sign in here
                </Link>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
