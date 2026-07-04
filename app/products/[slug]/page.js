import Link from "next/link"
import { products } from "../../../lib/products"

// Product slugs referenced in the crawl data that may not match product hrefs
const CRAWL_PRODUCT_SLUGS = [
  "drip-bag-coffee-ethiopia", "drip-bag-coffee-kenya", "drip-bag-coffee-colombia",
  "drip-bag-coffee-brazil", "drip-bag-coffee-mexico", "drip-bag-coffee-png",
  "10dbbox", "deep-45", "cold-brew-bag", "cold-brew-bag-oatside", "cold-brew-cup",
]

function findProductBySlug(slug) {
  // slug from Next.js params may be URL-encoded in RSC serialization,
  // and for Chinese characters it can be double-encoded (e.g. %25E5...)
  let targetSlug = slug
  while (targetSlug !== decodeURIComponent(targetSlug)) {
    targetSlug = decodeURIComponent(targetSlug)
  }
  return products.find((p) => {
    if (!p.href || p.href === "#") return false
    try {
      const url = new URL(p.href, "http://localhost")
      const parts = decodeURIComponent(url.pathname).split("/").filter(Boolean)
      return parts[parts.length - 1] === targetSlug
    } catch {
      return false
    }
  })
}

export function generateStaticParams() {
  // Extract slug from the last segment of each product's href
  const slugsFromProducts = products
    .filter((p) => p.href && p.href !== "#")
    .map((p) => {
      const url = new URL(p.href, "http://localhost")
      // new URL() URL-encodes non-ASCII chars; keep encoded form so
      // static params match the URL-encoded slug that browsers send
      const parts = url.pathname.split("/").filter(Boolean)
      return parts[parts.length - 1]
    })

  // Combine with crawl reference slugs and deduplicate
  const allSlugs = [...new Set([...slugsFromProducts, ...CRAWL_PRODUCT_SLUGS])]
  return allSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const { slug } = params
  const product = findProductBySlug(slug)

  if (!product) {
    return { title: "Product — SOFE COFFEE" }
  }

  return {
    title: `${product.name} — SOFE COFFEE`,
    description: `View ${product.name} at SOFE COFFEE.`,
  }
}

export default function ProductPage({ params }) {
  const { slug } = params
  const product = findProductBySlug(slug)

  if (!product) {
    return (
      <>
        <section className="page-banner">
          <div className="banner-placeholder" />
          <div className="page-banner-overlay" />
          <h1>Product</h1>
        </section>

        <section className="section">
          <div className="container" style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              This product is not available yet.
            </p>
            <Link href="/" className="btn" style={{ marginTop: 24 }}>
              Back to Home
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>{product.name}</h1>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1 1 400px", maxWidth: 500 }}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 300px", paddingTop: 16 }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{product.name}</h2>
              {product.badge && (
                <span
                  className={`product-card-badge ${product.badge.toLowerCase()}`}
                  style={{ display: "inline-block", marginBottom: 12 }}
                >
                  {product.badge}
                </span>
              )}
              <div style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 8 }}>
                {product.originalPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      fontSize: "1rem",
                      marginRight: 8,
                    }}
                  >
                    {product.originalPrice}
                  </span>
                )}
                {product.price}
              </div>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: 24 }}>
                Premium quality coffee product from SOFE COFFEE. Visit our store or check the
                subscription page for more options.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={`https://sofecoffee.com/products/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Shopify ↗
                </a>
                <Link href="/subscription" className="btn">
                  Subscribe & Save
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}