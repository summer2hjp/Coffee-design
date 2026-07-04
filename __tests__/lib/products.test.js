import { products, categories, getProductsByCategory, getCategoryBySlug, subscriptions } from '../../lib/products'

describe('getProductsByCategory', () => {
  it('returns all products for a valid category', () => {
    const result = getProductsByCategory('espresso-beans')
    expect(result).toHaveLength(5)
    result.forEach((p) => expect(p.category).toBe('espresso-beans'))
  })

  it('returns empty array for a category with no products', () => {
    const result = getProductsByCategory('nonexistent-category')
    expect(result).toEqual([])
  })

  it('returns empty array for empty string', () => {
    const result = getProductsByCategory('')
    expect(result).toEqual([])
  })

  it('is case-sensitive', () => {
    const result = getProductsByCategory('Espresso-Beans')
    expect(result).toEqual([])
  })
})

describe('getCategoryBySlug', () => {
  it('returns the category object for a known slug', () => {
    const cat = getCategoryBySlug('espresso-beans')
    expect(cat).toBeDefined()
    expect(cat.id).toBe('espresso-beans')
    expect(cat.name).toBe('NEW - Espresso Beans')
  })

  it('returns undefined for an unknown slug', () => {
    const cat = getCategoryBySlug('non-existent')
    expect(cat).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    const cat = getCategoryBySlug('')
    expect(cat).toBeUndefined()
  })

  it('handles complex slug paths', () => {
    const cat = getCategoryBySlug('coffee-drip-bag')
    expect(cat).toBeDefined()
    expect(cat.id).toBe('drip-bags')
  })
})

describe('categories', () => {
  it('has unique category IDs', () => {
    const ids = categories.map((c) => c.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all categories have required fields', () => {
    categories.forEach((cat) => {
      expect(cat.id).toBeDefined()
      expect(cat.name).toBeDefined()
      expect(cat.slug).toMatch(/^\/collections\//)
    })
  })

  it('cascara-tea and sofe-credits categories exist', () => {
    expect(categories.find((c) => c.id === 'cascara-tea')).toBeDefined()
    expect(categories.find((c) => c.id === 'sofe-credits')).toBeDefined()
  })
})

describe('products data integrity', () => {
  it('all products have required fields', () => {
    products.forEach((p) => {
      expect(p.id).toBeDefined()
      expect(p.name).toBeDefined()
      expect(p.category).toBeDefined()
      expect(p.price).toBeDefined()
      expect(p.image).toBeDefined()
      expect(p.href).toBeDefined()
    })
  })

  it('all products belong to a valid category', () => {
    const categoryIds = new Set(categories.map((c) => c.id))
    products.forEach((p) => {
      expect(categoryIds.has(p.category)).toBe(true)
    })
  })

  it('has unique product IDs', () => {
    const ids = products.map((p) => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all products with a badge have a valid badge value', () => {
    products.forEach((p) => {
      if (p.badge) {
        expect(['NEW', 'Sale']).toContain(p.badge)
      }
    })
  })

  it('href values start with http or #', () => {
    products.forEach((p) => {
      expect(p.href.startsWith('http') || p.href === '#').toBe(true)
    })
  })
})

describe('subscriptions data integrity', () => {
  it('has unique subscription IDs', () => {
    const ids = subscriptions.map((s) => s.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all subscriptions have required fields', () => {
    subscriptions.forEach((sub) => {
      expect(sub.id).toBeDefined()
      expect(sub.name).toBeDefined()
      expect(sub.type).toBeDefined()
      expect(sub.price).toBeDefined()
      expect(sub.image).toBeDefined()
      expect(sub.save).toBeDefined()
    })
  })

  it('subscriptions reference valid types', () => {
    const validTypes = ['Coffee Drip Bag', 'Pour Over Coffee Beans']
    subscriptions.forEach((sub) => {
      expect(validTypes).toContain(sub.type)
    })
  })
})