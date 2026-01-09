"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Battle() {
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get("newUser");

  useEffect(() => {
    if (isNewUser) {
      toast.info("Welcome to battle");
    }
  }, []);

  const handleClick = async () => {
    await fetch("http://localhost:8000/api/v1/checkme");
  };

  return (
    <>
      <div>battle page</div>
      <Button onClick={handleClick}>Click me</Button>
    </>
  );
}

export default Battle;
