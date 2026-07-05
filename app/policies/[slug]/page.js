import Link from "next/link"
import { policies } from "../../../lib/policies"

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const policy = policies.find((p) => p.slug === slug)

  if (!policy) {
    return { title: "Policy — SOFE COFFEE" }
  }

  return {
    title: `${policy.name} — SOFE COFFEE`,
    description: policy.description,
  }
}

export default async function PolicyPage({ params }) {
  const { slug } = await params
  const policy = policies.find((p) => p.slug === slug)

  if (!policy) {
    return (
      <>
        <section className="page-banner">
          <div className="banner-placeholder" />
          <div className="page-banner-overlay" />
          <h1>Policy</h1>
        </section>

        <section className="section">
          <div className="container" style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              This policy page is not available yet.
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
        <h1>{policy.name}</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-page">
            {policy.content.split("\n").map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} style={{ lineHeight: 1.8, marginBottom: 16 }}>
                  {paragraph}
                </p>
              ) : null
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/" className="btn">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}