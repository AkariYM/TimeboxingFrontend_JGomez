import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const canvasRef = useRef(null);
  const navigate  = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(80,255,140,${(1-d/150)*0.18})`;
            ctx.lineWidth   = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        n.phase += 0.018;
        const g = (Math.sin(n.phase)+1)/2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + g*0.8, 0, Math.PI*2);
        ctx.fillStyle = `rgba(80,255,140,${0.3+g*0.35})`;
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>canvas.width)  n.vx*=-1;
        if (n.y<0||n.y>canvas.height) n.vy*=-1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg, #000000 0%, #001a0a 40%, #003318 70%, #001a0a 100%)",
      position:"relative", overflow:"hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing:border-box; }

        @keyframes cardIn {
          from { opacity:0; transform:translateY(18px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes topGlow {
          0%,100% { opacity:.5; }
          50%      { opacity:1; }
        }

        .f-label {
          display:block; font-size:10px; letter-spacing:2px; text-transform:uppercase;
          color:rgba(255,255,255,0.45); margin-bottom:9px;
          font-family:'Sora',sans-serif; font-weight:400;
        }
        .f-input {
          width:100%; background:rgba(0,0,0,0.45);
          border:1px solid rgba(80,255,140,0.2); border-radius:6px;
          color:#ffffff; padding:12px 16px;
          font-size:14px; font-family:'Sora',sans-serif; font-weight:300;
          outline:none; transition:all .25s; letter-spacing:.3px;
        }
        .f-input:focus {
          border-color:rgba(80,255,140,0.6);
          background:rgba(0,0,0,0.65);
          box-shadow:0 0 0 3px rgba(80,255,140,0.07), 0 0 16px rgba(80,255,140,0.08);
        }
        .f-input::placeholder { color:rgba(255,255,255,0.2); }

        .btn-login {
          width:100%; padding:13px;
          background:linear-gradient(135deg, #00aa44, #00cc55);
          border:1px solid rgba(80,255,140,0.4); border-radius:6px;
          color:#ffffff; font-family:'Sora',sans-serif;
          font-size:12px; font-weight:600; letter-spacing:2.5px;
          text-transform:uppercase; cursor:pointer; transition:all .25s;
          box-shadow: 0 4px 20px rgba(0,180,70,0.25);
        }
        .btn-login:hover {
          background:linear-gradient(135deg, #00cc55, #00ee66);
          border-color:rgba(80,255,140,0.7);
          box-shadow:0 6px 28px rgba(0,200,80,0.4);
          transform:translateY(-1px);
        }
        .sm-link {
          color:rgba(255,255,255,0.45); text-decoration:none;
          font-family:'Sora',sans-serif; font-size:12px; font-weight:300;
          transition:color .2s;
        }
        .sm-link:hover { color:#50ff8c; }
      `}</style>

      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, opacity:.9 }} />

      {/* Ambient radial verde */}
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,180,70,0.08) 0%, transparent 65%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />

      {/* Card */}
      <div style={{
        position:"relative", width:"100%", maxWidth:410, margin:"0 20px",
        background:"rgba(0,0,0,0.72)", backdropFilter:"blur(22px)",
        border:"1px solid rgba(80,255,140,0.18)", borderRadius:12,
        padding:"44px 40px",
        animation: mounted ? "cardIn .6s cubic-bezier(.16,1,.3,1) forwards" : "none",
        opacity:0,
        boxShadow:"0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(80,255,140,0.08)",
      }}>
        {/* Top neon line */}
        <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:1, background:"linear-gradient(90deg,transparent,#00ee66,transparent)", animation:"topGlow 4s ease-in-out infinite", borderRadius:1 }} />

        {/* Brand */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"inline-flex", width:46, height:46, borderRadius:10, background:"rgba(0,150,60,0.25)", border:"1px solid rgba(80,255,140,0.3)", alignItems:"center", justifyContent:"center", marginBottom:18, boxShadow:"0 0 16px rgba(0,200,80,0.15)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#50ff8c" strokeWidth="1.6">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"#ffffff", letterSpacing:-.3, marginBottom:6 }}>
            Daily Timeboxing
          </div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:12, color:"rgba(255,255,255,0.38)", fontWeight:300, letterSpacing:.4 }}>
            Organiza tu día con intención
          </div>
        </div>

        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(80,255,140,0.15),transparent)", marginBottom:28 }} />

        {/* Fields */}
        <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:26 }}>
          <div>
            <label className="f-label">Correo electrónico</label>
            <input className="f-input" type="email" placeholder="tu@correo.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
              <label className="f-label" style={{ marginBottom:0 }}>Contraseña</label>
              <a href="#" className="sm-link">¿Olvidaste?</a>
            </div>
            <input className="f-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
        </div>

        <button className="btn-login" onClick={()=>navigate("/dashboard")}>Ingresar</button>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:20 }}>
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }} onClick={()=>setRemember(!remember)}>
            <div style={{ width:15, height:15, border:`1px solid ${remember?"rgba(80,255,140,0.6)":"rgba(255,255,255,0.2)"}`, borderRadius:3, background:remember?"rgba(80,255,140,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", flexShrink:0 }}>
              {remember && <svg width="9" height="9" viewBox="0 0 10 10"><polyline points="1,5 4,8 9,2" stroke="#50ff8c" strokeWidth="1.5" fill="none"/></svg>}
            </div>
            <span style={{ fontFamily:"'Sora',sans-serif", fontSize:12, color:"rgba(255,255,255,0.38)", fontWeight:300 }}>Recordarme</span>
          </label>
          <a href="#" className="sm-link">Crear cuenta</a>
        </div>

        <div style={{ position:"absolute", bottom:0, left:"20%", right:"20%", height:1, background:"linear-gradient(90deg,transparent,rgba(80,255,140,0.1),transparent)" }} />
      </div>
    </div>
  );
}