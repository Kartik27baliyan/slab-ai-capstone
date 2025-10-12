import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app, this would call /api/leads endpoint
    alert(`Thank you! We'll contact you at ${email} about our courses.`)
    setEmail('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 SLAB.AI</h1>
        <p>Your AI-Powered EdTech Learning Partner</p>
        
        <div className="lead-form">
          <h2>Start Your Learning Journey</h2>
          <p>Join thousands of students transforming their careers</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Get Started</button>
          </form>
        </div>

        <div className="features">
          <h3>Why Choose SLAB.AI?</h3>
          <div className="feature-grid">
            <div className="feature">
              <h4>🎯 Personalized Learning</h4>
              <p>AI-driven course recommendations</p>
            </div>
            <div className="feature">
              <h4>⚡ Fast Performance</h4>
              <p>p95 page load under 2.5s</p>
            </div>
            <div className="feature">
              <h4>🔒 Secure Platform</h4>
              <p>Enterprise-grade security</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
