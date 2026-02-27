import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TODAY = new Date().toLocaleDateString("es-MX", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

const NAV = [
  { id:"overview", label:"Resumen",      icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> },
  { id:"planner",  label:"Planificador", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id:"tasks",    label:"Tareas",       icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
];

const STATS = [
  { label:"Tareas hoy",      value:"8"},
  { label:"Completadas",     value:"5"},
  { label:"En progreso",     value:"3"},
  { label:"Tiempo enfocado", value:"4h 20m"},
];

const AGENDA = [
  { time:"9:00",  task:"Revisar correos prioritarios", done:true   },
  { time:"10:00", task:"Reunión de equipo semanal",    done:true   },
  { time:"11:30", task:"Revisión de métricas Q1",      active:true },
  { time:"13:00", task:"Desarrollo módulo login",      active:true },
  { time:"15:00", task:"Sesión de planificación"                   },
  { time:"16:30", task:"Revisión de código PR"                     },
];



export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const go = (id) => { if (id==="planner"){ navigate("/planner"); return; } setActive(id); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"linear-gradient(160deg,#000000 0%,#001408 35%,#002b10 65%,#000000 100%)", fontFamily:"'Sora',sans-serif", color:"#ffffff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(80,255,140,0.2); border-radius:2px; }

        .nav-item {
          display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:6px; cursor:pointer;
          font-size:13.5px; font-weight:300; transition:all .2s;
          color:rgba(255,255,255,0.45); border:1px solid transparent;
          margin-bottom:3px;
        }
        .nav-item:hover  { color:rgba(255,255,255,0.85); background:rgba(80,255,140,0.07); }
        .nav-item.active {
          color:#ffffff; background:rgba(0,180,70,0.18);
          border-color:rgba(80,255,140,0.25);
        }

        .stat-card {
          background:rgba(0,0,0,0.5);
          border:1px solid rgba(80,255,140,0.15);
          border-radius:8px; padding:22px 20px;
          position:relative; overflow:hidden;
          transition:all .25s;
          backdrop-filter:blur(10px);
        }
        .stat-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(80,255,140,0.5),transparent);
        }
        .stat-card:hover { border-color:rgba(80,255,140,0.35); transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.4); }

        .agenda-row {
          display:flex; align-items:center; gap:14px;
          padding:10px 12px; border-radius:6px; transition:background .15s; margin-bottom:2px;
        }
        .agenda-row:hover { background:rgba(80,255,140,0.05); }


      `}</style>

      {/* ── Sidebar ── */}
      <div style={{ width:220, background:"rgba(0,0,0,0.6)", borderRight:"1px solid rgba(80,255,140,0.1)", padding:"28px 16px", display:"flex", flexDirection:"column", flexShrink:0, backdropFilter:"blur(20px)" }}>

        {/* Brand */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:34, padding:"0 4px" }}>
          <div style={{ width:34, height:34, borderRadius:8, background:"rgba(0,150,60,0.3)", border:"1px solid rgba(80,255,140,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 0 14px rgba(0,200,80,0.15)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#50ff8c" strokeWidth="1.6">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#ffffff", letterSpacing:-.2 }}>Timeboxing</span>
        </div>

        {/* Nav */}
        <nav style={{ flex:1 }}>
          <div style={{ fontSize:9.5, color:"rgba(255,255,255,0.22)", letterSpacing:2.5, textTransform:"uppercase", marginBottom:10, padding:"0 4px" }}>Menú</div>
          {NAV.map(n=>(
            <div key={n.id} className={`nav-item ${active===n.id?"active":""}`} onClick={()=>go(n.id)}>
              <span style={{ opacity:active===n.id?1:0.5 }}>{n.icon}</span>
              {n.label}
              {active===n.id && <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%", background:"#50ff8c", boxShadow:"0 0 7px #50ff8c" }} />}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ borderTop:"1px solid rgba(80,255,140,0.08)", paddingTop:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, padding:"0 4px" }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(0,150,60,0.2)", border:"1px solid rgba(80,255,140,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#50ff8c" strokeWidth="1.6"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.8)", fontWeight:400 }}>Usuario</div>
              <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", fontWeight:300 }}>tu@correo.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"34px 38px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:30 }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(80,255,140,0.55)", letterSpacing:2, textTransform:"uppercase", marginBottom:8, fontWeight:300 }}>{TODAY}</div>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:30, color:"#ffffff", letterSpacing:-.4, lineHeight:1.1 }}>Panel de control</div>
            <div style={{ width:36, height:2, background:"linear-gradient(90deg,#50ff8c,transparent)", marginTop:10, borderRadius:1, boxShadow:"0 0 8px rgba(80,255,140,0.4)" }} />
          </div>
          <button
            onClick={()=>navigate("/")}
            style={{ padding:"9px 18px", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.5)", borderRadius:6, cursor:"pointer", fontSize:12.5, fontFamily:"'Sora',sans-serif", fontWeight:300, transition:"all .2s", backdropFilter:"blur(8px)" }}
            onMouseEnter={e=>{ e.target.style.borderColor="rgba(255,80,80,0.4)"; e.target.style.color="rgba(255,120,120,0.8)"; }}
            onMouseLeave={e=>{ e.target.style.borderColor="rgba(255,255,255,0.15)"; e.target.style.color="rgba(255,255,255,0.5)"; }}>
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
          {STATS.map((s,i)=>(
            <div key={i} className="stat-card">
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:2, textTransform:"uppercase", marginBottom:12, fontWeight:400 }}>{s.label}</div>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#50ff8c", letterSpacing:-.4, lineHeight:1, marginBottom:6, textShadow:"0 0 14px rgba(80,255,140,0.35)" }}>{s.value}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.38)", fontWeight:300 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* Agenda full width */}
        <div style={{ background:"rgba(0,0,0,0.45)", border:"1px solid rgba(80,255,140,0.12)", borderRadius:8, padding:"22px 20px", backdropFilter:"blur(12px)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#ffffff", letterSpacing:-.2 }}>Agenda de hoy</div>
            <span onClick={()=>navigate("/planner")}
              style={{ fontSize:12.5, color:"rgba(80,255,140,0.6)", cursor:"pointer", fontWeight:300, transition:"all .2s" }}
              onMouseEnter={e=>{ e.target.style.color="#50ff8c"; e.target.style.textShadow="0 0 8px rgba(80,255,140,0.5)"; }}
              onMouseLeave={e=>{ e.target.style.color="rgba(80,255,140,0.6)"; e.target.style.textShadow="none"; }}>
              Ver planificador →
            </span>
          </div>
          <div style={{ height:1, background:"rgba(80,255,140,0.1)", marginBottom:12 }} />
          {AGENDA.map((item,i)=>(
            <div key={i} className="agenda-row">
              <span style={{ fontSize:11.5, color:"rgba(80,255,140,0.5)", width:40, flexShrink:0, fontWeight:300 }}>{item.time}</span>
              <span style={{ flex:1, fontSize:14, color:item.done?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.88)", fontWeight:300, textDecoration:item.done?"line-through":"none" }}>{item.task}</span>
              <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0,
                background: item.done?"#00cc55": item.active?"#50ff8c":"rgba(255,255,255,0.15)",
                boxShadow: item.active?"0 0 8px rgba(80,255,140,0.7)":"none" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}