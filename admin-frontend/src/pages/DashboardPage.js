import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardPage({ onLogout }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser'));

  // useEffect runs code after the component first renders
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('https://airbnb-clone-cre0.onrender.com/api/listings');
      setListings(response.data);
    } catch (err) {
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`https://airbnb-clone-cre0.onrender.com/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted listing from state without refetching
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>Airbnb Admin</h1>
        <div style={styles.headerRight}>
          <span style={styles.greeting}>Hello, {user?.username}</span>
          <button onClick={() => navigate('/create-listing')} style={styles.createBtn}>
            + New Listing
          </button>
          <button onClick={onLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        <h2 style={styles.pageTitle}>All Listings</h2>

        {loading && <p>Loading listings...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && listings.length === 0 && (
          <p style={styles.empty}>No listings yet. Create your first one!</p>
        )}

        <div style={styles.grid}>
          {listings.map((listing) => (
            <div key={listing._id} style={styles.card}>
              <img
                src={listing.images[0] || 'https://via.placeholder.com/300x200'}
                alt={listing.title}
                style={styles.image}
              />
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{listing.title}</h3>
                <p style={styles.cardLocation}>{listing.location}</p>
                <p style={styles.cardPrice}>${listing.price} / night</p>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => navigate(`/update-listing/${listing._id}`)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f7f7f7' },
  header: {
    backgroundColor: 'white',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  logo: { color: '#FF385C', fontSize: '22px', margin: 0 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  greeting: { fontSize: '14px', color: '#555' },
  createBtn: {
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  main: { padding: '32px' },
  pageTitle: { fontSize: '24px', marginBottom: '24px' },
  error: { color: 'red' },
  empty: { color: '#717171', fontSize: '16px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  cardBody: { padding: '16px' },
  cardTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' },
  cardLocation: { color: '#717171', fontSize: '14px', marginBottom: '8px' },
  cardPrice: { color: '#FF385C', fontWeight: 'bold', marginBottom: '12px' },
  cardActions: { display: 'flex', gap: '8px' },
  editBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#fff0f0',
    border: '1px solid #ffcdd2',
    color: '#e00',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default DashboardPage;