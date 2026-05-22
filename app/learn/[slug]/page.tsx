import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesData } from "@/data/articles";
import ArticleReader from "@/components/learn/ArticleReader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://anchorleaf.app";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  if (!article) {
    return {
      title: "Article not found | Anchorleaf",
      description: "We couldn't find the article you're looking for.",
    };
  }

  const title = `${article.title} | Anchorleaf`;
  const description = `${article.readTime} · ${article.label}. Read this on Anchorleaf, a calm DBT companion for people navigating BPD.`;
  const canonical = `${BASE_URL}/learn/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "Anchorleaf",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!articlesData[slug]) {
    notFound();
  }
  return <ArticleReader />;
}
