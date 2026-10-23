
"use client";

import { useEffect, useState } from "react";
import {
  Truck,
  CreditCard,
  RotateCcw,
} from "lucide-react";

const announcements = [
  {
    icon: Truck,
    text: "1000 TL Üzeri Alışverişlerde Ücretsiz Kargo",
  },
  {
    icon: CreditCard,
    text: "Güvenli Ödeme",
  },
  {
    icon: RotateCcw,
    text: "14 Gün İçinde Kolay İade",
  },
];

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = announcements[activeIndex].icon;

  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <div className="announcement-desktop">
          {announcements.map(({ icon: Icon, text }) => (
            <div className="announcement-item" key={text}>
              <Icon size={14} strokeWidth={1.6} />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="announcement-mobile">
          <ActiveIcon size={14} strokeWidth={1.6} />
          <span key={activeIndex}>
            {announcements[activeIndex].text}
          </span>
        </div>
      </div>
    </div>
  );
}
