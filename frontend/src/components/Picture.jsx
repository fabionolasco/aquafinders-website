import React from "react";

// Renders a <picture> with an AVIF source and a fallback <img>.
export default function Picture({ avif, src, alt, className, width, height, loading = "lazy", style, imgStyle }) {
  return (
    <picture className={className} style={style}>
      {avif && <source srcSet={avif} type="image/avif" />}
      <img src={src} alt={alt} width={width} height={height} loading={loading} style={imgStyle} />
    </picture>
  );
}
