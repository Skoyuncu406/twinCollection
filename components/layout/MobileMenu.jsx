
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowUpRight,
  UserRound,
  Heart,
} from "lucide-react";

export default function MobileMenu({
  open,
  onClose,
  navigation,
  categories,
  pathname,
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div
      id="twin-mobile-menu"
      className={`mobile-menu-overlay ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      inert={!open}
    >
      <nav className="mobile-menu-content" aria-label="Mobil menü">
        <div className="mobile-menu-label">KEŞFET</div>

        {navigation.slice(0, 3).map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`mobile-nav-link ${
              pathname === item.href ? "active" : ""
            }`}
          >
            <span className="mobile-nav-number">
              0{index + 1}
            </span>

            <span>{item.label}</span>

            <ArrowUpRight size={19} strokeWidth={1.3} />
          </Link>
        ))}

        <button
          type="button"
          className="mobile-nav-link mobile-category-toggle"
          aria-expanded={categoriesOpen}
          onClick={() => setCategoriesOpen((prev) => !prev)}
        >
          <span className="mobile-nav-number">04</span>
          <span>Kategoriler</span>

          <ChevronDown
            size={19}
            className={categoriesOpen ? "rotate-chevron" : ""}
          />
        </button>

        {categoriesOpen && (
          <div className="mobile-categories">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={onClose}
              >
                {category.label}
              </Link>
            ))}
          </div>
        )}

        {navigation.slice(3).map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`mobile-nav-link ${
              pathname === item.href ? "active" : ""
            }`}
          >
            <span className="mobile-nav-number">
              0{index + 5}
            </span>

            <span>{item.label}</span>

            <ArrowUpRight size={19} strokeWidth={1.3} />
          </Link>
        ))}

        <div className="mobile-menu-bottom">
          <Link href="/hesabim" onClick={onClose}>
            <UserRound size={19} strokeWidth={1.5} />
            Hesabım
          </Link>

          <Link href="/favoriler" onClick={onClose}>
            <Heart size={19} strokeWidth={1.5} />
            Favorilerim
          </Link>
        </div>

        <div className="mobile-menu-signature">
          TWIN COLLECTION
          <span>EST. 2025</span>
        </div>
      </nav>
    </div>
  );
}
