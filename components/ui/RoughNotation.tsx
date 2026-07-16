"use client";

import { useEffect, useRef, useState } from "react";
import { annotate } from "rough-notation";

export type AnnotationType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off";

interface RoughNotationProps {
  children: React.ReactNode;
  type?: AnnotationType;
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  animate?: boolean;
  duration?: number;
  delay?: number;
  iterations?: number;
  brackets?: "left" | "right" | "top" | "bottom" | ("left" | "right" | "top" | "bottom")[];
  show?: boolean;
  triggerOnInView?: boolean;
  threshold?: number;
  viewportDelay?: number;
}

export default function RoughNotation({
  children,
  type = "underline",
  color = "currentColor",
  strokeWidth = 2,
  padding = 4,
  animate = true,
  duration = 800,
  delay = 0,
  iterations = 1,
  brackets,
  show = true,
  triggerOnInView = true,
  threshold = 0.5,
  viewportDelay = 600,
}: RoughNotationProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!triggerOnInView || !elementRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerOnInView, threshold]);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!show || !isInView) return;

    const timer = setTimeout(() => {
      try {
        if (annotationRef.current) {
          annotationRef.current.remove();
          annotationRef.current = null;
        }

        const annotation = annotate(elementRef.current!, {
          type,
          color,
          strokeWidth,
          padding,
          animate,
          animationDuration: duration,
          iterations,
          brackets,
        });

        annotationRef.current = annotation;
        annotation.show();
      } catch (e) {
        console.warn("Failed to apply rough-notation:", e);
      }
    }, viewportDelay);

    return () => {
      clearTimeout(timer);
      if (annotationRef.current) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
    };
  }, [
    type,
    color,
    strokeWidth,
    padding,
    animate,
    duration,
    delay,
    iterations,
    brackets,
    show,
    isInView,
    viewportDelay,
  ]);

  return (
    <span style={{ isolation: "isolate", position: "relative", display: "inline-block" }}>
      <span ref={elementRef} style={{ display: "inline" }}>
        {children}
      </span>
    </span>
  );
}
