"use client"

import Link from "next/link"
import { subscriptions } from "../../lib/products"
import { useTranslation } from "../../lib/i18n"

function SubscriptionCard({ sub }) {
  const { t } = useTranslation()
  return (
    <div className="sub-card">
      <div className="sub-icon">☕</div>
      <div className="sub-duration">{sub.type}</div>
      <h3>{sub.name}</h3>
      <div className="sub-price">
        {sub.originalPrice && <span className="original">{sub.originalPrice}</span>}
        {sub.price}
      </div>
      {sub.save && <div className="sub-save">{sub.save}</div>}
      <p className="sub-desc">{t("subscription.perks")}</p>
      <Link href={sub.href} className="btn" style={{ marginTop: "auto" }}>
        {t("subscription.choose")}
      </Link>
    </div>
  )
}

export default function SubscriptionPage() {
  const { t } = useTranslation()
  const dripBagSubs = subscriptions.filter((s) => s.type === "Coffee Drip Bag")
  const beanSubs = subscriptions.filter((s) => s.type === "Pour Over Coffee Beans")

  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>{t("subscription.title")}</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t("subscription.subtitle")}</h2>
            <p>{t("subscription.desc")}</p>
          </div>

          <div className="product-grid-header">
            <h2>{t("subscription.dripBag")}</h2>
          </div>
          <div className="sub-grid" style={{ marginBottom: 60 }}>
            {dripBagSubs.map((sub) => (
              <SubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>

          <div className="product-grid-header">
            <h2>{t("subscription.beans")}</h2>
          </div>
          <div className="sub-grid">
            {beanSubs.map((sub) => (
              <SubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}