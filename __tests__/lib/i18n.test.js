import { translations } from '../../lib/i18n'

describe('translations', () => {
  it('has both en and zh locales', () => {
    expect(translations.en).toBeDefined()
    expect(translations.zh).toBeDefined()
  })

  it('every en key has a corresponding zh key', () => {
    const enKeys = Object.keys(translations.en).sort()
    const zhKeys = Object.keys(translations.zh).sort()
    expect(zhKeys).toEqual(enKeys)
  })

  it('translation values are non-empty strings', () => {
    Object.entries(translations.en).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    })
    Object.entries(translations.zh).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    })
  })

  it('contains all required header keys', () => {
    const headerKeys = ['nav.home', 'nav.products', 'nav.subscription', 'nav.about', 'nav.locations', 'nav.contact']
    headerKeys.forEach((key) => {
      expect(translations.en[key]).toBeDefined()
      expect(translations.zh[key]).toBeDefined()
    })
  })

  it('contains all required footer keys', () => {
    const footerKeys = ['footer.productGuide', 'footer.aboutUs', 'footer.contactUs', 'footer.support', 'footer.rights']
    footerKeys.forEach((key) => {
      expect(translations.en[key]).toBeDefined()
      expect(translations.zh[key]).toBeDefined()
    })
  })

  it('contains all required hero keys', () => {
    expect(translations.en['hero.shopNow']).toBe('SHOP NOW')
    expect(translations.zh['hero.shopNow']).toBe('立即选购')
  })

  it('contains the new i18n keys for static pages', () => {
    const newKeys = [
      'subscription.title', 'subscription.desc', 'subscription.dripBag',
      'subscription.beans', 'subscription.choose', 'subscription.perks',
      'about.title', 'about.visitStores',
      'locations.title', 'locations.visitUs',
      'contact.title',
    ]
    newKeys.forEach((key) => {
      expect(translations.en[key]).toBeDefined()
      expect(translations.zh[key]).toBeDefined()
    })
  })
})