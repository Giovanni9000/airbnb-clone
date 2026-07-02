import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'

function ListingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Cost calculator state
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`https://airbnb-clone-cre0.onrender.com/api/listings/${id}`)
        setListing(response.data)
      } catch (err) {
        setError('Listing not found')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id])

  // Calculate number of nights between check-in and check-out
  const getNights = () => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }

  // Dynamically calculate total cost
  const nights = getNights()
  const basePrice = listing ? listing.price * nights : 0
  const weeklyDiscount = nights >= 7 && listing ? (basePrice * listing.weeklyDiscount) / 100 : 0
  const cleaningFee = listing ? listing.cleaningFee : 0
  const serviceFee = listing ? listing.serviceFee : 0
  const taxes = listing ? listing.occupancyTaxes : 0
  const total = basePrice - weeklyDiscount + cleaningFee + serviceFee + taxes

  if (loading) return <div style={{ padding: '32px' }}>Loading...</div>
  if (error) return <div style={{ padding: '32px', color: 'red' }}>{error}</div>

  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.container}>
        {/* Heading */}
        <button style={styles.backBtn} onClick={() => navigate('/listings')}>
          ← Back to listings
        </button>
        <h1 style={styles.title}>{listing.title}</h1>
        <p style={styles.subtitle}>
          📍 {listing.location} · {listing.bedrooms} bed · {listing.bathrooms} bath · {listing.guests} guests max
        </p>

        {/* Image Gallery */}
        <div style={styles.gallery}>
          <img
            src={listing.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop'}
            alt={listing.title}
            style={styles.mainImg}
          />
          <div style={styles.thumbGrid}>
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={listing.images[i] || `https://images.unsplash.com/photo-${1564013799919 + i * 1000}-ab600027ffc6?w=400&h=250&fit=crop`}
                alt={`View ${i}`}
                style={styles.thumbImg}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content + Cost Calculator */}
        <div style={styles.contentRow}>
          {/* Left: Details */}
          <div style={styles.details}>
            {/* Property type */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>{listing.type} hosted</h2>
              <p style={styles.sectionText}>{listing.description}</p>
            </div>

            {/* Amenities */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>What this place offers</h2>
              <div style={styles.amenitiesGrid}>
                {listing.amenities && listing.amenities.length > 0 ? (
                  listing.amenities.map((amenity) => (
                    <div key={amenity} style={styles.amenityItem}>
                      ✓ {amenity}
                    </div>
                  ))
                ) : (
                  <p style={styles.sectionText}>No amenities listed</p>
                )}
              </div>
            </div>

            {/* House rules */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Things to know</h2>
              <div style={styles.rulesGrid}>
                <div>
                  <h4 style={styles.ruleTitle}>House rules</h4>
                  <p style={styles.ruleText}>Check-in after 3:00 PM</p>
                  <p style={styles.ruleText}>Checkout before 11:00 AM</p>
                  <p style={styles.ruleText}>Max {listing.guests} guests</p>
                </div>
                <div>
                  <h4 style={styles.ruleTitle}>Safety</h4>
                  <p style={styles.ruleText}>Carbon monoxide alarm</p>
                  <p style={styles.ruleText}>Smoke alarm</p>
                </div>
                <div>
                  <h4 style={styles.ruleTitle}>Cancellation policy</h4>
                  <p style={styles.ruleText}>Free cancellation for 48 hours</p>
                  <p style={styles.ruleText}>Review the full policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Cost Calculator */}
          <div style={styles.calculator}>
            <div style={styles.calcCard}>
              <div style={styles.calcHeader}>
                <span style={styles.calcPrice}>${listing.price}</span>
                <span style={styles.calcNight}> / night</span>
              </div>

              {/* Date inputs */}
              <div style={styles.dateRow}>
                <div style={styles.dateField}>
                  <label style={styles.dateLabel}>CHECK-IN</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={styles.dateInput}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div style={styles.dateField}>
                  <label style={styles.dateLabel}>CHECKOUT</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={styles.dateInput}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Guests */}
              <div style={styles.guestsField}>
                <label style={styles.dateLabel}>GUESTS</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  min={1}
                  max={listing.guests}
                  style={styles.dateInput}
                />
              </div>

              <button style={styles.reserveBtn}>
                {nights > 0 ? `Reserve · $${total.toFixed(2)}` : 'Reserve'}
              </button>

              {/* Cost breakdown — only shows when dates are selected */}
              {nights > 0 && (
                <div style={styles.breakdown}>
                  <div style={styles.breakdownRow}>
                    <span>${listing.price} × {nights} nights</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {weeklyDiscount > 0 && (
                    <div style={{ ...styles.breakdownRow, color: '#008A05' }}>
                      <span>Weekly discount ({listing.weeklyDiscount}%)</span>
                      <span>-${weeklyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {cleaningFee > 0 && (
                    <div style={styles.breakdownRow}>
                      <span>Cleaning fee</span>
                      <span>${cleaningFee.toFixed(2)}</span>
                    </div>
                  )}
                  {serviceFee > 0 && (
                    <div style={styles.breakdownRow}>
                      <span>Service fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                  )}
                  {taxes > 0 && (
                    <div style={styles.breakdownRow}>
                      <span>Occupancy taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 Airbnb Clone. All rights reserved.</p>
      </footer>
    </div>
  )
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '32px' },
  backBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#555',
    padding: '0 0 16px',
    display: 'block',
  },
  title: { fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' },
  subtitle: { color: '#717171', fontSize: '16px', marginBottom: '24px' },
  gallery: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '40px', borderRadius: '12px', overflow: 'hidden' },
  mainImg: { width: '100%', height: '400px', objectFit: 'cover', gridRow: '1 / 3' },
  thumbGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  thumbImg: { width: '100%', height: '196px', objectFit: 'cover' },
  contentRow: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'flex-start' },
  details: {},
  section: { borderBottom: '1px solid #eee', paddingBottom: '32px', marginBottom: '32px' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' },
  sectionText: { color: '#444', lineHeight: '1.6', fontSize: '15px' },
  amenitiesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  amenityItem: { fontSize: '15px', color: '#444', padding: '8px 0' },
  rulesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' },
  ruleTitle: { fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' },
  ruleText: { color: '#717171', fontSize: '14px', marginBottom: '6px' },
  calculator: { position: 'sticky', top: '100px' },
  calcCard: {
    border: '1px solid #ddd',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
  calcHeader: { marginBottom: '20px' },
  calcPrice: { fontSize: '24px', fontWeight: 'bold' },
  calcNight: { fontSize: '16px', color: '#717171' },
  dateRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' },
  dateField: { padding: '12px', borderRight: '1px solid #ddd' },
  dateLabel: { display: 'block', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '0.5px' },
  dateInput: { border: 'none', outline: 'none', width: '100%', fontSize: '14px', padding: 0 },
  guestsField: { border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px' },
  reserveBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  breakdown: { borderTop: '1px solid #eee', paddingTop: '16px' },
  breakdownRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '4px' },
  footer: { backgroundColor: '#f7f7f7', borderTop: '1px solid #ddd', padding: '24px 32px', marginTop: '48px' },
  footerText: { color: '#717171', fontSize: '14px' },
}

export default ListingDetailPage