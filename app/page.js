"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { products, getProductsByCategory } from "../lib/products"
import { useTranslation } from "../lib/i18n"

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { t } = useTranslation()

  const slides = [
    {
      bg: "https://sofecoffee.com/cdn/shop/files/1778783394888-019e27c0-0d39-7e51-ad68-1c87d72cb6f9.png",
      title: "Brewed Without Bounds",
      subtitle: "Anytime, Anywhere with SOFE COFFEE",
      cta: t("hero.shopNow"),
      href: "/#products",
    },
    {
      bg: "https://sofecoffee.com/cdn/shop/files/bd392da6c9dc39fc2f1d08eda17dd16c.jpg",
      title: "Ⓟ 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 Collection",
      subtitle: "Anytime, Anywhere with SOFE COFFEE",
      cta: t("hero.shopNow"),
      href: "/#products",
    },
    {
      bg: "https://sofecoffee.com/cdn/shop/files/7b2d5f16299286dd335b68c0a2df14c6_copy.jpg",
      title: "New Espresso Beans",
      subtitle: "Anytime, Anywhere with SOFE COFFEE",
      cta: t("hero.shopNow"),
      href: "/#products",
    },
    {
      bg: "https://sofecoffee.com/cdn/shop/files/sofe_airside_4_drink_image.jpg",
      title: "Premium Winey Blend",
      subtitle: "Anytime, Anywhere with SOFE COFFEE",
      cta: t("hero.shopNow"),
      href: "/#products",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="hero-banner">
      {slides.map((slide, index) => (
        <div key={index} className={`hero-slide ${index === activeSlide ? "active" : ""}`}>
          <img src={slide.bg || "/placeholder.svg"} alt={slide.title} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <Link href={slide.href} className="btn btn-primary">
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === activeSlide ? "active" : ""}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function ProductSection({ title, viewAllHref, category }) {
  const items = getProductsByCategory(category).slice(0, 4)

  return (
    <section className="section">
      <div className="container">
        <div className="product-grid-header">
          <h2>{title}</h2>
          <Link href={viewAllHref} className="view-all">
            View all →
          </Link>
        </div>
        <div className="product-grid">
          {items.map((product) => (
            <div key={product.id} className="product-card">
              <Link href={product.href}>
                <div className="product-card-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  {product.badge && (
                    <span className={`product-card-badge ${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <div className="product-card-price">
                    {product.originalPrice && (
                      <span className="original">{product.originalPrice}</span>
                    )}
                    {product.price}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CreditSection() {
  const { t } = useTranslation()

  return (
    <section className="credit-banner section-dark" style={{ minHeight: 300 }}>
      <div className="credit-bg-placeholder" />
      <div className="credit-overlay" />
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        <div className="credit-content">
          <h2>{t("credit.title")}</h2>
          <p>{t("credit.desc")}</p>
          <Link href="https://sofecoffee.com/collections/sofe-credits" className="btn btn-primary">
            {t("credit.cta")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <HeroBanner />
      <section id="products">
        <ProductSection
          title={t("home.newEspresso")}
          viewAllHref="/collections/espresso-beans"
          category="espresso-beans"
        />
      </section>
      <CreditSection />
      <ProductSection
        title={t("home.pourOver")}
        viewAllHref="/collections/selected-beans"
        category="pour-over-beans"
      />
      <ProductSection
        title={t("home.dripBag")}
        viewAllHref="/collections/coffee-drip-bag"
        category="drip-bags"
      />
      <ProductSection
        title={t("home.coldBrew")}
        viewAllHref="/collections/cold-brew-bag"
        category="cold-brew-bags"
      />
      <ProductSection
        title={t("home.coffeeTools")}
        viewAllHref="/collections/coffee-tools"
        category="coffee-tools"
      />
    </>
  )
}