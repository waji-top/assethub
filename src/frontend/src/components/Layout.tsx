import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookMarked,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useMyProfile } from "../hooks/use-user";
import { UserTier } from "../types";
import { SearchBar } from "./SearchBar";

const NAV_LINKS = [{ label: "Explore", to: "/search" as const }];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 flex-shrink-0"
      data-ocid="nav-logo"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>
      <span className="font-display text-lg font-bold text-foreground tracking-tight">
        Asset<span className="text-primary">IQ</span>
      </span>
    </Link>
  );
}

function PremiumBadge() {
  return (
    <Badge className="bg-accent/15 text-accent border-accent/20 hover:bg-accent/20 text-[10px] font-semibold uppercase tracking-wide gap-1">
      <Sparkles className="h-2.5 w-2.5" />
      Premium
    </Badge>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isInitializing, login, logout } = useAuth();
  const { data: profile } = useMyProfile();
  const isPremium = profile?.tier === UserTier.premium;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
        data-ocid="nav-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  search={{
                    q: "",
                    page: 1,
                    type: "",
                    category: "",
                    filters: "",
                  }}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
                  data-ocid={`nav-link-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Search bar — center */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <SearchBar size="sm" placeholder="Search assets…" />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Mobile search */}
              <Link
                to="/search"
                search={{ q: "", page: 1, type: "", category: "", filters: "" }}
                className="md:hidden flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Link>

              {!isInitializing && isAuthenticated && (
                <div className="flex items-center gap-2">
                  {isPremium && <PremiumBadge />}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        data-ocid="nav-account-menu"
                        aria-label="Account menu"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {profile?.username?.[0]?.toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      {profile && (
                        <div className="px-3 py-2 border-b border-border mb-1">
                          <p className="text-sm font-semibold truncate">
                            {profile.username}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {profile.email}
                          </p>
                        </div>
                      )}
                      <DropdownMenuItem asChild>
                        <Link
                          to="/account"
                          className="flex items-center gap-2 cursor-pointer"
                          data-ocid="nav-account-link"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/account"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <BookMarked className="h-4 w-4" />
                          My Collections
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {!isPremium && (
                        <DropdownMenuItem
                          className="text-accent font-medium cursor-pointer"
                          onClick={() => navigate({ to: "/account" })}
                          data-ocid="nav-upgrade-btn"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Upgrade to Premium
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive cursor-pointer"
                        data-ocid="nav-logout-btn"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {!isInitializing && !isAuthenticated && (
                <Button
                  onClick={login}
                  size="sm"
                  className="font-semibold"
                  data-ocid="nav-signin-btn"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile hamburger */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="md:hidden flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                    aria-label="Open menu"
                    data-ocid="nav-mobile-menu"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
                      <Logo />
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                      {NAV_LINKS.map(({ label, to }) => (
                        <Link
                          key={label}
                          to={to}
                          search={{
                            q: "",
                            page: 1,
                            type: "",
                            category: "",
                            filters: "",
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-smooth"
                        >
                          {label}
                        </Link>
                      ))}
                      {isAuthenticated && (
                        <Link
                          to="/account"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-smooth"
                        >
                          Dashboard
                        </Link>
                      )}
                    </nav>
                    <div className="p-4 border-t border-border">
                      {!isPremium && (
                        <Button
                          className="w-full gap-2 mb-2 bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate({ to: "/account" });
                          }}
                          data-ocid="mobile-upgrade-btn"
                        >
                          <Sparkles className="h-4 w-4" />
                          Go Premium
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground transition-smooth">
                Privacy
              </span>
              <span className="cursor-pointer hover:text-foreground transition-smooth">
                Terms
              </span>
              <span className="cursor-pointer hover:text-foreground transition-smooth">
                License
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
