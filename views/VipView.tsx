import React, { useState } from 'react';
import { ViewState } from '../types';
import { Users, TrendingUp, Wallet, Award, Copy, Facebook, MessageCircle, Send, Check } from 'lucide-react';

interface VipViewProps {
    setView: (view: ViewState) => void;
}

export const VipView: React.FC<VipViewProps> = () => {
    const [isCopied, setIsCopied] = useState(false);
    const referralLink = "https://thaigrab.com/register?ref=VIP999";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-8">
                {/* Hero Gradient Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-red-800 text-white p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                        <Users size={200} className="rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-widest">
                                <Award size={14} /> VIP AFFILIATE PROGRAM
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">ชวนเพื่อนรับค่าคอม <span className="text-yellow-400">8%</span></h2>
                            <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl">เปลี่ยนการแนะนำเพื่อนให้เป็นรายได้ที่ไม่มีขีดจำกัด ยิ่งชวนมาก ยิ่งได้มาก รับโบนัสทันทีเมื่อเพื่อนเริ่มเล่น</p>
                            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                                    <Check className="text-yellow-400" size={16} />
                                    <span className="text-sm font-bold">จ่ายจริง ทุกสัปดาห์</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                                    <TrendingUp className="text-yellow-400" size={16} />
                                    <span className="text-sm font-bold">ถอนได้ไม่มีขั้นต่ำ</span>
                                </div>
                            </div>
                        </div>

                        {/* Link Box */}
                        <div className="w-full md:w-auto">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full md:min-w-[400px]">
                                <label className="block text-sm font-bold mb-3 text-white/90">ลิงก์แนะนำเพื่อนของคุณ</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-white/10 border-white/20 rounded-lg text-white font-mono text-sm focus:ring-yellow-400 focus:border-yellow-400 p-2 border" 
                                        readOnly 
                                        type="text" 
                                        value={referralLink}
                                    />
                                    <button 
                                        onClick={handleCopy}
                                        className={`px-6 py-2 rounded-lg font-black text-sm flex items-center gap-2 transition-all active:scale-95 ${
                                            isCopied 
                                            ? 'bg-green-500 text-white hover:bg-green-600' 
                                            : 'bg-yellow-400 hover:bg-yellow-500 text-red-900'
                                        }`}
                                    >
                                        {isCopied ? <Check size={16} /> : <Copy size={16} />} 
                                        {isCopied ? 'คัดลอกแล้ว' : 'คัดลอก'}
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-between items-center text-xs font-bold text-white/60">
                                    <span>แชร์ไปยังโซเชียล:</span>
                                    <div className="flex gap-3">
                                        <Facebook size={18} className="hover:text-white cursor-pointer" />
                                        <MessageCircle size={18} className="hover:text-white cursor-pointer" />
                                        <Send size={18} className="hover:text-white cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                <Users size={24} />
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1">+12%</span>
                        </div>
                        <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider">เพื่อนทั้งหมด</h4>
                        <p className="text-3xl font-black mt-1">1,248 <span className="text-sm font-normal text-gray-400">คน</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <Wallet size={24} />
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1">+5.4%</span>
                        </div>
                        <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider">รายได้รวมทั้งหมด</h4>
                        <p className="text-3xl font-black mt-1">฿450,200</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                                <Wallet size={24} />
                            </div>
                            <button className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">ประวัติ</button>
                        </div>
                        <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider">ยอดเงินที่ถอนได้</h4>
                        <p className="text-3xl font-black text-primary mt-1">฿12,450</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gold/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Award size={48} className="text-gold" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center text-red-900 shadow-md">
                                <Award size={24} />
                            </div>
                        </div>
                        <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider">ระดับ VIP</h4>
                        <p className="text-3xl font-black text-gold mt-1">GOLD TIER</p>
                        <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full gold-gradient" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-[10px] mt-1 text-gray-400 font-bold uppercase">อีก ฿25,000 เพื่อเลื่อนเป็น PLATINUM</p>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Table */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <TrendingUp className="text-primary" size={24} /> ประวัติการแนะนำ
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-600">เดือนนี้</button>
                                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-gray-400">ย้อนหลัง</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                                    <tr>
                                        <th className="px-6 py-4">วัน/เวลา</th>
                                        <th className="px-6 py-4">ชื่อผู้ใช้ (เพื่อน)</th>
                                        <th className="px-6 py-4 text-center">ยอดเล่นรวม</th>
                                        <th className="px-6 py-4 text-center">ค่าคอมมิชชั่น (8%)</th>
                                        <th className="px-6 py-4 text-right">สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {[
                                        { date: '23/10/2023 14:30', user: 'user_am***', amount: '12,500.00', comm: '1,000.00', status: 'success' },
                                        { date: '23/10/2023 12:15', user: 'lucky_be***', amount: '5,000.00', comm: '400.00', status: 'success' },
                                        { date: '22/10/2023 20:05', user: 'win_big***', amount: '20,000.00', comm: '1,600.00', status: 'pending' },
                                        { date: '22/10/2023 18:40', user: 'thaip***', amount: '800.00', comm: '64.00', status: 'success' },
                                        { date: '21/10/2023 11:20', user: 'mister_l***', amount: '100,000.00', comm: '8,000.00', status: 'success' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-600">{row.date}</td>
                                            <td className="px-6 py-4 font-bold">{row.user}</td>
                                            <td className="px-6 py-4 text-center font-mono">฿{row.amount}</td>
                                            <td className="px-6 py-4 text-center font-bold text-primary">฿{row.comm}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${row.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    {row.status === 'success' ? 'สำเร็จ' : 'รอดำเนินการ'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar Perks */}
                    <aside className="w-full lg:w-80 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                                <Award className="text-gold" /> สิทธิพิเศษ VIP GOLD
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { title: 'เพิ่มค่าคอมมิชชั่น +1%', desc: 'รับมากกว่าสมาชิกทั่วไปทันที' },
                                    { title: 'ถอนเงินด่วน Fast-Track', desc: 'ดำเนินการถอนภายใน 1 นาที' },
                                    { title: 'ผู้ดูแลส่วนตัว 24 ชม.', desc: 'ปรึกษาปัญหาผ่าน LINE VIP' }
                                ].map((perk, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                            <Check size={12} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">{perk.title}</p>
                                            <p className="text-xs text-gray-400">{perk.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-gold/10 border-2 border-gold/30 rounded-xl p-6 text-center">
                            <Award className="text-gold mx-auto mb-2" size={32} />
                            <h5 className="font-bold">ระบบแต้มสะสม VIP</h5>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">ทุกๆ ฿100 ของยอดเล่นเพื่อน รับ 1 แต้ม แลกของรางวัลสุดพรีเมียม</p>
                            <button className="w-full py-2 gold-gradient text-red-900 font-black rounded-lg shadow-sm hover:opacity-90 transition-opacity">แลกของรางวัล</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};