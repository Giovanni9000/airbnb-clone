import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')
  const user = token ? JSON.parse(localStorage.getItem('adminUser')) : null

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => navigate('/')}>
        <span style={styles.logoText}>🏠 airbnb</span>
      </div>

      {/* Right side */}
      <div style={styles.right}>
        {user ? (
          <div style={styles.profileWrapper}>
            <button
              style={styles.profileBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              👤 {user.username}
            </button>
            {showDropdown && (
              <div style={styles.dropdown}>
                <div
                  style={styles.dropdownItem}
                  onClick={() => {
                    setShowDropdown(false)
                    navigate('/listings')
                  }}
                >
                  My Reservations
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => {
                    localStorage.removeItem('adminToken')
                    localStorage.removeItem('adminUser')
                    setShowDropdown(false)
                    navigate('/')
                  }}
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            style={styles.hostBtn}
            onClick={() => navigate('/listings')}
          >
            Become a host
          </button>
        )}
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: 'white',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    cursor: 'pointer',
  },
  logoText: {
    color: '#FF385C',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  right: {
    position: 'relative',
  },
  hostBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '10px 16px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
  profileWrapper: {
    position: 'relative',
  },
  profileBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '10px 16px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '48px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    minWidth: '180px',
    zIndex: 200,
  },
  dropdownItem: {
    padding: '14px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #f0f0f0',
  },
}

export default Header