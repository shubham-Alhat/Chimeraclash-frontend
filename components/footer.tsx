"use client";

import type { JSX } from "react";

export default function Footer(): JSX.Element {
  const links = [
    { label: "Twitter", href: "#" },
    { label: "Discord", href: "#" },
    { label: "GitHub", href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              ChimeraClash
            </h3>
            <p className="text-muted-foreground text-sm">
              The AI-powered pet battle arena where imagination meets
              competition.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@chimeraclash.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  support@chimeraclash.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2026 ChimeraClash. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
