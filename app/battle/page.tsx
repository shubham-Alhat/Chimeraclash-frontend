"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import api from "@/utils/api";

function Battle() {
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get("newUser");

  useEffect(() => {
    if (isNewUser) {
      toast.info("Welcome to battle");
    }
  }, []);

  const handleClick = async () => {
    try {
      const res = await api.get("/checkme");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>battle page</div>
      <Button onClick={handleClick}>Click me</Button>
    </>
  );
}

export default Battle;
