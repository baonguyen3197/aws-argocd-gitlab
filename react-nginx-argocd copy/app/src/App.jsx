import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <main style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto', padding: 24}}>
      <h1>React + Nginx • Argo CD Lab</h1>
      <p>Build a React SPA, serve with Nginx, deploy with Argo CD.</p>
      <button onClick={()=>setCount(c=>c+1)}>Clicked {count} times</button>
      <p style={{marginTop:16,opacity:.7}}>Env: <span id="env">{import.meta.env.MODE}</span></p>
    </main>
  )
}
