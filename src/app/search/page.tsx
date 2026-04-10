export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-8">
      <h1 className="text-3xl font-bold border-b border-purple-100 pb-4">
        Resultados de Búsqueda
      </h1>
      <div className="mt-6 flex gap-4">
        <input 
          type="text" 
          placeholder="Buscar equipo gaming..." 
          className="flex-1 p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
          Search
        </button>
      </div>
      <p className="mt-8 text-slate-500 text-center">
        Introduce un término para comenzar tu búsqueda.
      </p>
    </div>
  );
}
