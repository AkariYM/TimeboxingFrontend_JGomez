import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TODAY = new Date().toLocaleDateString("es-MX", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

const makeSlots = () => {
  const out = [];
  for (let h = 5; h <= 23; h++) {
    for (let m of [0, 30]) {
      const ap  = h < 12 ? "AM" : "PM";
      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      out.push({ id:`${h}-${m}`, label:`${h12}:${m===0?"00":m} ${ap}`, value:"" });
    }
  }
  return out;
};

export default function Planner() {
  const navigate = useNavigate();
  const [slots, setSlots]         = useState(makeSlots());
  const [prios, setPrios]         = useState(["","",""]);
  const [dumpText, setDumpText]   = useState("");
  const [dumpItems, setDumpItems] = useState([]);

  const updateSlot = (id,v) => setSlots(p=>p.map(s=>s.id===id?{...s,value:v}:s));
  const addDump    = () => { if(dumpText.trim()){ setDumpItems(p=>[...p,dumpText.trim()]); setDumpText(""); } };

  const filled = slots.filter(s=>s.value.trim()).length;
  const pct    = Math.round((filled/slots.length)*100);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#000000 0%,#001408 35%,#002b10 65%,#000000 100%)", display:"flex", flexDirection:"column", fontFamily:"'Sora',sans-serif", color:"#ffffff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(80,255,140,0.2); border-radius:2px; }

        .slot-box {
          background:rgba(0,0,0,0.4); border:1px solid rgba(80,255,140,0.1);
          border-radius:7px; padding:12px 14px; transition:all .2s; backdrop-filter:blur(8px);
        }
        .slot-box:focus-within { border-color:rgba(80,255,140,0.45); background:rgba(0,20,8,0.65); box-shadow:0 0 12px rgba(80,255,140,0.06); }
        .slot-box.filled       { border-color:rgba(80,255,140,0.25); background:rgba(0,20,8,0.55); }

        .slot-input {
          width:100%; background:transparent; border:none;
          color:rgba(255,255,255,0.85); padding:0; margin-top:6px;
          font-size:13px; font-family:'Sora',sans-serif; font-weight:300;
          outline:none; letter-spacing:.2px;
        }
        .slot-input::placeholder { color:rgba(255,255,255,0.18); }

        .prio-input {
          flex:1; background:transparent; border:none;
          border-bottom:1px solid rgba(80,255,140,0.18);
          color:rgba(255,255,255,0.88); padding:9px 0;
          font-size:14px; font-family:'Sora',sans-serif; font-weight:300;
          outline:none; transition:border-color .2s;
        }
        .prio-input:focus { border-bottom-color:rgba(80,255,140,0.55); }
        .prio-input::placeholder { color:rgba(255,255,255,0.2); }

        .brain-ta {
          width:100%; background:rgba(0,0,0,0.4);
          border:1px solid rgba(80,255,140,0.15); border-radius:6px;
          color:rgba(255,255,255,0.8); padding:10px 13px;
          font-size:13px; font-family:'Sora',sans-serif; font-weight:300;
          outline:none; resize:none; transition:border-color .2s; backdrop-filter:blur(6px);
        }
        .brain-ta:focus { border-color:rgba(80,255,140,0.4); }
        .brain-ta::placeholder { color:rgba(255,255,255,0.2); }

        .header-btn {
          padding:8px 16px; background:rgba(0,0,0,0.4);
          border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5);
          border-radius:6px; cursor:pointer; font-size:12.5px;
          font-family:'Sora',sans-serif; font-weight:300; transition:all .2s; backdrop-filter:blur(8px);
        }
        .header-btn:hover { color:#ffffff; border-color:rgba(80,255,140,0.35); background:rgba(0,100,40,0.2); }

        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Header */}
      <div style={{ background:"rgba(0,0,0,0.6)", borderBottom:"1px solid rgba(80,255,140,0.1)", padding:"14px 30px", display:"flex", alignItems:"center", gap:14, flexShrink:0, backdropFilter:"blur(20px)" }}>
        <div style={{ width:36, height:36, borderRadius:8, background:"rgba(0,150,60,0.25)", border:"1px solid rgba(80,255,140,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 0 12px rgba(0,200,80,0.12)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#50ff8c" strokeWidth="1.6">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#ffffff", letterSpacing:-.2 }}>Planificador diario</div>
          <div style={{ fontSize:11, color:"rgba(80,255,140,0.45)", fontWeight:300, marginTop:1 }}>{TODAY}</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:70, height:3, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
              <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#00aa44,#50ff8c)", borderRadius:2, transition:"width .4s", boxShadow:"0 0 6px rgba(80,255,140,0.35)" }} />
            </div>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)", fontWeight:300 }}>{pct}%</span>
          </div>
          <button className="header-btn" onClick={()=>navigate("/dashboard")}>← Dashboard</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* Left panel */}
        <div style={{ width:268, background:"rgba(0,0,0,0.5)", borderRight:"1px solid rgba(80,255,140,0.08)", padding:"26px 22px", display:"flex", flexDirection:"column", gap:26, overflowY:"auto", flexShrink:0, backdropFilter:"blur(16px)" }}>

          {/* Priorities */}
          <div>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#ffffff", marginBottom:18, letterSpacing:-.2 }}>Top Prioridades</div>
            {prios.map((p,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:11, color:"rgba(80,255,140,0.45)", width:14, textAlign:"center", fontWeight:400 }}>{i+1}</span>
                <input className="prio-input" placeholder={`Prioridad ${i+1}`} value={p} onChange={e=>setPrios(prev=>prev.map((x,j)=>j===i?e.target.value:x))} />
              </div>
            ))}
          </div>

          <div style={{ height:1, background:"rgba(80,255,140,0.08)" }} />

          {/* Brain dump */}
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#ffffff", letterSpacing:-.2 }}>Brain Dump</div>
              <button onClick={addDump}
                style={{ fontSize:12, color:"rgba(80,255,140,0.55)", background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", fontWeight:300, padding:0, transition:"all .2s" }}
                onMouseEnter={e=>{ e.target.style.color="#50ff8c"; e.target.style.textShadow="0 0 8px rgba(80,255,140,0.5)"; }}
                onMouseLeave={e=>{ e.target.style.color="rgba(80,255,140,0.55)"; e.target.style.textShadow="none"; }}>
                + Agregar
              </button>
            </div>
            <textarea className="brain-ta" rows={3} placeholder="Escribe tus ideas aquí..." value={dumpText} onChange={e=>setDumpText(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),addDump())} />
            <div style={{ marginTop:10 }}>
              {dumpItems.map((item,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 0", borderBottom:"1px solid rgba(80,255,140,0.07)", animation:"fadeIn .25s ease" }}>
                  <span style={{ color:"rgba(80,255,140,0.35)", marginTop:1, flexShrink:0 }}>—</span>
                  <span style={{ flex:1, fontSize:13, color:"rgba(255,255,255,0.72)", fontWeight:300 }}>{item}</span>
                  <span onClick={()=>setDumpItems(p=>p.filter((_,j)=>j!==i))}
                    style={{ color:"rgba(255,255,255,0.25)", cursor:"pointer", fontSize:12, flexShrink:0, transition:"color .2s" }}
                    onMouseEnter={e=>e.target.style.color="rgba(255,80,80,0.7)"}
                    onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.25)"}>✕</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div style={{ flex:1, overflowY:"auto", padding:"26px 32px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#ffffff", letterSpacing:-.2 }}>Horario del día</div>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)", fontWeight:300 }}>{filled} de {slots.length} planificados</span>
          </div>
          <div style={{ height:1, background:"rgba(80,255,140,0.1)", marginBottom:18 }} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {slots.map(slot=>(
              <div key={slot.id} className={`slot-box ${slot.value?"filled":""}`}>
                <div style={{ fontSize:10, color:`rgba(80,255,140,${slot.value?0.6:0.35})`, letterSpacing:1.5, fontWeight:400 }}>{slot.label}</div>
                <input className="slot-input" placeholder="¿Qué harás?" value={slot.value} onChange={e=>updateSlot(slot.id,e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}