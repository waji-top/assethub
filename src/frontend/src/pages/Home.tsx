import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  Search,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AssetCard, AssetCardSkeleton } from "../components/AssetCard";
import { SearchBar } from "../components/SearchBar";
import { useListAssets } from "../hooks/use-assets";
import { SortOrder } from "../types";

const TRENDING_TAGS = [
  "#Mockups",
  "#UI Kits",
  "#Stock Photos",
  "#Abstract Vectors",
  "#3D Assets",
  "#Presentation Templates",
];

const ASSET_CATEGORIES = [
  { label: "Vectors", icon: "✦", count: "2.4M+" },
  { label: "Photos", icon: "◉", count: "1.8M+" },
  { label: "Illustrations", icon: "◈", count: "890K+" },
  { label: "Icons", icon: "◇", count: "340K+" },
  { label: "Templates", icon: "▣", count: "156K+" },
  { label: "3D Assets", icon: "◎", count: "78K+" },
];

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "License Clarity",
    description:
      "Every asset comes with a clear license — free, premium, or editorial. No ambiguity.",
  },
  {
    icon: Download,
    title: "Unlimited Downloads",
    description:
      "Premium subscribers get unlimited high-res downloads across all asset types.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description:
      "Download immediately after purchase or subscription. No waiting, no watermarks.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find exactly what you need with filters for type, category, license, and orientation.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { data: featuredAssets, isLoading } = useListAssets(
    { tags: [] },
    SortOrder.mostDownloaded,
    { offset: 0n, limit: 10n },
  );

  const handleSearch = (keyword: string) => {
    navigate({
      to: "/search",
      search: { q: keyword, page: 1, type: "", category: "", filters: "" },
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background pt-20 pb-16"
        data-ocid="hero-section"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-accent/6 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Premium Digital Asset Marketplace
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium Digital Assets{" "}
            <span className="text-primary">for Creative Pros</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Millions of high-quality vectors, photos, icons, and templates.
            Clear licenses, instant downloads.
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SearchBar
              size="lg"
              placeholder="Search for vectors, photos, icons, templates…"
              onSearch={handleSearch}
              className="w-full"
            />
          </motion.div>

          {/* Trending tags */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-xs text-muted-foreground font-medium">
              Trending:
            </span>
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSearch(tag.replace("#", ""))}
                className="text-xs font-medium text-foreground/70 hover:text-primary transition-smooth bg-card border border-border rounded-full px-3 py-1 hover:border-primary/40 hover:bg-primary/5"
                data-ocid="trending-tag"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category pills */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ASSET_CATEGORIES.map(({ label, icon, count }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
              >
                <Link
                  to="/search"
                  search={{
                    q: "",
                    page: 1,
                    type: label.toLowerCase(),
                    category: "",
                    filters: "",
                  }}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer text-center"
                  data-ocid={`category-card-${label.toLowerCase()}`}
                >
                  <span className="text-2xl font-bold text-primary/70 group-hover:text-primary transition-smooth">
                    {icon}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets */}
      <section className="bg-muted/30 py-16" data-ocid="featured-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Trending Assets
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Most downloaded this week
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link
                to="/search"
                search={{ q: "", page: 1, type: "", category: "", filters: "" }}
                className="gap-2"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {isLoading
              ? ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map((k) => (
                  <AssetCardSkeleton key={k} />
                ))
              : (featuredAssets?.items ?? []).map((asset) => (
                  <AssetCard key={asset.id.toString()} asset={asset} />
                ))}
          </div>

          {!isLoading && !featuredAssets?.items?.length && (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="empty-state"
            >
              <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">No assets yet</p>
              <p className="text-sm">
                Assets will appear here once added to the marketplace.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-background py-20" data-ocid="value-props-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Why AssetIQ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The most trusted platform for creative professionals who need
              quality assets with clear licensing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PROPS.map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-3 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-smooth"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="bg-muted/30 py-20" data-ocid="premium-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-10 shadow-sm"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Premium
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Unlock Everything, Instantly
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get unlimited downloads across all asset types. Crystal-clear
              licenses. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2"
                onClick={() => navigate({ to: "/account" })}
                data-ocid="hero-upgrade-btn"
              >
                <Sparkles className="h-4 w-4" />
                Get Premium Access
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  to="/search"
                  search={{
                    q: "",
                    page: 1,
                    type: "",
                    category: "",
                    filters: "",
                  }}
                >
                  Browse Free Assets
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
