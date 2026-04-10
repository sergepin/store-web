import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff]" suppressHydrationWarning>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-purple-100 -translate-y-1/2 z-0" />
              {[
                { label: "Envío", active: true },
                { label: "Pago", active: false },
                { label: "Revisión", active: false }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm kinetic-transition ${
                    step.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-400 border border-purple-100"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    step.active ? "text-primary" : "text-slate-400"
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* Form Section */}
            <div className="flex-1 space-y-8">
              <section className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tighter text-slate-900 mb-8">Información de Envío</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Nombre</label>
                    <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Apellidos</label>
                    <input type="text" placeholder="Tus apellidos" className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Correo Electrónico</label>
                    <input type="email" placeholder="email@ejemplo.com" className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Dirección de Entrega</label>
                    <input type="text" placeholder="Calle, número, piso..." className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Ciudad</label>
                    <input type="text" placeholder="Madrid" className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Código Postal</label>
                    <input type="text" placeholder="28001" className="w-full bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white kinetic-transition" />
                  </div>
                </form>
              </section>

              <section className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tighter text-slate-900 mb-8">Método de Pago</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "card", label: "Tarjeta", icon: "💳" },
                    { id: "paypal", label: "PayPal", icon: "🅿️" },
                    { id: "apple", label: "Apple Pay", icon: "🍎" }
                  ].map((method) => (
                    <div key={method.id} className="p-4 rounded-2xl border border-purple-100/50 flex flex-col items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 kinetic-transition group">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary">{method.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Summary Section */}
            <aside className="w-full lg:w-96">
              <div className="bg-white p-8 rounded-[2rem] border border-purple-100/50 shadow-sm sticky top-32">
                <h2 className="text-xl font-bold tracking-tighter text-slate-900 mb-8 pb-4 border-b border-slate-50">Resumen del Pedido</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#f0f3ff] rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-300">ITEM</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900 leading-tight">Apex Mechanical Pro</div>
                      <div className="text-xs font-bold text-primary mt-1">{formatCurrency(189)}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex justify-between text-sm font-medium text-slate-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(189)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-slate-400">
                    <span>Envío</span>
                    <span className="text-primary uppercase text-[10px] font-bold">Gratis</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 pt-4">
                    <span>Total</span>
                    <span>{formatCurrency(189)}</span>
                  </div>
                </div>

                <button className="w-full mt-10 bg-primary text-white py-5 rounded-full font-bold hover:scale-[1.02] neon-shadow kinetic-transition">
                  Confirmar Pedido
                </button>
                
                <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Pago 100% Seguro
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
