export const policies = [
  {
    slug: "shipping-policy",
    name: "Shipping Policy",
    description: "SOFE COFFEE shipping policy and delivery information.",
    content: `At SOFE COFFEE, we strive to deliver your order as quickly and efficiently as possible.
Orders are processed within 1-2 business days (Monday to Friday, excluding public holidays).
Shipping rates are calculated at checkout based on your delivery address and order weight.
Free standard shipping is available for orders over HK$300 within Hong Kong.
Estimated delivery time: 2-5 business days within Hong Kong.
International shipping is available for select destinations. Please contact us for international shipping rates and delivery estimates.
Once your order has been dispatched, you will receive a confirmation email with tracking information.
For any questions about shipping, please contact our support team at business@sofecoffee.com.`,
  },
  {
    slug: "refund-policy",
    name: "Refund Policy",
    description: "SOFE COFFEE refund and return policy.",
    content: `We want you to be completely satisfied with your SOFE COFFEE purchase.
If you are not satisfied with your order, please contact us within 14 days of receiving your items.
To be eligible for a refund, items must be unopened, unused, and in their original packaging.
Refunds will be processed to the original payment method within 5-10 business days after we receive the returned items.
Shipping costs are non-refundable unless the return is due to an error on our part.
If you receive a damaged or defective item, please contact us immediately with your order number and photos of the damage.
For any questions about returns and refunds, please email business@sofecoffee.com.`,
  },
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    description: "SOFE COFFEE privacy policy and data protection information.",
    content: `SOFE COFFEE is committed to protecting your privacy and personal data.
This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
Information We Collect: We collect personal information such as your name, email address, shipping address, and payment details when you place an order or create an account.
How We Use Your Information: We use your information to process orders, communicate with you about your purchases, improve our services, and send promotional materials (with your consent).
Data Protection: We implement industry-standard security measures to protect your personal information. Your payment data is encrypted and processed securely through trusted payment partners.
Third-Party Sharing: We do not sell your personal information to third parties. We may share your data with trusted service providers (shipping carriers, payment processors) solely for order fulfilment.
Cookies: Our website uses cookies to enhance your browsing experience and analyse site traffic. You can control cookie settings through your browser preferences.
Your Rights: You have the right to access, correct, or delete your personal data at any time. Contact us at business@sofecoffee.com for any privacy-related requests.
Updates: We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.`,
  },
]

export function getPolicyBySlug(slug) {
  return policies.find((p) => p.slug === slug)
}