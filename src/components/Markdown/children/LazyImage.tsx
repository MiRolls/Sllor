import React from "react";
import Image from "next/image";

function LazyImage(src: string, alt: string) {
  return <Image src={src} alt={alt} loading="lazy" />;
}

export default LazyImage;
