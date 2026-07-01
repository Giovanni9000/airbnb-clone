import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const inspirationLocations = [
  { name: 'Cape Town', distance: '2-hour drive', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=300&h=200&fit=crop' },
  { name: 'Johannesburg', distance: '1-hour flight', image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=300&h=200&fit=crop' },
  { name: 'Durban', distance: '2-hour flight', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=300&h=200&fit=crop' },
  { name: 'Pretoria', distance: '30-min drive', image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=300&h=200&fit=crop' },
]

const experiences = [
  { title: 'Unique stays', description: 'Spaces that are more than just a place to sleep', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop' },
  { title: 'Outdoor getaways', description: 'Hike, camp or just enjoy the fresh air', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop' },
]

const tabs = ['Beach', 'Mountain', 'City', 'Countryside', 'Desert']

function HomePage() {
  const [activeTab, setActiveTab] = useState('Beach')
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <Header />

      {/* Hero Banner */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Find your next adventure</h1>
          <p style={styles.heroSubtitle}>Discover unique places to stay around the world</p>
          <button style={styles.heroBtn} onClick={() => navigate('/listings')}>
            Explore listings
          </button>
        </div>
      </div>

      {/* Inspiration Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Inspiration for your next trip</h2>
        <div style={styles.grid4}>
          {inspirationLocations.map((loc) => (
            <div
              key={loc.name}
              style={styles.locationCard}
              onClick={() => navigate('/listings')}
            >
              <img src={loc.image} alt={loc.name} style={styles.locationImg} />
              <div style={styles.locationInfo}>
                <p style={styles.locationName}>{loc.name}</p>
                <p style={styles.locationDistance}>{loc.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Experiences */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Discover Experiences</h2>
        <div style={styles.grid2}>
          {experiences.map((exp) => (
            <div key={exp.title} style={styles.experienceCard}>
              <img src={exp.image} alt={exp.title} style={styles.experienceImg} />
              <div style={styles.experienceInfo}>
                <h3 style={styles.experienceTitle}>{exp.title}</h3>
                <p style={styles.experienceDesc}>{exp.description}</p>
                <button style={styles.experienceBtn} onClick={() => navigate('/listings')}>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ShopAirbnb Section */}
      <div style={styles.shopSection}>
        <div style={styles.shopContent}>
          <h2 style={styles.shopTitle}>Shop Airbnb</h2>
          <p style={styles.shopDesc}>Bring the magic of travel home with unique finds</p>
          <button style={styles.shopBtn}>Shop now</button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=350&fit=crop"
          alt="Shop Airbnb"
          style={styles.shopImg}
        />
      </div>

      {/* Future Getaways - Tabs */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Plan your future getaways</h2>
        <div style={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              style={activeTab === tab ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={styles.tabContent}>
          <p style={styles.tabText}>
            Explore {activeTab.toLowerCase()} destinations perfect for your next getaway.
          </p>
          <button style={styles.tabBtn} onClick={() => navigate('/listings')}>
            Browse {activeTab} listings
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <h4 style={styles.footerHeading}>Support</h4>
            <p style={styles.footerLink}>Help Centre</p>
            <p style={styles.footerLink}>AirCover</p>
            <p style={styles.footerLink}>Safety information</p>
          </div>
          <div>
            <h4 style={styles.footerHeading}>Community</h4>
            <p style={styles.footerLink}>Airbnb.org</p>
            <p style={styles.footerLink}>Support refugees</p>
            <p style={styles.footerLink}>Combating discrimination</p>
          </div>
          <div>
            <h4 style={styles.footerHeading}>Hosting</h4>
            <p style={styles.footerLink}>Airbnb your home</p>
            <p style={styles.footerLink}>AirCover for Hosts</p>
            <p style={styles.footerLink}>Explore hosting resources</p>
          </div>
          <div>
            <h4 style={styles.footerHeading}>Airbnb</h4>
            <p style={styles.footerLink}>Newsroom</p>
            <p style={styles.footerLink}>New features</p>
            <p style={styles.footerLink}>Careers</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>© 2026 Airbnb Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' },
  hero: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&h=600&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '40px 60px',
    borderRadius: '16px',
  },
  heroTitle: { color: 'white', fontSize: '48px', margin: '0 0 12px', fontWeight: 'bold' },
  heroSubtitle: { color: 'white', fontSize: '20px', margin: '0 0 24px' },
  heroBtn: {
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  section: { padding: '48px 32px' },
  sectionTitle: { fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  locationCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background 0.2s',
  },
  locationImg: { width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' },
  locationInfo: {},
  locationName: { fontWeight: 'bold', margin: '0 0 4px', fontSize: '15px' },
  locationDistance: { color: '#717171', margin: 0, fontSize: '13px' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' },
  experienceCard: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  experienceImg: { width: '100%', height: '250px', objectFit: 'cover' },
  experienceInfo: { padding: '20px' },
  experienceTitle: { fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px' },
  experienceDesc: { color: '#717171', margin: '0 0 16px' },
  experienceBtn: {
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  shopSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 32px',
    backgroundColor: '#f7f7f7',
    gap: '32px',
  },
  shopContent: { flex: 1 },
  shopTitle: { fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' },
  shopDesc: { color: '#717171', fontSize: '16px', marginBottom: '24px' },
  shopBtn: {
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  shopImg: { width: '45%', borderRadius: '12px', objectFit: 'cover' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  tab: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '24px',
    cursor: 'pointer',
    backgroundColor: 'white',
    fontSize: '14px',
  },
  activeTab: {
    padding: '10px 20px',
    border: '2px solid #222',
    borderRadius: '24px',
    cursor: 'pointer',
    backgroundColor: '#222',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: '#f7f7f7',
    padding: '32px',
    borderRadius: '12px',
  },
  tabText: { fontSize: '16px', color: '#555', marginBottom: '16px' },
  tabBtn: {
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  footer: { backgroundColor: '#f7f7f7', borderTop: '1px solid #ddd', padding: '48px 32px 24px' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '32px' },
  footerHeading: { fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' },
  footerLink: { color: '#717171', fontSize: '14px', marginBottom: '8px', cursor: 'pointer' },
  footerBottom: { borderTop: '1px solid #ddd', paddingTop: '24px' },
  footerCopy: { color: '#717171', fontSize: '14px' },
}

export default HomePage