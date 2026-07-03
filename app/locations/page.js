import { locations } from "../../lib/locations"

export default function LocationsPage() {
  // Group locations by area
  const grouped = locations.reduce((acc, loc) => {
    if (!acc[loc.area]) acc[loc.area] = []
    acc[loc.area].push(loc)
    return acc
  }, {})

  return (
    <>
      <section className="page-banner">
        <div className="banner-placeholder" />
        <div className="page-banner-overlay" />
        <h1>Locations</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="location-grid">
            {Object.entries(grouped).map(([area, locs]) => (
              <div key={area}>
                {locs.map((loc) => (
                  <div key={loc.id} className="location-card" style={{ marginBottom: 16 }}>
                    <div className="location-area">{loc.area}</div>
                    <h3>{loc.name}</h3>
                    <p className="location-address">{loc.address}</p>
                    <p className="location-hours">
                      <strong>{loc.hours}</strong>
                    </p>
                    {loc.note && (
                      <p className="location-hours" style={{ marginTop: 4 }}>
                        {loc.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}