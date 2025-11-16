import api from './api'

// Mock credentials
const MOCK_ADMIN = {
  email: 'admin@example.com',
  password: 'Admin123!',
  name: 'Admin',
  role: 'admin'
}

export const authService = {
  login: async (email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
          const token = 'mock-jwt-token-' + Date.now()
          const user = {
            id: 1,
            email: MOCK_ADMIN.email,
            name: MOCK_ADMIN.name,
            role: MOCK_ADMIN.role
          }
          resolve({ user, token })
        } else {
          reject(new Error('Nesprávné přihlašovací údaje'))
        }
      }, 500)
    })
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 200)
    })
  },

  verifyToken: async (token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token && token.startsWith('mock-jwt-token-')) {
          resolve({ valid: true })
        } else {
          resolve({ valid: false })
        }
      }, 200)
    })
  },

  changePassword: async (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword === MOCK_ADMIN.password) {
          resolve({ success: true, message: 'Heslo bylo změněno' })
        } else {
          reject(new Error('Nesprávné současné heslo'))
        }
      }, 500)
    })
  }
}
