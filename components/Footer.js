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
          <Link href="/collections/coffee-drip-bag">
            {t("footer.dripBag")}
          </Link>
          <Link href="/collections/selected-beans">
            {t("footer.selectedBean")}
          </Link>
          <Link href="/collections/all">
            {t("footer.allProducts")}
          </Link>
        </div>
        <div className="footer-col">
          <h4>{t("footer.aboutUs")}</h4>
          <Link href="/about">{t("footer.aboutSofe")}</Link>
          <Link href="/locations">{t("footer.locations")}</Link>
          <Link href="/pages/membership">
            {t("footer.membership")}
          </Link>
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
          <Link href="/policies/shipping-policy">
            {t("footer.shipping")}
          </Link>
          <Link href="/policies/refund-policy">
            {t("footer.return")}
          </Link>
          <Link href="/policies/privacy-policy">
            {t("footer.privacy")}
          </Link>
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