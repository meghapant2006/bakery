"use client"

import React, { useState, ImgHTMLAttributes } from "react"

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

/**
 * ImageWithFallback
 * Usage:
 * <ImageWithFallback src="/some-image.jpg" alt="desc" className="w-full h-64 object-cover" />
 * Automatically swaps to fallback if the primary image 404s or errors.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = "/image-not-found.svg",
  onError,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        if (!errored) {
          setErrored(true)
          setImgSrc(fallbackSrc)
        }
        onError?.(e as any)
      }}
    />
  )
}
