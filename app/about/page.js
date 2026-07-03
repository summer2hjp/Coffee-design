import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>About SOFE COFFEE</h1>
      </section>

      <div className="content-page">
        <p className="tagline">
          &ldquo;Brewed Without Bounds, Anytime, Anywhere with SOFE&rdquo;
        </p>

        <hr />

        <h2>Who We Are</h2>

        <p>
          SOFE Coffee is indeed a standout choice for vegan and dairy-free coffee lovers in Hong Kong.
        </p>

        <p>
          Known for their unique coffee bean roasting formula, they craft the most delicious oat milk
          coffee in Hong Kong and are the first coffee brand to offer a variety of oat milk options,
          ensuring each cup of coffee has its distinct flavour.
        </p>

        <p>
          Their diverse range of fresh coffee products ensures that{" "}
          <strong>&ldquo;Brewed Without Bounds, Anytime, Anywhere With SOFE COFFEE&rdquo;</strong> —
          providing a versatile and high-quality coffee experience.
        </p>

        <hr />

        <div style={{ textAlign: "center" }}>
          <Link href="/locations" className="btn btn-primary">
            Visit Our Stores
          </Link>
        </div>
      </div>
    </>
  )
}