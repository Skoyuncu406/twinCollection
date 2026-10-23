
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Yeni Gelenler", href: "/yeni-gelenler" },
  { label: "Tüm Ürünler", href: "/urunler" },
  { label: "Kombinler", href: "/kombinler" },
  { label: "İletişim", href: "/iletisim" },
];

const categories = [
  { label: "Tişört", href: "/urunler?category=tisort" },
  { label: "Pantolon", href: "/urunler?category=pantolon" },
  { label: "Sweatshirt", href: "/urunler?category=sweatshirt" },
  { label: "Gömlek", href: "/urunler?category=gomlek" },
  { label: "Ceket", href: "/urunler?category=ceket" },
  { label: "Aksesuar", href: "/urunler?category=aksesuar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".twin-hero-wrapper");

      // Hero animasyonu tamamlanmadan navbar
      // yüksekliğini değiştirme.
      if (pathname === "/" && hero) {
        const heroBottom =
          hero.getBoundingClientRect().bottom;

        if (heroBottom > window.innerHeight) {
          setScrolled(false);
          return;
        }
      }

      setScrolled(window.scrollY > 35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCategoryOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setCategoryOpen(false);
  }, [pathname]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setSearchOpen(false);

    router.push(
      `/urunler?q=${encodeURIComponent(query)}`
    );
  };

  return (
    <div
      className={`navbar-shell ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="navbar-main">
        {/* SEARCH */}

        <div className="navbar-left">
          <form
            className="navbar-search"
            role="search"
            onSubmit={handleSearch}
          >
            <button
              type="submit"
              className="navbar-search-icon"
              aria-label="Ürün ara"
            >
              <Search size={19} strokeWidth={1.6} />
            </button>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Ürün, kategori veya marka ara..."
              aria-label="Ürün ara"
            />
          </form>

          <button
            type="button"
            className="navbar-action mobile-search-trigger"
            aria-label={
              searchOpen ? "Aramayı kapat" : "Arama aç"
            }
            aria-expanded={searchOpen}
            aria-controls="mobile-search-panel"
            onClick={() =>
              setSearchOpen((prev) => !prev)
            }
          >
            {searchOpen ? (
              <X size={21} strokeWidth={1.5} />
            ) : (
              <Search size={21} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* CENTER LOGO */}

        <Link
          href="/"
          className="brand-logo"
          aria-label="Twin Collection ana sayfa"
        >
          <span className="brand-main">TWIN</span>

          <span className="brand-sub">
            <span className="brand-line" />
            COLLECTION
            <span className="brand-line" />
          </span>
        </Link>

        {/* ACTIONS */}

        <div className="navbar-actions">
          <Link
            href="/hesabim"
            className="navbar-action"
            aria-label="Hesabım"
          >
            <UserRound
              size={21}
              strokeWidth={1.5}
            />
          </Link>

          <Link
            href="/favoriler"
            className="navbar-action"
            aria-label="Favorilerim"
          >
            <Heart
              size={22}
              strokeWidth={1.5}
            />
          </Link>

          <Link
            href="/sepet"
            className="navbar-action bag-action"
            aria-label="Sepetim"
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.5}
            />

            <span className="bag-count">0</span>
          </Link>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}

      <nav
        className="navbar-navigation"
        aria-label="Ana menü"
      >
        <div className="navbar-links">
          {navigation.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${
                pathname === item.href ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* CATEGORIES */}

          <div
            className="nav-dropdown"
            onMouseEnter={() =>
              setCategoryOpen(true)
            }
            onMouseLeave={() =>
              setCategoryOpen(false)
            }
          >
            <button
              type="button"
              className="nav-link nav-dropdown-trigger"
              aria-expanded={categoryOpen}
              aria-controls="desktop-category-menu"
              onClick={() =>
                setCategoryOpen((prev) => !prev)
              }
            >
              Kategoriler

              <ChevronDown
                size={13}
                className={
                  categoryOpen
                    ? "rotate-chevron"
                    : ""
                }
              />
            </button>

            {categoryOpen && (
              <div
                id="desktop-category-menu"
                className="category-dropdown-panel"
              >
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() =>
                      setCategoryOpen(false)
                    }
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navigation.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${
                pathname === item.href ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* MOBILE SEARCH */}

      {searchOpen && (
        <form
          id="mobile-search-panel"
          className="mobile-search-panel"
          role="search"
          onSubmit={handleSearch}
        >
          <Search size={18} strokeWidth={1.5} />

          <input
            type="search"
            autoFocus
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Ürün veya kategori ara..."
            aria-label="Ürün ara"
          />

          <button type="submit">ARA</button>
        </form>
      )}
    </div>
  );
}
