"use client"

import Link from "next/link"
import { useTranslation } from "../lib/i18n"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>{t("footer.productGuide")}</h4>
          <a href="https://sofecoffee.com/collections/coffee-drip-bag" target="_blank" rel="noopener noreferrer">
            {t("footer.dripBag")}
          </a>
          <a href="https://sofecoffee.com/collections/selected-beans" target="_blank" rel="noopener noreferrer">
            {t("footer.selectedBean")}
          </a>
          <a href="https://sofecoffee.com/collections/new-arrival" target="_blank" rel="noopener noreferrer">
            {t("footer.allProducts")}
          </a>
        </div>
        <div className="footer-col">
          <h4>{t("footer.aboutUs")}</h4>
          <Link href="/about">{t("footer.aboutSofe")}</Link>
          <Link href="/locations">{t("footer.locations")}</Link>
          <a href="https://sofecoffee.com/pages/sofe-rewards-airside-shop-use-only" target="_blank" rel="noopener noreferrer">
            {t("footer.membership")}
          </a>
        </div>
        <div className="footer-col">
          <h4>{t("footer.contactUs")}</h4>
          <a href="https://instagram.com/sofecoffeehk" target="_blank" rel="noopener noreferrer">
            Instagram // sofecoffeehk
          </a>
          <a href="https://facebook.com/sofecoffeehk" target="_blank" rel="noopener noreferrer">
            Facebook // sofecoffeehk
          </a>
          <a href="mailto:business@sofecoffee.com">Email // business@sofecoffee.com</a>
        </div>
        <div className="footer-col">
          <h4>{t("footer.support")}</h4>
          <a href="https://sofecoffee.com/policies/shipping-policy" target="_blank" rel="noopener noreferrer">
            {t("footer.shipping")}
          </a>
          <a href="https://sofecoffee.com/policies/refund-policy" target="_blank" rel="noopener noreferrer">
            {t("footer.return")}
          </a>
          <a href="https://sofecoffee.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
            {t("footer.privacy")}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="payment-methods">
          <span>American Express</span>
          <span>Apple Pay</span>
          <span>Google Pay</span>
          <span>Mastercard</span>
          <span>Union Pay</span>
          <span>Visa</span>
        </div>
        <p>{t("footer.rights")}</p>
      </div>
    </footer>
  )
}