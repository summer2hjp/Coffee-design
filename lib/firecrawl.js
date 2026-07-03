/**
 * Firecrawl SDK — Interact Module
 *
 * Integrates Firecrawl's scrape, interact, and search APIs for programmatic
 * browser control and content extraction from sofecoffee.com.
 *
 * ## Quick Start
 *
 * ```js
 * import { scrapeProduct, addToCart, browseCollection } from "@/lib/firecrawl"
 *
 * // Scrape a product page
 * const product = await scrapeProduct("https://sofecoffee.com/products/drip-bag-coffee-ethiopia")
 *
 * // Interact (requires a scrape session)
 * const session = await client.scrape("https://sofecoffee.com/collections/all", {
 *   formats: ["markdown"],
 * })
 * const jobId = session.metadata?.scrapeId
 * const result = await addToCart(jobId, "Ethiopia Drip Bag x1", 1)
 * ```
 *
 * @module lib/firecrawl
 */

import { Firecrawl } from "firecrawl"
// Install via: npm install firecrawl

// ──────────────────────────────────────────────
// 1. Client Initialization
// ──────────────────────────────────────────────

/** Create a Firecrawl client instance. Reads FIRECRAWL_API_KEY from env. */
export function createClient(apiKey) {
  const key = apiKey || process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_KEY
  if (!key) {
    throw new Error(
      "Firecrawl API key not found. Set FIRECRAWL_API_KEY in your .env file."
    )
  }
  return new Firecrawl({ apiKey: key })
}

// Singleton client — reuse across calls
let _client = null

/** Get or create the shared Firecrawl client. */
export function getClient() {
  if (!_client) _client = createClient()
  return _client
}

// ──────────────────────────────────────────────
// 2. Scrape Helpers
// ──────────────────────────────────────────────

/**
 * Scrape a single page with content + a browser session for interact.
 * Returns the Document and the scrapeId for subsequent interact calls.
 *
 * @param {string} url — The page URL to scrape
 * @param {object} [options] — Scrape options
 * @param {string[]} [options.formats] — Output formats (default: ["markdown"])
 * @param {number} [options.waitFor] — Wait time for JS rendering (ms)
 * @param {object[]} [options.actions] — Pre-scrape browser actions
 * @returns {Promise<{document: object, scrapeId: string|null}>}
 */
export async function scrapePage(url, options = {}) {
  const client = getClient()
  const {
    formats = ["markdown"],
    waitFor = 3000,
    actions = [],
    ...rest
  } = options

  const document = await client.scrape(url, {
    formats,
    waitFor,
    actions: actions.length > 0 ? actions : undefined,
    onlyMainContent: false,
    ...rest,
  })

  const scrapeId = document?.metadata?.scrapeId ?? null
  return { document, scrapeId }
}

/**
 * Scrape a SOFE product page for pricing, description, and options.
 *
 * @param {string} productUrl — e.g. "https://sofecoffee.com/products/drip-bag-coffee-ethiopia"
 * @returns {Promise<object>} Product data + scraping metadata
 */
export async function scrapeProduct(productUrl) {
  const { document, scrapeId } = await scrapePage(productUrl, {
    formats: ["markdown", "html"],
    waitFor: 4000,
    actions: [
      { type: "wait", selector: ".product__info-wrapper" },
      { type: "wait", milliseconds: 1000 },
    ],
  })

  return {
    url: productUrl,
    title: document?.metadata?.title ?? "",
    description: document?.metadata?.description ?? "",
    markdown: document?.markdown ?? "",
    scrapeId,
  }
}

/**
 * Scrape a collection/category page for product listings.
 *
 * @param {string} collectionUrl — e.g. "https://sofecoffee.com/collections/coffee-drip-bag"
 * @returns {Promise<object>} Collection data
 */
export async function scrapeCollection(collectionUrl) {
  const { document, scrapeId } = await scrapePage(collectionUrl, {
    formats: ["markdown", "links"],
    waitFor: 3000,
    actions: [
      { type: "wait", selector: ".collection" },
      { type: "scroll", direction: "down" },
      { type: "wait", milliseconds: 1500 },
    ],
  })

  return {
    url: collectionUrl,
    title: document?.metadata?.title ?? "",
    productLinks: document?.links?.filter((l) => l.includes("/products/")) ?? [],
    markdown: document?.markdown ?? "",
    scrapeId,
  }
}

// ──────────────────────────────────────────────
// 3. Interact — Browser Session Control
// ──────────────────────────────────────────────

/**
 * Execute a natural-language interaction within an active browser session.
 *
 * @param {string} scrapeId — From document.metadata.scrapeId
 * @param {string} prompt — Natural-language instruction for the browser agent
 * @param {object} [opts]
 * @param {number} [opts.timeout] — Execution timeout in seconds
 * @returns {Promise<object>} Interaction result (output, liveViewUrl, etc.)
 */
export async function interact(scrapeId, prompt, opts = {}) {
  const client = getClient()
  return client.interact(scrapeId, {
    prompt,
    timeout: opts.timeout ?? 60,
  })
}

/**
 * Execute JavaScript in the browser session (advanced control).
 *
 * @param {string} scrapeId — From document.metadata.scrapeId
 * @param {string} code — Playwright page object JavaScript
 * @param {object} [opts]
 * @param {number} [opts.timeout] — Execution timeout in seconds
 * @returns {Promise<object>}
 */
export async function interactCode(scrapeId, code, opts = {}) {
  const client = getClient()
  return client.interact(scrapeId, {
    code,
    language: "node",
    timeout: opts.timeout ?? 60,
  })
}

/**
 * Stop an active interaction session.
 *
 * @param {string} scrapeId — The session to stop
 * @returns {Promise<object>} { success, sessionDurationMs, creditsBilled }
 */
export async function stopInteraction(scrapeId) {
  const client = getClient()
  return client.stopInteraction(scrapeId)
}

// ──────────────────────────────────────────────
// 4. Pre-Built SOFE COFFEE Interaction Flows
// ──────────────────────────────────────────────

/**
 * Browse a collection and find products matching a keyword.
 *
 * @param {string} scrapeId — Active session
 * @param {string} [keyword] — Product keyword to search for
 * @returns {Promise<object>}
 */
export async function browseCollection(scrapeId, keyword = "") {
  const instruction = keyword
    ? `Scroll through the collection page. Find products related to "${keyword}". List their names and prices.`
    : "Scroll down the collection page slowly. List all visible product names and their prices."
  return interact(scrapeId, instruction, { timeout: 90 })
}

/**
 * Click on a product card to open its detail page.
 *
 * @param {string} scrapeId — Active session
 * @param {string} productName — The product name to click on
 * @returns {Promise<object>}
 */
export async function openProduct(scrapeId, productName) {
  return interact(
    scrapeId,
    `Find the product card titled "${productName}" and click on it. Wait for the product detail page to load fully. Then describe the product name, price, description, and available options.`,
    { timeout: 120 }
  )
}

/**
 * Add a product to cart with a given quantity.
 *
 * @param {string} scrapeId — Active session
 * @param {string} productName — Product name or description
 * @param {number} [quantity] — How many to add (default: 1)
 * @returns {Promise<object>}
 */
export async function addToCart(scrapeId, productName, quantity = 1) {
  return interact(
    scrapeId,
    `On the product page for "${productName}", select the default options if any are shown. Click the "Add to Cart" or "加入購物車" button. If quantity can be adjusted, set it to ${quantity}. Wait for the cart confirmation drawer/popup to appear. Confirm the item was added successfully.`,
    { timeout: 120 }
  )
}

/**
 * View the cart and summarize its contents.
 *
 * @param {string} scrapeId — Active session
 * @returns {Promise<object>}
 */
export async function viewCart(scrapeId) {
  return interact(
    scrapeId,
    "Navigate to the cart page or open the cart drawer. List every item in the cart with its name, quantity, and individual price. Show the subtotal and any shipping information.",
    { timeout: 90 }
  )
}

/**
 * Apply a discount code during checkout.
 *
 * @param {string} scrapeId — Active session
 * @param {string} discountCode — The coupon code
 * @returns {Promise<object>}
 */
export async function applyDiscount(scrapeId, discountCode) {
  return interact(
    scrapeId,
    `Navigate to the cart page. Find the discount/coupon code input field. Type "${discountCode}" into it and click "Apply" or "套用". Report whether the discount was accepted and what the new total is.`,
    { timeout: 90 }
  )
}

/**
 * Navigate the site through the header navigation.
 *
 * @param {string} scrapeId — Active session
 * @param {string} section — Navigation section to visit (Home, Products, About, Locations, Contact)
 * @returns {Promise<object>}
 */
export async function navigateToSection(scrapeId, section) {
  return interact(
    scrapeId,
    `Click on the "${section}" link in the main navigation header. Wait for the page to load completely. Summarise what this page is about and its main content sections.`,
    { timeout: 90 }
  )
}

/**
 * Switch the site language (EN / 繁中).
 *
 * @param {string} scrapeId — Active session
 * @param {"en"|"zh"} lang — Target language
 * @returns {Promise<object>}
 */
export async function switchLanguage(scrapeId, lang) {
  const target = lang === "en" ? "English" : "繁體中文"
  return interact(
    scrapeId,
    `Click on the language switcher in the header. Select "${target}" from the available options. Wait for the page to reload in the selected language. Confirm the language changed by reading the page content.`,
    { timeout: 90 }
  )
}

/**
 * Subscribe to the monthly subscription plan.
 *
 * @param {string} scrapeId — Active session
 * @param {string} plan — "3months", "6months", or "12months"
 * @returns {Promise<object>}
 */
export async function subscribeProduct(scrapeId, plan) {
  return interact(
    scrapeId,
    `Navigate to the subscription page. Find the "${plan}" subscription plan. Click on it or the associated "Subscribe" button. Follow through the subscription flow. Describe the plan details, price, and what the user saves.`,
    { timeout: 180 }
  )
}

/**
 * Fill and submit the contact form.
 *
 * @param {string} scrapeId — Active session
 * @param {object} details — { name, email, phone, message }
 * @returns {Promise<object>}
 */
export async function fillContactForm(scrapeId, details) {
  return interact(
    scrapeId,
    `Navigate to the Contact page. Fill in the contact form:
     - Name: "${details.name || "Test User"}"
     - Email: "${details.email || "test@example.com"}"
     - Phone: "${details.phone || "+852 1234 5678"}"
     - Message: "${details.message || "Hello, I would like to ask about your coffee subscription plans."}"
     Do NOT submit the form yet. Confirm all fields are filled correctly.`,
    { timeout: 120 }
  )
}

/**
 * Search for products on the site using the search bar.
 *
 * @param {string} scrapeId — Active session
 * @param {string} query — Search term
 * @returns {Promise<object>}
 */
export async function searchProducts(scrapeId, query) {
  return interact(
    scrapeId,
    `Click on the search icon (🔍) in the header. Wait for the search input to appear. Type "${query}" into the search field. Wait for search results to populate. List all products that appear in the search results.`,
    { timeout: 90 }
  )
}

// ──────────────────────────────────────────────
// 5. Search (Web Discovery)
// ──────────────────────────────────────────────

/**
 * Search the web for information about a coffee product or topic.
 * Useful for discovering product details, reviews, or related content.
 *
 * @param {string} query — Search query
 * @param {object} [opts]
 * @param {number} [opts.limit] — Max results
 * @returns {Promise<object>}
 */
export async function searchWeb(query, opts = {}) {
  const client = getClient()
  return client.search(query, {
    limit: opts.limit ?? 5,
    scrapeOptions: { formats: ["markdown"] },
  })
}

// ──────────────────────────────────────────────
// 6. Utilities
// ──────────────────────────────────────────────

/**
 * Parse structured product data from scraped markdown content.
 * Handles both Chinese and English product pages.
 *
 * @param {string} markdown — Scraped markdown content
 * @returns {{ name: string, price: string, description: string, options: string[] }}
 */
export function parseProductFromMarkdown(markdown) {
  const lines = markdown.split("\n").filter(Boolean)

  // Try to extract title (usually first # heading)
  const titleLine = lines.find((l) => l.startsWith("# "))
  const name = titleLine ? titleLine.replace(/^#+\s*/, "").trim() : ""

  // Try to extract price (HK$ pattern)
  const priceMatch = markdown.match(/HK\$\s*[\d,]+\.?\d*/)
  const price = priceMatch ? priceMatch[0] : ""

  // Try to extract description
  const descLines = []
  for (const line of lines) {
    if (
      !line.startsWith("#") &&
      !line.startsWith("[") &&
      !line.startsWith("!") &&
      line.length > 30 &&
      !line.includes("HK$")
    ) {
      descLines.push(line.trim())
      if (descLines.length >= 3) break
    }
  }

  // Extract option/variant lines
  const options = lines
    .filter((l) => /radio|option|select|choose| flavour |150g|200g|250g|pack/i.test(l))
    .map((l) => l.trim())

  return {
    name,
    price,
    description: descLines.join(" ").substring(0, 300),
    options: [...new Set(options)].slice(0, 10),
  }
}

/**
 * All SOFE COFFEE interaction flows as a registry.
 * Useful for programmatic discovery (e.g., populate a dropdown).
 */
export const INTERACTION_FLOWS = {
  browseCollection: {
    label: "Browse Collection",
    description: "Scroll and list products in a collection",
    params: [{ key: "keyword", label: "Keyword (optional)", type: "text" }],
  },
  openProduct: {
    label: "Open Product",
    description: "Click a product card to see details",
    params: [
      { key: "productName", label: "Product Name", type: "text", required: true },
    ],
  },
  addToCart: {
    label: "Add to Cart",
    description: "Add a product to the shopping cart",
    params: [
      { key: "productName", label: "Product Name", type: "text", required: true },
      { key: "quantity", label: "Quantity", type: "number", default: 1 },
    ],
  },
  viewCart: {
    label: "View Cart",
    description: "View current shopping cart contents",
    params: [],
  },
  applyDiscount: {
    label: "Apply Discount Code",
    description: "Enter a coupon code in the cart",
    params: [
      { key: "discountCode", label: "Discount Code", type: "text", required: true },
    ],
  },
  navigateToSection: {
    label: "Navigate Section",
    description: "Click a nav link to visit a page section",
    params: [
      {
        key: "section",
        label: "Section",
        type: "select",
        options: ["Home", "Products", "About", "Locations", "Contact"],
        required: true,
      },
    ],
  },
  switchLanguage: {
    label: "Switch Language",
    description: "Toggle between English and Chinese",
    params: [
      {
        key: "lang",
        label: "Language",
        type: "select",
        options: ["en", "zh"],
        required: true,
      },
    ],
  },
  searchProducts: {
    label: "Search Products",
    description: "Search for products via the search bar",
    params: [
      { key: "query", label: "Search Query", type: "text", required: true },
    ],
  },
  fillContactForm: {
    label: "Fill Contact Form",
    description: "Pre-fill the contact form fields",
    params: [
      { key: "name", label: "Name", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "message", label: "Message", type: "text" },
    ],
  },
  subscribeProduct: {
    label: "Subscribe Plan",
    description: "View and interact with a subscription plan",
    params: [
      {
        key: "plan",
        label: "Plan",
        type: "select",
        options: ["3months", "6months", "12months"],
        required: true,
      },
    ],
  },
}

export default {
  createClient,
  getClient,
  scrapePage,
  scrapeProduct,
  scrapeCollection,
  interact,
  interactCode,
  stopInteraction,
  browseCollection,
  openProduct,
  addToCart,
  viewCart,
  applyDiscount,
  navigateToSection,
  switchLanguage,
  searchProducts,
  fillContactForm,
  subscribeProduct,
  searchWeb,
  parseProductFromMarkdown,
  INTERACTION_FLOWS,
}