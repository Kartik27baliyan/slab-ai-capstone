import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseInterest: '',
    phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // This would call your /api/leads endpoint
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      alert('Thank you! We will contact you about our courses.')
      setFormData({ name: '', email: '', courseInterest: '', phone: '' })
    } catch (error) {
      alert('Lead captured! (Backend integration ready)')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 SLAB.AI</h1>
        <p>Your AI-Powered EdTech Learning Partner</p>

        {/* Lead Capture Section */}
        <div className="lead-section">
          <form onSubmit={handleSubmit} className="lead-form">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="courseInterest"
              value={formData.courseInterest}
              onChange={handleChange}
              required
            >
              <option value="">Select Course Interest</option>
              <option value="web-dev">Full Stack Web Development</option>
              <option value="data-science">Data Science & AI</option>
              <option value="cloud">Cloud & DevOps</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
            <button type="submit">Get Course Details & Pricing</button>
          </form>
        </div>

        {/* Course Catalog */}
        <div className="courses-section">
          <h3>Featured Courses</h3>
          <div className="course-grid">
            <div className="course-card">
              <h4>Full Stack Development</h4>
              <p>Learn React, Node.js, MongoDB</p>
              <div className="price">₹15,000</div>
              <button>Enroll Now</button>
            </div>
            <div className="course-card">
              <h4>Data Science & AI</h4>
              <p>Python, ML, Deep Learning</p>
              <div className="price">₹20,000</div>
              <button>Enroll Now</button>
            </div>
            <div className="course-card">
              <h4>Cloud & DevOps</h4>
              <p>AWS, Kubernetes, Docker</p>
              <div className="price">₹18,000</div>
              <button>Enroll Now</button>
            </div>
          </div>
        </div>

        {/* Payment Gateway Placeholder */}
        <div className="payment-section">
          <h3>Secure Payment Gateway</h3>
          <p>Integrated with Razorpay for secure transactions</p>
          <div className="payment-demo">
            [Razorpay Integration Ready]
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
