import React, { useState } from 'react'
const API = '/api';
export default function App(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [role,setRole]=useState('patient'); const [token,setToken]=useState(''); const [resp,setResp]=useState('');
  const go = async (path, body, auth=false)=>{
    const res = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type':'application/json', ...(auth?{'Authorization':`Bearer ${token}`}:{}) }, body: JSON.stringify(body||{}) });
    const data = await res.json(); setResp(JSON.stringify(data,null,2)); return data;
  };
  return (<div style={{maxWidth:720,margin:'32px auto',fontFamily:'system-ui'}}>
    <h1>Smart Hospital</h1>
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8}} />
    <br/><br/>
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8}} />
    <br/><br/>
    <select value={role} onChange={e=>setRole(e.target.value)}><option value="patient">Patient</option><option value="doctor">Doctor</option><option value="admin">Admin</option></select>
    <br/><br/>
    <button onClick={()=>go('/auth/register',{name:'User',email,password,role})}>Register</button>{' '}
    <button onClick={async()=>{ const d=await go('/auth/login',{email,password}); if(d.token) setToken(d.token); }}>Login</button>{' '}
    <button onClick={async()=>{ const r=await fetch(`${API}/health`); setResp(JSON.stringify(await r.json(),null,2)); }}>Health</button>
    <h3>Token</h3><textarea value={token} readOnly style={{width:'100%',height:60}}/>
    <h3>Response</h3><pre style={{background:'#f7f7f7',padding:12}}>{resp}</pre>
  </div>);
}