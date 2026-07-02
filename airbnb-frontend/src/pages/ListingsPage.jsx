import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'

const propertyTypes = ['All', 'Entire home', 'Private room', 'Shared room', 'Hotel room']

function ListingsPage() {
  const [listings, setListings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://airbnb-clone-cre0.onrender.com/api/listings')
        setListings(response.data)
        setFiltered(response.data)
      } catch (err) {
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleFilter = (type) => {
    setActiveFilter(type)
    if (type === 'All') {
      setFiltered(listings)
    } else {
      setFiltered(listings.filter((l) => l.type === type))
    }
  }

  return (
    <div style={styles.page}>
      <Header />

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        {propertyTypes.map((type) => (
          <button
            key={type}
            style={activeFilter === type ? styles.activeFilter : styles.filterBtn}
            onClick={() => handleFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div style={styles.container}>
        <h2 style={styles.title}>
          {activeFilter === 'All' ? 'All Listings' : activeFilter}
          <span style={styles.count}> ({filtered.length})</span>
        </h2>

        {loading && <p>Loading listings...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && filtered.length === 0 && (
          <p style={styles.empty}>No listings found for this filter.</p>
        )}

        <div style={styles.grid}>
          {filtered.map((listing) => (
            <div
              key={listing._id}
              style={styles.card}
              onClick={() => navigate(`/listings/${listing._id}`)}
            >
              <div style={styles.imgWrapper}>
                <img
                  src={listing.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'}
                  alt={listing.title}
                  style={styles.img}
                />
                <span style={styles.badge}>{listing.type}</span>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardTop}>
                  <h3 style={styles.cardTitle}>{listing.title}</h3>
                </div>
                <p style={styles.cardLocation}>📍 {listing.location}</p>
                <p style={styles.cardDetails}>
                  {listing.bedrooms} bed · {listing.bathrooms} bath · {listing.guests} guests
                </p>
                <p style={styles.cardPrice}>
                  <span style={styles.price}>${listing.price}</span> / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 Airbnb Clone. All rights reserved.</p>
      </footer>
    </div>
  )
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#fff' },
  filterBar: {
    display: 'flex',
    gap: '8px',
    padding: '16px 32px',
    borderBottom: '1px solid #eee',
    overflowX: 'auto',
    backgroundColor: 'white',
    position: 'sticky',
    top: '73px',
    zIndex: 90,
  },
  filterBtn: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '24px',
    cursor: 'pointer',
    backgroundColor: 'white',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  activeFilter: {
    padding: '8px 16px',
    border: '2px solid #222',
    borderRadius: '24px',
    cursor: 'pointer',
    backgroundColor: '#222',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  container: { padding: '32px' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' },
  count: { color: '#717171', fontWeight: 'normal', fontSize: '18px' },
  error: { color: 'red' },
  empty: { color: '#717171' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  imgWrapper: { position: 'relative' },
  img: { width: '100%', height: '220px', objectFit: 'cover' },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'white',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cardBody: { padding: '16px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: '16px', fontWeight: 'bold', margin: '0 0 6px' },
  cardLocation: { color: '#717171', fontSize: '14px', margin: '0 0 6px' },
  cardDetails: { color: '#717171', fontSize: '13px', margin: '0 0 10px' },
  cardPrice: { margin: 0, fontSize: '14px' },
  price: { fontWeight: 'bold', fontSize: '16px' },
  footer: { backgroundColor: '#f7f7f7', borderTop: '1px solid #ddd', padding: '24px 32px', marginTop: '48px' },
  footerText: { color: '#717171', fontSize: '14px' },
}

export default ListingsPage