"use client";
import createI18n from "@/language";
import { useControl } from "@/store/control";
import { useDark } from "@/store/dark";
import { useSite } from "@/store/site";
import React, { useEffect, useState } from "react";

export default function LoadHandle({ data }: { data: [boolean, any] }) {
  const stateDark = useDark((state) => (state as any).dark);
  const changeUseSite = useSite((state) => (state as any).changeSite);
  const changeDark: any = useDark((state) => (state as any).changeDark);
  const changeShow = useControl((state) => (state as any).changeShow);

  const controlHandle = () => {
    const handle = () => {
      if (window.innerWidth <= 768) {
        changeShow(false);
        // phone, mobile
      }
    };
    window.addEventListener("resize", handle);
    handle();
  };
  const darkHandle = () => {
    const dark = localStorage.getItem("dark");
    if (dark === null) {
      const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
      changeDark(matches ? "dark" : "light");
    }
    changeDark(dark);
  };

  useEffect(() => {
    if (data[0] === true) {
      createI18n(data[1].lang);
      controlHandle();
      darkHandle();
      changeUseSite(data[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // set dark in DOM
    document.documentElement.className = `${stateDark}-theme`;
    document.documentElement.style.colorScheme = stateDark;
  }, [stateDark]);
  return <></>;
}
