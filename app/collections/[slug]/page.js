import Link from "next/link"
import { categories, getProductsByCategory, getCategoryBySlug } from "../../../lib/products"

export function generateStaticParams() {
  return categories.map((c) => {
    const parts = c.slug.split("/")
    // Decode URL-encoded slugs (e.g. %E6%84%8F... → 意式...)
    // so that generateStaticParams returns the same decoded form
    // that Next.js normalizes the URL to during navigation.
    const raw = parts[parts.length - 1]
    return { slug: decodeURIComponent(raw) }
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)

  if (!cat) {
    return { title: "Collection — SOFE COFFEE" }
  }

  return {
    title: `${cat.name} — SOFE COFFEE`,
    description: `Browse our ${cat.name} collection at SOFE COFFEE. Premium coffee beans, drip bags, and more.`,
  }
}

export default async function CollectionPage({ params }) {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)

  // If the slug doesn't match a known category, show a fallback message
  if (!cat) {
    return (
      <>
        <section className="page-banner">
          <div className="banner-placeholder" />
          <div className="page-banner-overlay" />
          <h1>Collection</h1>
        </section>

        <section className="section">
          <div className="container" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              This collection is not available yet.
            </p>
            <Link href="/" className="btn" style={{ marginTop: 24 }}>
              Back to Home
            </Link>
          </div>
        </section>
      </>
    )
  }

  const items = getProductsByCategory(cat.id)

  if (cat.id === "sofe-credits") {
    return <SofeCreditsContent />
  }

  if (items.length === 0) {
    return (
      <>
        <CollectionBanner name={cat.name} banner={cat.banner} />
        <section className="section">
          <div className="container" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              No products in this collection yet.
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
      <CollectionBanner name={cat.name} banner={cat.banner} />
      <section className="section">
        <div className="container">
          <div className="product-grid-header">
            <h2>{cat.name}</h2>
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              {items.length} product{items.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="product-grid">
            {items.map((product) => (
              <CollectionProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function CollectionBanner({ name, banner }) {
  return (
    <section className="page-banner">
      {banner ? (
        <img src={banner} alt="" className="banner-placeholder" />
      ) : (
        <div className="banner-placeholder" />
      )}
      <div className="page-banner-overlay" />
      <h1>{name}</h1>
    </section>
  )
}

function SofeCreditsContent() {
  return (
    <>
      <section className="page-banner">
        <img
          src="https://sofecoffee.com/cdn/shop/files/1778783394888-019e27c0-0d39-7e51-ad68-1c87d72cb6f9.png?v=1779534838&width=3840"
          alt=""
          className="banner-placeholder"
        />
        <div className="page-banner-overlay" />
        <h1>SOFE CREDITS</h1>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {/* Left: Product Image */}
            <div style={{ flex: "1 1 400px", maxWidth: 500 }}>
              <img
                src="https://sofecoffee.com/cdn/shop/files/sofe_credit_wallet_photo_retouched_cd993dc5-d11b-408c-8c1b-870e6cf22e2d.jpg?v=1746188119"
                alt="Sofe Credits"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              />
            </div>

            {/* Right: Info */}
            <div style={{ flex: "1 1 300px", paddingTop: 16 }}>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  marginBottom: 8,
                }}
              >
                Sofe Credits
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: 24,
                }}
              >
                Add card to your wallet
              </p>

              <div
                style={{
                  background: "var(--color-bg-lighter)",
                  borderRadius: 12,
                  padding: "24px 28px",
                  marginBottom: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    marginBottom: 16,
                  }}
                >
                  現金儲值咭
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  SOFE COFFEE 推出全新 Sofe Credits 現金儲值咭，加入電子錢包內，輕鬆購買咖啡!
                </p>
                <div
                  style={{
                    background: "rgba(200, 164, 92, 0.1)",
                    borderRadius: 8,
                    padding: "16px 20px",
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      color: "var(--color-accent)",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    優惠期內
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      color: "var(--color-text-secondary)",
                      lineHeight: 2,
                    }}
                  >
                    <li>儲值 $200，送 $10！</li>
                    <li>儲值 $500，送 $50！</li>
                    <li>儲值 $1000，送 $200！</li>
                  </ul>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  *只限實體咖啡店/零售店使用*
                  <br />
                  *可用於購買咖啡或咖啡產品*
                  <br />
                  *數量有限，售完即止*
                </p>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="https://sofecoffee.juicysuite.app/member/packages/package_point"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  立即充值 ↗
                </a>
                <Link href="/" className="btn">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CollectionProductCard({ product }) {
  const linkHref = product.href && product.href !== "#" ? product.href : "/"

  return (
    <Link href={linkHref} className="product-card">
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
  )
}