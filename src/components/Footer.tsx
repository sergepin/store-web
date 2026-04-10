export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-24 px-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-bold tracking-tighter text-primary mb-8">BOOSTEK</div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Creando el arsenal digital definitivo para el jugador moderno. Precisión, rendimiento y estética pura.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-8 uppercase tracking-widest text-xs text-slate-500">Tienda</h5>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary kinetic-transition">Todo el equipo</a></li>
            <li><a href="#" className="hover:text-primary kinetic-transition">Teclados</a></li>
            <li><a href="#" className="hover:text-primary kinetic-transition">Ratones</a></li>
            <li><a href="#" className="hover:text-primary kinetic-transition">Audio</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-8 uppercase tracking-widest text-xs text-slate-500">Soporte</h5>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary kinetic-transition">Envíos</a></li>
            <li><a href="#" className="hover:text-primary kinetic-transition">Garantía</a></li>
            <li><a href="#" className="hover:text-primary kinetic-transition">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-8 uppercase tracking-widest text-xs text-slate-500">Newsletter</h5>
          <div className="flex gap-2">
            <input type="text" placeholder="Tu email" className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-primary flex-1" />
            <button className="bg-primary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 kinetic-transition">Unirse</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-24 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
        © 2026 BOOSTEK ARMORY. TODOS LOS DERECHOS RESERVADOS.
      </div>
    </footer>
  );
}
