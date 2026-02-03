import React, { useState } from 'react';
import { ViewState, CartItem } from '../types';
import { CreditCard, Landmark, QrCode, ShieldCheck, Lock, CheckCircle, CalendarClock, Calendar, Check, ArrowRight, Loader2, Copy } from 'lucide-react';

interface CheckoutViewProps {
    setView: (view: ViewState) => void;
    cart: CartItem[];
    clearCart: () => void;
}

type CheckoutStep = 'REVIEW' | 'SUCCESS';

export const CheckoutView: React.FC<CheckoutViewProps> = ({ setView, cart, clearCart }) => {
    const [step, setStep] = useState<CheckoutStep>('REVIEW');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setTransactionId(`TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
            setStep('SUCCESS');
            clearCart();
            window.scrollTo(0, 0);
        }, 2000);
    };

    if (step === 'SUCCESS') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                    
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={48} className="text-green-600 stroke-[3]" />
                    </div>
                    
                    <h2 className="text-3xl font-black text-gray-900 mb-2">ชำระเงินสำเร็จ!</h2>
                    <p className="text-gray-500 mb-8">ขอบคุณสำหรับการสั่งซื้อ ระบบได้ทำการบันทึกรายการของคุณเรียบร้อยแล้ว</p>
                    
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto border border-gray-100">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <span className="text-sm text-gray-500">รหัสทำรายการ</span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-gray-900">{transactionId}</span>
                                <Copy size={14} className="text-gray-400 cursor-pointer hover:text-primary" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">วันที่ทำรายการ</span>
                            <span className="font-medium text-gray-900">{new Date().toLocaleString('th-TH')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">ช่องทางชำระเงิน</span>
                            <span className="font-medium text-gray-900">QR PromptPay</span>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                            <span className="font-bold text-gray-900">ยอดเงินที่ชำระ</span>
                            <span className="text-xl font-black text-green-600">฿{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => setView(ViewState.HOME)}
                            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                        >
                            กลับหน้าหลัก
                        </button>
                        <button 
                            onClick={() => setView(ViewState.HISTORY)}
                            className="px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-colors flex items-center justify-center gap-2"
                        >
                            ดูสลากของฉัน <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Secure Checkout</h2>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <button onClick={() => setView(ViewState.BUY)} className="flex items-center gap-2 text-primary hover:underline">
                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                        <span>เลือกเลข</span>
                    </button>
                    <div className="h-px w-8 bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                        <span>ชำระเงิน</span>
                    </div>
                    <div className="h-px w-8 bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">3</span>
                        <span>สำเร็จ</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Payment Methods */}
                <div className="lg:col-span-8 space-y-6">
                    <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Landmark className="text-primary" />
                            ช่องทางการชำระเงิน
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="ring-2 ring-primary bg-primary/5 border-primary p-4 rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-0.5 font-bold uppercase">แนะนำ</div>
                                <QrCode size={32} className="text-gray-900" />
                                <span className="text-sm font-bold text-gray-900">QR PromptPay</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                <CreditCard size={32} className="text-gray-400" />
                                <span className="text-sm font-bold text-gray-900">บัตรเครดิต/เดบิต</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                <Landmark size={32} className="text-gray-400" />
                                <span className="text-sm font-bold text-gray-900">โอนเงินธนาคาร</span>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center animate-in fade-in">
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">สแกน QR Code เพื่อชำระเงินผ่านแอปธนาคารทุกธนาคาร</p>
                            </div>
                            <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-200 mx-auto">
                                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center relative">
                                    <QrCode size={64} className="text-gray-300" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-bold text-primary">รอการยืนยันคำสั่งซื้อ</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-gray-500">รหัสอ้างอิง: TG-{Math.random().toString().substr(2,8)}</p>
                        </div>
                    </section>

                    <div className="flex flex-wrap items-center justify-center gap-8 py-4 opacity-70">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-xs font-medium text-gray-600">SSL Secure Connection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span className="text-xs font-medium text-gray-600">256-bit Encryption</span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
                        <div className="bg-primary p-4 text-white">
                            <h3 className="font-bold flex items-center gap-2">
                                <ShieldCheck size={20} /> สรุปรายการสั่งซื้อ
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                             <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">{item.name}</p>
                                            <div className="flex gap-1 mt-1 flex-wrap">
                                                {item.numbers.map(n => <span key={n} className="text-xs font-bold text-gray-600 bg-white border px-1 rounded">{n}</span>)}
                                                {item.specialNumbers.map(n => <span key={`s-${n}`} className="text-xs font-bold text-white bg-yellow-400 border border-yellow-500 px-1 rounded">{n}</span>)}
                                            </div>
                                            {item.drawDate ? (
                                                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 w-fit px-1.5 py-0.5 rounded border border-blue-100">
                                                    <Calendar size={10} />
                                                    {item.drawDate}
                                                </div>
                                            ) : item.draws > 1 && (
                                                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-yellow-700 bg-yellow-100 w-fit px-1.5 py-0.5 rounded">
                                                    <CalendarClock size={10} />
                                                    {item.draws} งวด (7 วัน)
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">฿{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && <p className="text-center text-sm text-gray-400 italic">ไม่มีรายการ</p>}
                             </div>

                             <div className="pt-4 border-t border-gray-100">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">มีรหัสส่วนลด?</label>
                                <div className="flex gap-2">
                                    <input className="flex-1 text-sm bg-gray-50 border-gray-200 rounded-lg focus:ring-primary focus:border-primary p-2 border" placeholder="ใส่รหัสโค้ด" type="text"/>
                                    <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors">ใช้โค้ด</button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>รวมยอดทั้งหมด ({cart.length} รายการ)</span>
                                    <span>฿{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <span className="font-bold text-gray-900">ยอดชำระสุทธิ</span>
                                    <span className="text-2xl font-black text-primary">฿{total.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handlePayment}
                                disabled={cart.length === 0 || isProcessing}
                                className={`w-full font-black py-4 rounded-xl text-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                                    cart.length === 0 || isProcessing
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary hover:bg-red-700 text-white shadow-primary/30 hover:scale-[1.02] active:scale-95'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" /> กำลังตรวจสอบ...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={20} /> ชำระเงิน
                                    </>
                                )}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};