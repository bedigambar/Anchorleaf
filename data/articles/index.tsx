import React from "react";
import { Heart, BookOpen, Leaf, Shield } from "lucide-react";
import { WhatDoesBPDFeelLikeContent } from "./what-does-bpd-feel-like";
import { MarshaLinehanDBTContent } from "./marsha-linehan-dbt";
import { UnderstandingEmotionalIntensityContent } from "./understanding-emotional-intensity";
import { FearOfAbandonmentContent } from "./fear-of-abandonment";

export interface Article {
  label: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  readTime: string;
  content: React.ReactNode;
}

export const articlesData: Record<string, Article> = {
  "what-does-bpd-feel-like": {
    label: "BPD Basics",
    title: "What Does BPD Actually Feel Like?",
    icon: <Heart size={20} strokeWidth={1.5} />,
    color: "#c87a5a",
    readTime: "5 min read",
    content: WhatDoesBPDFeelLikeContent,
  },
  "who-is-marsha-linehan": {
    label: "DBT Origins",
    title: "Who is Marsha Linehan, and why does it matter?",
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    color: "#5c8a5e",
    readTime: "4 min read",
    content: MarshaLinehanDBTContent,
  },
  "understanding-emotional-intensity": {
    label: "Emotions",
    title: "Understanding your emotional intensity",
    icon: <Leaf size={20} strokeWidth={1.5} />,
    color: "#7a6eb8",
    readTime: "6 min read",
    content: UnderstandingEmotionalIntensityContent,
  },
  "fear-of-abandonment": {
    label: "Relationships",
    title: "Fear of abandonment, and how to work with it",
    icon: <Shield size={20} strokeWidth={1.5} />,
    color: "#5a8ab0",
    readTime: "5 min read",
    content: FearOfAbandonmentContent,
  },
};
