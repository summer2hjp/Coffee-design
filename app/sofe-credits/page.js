import Link from "next/link"

export const metadata = {
  title: "Sofe Credits — SOFE COFFEE",
  description:
    "SOFE COFFEE Sofe Credits stored value card. Top up your e-wallet and enjoy exclusive rewards.",
}

export default function SofeCreditsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
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
                src="https://sofecoffee.com/cdn/shop/files/sofe_credit_wallet_photo_retouched_cd993dc5-d11b-408c-8c1b-870e6cf22e2d.jpg"
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