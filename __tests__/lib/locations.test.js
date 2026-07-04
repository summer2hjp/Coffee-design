import { locations } from '../../lib/locations'

describe('locations data integrity', () => {
  it('has unique location IDs', () => {
    const ids = locations.map((l) => l.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all locations have required fields', () => {
    locations.forEach((loc) => {
      expect(loc.id).toBeDefined()
      expect(loc.area).toBeDefined()
      expect(loc.name).toBeDefined()
      expect(loc.address).toBeDefined()
      expect(loc.hours).toBeDefined()
      expect(loc.note).toBeDefined()
    })
  })

  it('has locations across different areas of Hong Kong', () => {
    const areas = locations.map((l) => l.area)
    const uniqueAreas = new Set(areas)
    expect(uniqueAreas.has('Hong Kong Island')).toBe(true)
    expect(uniqueAreas.has('Kowloon')).toBe(true)
    expect(uniqueAreas.has('New Territories')).toBe(true)
  })

  it('hours are non-empty strings', () => {
    locations.forEach((loc) => {
      expect(loc.hours.length).toBeGreaterThan(0)
    })
  })

  it('note field is always a string (may be empty)', () => {
    locations.forEach((loc) => {
      expect(typeof loc.note).toBe('string')
    })
  })
})