import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
    User, Wallet, CreditCard, Shield, Settings, LogOut, 
    Camera, ChevronRight, CheckCircle2, AlertCircle, 
    ArrowUpRight, ArrowDownLeft, Gift, Bell, Lock
} from 'lucide-react';

interface ProfileViewProps {
    setView: (view: ViewState) => void;
    user: any;
    onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ setView, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'bank' | 'security'>('overview');

    // Mock User Data extension if not fully provided
    const userData = {
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        phone: '081-234-5678',
        id: 'TG-884921',
        joinDate: '12 ต.ค. 2023',
        isVerified: true,
        balance: user?.balance || 0.00,
        points: 1250,
        bank: {
            name: 'KASIKORNBANK',
            account: 'xxx-2-34567-x',
            color: 'bg-green-600'
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                                    <User size={40} />
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full hover:bg-black transition-colors shadow-sm">
                                <Camera size={14} />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">{userData.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{userData.email}</p>
                        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold border border-green-100">
                            <CheckCircle2 size={12} /> ยืนยันตัวตนแล้ว
                        </div>
                    </div>

                    <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center justify-between p-4 text-sm font-bold transition-colors ${activeTab === 'overview' ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="flex items-center gap-3"><User size={18} /> ข้อมูลสมาชิก</span>
                            <ChevronRight size={16} className="opacity-50" />
                        </button>
                        <button 
                            onClick={() => setActiveTab('bank')}
                            className={`w-full flex items-center justify-between p-4 text-sm font-bold transition-colors ${activeTab === 'bank' ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="flex items-center gap-3"><CreditCard size={18} /> บัญชีธนาคาร</span>
                            <ChevronRight size={16} className="opacity-50" />
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center justify-between p-4 text-sm font-bold transition-colors ${activeTab === 'security' ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="flex items-center gap-3"><Shield size={18} /> ความปลอดภัย</span>
                            <ChevronRight size={16} className="opacity-50" />
                        </button>
                        <button 
                            onClick={() => setView(ViewState.VIP)}
                            className="w-full flex items-center justify-between p-4 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <span className="flex items-center gap-3"><Gift size={18} /> แนะนำเพื่อน (VIP)</span>
                            <ChevronRight size={16} className="opacity-50" />
                        </button>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                             <button 
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 p-4 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={18} /> ออกจากระบบ
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                    
                    {/* Wallet Section (Always Visible) */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Wallet size={120} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <p className="text-gray-400 text-sm font-bold uppercase mb-1">ยอดเงินคงเหลือ (Wallet Balance)</p>
                                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">฿{userData.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
                                <div className="flex items-center gap-4 text-sm text-gray-300">
                                    <span className="flex items-center gap-1"><Gift size={14} className="text-yellow-400"/> {userData.points.toLocaleString()} คะแนน</span>
                                    <span>•</span>
                                    <span>ID: {userData.id}</span>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button 
                                    onClick={() => setView(ViewState.HELP)} 
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                                >
                                    <ArrowDownLeft size={18} /> เติมเงิน
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10">
                                    <ArrowUpRight size={18} /> ถอนเงิน
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
                        {activeTab === 'overview' && (
                            <div className="p-6 sm:p-8 animate-in fade-in duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Settings className="text-primary" size={24} /> ข้อมูลส่วนตัว
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">ชื่อ-นามสกุล</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800">
                                            {userData.name}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">เบอร์โทรศัพท์</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800 flex justify-between items-center">
                                            {userData.phone}
                                            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-bold">ยืนยันแล้ว</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">อีเมล</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800">
                                            {userData.email}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">วันที่สมัครสมาชิก</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800">
                                            {userData.joinDate}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4">สถานะการยืนยันตัวตน (KYC)</h4>
                                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                                        <CheckCircle2 className="text-green-600 mt-0.5" size={20} />
                                        <div>
                                            <p className="font-bold text-green-800 text-sm">ยืนยันตัวตนระดับสูงสุดแล้ว</p>
                                            <p className="text-xs text-green-600 mt-1">คุณสามารถทำธุรกรรมฝาก-ถอนได้ไม่จำกัดวงเงิน และได้รับสิทธิพิเศษเต็มรูปแบบ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bank' && (
                            <div className="p-6 sm:p-8 animate-in fade-in duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <CreditCard className="text-primary" size={24} /> บัญชีธนาคารของฉัน
                                    </h3>
                                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors border border-primary/20">
                                        + เพิ่มบัญชี
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Primary Bank Card */}
                                    <div className={`rounded-xl p-6 text-white relative overflow-hidden shadow-lg ${userData.bank.color}`}>
                                        <div className="absolute top-0 right-0 p-4 opacity-20">
                                            <LandmarkIcon size={64} />
                                        </div>
                                        <div className="relative z-10 flex flex-col justify-between h-32">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-sm opacity-90">{userData.bank.name}</span>
                                                <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">PRIMARY</span>
                                            </div>
                                            <div>
                                                <p className="text-lg font-mono tracking-widest mb-1">{userData.bank.account}</p>
                                                <p className="text-xs opacity-80 uppercase">{userData.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty State Slot */}
                                    <button className="rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all h-full min-h-[160px]">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                            <span className="text-2xl font-light">+</span>
                                        </div>
                                        <span className="text-sm font-bold">เพิ่มบัญชีธนาคาร</span>
                                    </button>
                                </div>

                                <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3">
                                    <AlertCircle className="text-yellow-600 shrink-0" size={20} />
                                    <div className="text-sm text-yellow-800">
                                        <p className="font-bold mb-1">ข้อควรระวัง</p>
                                        <p className="opacity-90">ชื่อบัญชีธนาคารต้องตรงกับชื่อที่ลงทะเบียนไว้กับ Thaigrab เท่านั้น มิฉะนั้นจะไม่สามารถทำรายการถอนเงินได้</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="p-6 sm:p-8 animate-in fade-in duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Shield className="text-primary" size={24} /> ความปลอดภัย
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">รหัสผ่าน (Password)</h4>
                                                <p className="text-xs text-gray-500">เปลี่ยนล่าสุดเมื่อ 30 วันที่แล้ว</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-bold text-primary hover:underline">เปลี่ยน</button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">รหัส PIN 6 หลัก</h4>
                                                <p className="text-xs text-gray-500">ใช้สำหรับยืนยันการถอนเงิน</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-bold text-primary hover:underline">ตั้งค่า</button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                                <Bell size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">การแจ้งเตือน</h4>
                                                <p className="text-xs text-gray-500">แจ้งเตือนผลรางวัลและการเคลื่อนไหวบัญชี</p>
                                            </div>
                                        </div>
                                        <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-4 bg-primary border-primary"/>
                                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer bg-primary/20"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon for bank card
const LandmarkIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="3" y1="22" x2="21" y2="22"></line>
        <line x1="6" y1="18" x2="6" y2="11"></line>
        <line x1="10" y1="18" x2="10" y2="11"></line>
        <line x1="14" y1="18" x2="14" y2="11"></line>
        <line x1="18" y1="18" x2="18" y2="11"></line>
        <polygon points="12 2 20 7 4 7"></polygon>
    </svg>
);