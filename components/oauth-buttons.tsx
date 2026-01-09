"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useAuthStore from "@/store/userAuthStore";

interface OAuthProvider {
  name: "Google" | "Twitter";
  iconPath: string;
  color: string;
  hoverColor: string;
}

const providers: OAuthProvider[] = [
  {
    name: "Google",
    iconPath: "/gicon.png",
    color: "bg-gradient-to-r from-slate-900 to-slate-800",
    hoverColor: "hover:from-slate-800 hover:to-slate-900",
  },
];

export default function OAuthButtons(): JSX.Element {
  const isLoginLoading = useAuthStore((state) => state.isLoginLoading);
  const isSignUpLoading = useAuthStore((state) => state.isSignUpLoading);
  const setIsLoginLoading = useAuthStore((state) => state.setIsLoginLoading);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleOAuthClick = (provider: string): void => {
    // Integration point for OAuth flow
    console.log(`Initiating ${provider} OAuth flow...`);
    // In a real app, this would redirect to your OAuth provider
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {providers.map((provider) => (
        <motion.div key={provider.name} variants={itemVariants}>
          <Button
            type="button"
            disabled={isLoginLoading || isSignUpLoading}
            onClick={() => handleOAuthClick(provider.name)}
            className={`w-full ${provider.color} ${
              provider.hoverColor
            } text-white font-semibold transition-all cursor-pointer duration-200 hover:shadow-lg hover:shadow-${
              provider.name === "Twitter" ? "blue" : "slate"
            }-500/50`}
          >
            <Image
              src={provider.iconPath}
              alt={`${provider.name} logo`}
              width={20}
              height={20}
              loading="eager"
            />
            <span className="hidden md:block">{provider.name}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
