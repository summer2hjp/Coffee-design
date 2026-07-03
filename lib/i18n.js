"use client"

import { createContext, useContext, useState, useCallback } from "react"

const LanguageContext = createContext()

export const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.subscription": "Subscription",
    "nav.about": "About",
    "nav.locations": "Locations",
    "nav.contact": "Contact",
    "lang.en": "EN",
    "lang.zh": "简",
    "search.placeholder": "Search products…",
    "search.noResults": "No products found.",
    // Hero
    "hero.shopNow": "SHOP NOW",
    // Home
    "home.viewAll": "View all →",
    "home.newEspresso": "NEW - Espresso Beans",
    "home.pourOver": "Pour Over Coffee Beans",
    "home.dripBag": "Coffee Drip Bag",
    "home.coldBrew": "Cold Brew Bag",
    "home.coffeeTools": "Coffee Tools",
    // Credit
    "credit.title": "Sofe Credit\nBrand New Feature",
    "credit.desc":
      "Both new and existing members can now top up directly inside the “E-Wallet” for a faster and more convenient experience. Visit the Member Center for offer details!",
    "credit.cta": "Know More",
    // Footer
    "footer.productGuide": "Product Guide",
    "footer.dripBag": "Coffee Drip Bag",
    "footer.selectedBean": "Selected Coffee Bean",
    "footer.allProducts": "All Products",
    "footer.aboutUs": "About Us",
    "footer.aboutSofe": "About SOFE COFFEE",
    "footer.locations": "SOFE Locations",
    "footer.membership": "Online Membership Rewards",
    "footer.contactUs": "Contact Us",
    "footer.support": "Support",
    "footer.shipping": "Shipping Policy",
    "footer.return": "Return Policy",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "© 2026, SOFE COFFEE. All rights reserved.",
    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty.",
    "cart.backToShop": "Back to Shop",
    // Search
    "search.title": "Search",
    "search.close": "Close search",
    // Collection
    "collection.notAvailable": "This collection is not available yet.",
    "collection.backHome": "Back to Home",
    "collection.noProducts": "No products in this collection yet.",
  },
  zh: {
    // Header
    "nav.home": "首页",
    "nav.products": "产品",
    "nav.subscription": "订阅",
    "nav.about": "关于我们",
    "nav.locations": "门店位置",
    "nav.contact": "联系我们",
    "lang.en": "EN",
    "lang.zh": "简",
    "search.placeholder": "搜索产品…",
    "search.noResults": "未找到相关产品。",
    // Hero
    "hero.shopNow": "立即选购",
    // Home
    "home.viewAll": "查看全部 →",
    "home.newEspresso": "新品 - 浓缩咖啡豆",
    "home.pourOver": "手冲咖啡豆",
    "home.dripBag": "咖啡挂耳包",
    "home.coldBrew": "冷萃咖啡包",
    "home.coffeeTools": "咖啡器具",
    // Credit
    "credit.title": "Sofe 储值\n全新功能",
    "credit.desc":
      "新会员和现有会员现在可以直接在「电子钱包」中充值，享受更快捷便利的体验。前往会员中心查看优惠详情！",
    "credit.cta": "了解更多",
    // Footer
    "footer.productGuide": "产品指南",
    "footer.dripBag": "咖啡挂耳包",
    "footer.selectedBean": "精选咖啡豆",
    "footer.allProducts": "所有产品",
    "footer.aboutUs": "关于我们",
    "footer.aboutSofe": "关于 SOFE COFFEE",
    "footer.locations": "SOFE 门店位置",
    "footer.membership": "在线会员奖励",
    "footer.contactUs": "联系我们",
    "footer.support": "帮助支持",
    "footer.shipping": "配送政策",
    "footer.return": "退货政策",
    "footer.privacy": "隐私政策",
    "footer.rights": "© 2026, SOFE COFFEE. 保留所有权利。",
    // Cart
    "cart.title": "购物车",
    "cart.empty": "您的购物车是空的。",
    "cart.backToShop": "返回商店",
    // Search
    "search.title": "搜索",
    "search.close": "关闭搜索",
    // Collection
    "collection.notAvailable": "该系列暂无产品。",
    "collection.backHome": "返回首页",
    "collection.noProducts": "该系列暂无产品。",
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en")

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "zh" : "en"))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

export function useTranslation() {
  const { lang } = useLanguage()
  const t = useCallback((key) => translations[lang][key] || key, [lang])
  return { t, lang }
}