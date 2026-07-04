"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useLanguage, useTranslation } from "../lib/i18n"
import { products } from "../lib/products"

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { lang, toggleLang } = useLanguage()
  const { t } = useTranslation()
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const sidebarRef = useRef(null)

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close sidebar on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false)
    }
    if (sidebarOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [sidebarOpen])

  // Close search on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false)
    }
    if (searchOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [searchOpen])

  // Filter products for search results
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description &&
            p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#products", label: t("nav.products") },
    { href: "/subscription", label: t("nav.subscription") },
    { href: "/about", label: t("nav.about") },
    { href: "/locations", label: t("nav.locations") },
    { href: "/contact", label: t("nav.contact") },
  ]

  const sidebarLinks = [
    { href: "/", label: t("sidebar.home") },
    { href: "/collections/new-arrival", label: t("sidebar.newArrival") },
    { href: "/collections/selected-beans", label: t("sidebar.coffeeBeans") },
    { href: "/collections/coffee-drip-bag", label: t("sidebar.dripBag") },
    { href: "/collections/cold-brew-bag", label: t("sidebar.coldBrew") },
    { href: "/collections/tools", label: t("sidebar.coffeeTools") },
    { href: "/collections/huskee", label: t("sidebar.huskee") },
    { href: "/collections/%E7%89%B9%E5%83%B9%E7%94%A2%E5%93%81", label: t("sidebar.specialOffer") },
    { href: "/collections/monthly-subscription", label: t("sidebar.monthlySub") },
    { href: "/sofe-credits", label: t("sidebar.sofeCredits") },
  ]

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [sidebarOpen])

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open categories"
              title={t("sidebar.title")}
            >
              ☰
            </button>
            <Link href="/" className="header-logo">
              <span>SOFE</span>
              <span style={{ fontSize: "0.8rem", color: "#999", marginLeft: 4 }}>
                COFFEE
              </span>
            </Link>
          </div>

          <nav className="header-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switch">
              <a
                href="#"
                className={lang === "en" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault()
                  if (lang !== "en") toggleLang()
                }}
              >
                {t("lang.en")}
              </a>
              <a
                href="#"
                className={lang === "zh" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault()
                  if (lang !== "zh") toggleLang()
                }}
              >
                {t("lang.zh")}
              </a>
            </div>
            <a
              href="#"
              title={t("search.title")}
              onClick={(e) => {
                e.preventDefault()
                setSearchOpen(true)
              }}
            >
              🔍
            </a>
            <Link href="/cart" title="Cart">
              🛒
            </Link>
            <button
              className="hamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close categories"
          >
            ✕
          </button>
        </div>
        <nav className="sidebar-nav sidebar-nav-main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <nav className="sidebar-nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="search-overlay"
          onClick={() => setSearchOpen(false)}
          ref={searchRef}
        >
          <div
            className="search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-header">
              <h2>{t("search.title")}</h2>
              <button
                className="search-close"
                onClick={() => setSearchOpen(false)}
                aria-label={t("search.close")}
              >
                ✕
              </button>
            </div>
            <div className="search-input-wrapper">
              <span className="search-input-icon">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="search-results">
              {searchQuery.trim() === "" ? (
                <p className="search-hint">{t("search.placeholder")}</p>
              ) : searchResults.length === 0 ? (
                <p className="search-no-results">{t("search.noResults")}</p>
              ) : (
                <ul className="search-product-list">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={product.href || "#"}
                        className="search-product-item"
                        onClick={() => setSearchOpen(false)}
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="search-product-img"
                        />
                        <div className="search-product-info">
                          <span className="search-product-name">
                            {product.name}
                          </span>
                          <span className="search-product-price">
                            {product.price}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}