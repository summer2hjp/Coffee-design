"use client"

import Link from "next/link"
import { useTranslation } from "../../lib/i18n"

export default function CartPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>{t("cart.title")}</h1>
      </section>

      <section className="section">
        <div className="cart-page">
          <p className="cart-empty">{t("cart.empty")}</p>
          <Link href="/" className="btn btn-primary">
            {t("cart.backToShop")}
          </Link>
        </div>
      </section>
    </>
  )
}