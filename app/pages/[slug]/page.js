import Link from "next/link"

export const pageData = [
  {
    slug: "about-sofe",
    name: "About SOFE COFFEE",
    content: `SOFE Coffee is indeed a standout choice for vegan and dairy-free coffee lovers in Hong Kong.
Known for their unique coffee bean roasting formula, they craft the most delicious oat milk coffee in Hong Kong and are the first coffee brand to offer a variety of oat milk options, ensuring each cup of coffee has its distinct flavour.
Their diverse range of fresh coffee products ensures that "Brewed Without Bounds, Anytime, Anywhere With SOFE COFFEE" — providing a versatile and high-quality coffee experience.`,
  },
  {
    slug: "membership",
    name: "Online Membership Rewards",
    content: `Join the SOFE COFFEE membership program and enjoy exclusive benefits, rewards, and special offers.
Members earn points on every purchase, receive birthday rewards, and get early access to new products and limited editions.
Visit any SOFE COFFEE location or sign up online to start earning rewards today.`,
  },
  {
    slug: "vip",
    name: "VIP Rewards",
    content: `Our VIP Rewards program is designed for our most loyal customers.
Enjoy exclusive discounts, priority access to new collections, special VIP-only events, and personalised coffee recommendations.
VIP status is achieved through annual spending thresholds and membership tenure.`,
  },
  {
    slug: "sofe-credits",
    name: "Sofe Credits",
    content: `Sofe Credits is our stored value card system.
Both new and existing members can now top up directly inside the "E-Wallet" for a faster and more convenient experience.
Use Sofe Credits for all purchases at SOFE COFFEE locations and online. Visit the Member Center for offer details!`,
  },
  {
    slug: "return-policy",
    name: "Return Policy",
    content: `We want you to love your SOFE COFFEE products. If you are not completely satisfied, please contact us within 14 days of receipt.
Products must be unopened and in their original packaging. Refunds will be processed to the original payment method within 5-10 business days.
For any questions about returns, please contact our support team.`,
  },
  {
    slug: "open_drip_bag",
    name: "Drip Bag Instructions",
    content: `How to brew the perfect cup with SOFE COFFEE Drip Bags:
1. Tear open the drip bag along the dotted line.
2. Hook the ears of the bag onto the rim of your cup.
3. Slowly pour hot water (about 92°C) over the coffee grounds, just enough to wet them.
4. Wait 30 seconds for the coffee to bloom.
5. Continue pouring hot water in a slow, circular motion until you reach your desired volume.
6. Wait for the dripping to finish, then remove and dispose of the bag.
7. Enjoy your freshly brewed coffee!`,
  },
  {
    slug: "grinder-manual-v2",
    name: "Grinder Manual V2",
    content: `SOFE COFFEE Hand Grinder V2 — Instructions
Grind Settings: The external adjustment dial allows you to select from fine (espresso) to coarse (French press) grind sizes.
Cleaning: Disassemble the burr section and brush clean after each use. Do not use water on the burrs — dry brush only.
Maintenance: Periodically check the centre shaft alignment. If the handle wobbles, tighten the centre screw gently.`,
  },
  {
    slug: "cascara",
    name: "Cascara Recipe",
    content: `Cascara — Coffee Cherry Fruit Tea Brewing Guide
Hot Brew: Steep 5g of cascara in 250ml of hot water (93°C) for 4 minutes. Strain and enjoy.
Cold Brew: Add 10g of cascara to 500ml of cold water. Refrigerate for 8-12 hours. Strain and serve over ice.
Cascara Sodas: Brew a concentrated cascara tea, let it cool, then mix with sparkling water and a splash of citrus for a refreshing summer drink.`,
  },
  {
    slug: "Ⓟ-𝐏𝐫𝐞𝐦𝐢𝐮𝐦",
    name: "Ⓟ Premium Series",
    content: `The Ⓟ Premium Series represents the finest coffee offerings from SOFE COFFEE.
Each lot is carefully selected from exceptional growing regions, featuring unique flavour profiles that showcase the artistry of coffee cultivation.
The Premium Series includes single-origin beans, specialty drip bags, and limited-edition cold brew selections — all crafted for the discerning coffee enthusiast.`,
  },
  {
    slug: "追蹤清單",
    name: "Tracking",
    content: `Track your SOFE COFFEE orders here. Enter your order number and email address to check the status of your shipment.
For any questions about your order, please contact our customer service team at business@sofecoffee.com.`,
  },
]

export function getPageBySlug(slug) {
  return pageData.find((p) => p.slug === slug)
}

export function generateStaticParams() {
  return pageData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return { title: "Page — SOFE COFFEE" }
  }

  return {
    title: `${page.name} — SOFE COFFEE`,
    description: `Learn more about ${page.name} at SOFE COFFEE.`,
  }
}

export default async function PageRouter({ params }) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return (
      <>
        <section className="page-banner">
          <div className="banner-placeholder" />
          <div className="page-banner-overlay" />
          <h1>Page</h1>
        </section>

        <section className="section">
          <div className="container" style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              This page is not available yet.
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
        <h1>{page.name}</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-page">
            {page.content.split("\n").map((paragraph, i) =>
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