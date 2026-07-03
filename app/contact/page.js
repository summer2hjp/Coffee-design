import Link from "next/link"

export default function ContactPage() {
  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>Contact Us</h1>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="contact-list">
            <div className="contact-item">
              <div className="contact-icon">📸</div>
              <div>
                <div className="contact-label">Instagram</div>
                <a
                  href="https://instagram.com/sofecoffeehk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  sofecoffeehk
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">👍</div>
              <div>
                <div className="contact-label">Facebook</div>
                <a
                  href="https://facebook.com/sofecoffeehk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  sofecoffeehk
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:business@sofecoffee.com" className="contact-value">
                  business@sofecoffee.com
                </a>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/locations" className="btn">
              Visit Our Stores
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}