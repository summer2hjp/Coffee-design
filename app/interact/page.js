"use client"

import { useState, useCallback, useRef } from "react"

// ──────────────────────────────────────────────
// SOFE COFFEE Crawl Reference Data
// Generated from .firecrawl/sofecoffee-crawl.json (79 pages)
// ──────────────────────────────────────────────

const CRAWL_REFERENCE = {
  collections: [
    { name: "All Products", url: "/collections/all" },
    { name: "Coffee Drip Bag", url: "/collections/coffee-drip-bag" },
    { name: "Pour Over Beans", url: "/collections/selected-beans" },
    { name: "Espresso Beans", url: "/collections/意式濃縮咖啡豆" },
    { name: "Cold Brew Bag", url: "/collections/cold-brew-bag" },
    { name: "New Arrivals", url: "/collections/new-arrival" },
    { name: "HUSKEE", url: "/collections/huskee" },
    { name: "Special Offers", url: "/collections/特價產品" },
    { name: "Sofe Credits", url: "/collections/sofe-credits" },
    { name: "Monthly Subscription", url: "/collections/monthly-subscription" },
    { name: "Ⓟ Premium Series", url: "/collections/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-特級咖啡豆系列" },
    { name: "Cascara Tea", url: "/collections/cascara-咖啡櫻桃果肉茶" },
    { name: "Airside", url: "/collections/airside" },
  ],
  products: [
    { name: "Ethiopia Drip Bag", url: "/products/drip-bag-coffee-ethiopia" },
    { name: "Kenya Drip Bag", url: "/products/drip-bag-coffee-kenya" },
    { name: "Colombia Drip Bag", url: "/products/drip-bag-coffee-colombia" },
    { name: "Brazil Drip Bag", url: "/products/drip-bag-coffee-brazil" },
    { name: "Mexico Drip Bag", url: "/products/drip-bag-coffee-mexico" },
    { name: "PNG Drip Bag", url: "/products/drip-bag-coffee-png" },
    { name: "10 Pack Drip Bag", url: "/products/10dbbox" },
    { name: "Premium Peach Drip Bag x5", url: "/products/new-Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-哥倫比亞-水蜜桃-5包裝" },
    { name: "Premium Strawberry Drip Bag x5", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-哥倫比亞-士多啤梨-5包裝" },
    { name: "Premium Mandarin Drip Bag x5", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-哥倫比亞-柑橘" },
    { name: "Premium Honduras Drip Bag x5", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-洪都拉斯-g1-副本" },
    { name: "Premium Panama Geisha Drip Bag x5", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-巴拿馬-藝伎" },
    { name: "Premium Nicaragua Drip Bag x5", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡掛耳包-尼加拉瓜" },
    { name: "Ethiopia Single Origin Beans 150g", url: "/products/衣索比亞-單品咖啡豆-150g" },
    { name: "Kenya Single Origin Beans 150g", url: "/products/肯亞-單品咖啡豆-150g" },
    { name: "Colombia Single Origin Beans 150g", url: "/products/哥倫比亞-單品咖啡豆-150g" },
    { name: "Brazil Single Origin Beans 150g", url: "/products/巴西-單品咖啡豆-150g" },
    { name: "Mexico Single Origin Beans 150g", url: "/products/單品咖啡豆-墨西哥-150g" },
    { name: "Papua New Guinea Single Origin Beans 150g", url: "/products/巴布亞新幾內亞-單品咖啡豆-150g" },
    { name: "Premium Colombia Peach Beans", url: "/products/new-Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡豆-哥倫比亞-水蜜桃" },
    { name: "Premium Colombia Strawberry Beans", url: "/products/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦-咖啡豆-哥倫比亞-士多啤梨" },
    { name: "Premium Honduras G1 Beans 100g", url: "/products/honduras-g1-100g-beans" },
    { name: "Premium Panama Geisha Beans 100g", url: "/products/panama-100g-beans" },
    { name: "SOE Brazil Espresso Beans", url: "/products/巴西-單品意式濃縮咖啡豆-副本" },
    { name: "SOE Ethiopia Espresso Beans", url: "/products/衣索比亞-單品意式濃縮咖啡豆-副本" },
    { name: "Nutty Blend Espresso Beans", url: "/products/nutty-blend-拼配意式濃縮咖啡豆" },
    { name: "Fruity Blend Espresso Beans", url: "/products/new-fruity-blend-拼配意式濃縮咖啡豆" },
    { name: "Premium Winey Blend Espresso Beans", url: "/products/new-winey-blend-拼配意式濃縮咖啡豆" },
    { name: "DEEP 45 Flower Dripper 20% off", url: "/products/deep-45" },
    { name: "Cold Brew Bag", url: "/products/cold-brew-bag" },
    { name: "Cold Brew Bag - Oatside", url: "/products/cold-brew-bag-oatside" },
    { name: "Cold Brew Cup", url: "/products/cold-brew-cup" },
  ],
  pages: [
    { name: "Home", url: "/" },
    { name: "About SOFE", url: "/pages/about-sofe" },
    { name: "Contact", url: "/pages/contact" },
    { name: "Locations", url: "/pages/locations" },
    { name: "Cart", url: "/cart" },
    { name: "Subscription", url: "/subscription" },
    { name: "Membership", url: "/pages/membership" },
    { name: "VIP Rewards", url: "/pages/vip" },
    { name: "Sofe Credits", url: "/pages/sofe-credits" },
    { name: "Sofe Rewards (Airside)", url: "/pages/sofe-credits" },
    { name: "Drip Bag Instructions", url: "/pages/open_drip_bag" },
    { name: "Grinder Manual V2", url: "/pages/grinder-manual-v2" },
    { name: "Cascara Recipe", url: "/pages/cascara" },
    { name: "Premium Series", url: "/pages/Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦" },
    { name: "Tracking", url: "/pages/追蹤清單" },
  ],
  policies: [
    { name: "Shipping Policy", url: "/policies/shipping-policy" },
    { name: "Refund Policy", url: "/policies/refund-policy" },
    { name: "Privacy Policy", url: "/policies/privacy-policy" },
    { name: "Return Policy", url: "/pages/return-policy" },
  ],
}

const INTERACTION_FLOWS = [
  {
    id: "browseCollection",
    label: "Browse Collection",
    description: "Scroll through a collection page and list visible products with prices",
    params: [
      { key: "url", label: "Collection URL", type: "url", required: true },
      { key: "keyword", label: "Search keyword (optional)", type: "text" },
    ],
    code: `// browseCollection(jobId, keyword)
const result = await client.interact(jobId, {
  prompt: keyword
    ? \`Scroll through the collection. Find products related to "\${keyword}". List names and prices.\`
    : "Scroll down slowly. List all visible product names and prices.",
  timeout: 90,
});`,
  },
  {
    id: "openProduct",
    label: "Open Product Detail",
    description: "Click a product card and read its full details",
    params: [
      { key: "url", label: "Product URL", type: "url", required: true },
    ],
    code: `// openProduct(jobId, productName)
const result = await client.interact(jobId, {
  prompt: \`Find the product card "\${productName}" and click it.
    Wait for the detail page. Describe the name, price,
    description, and available options.\`,
  timeout: 120,
});`,
  },
  {
    id: "addToCart",
    label: "Add to Cart",
    description: "Add a product to the shopping cart",
    params: [
      { key: "url", label: "Product URL", type: "url", required: true },
      { key: "productName", label: "Product name to click on", type: "text", required: true },
      { key: "quantity", label: "Quantity", type: "number", default: 1 },
    ],
    code: `// addToCart(jobId, productName, quantity = 1)
const result = await client.interact(jobId, {
  prompt: \`On the product page for "\${productName}",
    select default options if any. Click "Add to Cart"
    or "加入購物車". Set quantity to \${quantity}. Wait for
    the cart confirmation. Confirm success.\`,
  timeout: 120,
});`,
  },
  {
    id: "viewCart",
    label: "View Cart",
    description: "Navigate to cart and list all items with totals",
    params: [],
    code: `// viewCart(jobId)
const result = await client.interact(jobId, {
  prompt: "Navigate to the cart page. List every item with name, quantity, price. Show subtotal and shipping.",
  timeout: 90,
});`,
  },
  {
    id: "applyDiscount",
    label: "Apply Discount Code",
    description: "Enter a coupon code in the cart",
    params: [
      { key: "code", label: "Discount Code", type: "text", required: true },
    ],
    code: `// applyDiscount(jobId, discountCode)
const result = await client.interact(jobId, {
  prompt: \`Go to the cart. Find the discount input. Type
    "\${discountCode}" and click Apply/套用. Report if the
    discount was accepted and the new total.\`,
  timeout: 90,
});`,
  },
  {
    id: "navigateSection",
    label: "Navigate Section",
    description: "Click a header nav link to visit a page",
    params: [
      { key: "section", label: "Section", type: "select", options: ["Home", "Products", "About", "Locations", "Contact"], required: true },
    ],
    code: `// navigateToSection(jobId, section)
const result = await client.interact(jobId, {
  prompt: \`Click the "\${section}" link in the nav header.
    Wait for the page. Summarise its content sections.\`,
  timeout: 90,
});`,
  },
  {
    id: "switchLanguage",
    label: "Switch Language",
    description: "Toggle between English and Chinese",
    params: [
      { key: "lang", label: "Language", type: "select", options: ["en", "zh"], required: true },
    ],
    code: `// switchLanguage(jobId, lang)
const target = lang === "en" ? "English" : "繁體中文"
const result = await client.interact(jobId, {
  prompt: \`Click the language switcher. Select
    "\${target}". Wait for reload. Confirm the language.\`,
  timeout: 90,
});`,
  },
  {
    id: "searchProducts",
    label: "Search Products",
    description: "Use the site search to find products",
    params: [
      { key: "query", label: "Search term", type: "text", required: true },
    ],
    code: `// searchProducts(jobId, query)
const result = await client.interact(jobId, {
  prompt: \`Click the search icon (🔍). Type "\${query}"
    into the search input. Wait for results. List all
    products found.\`,
  timeout: 90,
});`,
  },
  {
    id: "fillContactForm",
    label: "Fill Contact Form",
    description: "Pre-fill the contact form fields (no submit)",
    params: [
      { key: "name", label: "Name", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
    code: `// fillContactForm(jobId, { name, email, message })
const result = await client.interact(jobId, {
  prompt: \`Navigate to Contact. Fill: Name="\${name}"
    Email="\${email}" Message="\${message}"
    Do NOT submit. Confirm fields are filled.\`,
  timeout: 120,
});`,
  },
  {
    id: "subscribeProduct",
    label: "Subscription Plan",
    description: "View a monthly subscription plan details",
    params: [
      { key: "plan", label: "Plan", type: "select", options: ["3 Months DB", "6 Months DB", "12 Months DB", "3 Months Beans", "6 Months Beans", "12 Months Beans"], required: true },
    ],
    code: `// subscribeProduct(jobId, plan)
const result = await client.interact(jobId, {
  prompt: \`Go to the subscription page. Find
    "\${plan}" plan. Click it/Subscribe. Describe
    the plan details, price, and savings.\`,
  timeout: 180,
});`,
  },
]

// ──────────────────────────────────────────────
// Color / badge helpers
// ──────────────────────────────────────────────

const FLOW_COLORS = {
  browseCollection: "#6366f1",
  openProduct: "#8b5cf6",
  addToCart: "#f59e0b",
  viewCart: "#10b981",
  applyDiscount: "#ef4444",
  navigateSection: "#3b82f6",
  switchLanguage: "#06b6d4",
  searchProducts: "#ec4899",
  fillContactForm: "#14b8a6",
  subscribeProduct: "#f97316",
}

// ──────────────────────────────────────────────
// Components
// ──────────────────────────────────────────────

function CodeBlock({ code, language = "js" }) {
  return (
    <pre
      style={{
        padding: "1rem 1.25rem",
        borderRadius: 8,
        fontSize: "0.8125rem",
        lineHeight: 1.6,
        overflow: "auto",
        maxHeight: 280,
        background: "#0d1117",
        color: "#e6edf3",
      }}
    >
      <code>{code.trim()}</code>
    </pre>
  )
}

function Badge({ children, style }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.55rem",
        borderRadius: 999,
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </span>
  )
}

function StatCard({ label, value, color = "#888" }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 120,
        padding: "0.75rem 1rem",
        borderRadius: 8,
        background: "#f8f9fa",
        border: "1px solid #e9ecef",
      }}
    >
      <div style={{ fontSize: "0.7rem", color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.25rem", fontWeight: 700, color }}>{value}</div>
    </div>
  )
}

function ControlPanel({ flow, onRun, running }) {
  const [params, setParams] = useState({})
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        border: "1px solid #e9ecef",
        borderRadius: 10,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "0.85rem 1rem",
          border: "none",
          background: open ? "#f8f9ff" : "#fff",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: FLOW_COLORS[flow.id] || "#888",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span>{flow.label}</span>
          <span style={{ fontWeight: 400, color: "#888", fontSize: "0.8rem" }}>
            — {flow.description}
          </span>
        </div>
        <span style={{ color: "#aaa", fontSize: "0.75rem" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid #e9ecef" }}>
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <CodeBlock code={flow.code} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {flow.params.map((param) => (
              <div key={param.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  {param.label}
                  {param.required && (
                    <span style={{ color: "#e53e3e", marginLeft: 2 }}>*</span>
                  )}
                </label>
                {param.type === "select" ? (
                  <select
                    value={params[param.key] || ""}
                    onChange={(e) => setParams((p) => ({ ...p, [param.key]: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      fontSize: "0.85rem",
                      background: "#fff",
                    }}
                  >
                    <option value="">— Select —</option>
                    {param.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : param.type === "textarea" ? (
                  <textarea
                    value={params[param.key] || ""}
                    onChange={(e) => setParams((p) => ({ ...p, [param.key]: e.target.value }))}
                    rows={2}
                    placeholder={param.label}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      fontSize: "0.85rem",
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <input
                    type={param.type || "text"}
                    value={params[param.key] || ""}
                    onChange={(e) => setParams((p) => ({ ...p, [param.key]: e.target.value }))}
                    placeholder={param.label}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      fontSize: "0.85rem",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button
              onClick={() => onRun(flow, params)}
              disabled={running}
              style={{
                padding: "0.55rem 1.25rem",
                borderRadius: 6,
                border: "none",
                background: FLOW_COLORS[flow.id] || "#6366f1",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: running ? "not-allowed" : "pointer",
                opacity: running ? 0.6 : 1,
              }}
            >
              {running ? "Running..." : "▶ Run Flow"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function LogEntry({ entry }) {
  const isError = entry.type === "error"
  const isInfo = entry.type === "info"
  return (
    <div
      style={{
        padding: "0.6rem 0.85rem",
        marginBottom: 4,
        borderRadius: 6,
        fontSize: "0.8rem",
        lineHeight: 1.5,
        fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
        background: isError ? "#fff5f5" : isInfo ? "#f0f5ff" : "#fafafa",
        borderLeft: `3px solid ${isError ? "#e53e3e" : isInfo ? "#3b82f6" : "#d1d5db"}`,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      {entry.text}
    </div>
  )
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────

export default function InteractPage() {
  const [sessionUrl, setSessionUrl] = useState("https://sofecoffee.com/")
  const [scrapeId, setScrapeId] = useState(null)
  const [sessionStatus, setSessionStatus] = useState("idle") // idle | loading | active | error
  const [sessionError, setSessionError] = useState("")
  const [logs, setLogs] = useState([])
  const [runningFlow, setRunningFlow] = useState(null)
  const [collapsedFlows, setCollapsedFlows] = useState(true)
  const [showReference, setShowReference] = useState(false)
  const logsEndRef = useRef(null)

  const addLog = useCallback((text, type = "log") => {
    setLogs((prev) => [...prev, { text, type, ts: new Date().toLocaleTimeString() }])
  }, [])

  const clearLogs = useCallback(() => setLogs([]), [])

  // Auto-scroll logs
  const scrollToBottom = useCallback(() => {
    setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }, [])

  const startSession = useCallback(async () => {
    if (!sessionUrl.trim()) return
    setSessionStatus("loading")
    setSessionError("")
    addLog(`🔄 Starting scrape session: ${sessionUrl}`, "info")
    setScrapeId(null)

    // Check if API key is set
    const hasKey = typeof process !== "undefined" && (process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || "").startsWith("fc-")

    if (!hasKey) {
      setSessionStatus("error")
      setSessionError(
        "No Firecrawl API key found. Set NEXT_PUBLIC_FIRECRAWL_API_KEY in .env.local to enable live sessions."
      )
      addLog(
        "⚠️  Missing FIRECRAWL_API_KEY. Add NEXT_PUBLIC_FIRECRAWL_API_KEY=fc-your-key to .env.local",
        "error"
      )
      return
    }

    try {
      // Dynamic import so the page works without the key
      const { scrapePage } = await import("@/lib/firecrawl")
      const { document, scrapeId: sid } = await scrapePage(sessionUrl, {
        formats: ["markdown"],
        waitFor: 3000,
      })

      if (sid) {
        setScrapeId(sid)
        setSessionStatus("active")
        addLog(`✅ Session active. scrapeId: ${sid.slice(0, 20)}…`, "info")
        addLog(`📄 Title: ${document?.metadata?.title || "N/A"}`)
      } else {
        setSessionStatus("error")
        setSessionError("Scrape succeeded but no scrapeId was returned (page may not support interact).")
        addLog("⚠️  No scrapeId in response metadata", "error")
      }
    } catch (err) {
      setSessionStatus("error")
      setSessionError(err.message || String(err))
      addLog(`❌ Session error: ${err.message}`, "error")
    }
  }, [sessionUrl, addLog])

  const runFlow = useCallback(
    async (flow, params) => {
      const hasKey =
        typeof process !== "undefined" &&
        (process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || "").startsWith("fc-")

      if (!hasKey) {
        addLog("⚠️  API key required. Set NEXT_PUBLIC_FIRECRAWL_API_KEY in .env.local", "error")
        return
      }

      if (!scrapeId) {
        addLog("⚠️  Start a session first (enter a URL and click 'Start Session')", "error")
        return
      }

      setRunningFlow(flow.id)
      addLog(`🚀 Running: ${flow.label}`, "info")

      try {
        const { interact } = await import("@/lib/firecrawl")

        // Map flow IDs to their actual interact calls
        const flowMap = {
          browseCollection: async () => {
            const keyword = params.keyword || ""
            const instruction = keyword
              ? `Scroll through the collection page. Find products related to "${keyword}". List their names and prices.`
              : "Scroll down the collection page slowly. List all visible product names and their prices."
            return interact(scrapeId, instruction, { timeout: 90 })
          },
          openProduct: async () => {
            return interact(
              scrapeId,
              `Find the product card titled "${params.productName}" and click on it. Wait for the product detail page to load fully. Then describe the product name, price, description, and available options.`,
              { timeout: 120 }
            )
          },
          addToCart: async () => {
            const qty = params.quantity || 1
            return interact(
              scrapeId,
              `On the product page for "${params.productName}", select the default options if any are shown. Click the "Add to Cart" or "加入購物車" button. If quantity can be adjusted, set it to ${qty}. Wait for the cart confirmation drawer/popup to appear. Confirm the item was added successfully.`,
              { timeout: 120 }
            )
          },
          viewCart: async () => {
            return interact(
              scrapeId,
              "Navigate to the cart page or open the cart drawer. List every item in the cart with its name, quantity, and individual price. Show the subtotal and any shipping information.",
              { timeout: 90 }
            )
          },
          applyDiscount: async () => {
            return interact(
              scrapeId,
              `Navigate to the cart page. Find the discount/coupon code input field. Type "${params.code}" into it and click "Apply" or "套用". Report whether the discount was accepted and what the new total is.`,
              { timeout: 90 }
            )
          },
          navigateSection: async () => {
            return interact(
              scrapeId,
              `Click on the "${params.section}" link in the main navigation header. Wait for the page to load completely. Summarise what this page is about and its main content sections.`,
              { timeout: 90 }
            )
          },
          switchLanguage: async () => {
            const target = params.lang === "en" ? "English" : "繁體中文"
            return interact(
              scrapeId,
              `Click on the language switcher in the header. Select "${target}" from the available options. Wait for the page to reload in the selected language. Confirm the language changed by reading the page content.`,
              { timeout: 90 }
            )
          },
          searchProducts: async () => {
            return interact(
              scrapeId,
              `Click on the search icon (🔍) in the header. Wait for the search input to appear. Type "${params.query}" into the search field. Wait for search results to populate. List all products that appear in the search results.`,
              { timeout: 90 }
            )
          },
          fillContactForm: async () => {
            return interact(
              scrapeId,
              `Navigate to the Contact page. Fill in the contact form:
               - Name: "${params.name || "Test User"}"
               - Email: "${params.email || "test@example.com"}"
               - Message: "${params.message || "Hello, I would like to ask about your coffee subscription plans."}"
               Do NOT submit the form yet. Confirm all fields are filled correctly.`,
              { timeout: 120 }
            )
          },
          subscribeProduct: async () => {
            return interact(
              scrapeId,
              `Navigate to the subscription page. Find the "${params.plan}" subscription plan. Click on it or the associated "Subscribe" button. Follow through the subscription flow. Describe the plan details, price, and what the user saves.`,
              { timeout: 180 }
            )
          },
        }

        const runner = flowMap[flow.id]
        if (!runner) {
          addLog(`⚠️  Unknown flow: ${flow.id}`, "error")
          return
        }

        const result = await runner()

        if (result.success) {
          addLog(`✅ ${flow.label} completed successfully`)
          if (result.output) addLog(result.output.slice(0, 2000))
          if (result.liveViewUrl) addLog(`🔗 Live view: ${result.liveViewUrl}`, "info")
        } else {
          addLog(`❌ ${flow.label} failed: ${result.error || "Unknown error"}`, "error")
        }
      } catch (err) {
        addLog(`❌ Flow error: ${err.message}`, "error")
      } finally {
        setRunningFlow(null)
      }
    },
    [scrapeId, addLog]
  )

  const stopCurrentSession = useCallback(async () => {
    if (!scrapeId) return
    try {
      const { stopInteraction } = await import("@/lib/firecrawl")
      const result = await stopInteraction(scrapeId)
      addLog(`🛑 Session stopped (duration: ${result.sessionDurationMs}ms, credits: ${result.creditsBilled})`, "info")
    } catch (err) {
      addLog(`⚠️  Stop error: ${err.message}`)
    }
    setScrapeId(null)
    setSessionStatus("idle")
  }, [scrapeId, addLog])

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
          ⚡ Firecrawl Interact — SOFE COFFEE Demo
        </h1>
        <p style={{ color: "#555", lineHeight: 1.6, margin: 0 }}>
          Programmatic browser control for <strong>sofecoffee.com</strong>.
          Use natural-language prompts or code to browse products, add to cart,
          navigate pages, and more — all through an active browser session.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 28,
        }}
      >
        <StatCard label="Pages Crawled" value="79" color="#6366f1" />
        <StatCard label="Interaction Flows" value={String(INTERACTION_FLOWS.length)} color="#8b5cf6" />
        <StatCard label="Crawl Data Size" value="4.3 MB" color="#10b981" />
        <StatCard label="Session Status" value={sessionStatus === "active" ? "Active" : sessionStatus === "loading" ? "Loading..." : "Idle"} color={sessionStatus === "active" ? "#10b981" : "#888"} />
      </div>

      {/* Session Setup */}
      <div
        style={{
          padding: "1.25rem",
          borderRadius: 10,
          border: `2px solid ${sessionStatus === "active" ? "#10b981" : "#e9ecef"}`,
          background: sessionStatus === "active" ? "#f0fdf4" : "#fff",
          marginBottom: 24,
        }}
      >
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 600 }}>
          🎯 1. Start a Browser Session
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#666", margin: "0 0 0.75rem" }}>
          Enter any SOFE COFFEE URL to create a browser session. The returned{" "}
          <code style={{ background: "#f0f0f0", padding: "0.15rem 0.35rem", borderRadius: 3 }}>scrapeId</code>{" "}
          is used for all subsequent interaction flows.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="url"
            value={sessionUrl}
            onChange={(e) => setSessionUrl(e.target.value)}
            placeholder="https://sofecoffee.com/"
            disabled={sessionStatus === "loading"}
            style={{
              flex: 1,
              padding: "0.6rem 0.85rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: "0.9rem",
              fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
            }}
          />
          {sessionStatus === "active" ? (
            <button
              onClick={stopCurrentSession}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: 6,
                border: "1px solid #e53e3e",
                background: "#fff",
                color: "#e53e3e",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              ■ Stop Session
            </button>
          ) : (
            <button
              onClick={startSession}
              disabled={sessionStatus === "loading" || !sessionUrl.trim()}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: 6,
                border: "none",
                background: sessionStatus === "loading" ? "#a5b4fc" : "#6366f1",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: sessionStatus === "loading" ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {sessionStatus === "loading" ? "Starting..." : "▶ Start Session"}
            </button>
          )}
        </div>
        {sessionError && (
          <div
            style={{
              marginTop: 10,
              padding: "0.6rem 0.85rem",
              borderRadius: 6,
              background: "#fff5f5",
              color: "#c53030",
              fontSize: "0.85rem",
              border: "1px solid #fed7d7",
            }}
          >
            {sessionError}
          </div>
        )}
      </div>

      {/* API Reference Note */}
      <div
        style={{
          padding: "0.85rem 1rem",
          borderRadius: 8,
          background: "#f0f5ff",
          border: "1px solid #dbeafe",
          marginBottom: 24,
          fontSize: "0.85rem",
          color: "#1e40af",
        }}
      >
        <strong>💡 SDK Reference:</strong>{" "}
        <code style={{ background: "#e0e7ff", padding: "0.15rem 0.35rem", borderRadius: 3 }}>client.interact(jobId, &#123; prompt, timeout &#125;)</code>{" "}
        — requires a <code>scrapeId</code> from a prior scrape call. The full module is at{" "}
        <code style={{ background: "#e0e7ff", padding: "0.15rem 0.35rem", borderRadius: 3 }}>lib/firecrawl.js</code>.
      </div>

      {/* Interaction Flows */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          🧩 2. Interaction Flows
        </h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setCollapsedFlows(!collapsedFlows)}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              background: "#fff",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            {collapsedFlows ? "Expand All" : "Collapse All"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
        {INTERACTION_FLOWS.map((flow) => (
          <ControlPanel
            key={flow.id}
            flow={flow}
            onRun={runFlow}
            running={runningFlow === flow.id}
          />
        ))}
      </div>

      {/* Output Log */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          📋 3. Output Log
        </h3>
        <button
          onClick={clearLogs}
          style={{
            padding: "0.35rem 0.75rem",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            background: "#fff",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Clear Log
        </button>
      </div>

      <div
        style={{
          minHeight: 200,
          maxHeight: 400,
          overflow: "auto",
          padding: "0.75rem",
          borderRadius: 10,
          border: "1px solid #e9ecef",
          background: "#fcfcfc",
          marginBottom: 32,
        }}
      >
        {logs.length === 0 ? (
          <div style={{ color: "#aaa", fontSize: "0.85rem", padding: "2rem 0", textAlign: "center" }}>
            Start a session and run a flow to see output here.
          </div>
        ) : (
          logs.map((entry, i) => (
            <LogEntry key={`${i}-${entry.ts}`} entry={entry} />
          ))
        )}
        <div ref={logsEndRef} />
      </div>

      {/* Crawl Reference Data */}
      <button
        onClick={() => setShowReference(!showReference)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem 1.25rem",
          border: "1px solid #e9ecef",
          borderRadius: 10,
          background: "#fafafa",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: 600,
          textAlign: "left",
        }}
      >
        <span>📂 Crawl Reference Data (79 pages crawled from sofecoffee.com)</span>
        <span style={{ color: "#aaa", fontSize: "0.85rem" }}>
          {showReference ? "▲ Hide" : "▼ Show"}
        </span>
      </button>

      {showReference && (
        <div
          style={{
            border: "1px solid #e9ecef",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "1.25rem",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {/* Collections */}
            <div>
              <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Collections ({CRAWL_REFERENCE.collections.length})
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {CRAWL_REFERENCE.collections.map((c) => (
                  <li key={c.url} style={{ marginBottom: 4 }}>
                    <a
                      href={`https://sofecoffee.com${c.url}`}
                      target="_blank"
                      rel="noopener"
                      style={{ fontSize: "0.8rem", color: "#4a6cf7", textDecoration: "none" }}
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Products ({CRAWL_REFERENCE.products.length})
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {CRAWL_REFERENCE.products.map((p) => (
                  <li key={p.url} style={{ marginBottom: 3 }}>
                    <a
                      href={`https://sofecoffee.com${p.url}`}
                      target="_blank"
                      rel="noopener"
                      style={{ fontSize: "0.78rem", color: "#555", textDecoration: "none" }}
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages + Policies */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Pages ({CRAWL_REFERENCE.pages.length})
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {CRAWL_REFERENCE.pages.map((p) => (
                    <li key={p.url} style={{ marginBottom: 3 }}>
                      <a
                        href={`https://sofecoffee.com${p.url}`}
                        target="_blank"
                        rel="noopener"
                        style={{ fontSize: "0.8rem", color: "#555", textDecoration: "none" }}
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Policies ({CRAWL_REFERENCE.policies.length})
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {CRAWL_REFERENCE.policies.map((p) => (
                    <li key={p.url} style={{ marginBottom: 3 }}>
                      <a
                        href={`https://sofecoffee.com${p.url}`}
                        target="_blank"
                        rel="noopener"
                        style={{ fontSize: "0.8rem", color: "#555", textDecoration: "none" }}
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: "1.25rem",
          borderRadius: 8,
          background: "#f8f9fa",
          fontSize: "0.8rem",
          color: "#888",
          lineHeight: 1.7,
        }}
      >
        <strong>Built with</strong>{" "}
        <a href="https://www.firecrawl.dev/" target="_blank" rel="noopener" style={{ color: "#6366f1" }}>
          Firecrawl
        </a>{" "}
        v4.29.1 · Next.js 15 ·{" "}
        <a href="https://docs.firecrawl.dev/" target="_blank" rel="noopener" style={{ color: "#6366f1" }}>
          Firecrawl Docs
        </a>{" "}
        · Crawl data:{" "}
        <code style={{ background: "#f0f0f0", padding: "0.15rem 0.35rem", borderRadius: 3 }}>
          .firecrawl/sofecoffee-crawl.json
        </code>
        <br />
        <span>
          To use interact flows live, copy{" "}
          <code style={{ background: "#f0f0f0", padding: "0.15rem 0.35rem", borderRadius: 3 }}>
            .env.example
          </code>{" "}
          to{" "}
          <code style={{ background: "#f0f0f0", padding: "0.15rem 0.35rem", borderRadius: 3 }}>
            .env.local
          </code>{" "}
          and add your Firecrawl API key.
        </span>
      </div>
    </div>
  )
}