import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>404 — Page Not Found</h1>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center", padding: "3rem 0" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", marginBottom: 24 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  )
}