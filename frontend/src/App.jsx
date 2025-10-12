import './App.css'

function App() {
  const handleLeadSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    alert('Thank you ' + formData.get('name') + '! We will contact you about ' + formData.get('course') + ' courses.')
    e.target.reset()
  }

  const handleEnrollClick = (courseName, price) => {
    alert(`Ready to enroll in ${courseName} for ${price}! Payment integration would open here.`)
  }

  return (
    <div style={{textAlign: 'center', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px 20px'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>🚀 SLAB.AI</h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px'}}>Your AI-Powered EdTech Learning Partner</p>
        
        {/* Lead Capture Section */}
        <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)', margin: '20px 0', width: '90%', maxWidth: '500px'}}>
          <h2>Start Your Learning Journey</h2>
          <form onSubmit={handleLeadSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <input name='name' placeholder='Full Name' style={{padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '16px'}} required />
            <input name='email' type='email' placeholder='Email' style={{padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '16px'}} required />
            <input name='phone' placeholder='Phone' style={{padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '16px'}} required />
            <select name='course' style={{padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '16px'}} required>
              <option value=''>Choose Course</option>
              <option value='web'>Full Stack Development</option>
              <option value='data'>Data Science & AI</option>
              <option value='cloud'>Cloud & DevOps</option>
            </select>
            <button type='submit' style={{padding: '12px 24px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px'}}>Get Course Details</button>
          </form>
        </div>

        {/* Course Catalog Section */}
        <div style={{marginTop: '50px', width: '90%', maxWidth: '1000px'}}>
          <h3 style={{fontSize: '2rem', marginBottom: '30px'}}>Featured Courses</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '20px'}}>
            <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <h4 style={{marginBottom: '10px', fontSize: '1.3rem'}}>Full Stack Development</h4>
              <p style={{opacity: 0.8, marginBottom: '15px'}}>Learn React, Node.js, MongoDB</p>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0', color: '#4ecdc4'}}>₹15,000</div>
              <button 
                onClick={() => handleEnrollClick('Full Stack Development', '₹15,000')}
                style={{padding: '10px 20px', background: '#4ecdc4', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}
              >
                Enroll Now
              </button>
            </div>
            
            <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <h4 style={{marginBottom: '10px', fontSize: '1.3rem'}}>Data Science & AI</h4>
              <p style={{opacity: 0.8, marginBottom: '15px'}}>Python, ML, Deep Learning</p>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0', color: '#4ecdc4'}}>₹20,000</div>
              <button 
                onClick={() => handleEnrollClick('Data Science & AI', '₹20,000')}
                style={{padding: '10px 20px', background: '#4ecdc4', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}
              >
                Enroll Now
              </button>
            </div>
            
            <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <h4 style={{marginBottom: '10px', fontSize: '1.3rem'}}>Cloud & DevOps</h4>
              <p style={{opacity: 0.8, marginBottom: '15px'}}>AWS, Kubernetes, Docker</p>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0', color: '#4ecdc4'}}>₹18,000</div>
              <button 
                onClick={() => handleEnrollClick('Cloud & DevOps', '₹18,000')}
                style={{padding: '10px 20px', background: '#4ecdc4', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div style={{marginTop: '50px', background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '12px', backdropFilter: 'blur(5px)', width: '90%', maxWidth: '800px'}}>
          <h3 style={{marginBottom: '20px'}}>💳 Secure Payment Gateway</h3>
          <p style={{opacity: 0.8, marginBottom: '20px'}}>Integrated with Razorpay for secure transactions</p>
          <div style={{background: 'rgba(255, 255, 255, 0.2)', padding: '20px', borderRadius: '8px', fontFamily: 'monospace'}}>
            [Professional Payment Gateway Ready]
          </div>
        </div>
      </div>
    </div>
  )
}

export default App