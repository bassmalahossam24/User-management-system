import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaUsers, FaExclamationTriangle, FaUserPlus,  } from "react-icons/fa";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

interface Stats { totalUsers: number; activeUsers: number; newRegistrations: number; pendingActions: number; }
const initialStats: Stats = { totalUsers: 120, activeUsers: 98, newRegistrations: 12, pendingActions: 5 };

// Stat Card Component
const StatCard = React.memo(({ icon, label, value, colorClass, tooltip }: any) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0; const duration = 800; const increment = value / (duration / 16); let animationFrame: number;
    const animate = () => {
      start += increment;
      if(start < value){ setDisplayValue(Math.floor(start)); animationFrame = requestAnimationFrame(animate); }
      else { setDisplayValue(value); cancelAnimationFrame(animationFrame); }
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <div className={`${style.card} shadow-sm p-3 text-center`} title={tooltip}>
      <div className={`${style["card-icon"]} mb-2 ${colorClass}`} style={{ fontSize: 30 }}>{icon}</div>
      <h5>{label}</h5>
      <p className="h4">{displayValue}</p>
    </div>
  );
});

export default function Home() {
  let navigate = useNavigate();
  const moveToAdd = () => { navigate("/dashboard/users-list"); };
  const { userData }: any = useContext(AuthContext);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(() => {
    setLoading(true);
    setTimeout(() => { setStats({ totalUsers: 125, activeUsers: 102, newRegistrations: 15, pendingActions: 3 }); setLoading(false); }, 1200);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const chartValues = [15, 30, 25, 40, 35, 50, 45, 55, 60, 50]; // أكثر bars
  const maxHeight = 200;

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
     <div className="position-relative text-white rounded-4 shadow-sm overflow-hidden mb-5" 
     style={{ minHeight: "250px", background:`url('/assets/header-bg.jpg') center/cover no-repeat` }}>
  
  {/* Overlay */}
  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "#feaf00" }} />

  {/* Content */}
  <div className="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center p-4 h-100 gap-3">
    
    {/* Text Section */}
    <div className="text-center text-md-start">
      <h1 className="fw-bold display-6 mb-2">Welcome, {userData?.firstName || "Admin"}!</h1>
      <p className="mb-3">Here's a quick overview of your dashboard and recent activity.</p>
      <div className="d-flex gap-2 justify-content-center justify-content-md-start flex-wrap">
        <button className="btn btn-gradient d-flex align-items-center gap-2 px-4 py-2"><FaUserPlus /> Add User</button>
        <button className="btn btn-outline-light px-4 py-2">View Stats</button>
      </div>
    </div>

    {/* Profile Image */}
    <img 
      src={userData?.image || "/default-profile.png"} 
      alt="profile" 
      className="rounded-circle border border-3 border-white shadow-lg mt-3 mt-md-0" 
      style={{ width: "90px", height: "90px", transition:"transform 0.3s" }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} 
    />
  </div>

  {/* Floating Shapes */}
  <div className="position-absolute top-0 start-0 w-100 h-100">
    {[...Array(6)].map((_, i)=>(
      <div key={i} className="position-absolute rounded-circle bg-warning opacity-50" 
           style={{
             width:`${20+i*5}px`,
             height:`${20+i*5}px`,
             top:`${Math.random()*80}%`,
             left:`${Math.random()*90}%`,
             animation:`float${i} ${6+i}s ease-in-out infinite alternate`
           }}/>
    ))}
  </div>
</div>


      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        <div className="col-6 col-md-3"><StatCard icon={<FaUsers />} label="Total Users" value={stats.totalUsers} colorClass="text-warning" tooltip="Total number of registered users"/></div>
        <div className="col-6 col-md-3"><StatCard icon={<FaUsers />} label="Active Users" value={stats.activeUsers} colorClass="text-success" tooltip="Users currently active"/></div>
        <div className="col-6 col-md-3"><StatCard icon={<FaUserPlus />} label="New Registrations" value={stats.newRegistrations} colorClass="text-primary" tooltip="Users registered recently"/></div>
        <div className="col-6 col-md-3"><StatCard icon={<FaExclamationTriangle />} label="Pending Actions" value={stats.pendingActions} colorClass="text-danger" tooltip="Actions pending your attention"/></div>
      </div>

      {/* Quick Actions */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <button className={style.addBtn} onClick={moveToAdd}>
          Manage Users
        </button>
        <button className="btn btn-outline-secondary px-4 py-2" disabled={loading}>VIEW USERS</button>
        
      </div>

      {/* Charts */}
      <div className="card shadow-sm p-4 rounded-4 mb-4">
        <h5 className="mb-3">Recent Activity</h5>
        <p className="text-muted mb-4">Here you can show recent user actions or analytics charts.</p>
        <svg width="100%" height="220" role="img" aria-label="User activity bar chart" style={{maxWidth:800}}>
          <defs>
            {chartValues.map((_,i)=>(<linearGradient id={`grad${i}`} key={i} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ffc107" stopOpacity={0.8}/><stop offset="100%" stopColor="#ff9800" stopOpacity={0.3}/></linearGradient>))}
          </defs>
          {chartValues.map((val, idx) => (
            <rect
              key={idx}
              x={idx * 35 + 10}
              width={25}
              y={maxHeight - val * 2}
              height={val * 2}
              fill={`url(#grad${idx})`}
              style={{
                transition: "all 0.5s ease",
                animation: `barRise 1s ease ${idx * 0.1}s forwards`,
               
              }}
            />
          ))}
        </svg>
      </div>


   
    </div>
  );
}
