import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
    Menu, Search, User, ShoppingBag, Wallet, 
    Home, Receipt, Tag, Trophy, Globe, Facebook, MessageCircle, Share2, X, LogOut, Settings, CreditCard, LogIn, UserPlus
} from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewState;
    setView: (view: ViewState) => void;
    cartCount: number;
    isLoggedIn: boolean;
    user: any;
    onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, cartCount, isLoggedIn, user, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleNavClick = (view: ViewState) => {
        setView(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <div 
                                className="flex items-center gap-2 text-primary cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setView(ViewState.HOME)}
                            >
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <Globe size={20} />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight">Thaigrab</h1>
                            </div>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex space-x-6">
                                <button 
                                    onClick={() => setView(ViewState.HOME)}
                                    className={`text-sm font-medium hover:text-primary transition-colors ${currentView === ViewState.HOME ? 'text-primary font-bold' : 'text-gray-600'}`}
                                >
                                    หน้าแรก
                                </button>
                                <button 
                                    onClick={() => setView(ViewState.HOME)}
                                    className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                >
                                    ตรวจผลรางวัล
                                </button>
                                <button 
                                    onClick={() => setView(ViewState.BUY)}
                                    className={`text-sm font-medium hover:text-primary transition-colors ${currentView === ViewState.BUY ? 'text-primary font-bold' : 'text-gray-600'}`}
                                >
                                    แทงหวย
                                </button>
                                <button 
                                    onClick={() => setView(ViewState.VIP)}
                                    className={`text-sm font-medium hover:text-primary transition-colors ${currentView === ViewState.VIP ? 'text-primary font-bold' : 'text-gray-600'}`}
                                >
                                    โปรโมชั่น & VIP
                                </button>
                            </nav>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Balance - Only Show if 'logged in' */}
                            {isLoggedIn ? (
                                <div className="hidden lg:flex items-center gap-2 mr-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <Wallet size={16} className="text-primary" />
                                    <span className="text-sm font-bold text-gray-700">฿{user.balance?.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                </div>
                            ) : null}

                            <button 
                                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                                onClick={() => setView(ViewState.CHECKOUT)}
                            >
                                <ShoppingBag size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Auth State Switch */}
                            {isLoggedIn ? (
                                /* Logged In User Menu */
                                <div className="relative">
                                    <button 
                                        className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    >
                                        <User size={20} className="text-gray-600" />
                                    </button>

                                    {isUserMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                                <div className="p-4 border-b border-gray-100 bg-gray-50">
                                                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    <button 
                                                        onClick={() => { setView(ViewState.PROFILE); setIsUserMenuOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                                    >
                                                        <User size={16} /> ข้อมูลส่วนตัว
                                                    </button>
                                                    <button 
                                                        onClick={() => { setView(ViewState.HISTORY); setIsUserMenuOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                                    >
                                                        <Receipt size={16} /> ประวัติการซื้อ
                                                    </button>
                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                                        <CreditCard size={16} /> ช่องทางชำระเงิน
                                                    </button>
                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                                        <Settings size={16} /> ตั้งค่า
                                                    </button>
                                                </div>
                                                <div className="p-2 border-t border-gray-100">
                                                    <button 
                                                        onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-bold"
                                                    >
                                                        <LogOut size={16} /> ออกจากระบบ
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                /* Guest: Login / Register Buttons */
                                <div className="hidden md:flex items-center gap-2">
                                    <button 
                                        onClick={() => setView(ViewState.LOGIN)}
                                        className="text-sm font-bold text-gray-700 hover:text-primary px-3 py-2 transition-colors"
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                    <button 
                                        onClick={() => setView(ViewState.REGISTER)}
                                        className="text-sm font-bold text-white bg-primary hover:bg-red-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                                    >
                                        สมัครสมาชิก
                                    </button>
                                </div>
                            )}
                            
                            <button 
                                className="md:hidden text-gray-600"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Globe className="text-primary" /> Thaigrab
                            </h2>
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-2 flex-1">
                            <button 
                                onClick={() => handleNavClick(ViewState.HOME)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left ${currentView === ViewState.HOME ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Home size={20} /> หน้าแรก
                            </button>
                            <button 
                                onClick={() => handleNavClick(ViewState.BUY)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left ${currentView === ViewState.BUY ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Tag size={20} /> แทงหวย
                            </button>
                            <button 
                                onClick={() => handleNavClick(ViewState.VIP)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left ${currentView === ViewState.VIP ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Trophy size={20} /> โปรโมชั่น & VIP
                            </button>
                            <button 
                                onClick={() => handleNavClick(ViewState.CHECKOUT)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left ${currentView === ViewState.CHECKOUT ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <ShoppingBag size={20} /> ตะกร้าสินค้า
                                {cartCount > 0 && <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-3">
                            {isLoggedIn ? (
                                <>
                                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">ยอดเงินคงเหลือ</p>
                                        <p className="text-xl font-black text-primary">฿{user.balance?.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleNavClick(ViewState.PROFILE)}
                                        className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl transition-colors text-left ${currentView === ViewState.PROFILE ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <User size={18} /> ข้อมูลส่วนตัว
                                    </button>
                                    <button 
                                        onClick={() => handleNavClick(ViewState.HISTORY)}
                                        className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl transition-colors text-left ${currentView === ViewState.HISTORY ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <Receipt size={18} /> ประวัติการซื้อ
                                    </button>
                                    <button 
                                        onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                                        className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-red-600 py-2 mt-2"
                                    >
                                        <LogOut size={18} /> ออกจากระบบ
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => handleNavClick(ViewState.LOGIN)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 bg-gray-50 hover:bg-gray-100 font-bold transition-colors"
                                    >
                                        <LogIn size={20} /> เข้าสู่ระบบ
                                    </button>
                                    <button 
                                        onClick={() => handleNavClick(ViewState.REGISTER)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-primary hover:bg-red-700 font-bold transition-colors shadow-lg shadow-primary/20"
                                    >
                                        <UserPlus size={20} /> สมัครสมาชิก
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200 bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white">
                                    <Globe size={14} />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight">Thaigrab</h2>
                            </div>
                            <p className="text-sm text-gray-500 max-w-sm">
                                แพลตฟอร์มลอตเตอรี่ออนไลน์อันดับหนึ่งในไทย มั่นใจ ปลอดภัย จ่ายไว 100% พร้อมบริการคุณตลอด 24 ชั่วโมง
                            </p>
                        </div>
                        <div>
                            <h6 className="font-bold text-gray-900 mb-4">บริการของเรา</h6>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-primary">หวยรัฐบาล</a></li>
                                <li><a href="#" className="hover:text-primary">หวยหุ้นไทย</a></li>
                                <li><a href="#" className="hover:text-primary">หวยลาว</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-bold text-gray-900 mb-4">ช่วยเหลือ</h6>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><button onClick={() => setView(ViewState.HELP)} className="hover:text-primary text-left">ติดต่อเรา</button></li>
                                <li><button onClick={() => setView(ViewState.HELP)} className="hover:text-primary text-left">คำถามที่พบบ่อย</button></li>
                                <li><button onClick={() => setView(ViewState.HELP)} className="hover:text-primary text-left">วิธีเติมเงิน</button></li>
                                <li><button onClick={() => setView(ViewState.ADMIN)} className="hover:text-gray-900 text-left text-gray-300 mt-4 text-xs font-mono">System Admin</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400">© 2024 Thaigrab Lottery Platform. All rights reserved.</p>
                        <div className="flex gap-4 text-gray-400">
                            <Facebook size={20} className="hover:text-primary cursor-pointer" />
                            <MessageCircle size={20} className="hover:text-primary cursor-pointer" />
                            <Share2 size={20} className="hover:text-primary cursor-pointer" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};