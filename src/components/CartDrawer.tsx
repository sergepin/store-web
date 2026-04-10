'use client';

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Mock items for now
  const items = [
    { id: 1, name: "Apex Mechanical Pro", price: 189.00, quantity: 1 },
    { id: 2, name: "Zenith Wireless Mouse", price: 89.00, quantity: 1 }
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-out">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tighter text-slate-900">Tu Arsenal</h2>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{items.length} Items</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  ITEM
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-xs font-bold text-primary mt-1">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button className="p-1 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold px-3">{item.quantity}</span>
                      <button className="p-1 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tu carrito está vacío</h3>
                <p className="text-sm text-slate-400 max-w-[200px] mx-auto">Equípate con lo mejor en nuestra tienda.</p>
              </div>
              <Button onClick={onClose} variant="primary" className="mt-4">Explorar Productos</Button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-500">
                <span>Envío</span>
                <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-2">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <Button className="w-full" size="lg" variant="primary">Finalizar Compra</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
