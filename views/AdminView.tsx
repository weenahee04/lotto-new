import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
    LayoutDashboard, Users, Ticket, Wallet, Settings, LogOut, 
    Search, Bell, Check, X, TrendingUp, AlertCircle, Plus, 
    FileText, DollarSign, RefreshCw, MoreVertical, Ban, Edit, Trash
} from 'lucide-react';

interface AdminViewProps {
    setView: (view: ViewState) => void;
}

type AdminTab = 'dashboard' | 'lottery' | 'finance' | 'users' | 'settings';

export const AdminView: React.FC<AdminViewProps> = ({ setView }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // --- MOCK DATA ---
    const stats = [
        { label: 'ยอดขายวันนี้', value: '฿145,200', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
        { label: 'สมาชิกใหม่', value: '48', change: '+5%', icon: Users, color: 'bg-blue-500' },
        { label: 'ตั๋วที่ขายแล้ว', value: '1,204', change: '+18%', icon: Ticket, color: 'bg-purple-500' },
        { label: 'รออนุมัติฝาก', value: '12', change: 'Urgent', icon: AlertCircle, color: 'bg-yellow-500' },
    ];

    const pendingTransactions = [
        { id: 'TX-9923', user: 'Somchai01', type: 'DEPOSIT', amount: 500, time: '10:42', slip: true },
        { id: 'TX-9924', user: 'LuckyGirl', type: 'WITHDRAW', amount: 2500, time: '10:45', slip: false },
        { id: 'TX-9925', user: 'WinBig99', type: 'DEPOSIT', amount: 1000, time: '10:50', slip: true },
    ];

    const users = [
        { id: 'TG-1001', name: 'Somchai Jaidee', credit: 1500, status: 'Active', role: 'Member' },
        { id: 'TG-1002', name: 'Naree Raksa', credit: 50, status: 'Active', role: 'VIP' },
        { id: 'TG-1003', name: 'Bot_Spam', credit: 0, status: 'Banned', role: 'Member' },
        { id: 'TG-1004', name: 'Admin One', credit: 999999, status: 'Active', role: 'Admin' },
    ];

    const lotteries = [
        { id: 'PB-231024', name: 'USA Powerball', drawDate: '24 Oct 2023', status: 'Open', sold: 4500 },
        { id: 'MM-231025', name: 'Mega Millions', drawDate: '25 Oct 2023', status: 'Open', sold: 3200 },
        { id: 'EM-231020', name: 'EuroMillions', drawDate: '20 Oct 2023', status: 'Closed', sold: 5100 },
    ];

    // --- RENDER HELPERS ---

    const SidebarItem = ({ id, icon: Icon, label }: { id: AdminTab, icon: any, label: string }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                activeTab === id 
                ? 'bg-gray-800 text-white border-r-4 border-primary' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? '' : '-ml-64'}`}>
                <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mr-3 font-black text-white">TG</div>
                    <span className="font-bold text-lg tracking-wide">BACK OFFICE</span>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-6 mb-6">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
                        <div className="space-y-1">
                            <SidebarItem id="dashboard" icon={LayoutDashboard} label="ภาพรวมระบบ" />
                            <SidebarItem id="lottery" icon={Ticket} label="จัดการหวย" />
                            <SidebarItem id="finance" icon={Wallet} label="การเงิน & โอน" />
                            <SidebarItem id="users" icon={Users} label="จัดการสมาชิก" />
                        </div>
                    </div>
                    <div className="px-6">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">System</p>
                        <div className="space-y-1">
                            <SidebarItem id="settings" icon={Settings} label="ตั้งค่าเว็บไซต์" />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-800">
                    <button 
                        onClick={() => setView(ViewState.HOME)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-bold text-sm"
                    >
                        <LogOut size={16} /> ออกจากระบบ
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h2 className="text-xl font-bold text-gray-800">
                            {activeTab === 'dashboard' && 'Dashboard Overview'}
                            {activeTab === 'lottery' && 'Lottery Management'}
                            {activeTab === 'finance' && 'Financial Transactions'}
                            {activeTab === 'users' && 'User Management'}
                            {activeTab === 'settings' && 'System Settings'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary w-64" placeholder="Search..." />
                        </div>
                        <div className="relative cursor-pointer">
                            <Bell className="text-gray-600" size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">A</div>
                            <span className="text-sm font-bold text-gray-700">Admin</span>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <main className="flex-1 overflow-auto p-6 bg-gray-100">
                    
                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 animate-in fade-in">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
                                            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                                            <span className="text-xs font-bold text-green-500 mt-1 inline-block">{stat.change} from yesterday</span>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center shadow-md`}>
                                            <stat.icon size={24} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Chart Area (Mock) */}
                                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-gray-800">ยอดขายรายสัปดาห์</h3>
                                        <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-3 py-1 text-gray-600 cursor-pointer hover:bg-gray-100">
                                            <option>This Week</option>
                                            <option>Last Week</option>
                                        </select>
                                    </div>
                                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                            <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group">
                                                <div 
                                                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-500 group-hover:bg-primary-dark"
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                                <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-400 font-bold">
                                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-800 mb-4">รายการล่าสุด</h3>
                                    <div className="space-y-4">
                                        {pendingTransactions.map((tx) => (
                                            <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {tx.type === 'DEPOSIT' ? <TrendingUp size={18} /> : <Wallet size={18} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{tx.user}</p>
                                                        <p className="text-xs text-gray-500">{tx.type} • {tx.time}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-bold ${tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {tx.type === 'DEPOSIT' ? '+' : '-'}฿{tx.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-4 text-sm font-bold text-primary hover:underline">View All Activity</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LOTTERY TAB */}
                    {activeTab === 'lottery' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-700">รายการหวยในระบบ</h3>
                                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 shadow-sm transition-colors">
                                    <Plus size={18} /> เพิ่มงวดหวย
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4">Lottery ID</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Draw Date</th>
                                            <th className="px-6 py-4 text-center">Sold</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {lotteries.map((lotto) => (
                                            <tr key={lotto.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-mono text-gray-500">{lotto.id}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{lotto.name}</td>
                                                <td className="px-6 py-4">{lotto.drawDate}</td>
                                                <td className="px-6 py-4 text-center">{lotto.sold.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${lotto.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                        {lotto.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1 text-gray-400 hover:text-primary"><Edit size={16} /></button>
                                                        {lotto.status === 'Closed' && (
                                                            <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded hover:bg-red-700">Set Result</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* FINANCE TAB */}
                    {activeTab === 'finance' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">ยอดฝากรออนุมัติ</p>
                                    <h3 className="text-3xl font-black text-green-600">฿12,500</h3>
                                    <p className="text-xs text-gray-400 mt-2">5 รายการ</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">ยอดถอนรออนุมัติ</p>
                                    <h3 className="text-3xl font-black text-red-600">฿3,200</h3>
                                    <p className="text-xs text-gray-400 mt-2">2 รายการ</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">กำไรสุทธิ (วันนี้)</p>
                                    <h3 className="text-3xl font-black text-blue-900">฿85,120</h3>
                                    <p className="text-xs text-gray-400 mt-2">Updated 5 mins ago</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <h4 className="font-bold text-gray-800">รายการรอตรวจสอบ (Pending Transactions)</h4>
                                    <button className="text-xs font-bold text-gray-500 flex items-center gap-1 hover:text-gray-900"><RefreshCw size={12}/> Refresh</button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {pendingTransactions.map((tx) => (
                                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {tx.type === 'DEPOSIT' ? <TrendingUp size={20} /> : <Wallet size={20} />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-900">{tx.type}</span>
                                                        <span className="text-xs text-gray-400 font-mono">{tx.id}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">User: <span className="text-blue-600 font-bold">{tx.user}</span> • Time: {tx.time}</p>
                                                    {tx.slip && <span className="text-xs text-primary underline cursor-pointer">View Slip</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="font-black text-lg">฿{tx.amount.toLocaleString()}</span>
                                                <div className="flex gap-2">
                                                    <button className="w-8 h-8 rounded bg-green-500 text-white flex items-center justify-center hover:bg-green-600 shadow-sm"><Check size={18} /></button>
                                                    <button className="w-8 h-8 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-sm"><X size={18} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="space-y-6 animate-in fade-in">
                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full" placeholder="Search users by name, ID or phone..." />
                                    </div>
                                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Filter</button>
                                </div>
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4">User Info</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 text-center">Balance</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {users.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{u.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{u.id}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'VIP' ? 'bg-yellow-100 text-yellow-700' : u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center font-mono font-bold">฿{u.credit.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {u.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                                                        <button className="p-1 text-gray-400 hover:text-red-600"><Ban size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                     {/* SETTINGS TAB */}
                     {activeTab === 'settings' && (
                        <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-in fade-in">
                            <h3 className="text-xl font-bold mb-6">General Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Site Name</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2" defaultValue="Thaigrab Lottery" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Maintenance Mode</label>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                        <span className="text-sm text-gray-500">Off</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Announcement Banner</label>
                                    <textarea className="w-full border border-gray-300 rounded-lg p-2 h-24" defaultValue="Welcome to the number 1 lottery platform in Thailand!" />
                                </div>
                                <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Save Changes</button>
                            </div>
                        </div>
                     )}

                </main>
            </div>
        </div>
    );
};