import './App.css'

function App() {
  const handleLeadSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    alert('Thank you ' + formData.get('name') + '! We will contact you about ' + formData.get('course') + ' courses.')
    e.target.reset()
  }

  return (
    <div style={{textAlign: 'center', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px 20px'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>🚀 SLAB.AI</h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px'}}>Your AI-Powered EdTech Learning Partner</p>
        
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
      </div>
    </div>
  )
}

export default App
