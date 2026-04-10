import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const user = {
    name: "Alex Gamer",
    email: "alex.pro@boostek.com",
    memberSince: "Abril 2026",
    level: "Pro Gamer",
    xp: 75,
    recentOrders: [
      { id: "ORD-99281", date: "10 Abr 2026", status: "En camino", total: "189.00€" },
      { id: "ORD-98122", date: "25 Mar 2026", status: "Entregado", total: "54.90€" }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff]" suppressHydrationWarning>
      <Navigation />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72">
              <div className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm sticky top-32">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h2>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user.level}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {[
                    { label: "Panel Principal", active: true, icon: "📊" },
                    { label: "Mis Pedidos", active: false, icon: "📦" },
                    { label: "Lista de Deseos", active: false, icon: "❤️" },
                    { label: "Direcciones", active: false, icon: "📍" },
                    { label: "Configuración", active: false, icon: "⚙️" }
                  ].map((item, i) => (
                    <a key={i} href="#" className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm kinetic-transition ${
                      item.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                    }`}>
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                  <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 kinetic-transition mt-8 border-t border-slate-50 pt-6">
                    <span>🚪</span>
                    Cerrar Sesión
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
              {/* XP / Level Progress */}
              <section className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Progreso de Recompensas</h3>
                    <p className="text-2xl font-bold text-slate-900">Nivel Pro Gamer</p>
                  </div>
                  <span className="text-sm font-bold text-slate-400">750 / 1000 XP</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary kinetic-transition shadow-[0_0_10px_rgba(124,58,237,0.5)]" style={{ width: `${user.xp}%` }} />
                </div>
                <p className="mt-4 text-xs font-medium text-slate-500 leading-relaxed">
                  Te faltan 250 XP para el nivel **Elite**. ¡Sigue equipándote para desbloquear envíos prioritarios gratis!
                </p>
              </section>

              {/* Account Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email de la Cuenta</h4>
                  <p className="font-bold text-slate-900">{user.email}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Miembro Desde</h4>
                  <p className="font-bold text-slate-900">{user.memberSince}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <section className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold tracking-tighter text-slate-900">Pedidos Recientes</h3>
                  <a href="#" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Ver Historial</a>
                </div>
                
                <div className="space-y-4">
                  {user.recentOrders.map((order, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-50 hover:border-purple-100 kinetic-transition bg-slate-50/30">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-purple-100">
                          📦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{order.id}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-8 mt-4 sm:mt-0">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{order.total}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${
                            order.status === "En camino" ? "text-primary" : "text-green-500"
                          }`}>{order.status}</p>
                        </div>
                        <button className="px-6 py-2 rounded-full border border-purple-100 text-xs font-bold text-slate-600 hover:bg-white hover:text-primary kinetic-transition">
                          Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
