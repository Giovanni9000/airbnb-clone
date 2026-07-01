import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateListingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    type: '',
    price: '',
    amenities: '',
    images: '',
    weeklyDiscount: '',
    cleaningFee: '',
    serviceFee: '',
    occupancyTaxes: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.location || !formData.price) {
      setError('Title, location and price are required');
      return;
    }

    try {
      setLoading(true);

      // Convert comma-separated strings to arrays for amenities and images
      const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
        images: formData.images.split(',').map((i) => i.trim()).filter(Boolean),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        guests: Number(formData.guests),
        price: Number(formData.price),
        weeklyDiscount: Number(formData.weeklyDiscount) || 0,
        cleaningFee: Number(formData.cleaningFee) || 0,
        serviceFee: Number(formData.serviceFee) || 0,
        occupancyTaxes: Number(formData.occupancyTaxes) || 0,
      };

      await axios.post('http://localhost:5000/api/listings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Airbnb Admin</h1>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create New Listing</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Basic Information</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} style={styles.input} placeholder="e.g. Cozy Cape Town Apartment" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Location *</label>
              <input name="location" value={formData.location} onChange={handleChange} style={styles.input} placeholder="e.g. Cape Town, South Africa" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} placeholder="Describe your property..." />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Property Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
                <option value="">Select type</option>
                <option value="Entire home">Entire home</option>
                <option value="Private room">Private room</option>
                <option value="Shared room">Shared room</option>
                <option value="Hotel room">Hotel room</option>
              </select>
            </div>
          </div>

          {/* Capacity */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Capacity</h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bedrooms *</label>
                <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} style={styles.input} min="0" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bathrooms *</label>
                <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} style={styles.input} min="0" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Max Guests *</label>
                <input name="guests" type="number" value={formData.guests} onChange={handleChange} style={styles.input} min="1" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Pricing</h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Price per night ($) *</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} style={styles.input} min="0" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Weekly Discount (%)</label>
                <input name="weeklyDiscount" type="number" value={formData.weeklyDiscount} onChange={handleChange} style={styles.input} min="0" />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Cleaning Fee ($)</label>
                <input name="cleaningFee" type="number" value={formData.cleaningFee} onChange={handleChange} style={styles.input} min="0" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Service Fee ($)</label>
                <input name="serviceFee" type="number" value={formData.serviceFee} onChange={handleChange} style={styles.input} min="0" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Occupancy Taxes ($)</label>
                <input name="occupancyTaxes" type="number" value={formData.occupancyTaxes} onChange={handleChange} style={styles.input} min="0" />
              </div>
            </div>
          </div>

          {/* Amenities & Images */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Amenities & Images</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Amenities (comma separated)</label>
              <input name="amenities" value={formData.amenities} onChange={handleChange} style={styles.input} placeholder="WiFi, Pool, Free parking, Kitchen" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Image URLs (comma separated)</label>
              <input name="images" value={formData.images} onChange={handleChange} style={styles.input} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
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
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  formContainer: {
    maxWidth: '700px',
    margin: '32px auto',
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  title: { fontSize: '24px', marginBottom: '24px' },
  error: {
    backgroundColor: '#fff0f0',
    color: '#e00',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  section: { marginBottom: '32px' },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #eee',
  },
  row: { display: 'flex', gap: '16px' },
  inputGroup: { flex: 1, marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
    minHeight: '100px',
    resize: 'vertical',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default CreateListingPage;