
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollRef = useRef(null);
  const indexRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const image = imageRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;
      const eyebrow = eyebrowRef.current;
      const button = buttonRef.current;
      const scroll = scrollRef.current;
      const index = indexRef.current;
      const progress = progressRef.current;

      if (reducedMotion) {
        gsap.set(image, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
        });

        gsap.set(
          [title, description, eyebrow, button, scroll, index],
          { color: "#F8F5EC" }
        );

        gsap.set(button, {
          borderColor: "#F8F5EC",
        });

        gsap.set(progress, {
          scaleX: 1,
        });

        return;
      }

      // Başlangıç: görsel tamamen gizli.
      gsap.set(image, {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.08,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Navbarın mevcut yüksekliğini ölç.
      const getHeaderHeight = () => {
        const header = document.querySelector(".site-header");

        return header
          ? header.getBoundingClientRect().height
          : 0;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,

          // Hero navbarın hemen altındayken sabitlenir.
          start: () => `top top+=${getHeaderHeight()}`,

          // Görsel açılana kadar sabit kalır.
          end: () => `+=${window.innerHeight * 1.3}`,

          scrub: true,

          // Dış kapsayıcıyı sabitle.
          pin: true,
          pinSpacing: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      timeline
        .to(
          image,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1,
            ease: "none",
          },
          0
        )
        .to(
          title,
          {
            color: "#F8F5EC",
            duration: 0.5,
            ease: "none",
          },
          0.25
        )
        .to(
          description,
          {
            color: "#F8F5EC",
            duration: 0.5,
            ease: "none",
          },
          0.25
        )
        .to(
          eyebrow,
          {
            color: "#D6B77A",
            duration: 0.5,
            ease: "none",
          },
          0.25
        )
        .to(
          button,
          {
            color: "#F8F5EC",
            borderColor: "#F8F5EC",
            duration: 0.5,
            ease: "none",
          },
          0.25
        )
        .to(
          [scroll, index],
          {
            color: "#F8F5EC",
            duration: 0.5,
            ease: "none",
          },
          0.25
        )
        .to(
          progress,
          {
            scaleX: 1,
            duration: 1,
            ease: "none",
          },
          0
        );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="twin-hero-wrapper"
    >
      <section
        className="twin-hero"
        aria-label="Twin Collection yeni sezon erkek giyim"
      >
        {/* BASE BACKGROUND */}

        <div
          className="twin-hero-base"
          aria-hidden="true"
        />

        {/* IMAGE REVEAL */}

        <div
          ref={imageRef}
          className="twin-hero-image"
          aria-hidden="true"
        >
          <Image
            src="/images/twin-hero.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="twin-hero-photo"
          />

          <div className="twin-hero-overlay" />
        </div>

        {/* HERO CONTENT */}

        <div className="twin-hero-container">
          <div className="twin-hero-content">
            <p
              ref={eyebrowRef}
              className="twin-hero-eyebrow"
            >
              TWIN COLLECTION / YENİ SEZON
            </p>

            <h1
              ref={titleRef}
              className="twin-hero-title"
            >
              YENİ
              <span>DURUŞ.</span>
            </h1>

            <p
              ref={descriptionRef}
              className="twin-hero-description"
            >
              Zamansız çizgiler, modern erkek stilinin
              yeni yorumu.
            </p>

            <Link
              ref={buttonRef}
              href="/urunler"
              className="twin-hero-button"
            >
              <span>KOLEKSİYONU KEŞFET</span>
              <ArrowUpRight
                size={19}
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* BOTTOM */}

          <div className="twin-hero-bottom">
            <div
              ref={scrollRef}
              className="twin-hero-scroll"
            >
              <ArrowDown
                size={15}
                strokeWidth={1.5}
              />

              <span>KEŞFETMEK İÇİN KAYDIR</span>
            </div>

            <div
              ref={indexRef}
              className="twin-hero-index"
            >
              <span>01</span>

              <span className="twin-hero-progress">
                <span ref={progressRef} />
              </span>

              <span>01</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
