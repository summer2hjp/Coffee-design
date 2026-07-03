import Link from "next/link"
import { categories, getProductsByCategory, getCategoryBySlug } from "../../../lib/products"

export function generateStaticParams() {
  return categories.map((c) => {
    const parts = c.slug.split("/")
    return { slug: parts[parts.length - 1] }
  })
}

export function generateMetadata({ params }) {
  const { slug } = params
  const cat = getCategoryBySlug(slug)

  if (!cat) {
    return { title: "Collection — SOFE COFFEE" }
  }

  return {
    title: `${cat.name} — SOFE COFFEE`,
    description: `Browse our ${cat.name} collection at SOFE COFFEE. Premium coffee beans, drip bags, and more.`,
  }
}

export default function CollectionPage({ params }) {
  const { slug } = params
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

  if (items.length === 0) {
    return (
      <>
        <CollectionBanner name={cat.name} />
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
      <CollectionBanner name={cat.name} />
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

function CollectionBanner({ name }) {
  return (
    <section className="page-banner">
      <div className="banner-placeholder" />
      <div className="page-banner-overlay" />
      <h1>{name}</h1>
    </section>
  )
}

function CollectionProductCard({ product }) {
  const isExternal =
    product.href && product.href.startsWith("http")

  const cardContent = (
    <>
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
    </>
  )

  if (isExternal) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="product-card"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={product.href} className="product-card">
      {cardContent}
    </Link>
  )
}