"use client"

import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>Sign In</h1>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 420, margin: "0 auto", padding: "2rem 0" }}>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", marginBottom: 24 }}>
                Sign in functionality is coming soon. Stay tuned!
              </p>
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: 6,
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: 6,
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", textAlign: "center" }}
              >
                Sign In
              </button>
              <p style={{ textAlign: "center", marginTop: 20, color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                New to SOFE COFFEE?{" "}
                <Link href="/pages/membership" style={{ color: "var(--color-primary)" }}>
                  Join our membership
                </Link>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}