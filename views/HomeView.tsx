import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Search, Calendar, RefreshCcw, ArrowRight, Smartphone, QrCode } from 'lucide-react';
import { TicketModal } from '../components/TicketModal';

interface HomeViewProps {
    setView: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Calculate next Mega Millions draw (Tue & Fri at 23:00)
        const getNextDraw = () => {
            const now = new Date();
            const currentDay = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
            const drawDays = [2, 5]; // Tuesday, Friday
            
            let nextDraw = new Date(now);
            nextDraw.setHours(23, 0, 0, 0);
            
            // If today is a draw day and it's before 23:00
            if (drawDays.includes(currentDay) && now.getHours() < 23) {
                return nextDraw;
            }
            
            // Otherwise find next draw day
            let found = false;
            let daysToAdd = 1;
            while(!found) {
                const d = new Date(now);
                d.setDate(now.getDate() + daysToAdd);
                if (drawDays.includes(d.getDay())) {
                    nextDraw = d;
                    nextDraw.setHours(23, 0, 0, 0);
                    found = true;
                }
                daysToAdd++;
            }
            return nextDraw;
        };

        const targetDate = getNextDraw();

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                // If time passed, just show 0 or reload logic (simplified here)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Initial call
        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
            <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="flex-1 space-y-6 lg:space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">ตรวจผลรางวัล</h2>
                            <p className="text-sm sm:text-base text-gray-500">ตรวจสอบผลสลากกินแบ่งและหวยระดับโลกได้แม่นยำที่สุด</p>
                        </div>
                        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <RefreshCcw size={18} />
                            รีเฟรชผลล่าสุด
                        </button>
                    </div>

                    {/* Hero Banner */}
                    <div className="relative overflow-hidden rounded-xl bg-primary text-white p-6 sm:p-8 shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <svg className="h-full w-full fill-current" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40"></circle>
                            </svg>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                            <div className="space-y-2 text-center md:text-left w-full md:w-auto">
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">Next Big Draw</span>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight">MEGA MILLIONS</h3>
                                <p className="text-lg sm:text-xl font-bold text-white/90">Jackpot: $450,000,000</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end space-y-4 w-full md:w-auto">
                                <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-2 w-full justify-center">
                                    <div className="bg-black/20 p-2 sm:p-3 rounded-lg text-center min-w-[50px] sm:min-w-[60px]">
                                        <span className="block text-xl sm:text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
                                        <span className="text-[9px] sm:text-[10px] uppercase">Days</span>
                                    </div>
                                    <div className="bg-black/20 p-2 sm:p-3 rounded-lg text-center min-w-[50px] sm:min-w-[60px]">
                                        <span className="block text-xl sm:text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                                        <span className="text-[9px] sm:text-[10px] uppercase">Hrs</span>
                                    </div>
                                    <div className="bg-black/20 p-2 sm:p-3 rounded-lg text-center min-w-[50px] sm:min-w-[60px]">
                                        <span className="block text-xl sm:text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                        <span className="text-[9px] sm:text-[10px] uppercase">Min</span>
                                    </div>
                                    <div className="bg-black/20 p-2 sm:p-3 rounded-lg text-center min-w-[50px] sm:min-w-[60px]">
                                        <span className="block text-xl sm:text-2xl font-bold text-yellow-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                        <span className="text-[9px] sm:text-[10px] uppercase">Sec</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setView(ViewState.BUY)}
                                    className="w-full sm:w-auto bg-white text-primary font-black py-3 px-8 rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    ซื้อสลากเลย
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search & Tabs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Search size={20} />
                            </div>
                            <input className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-primary shadow-sm" placeholder="ค้นหาตามชื่อหวย หรือหมายเลขสลาก..." type="text"/>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Calendar size={20} />
                            </div>
                            <input className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-primary shadow-sm text-gray-600" type="date"/>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="space-y-4">
                        {/* Powerball Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-8 h-auto rounded shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-lg">USA Powerball</h4>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Drawing Date: Oct 23, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {[18, 23, 35, 45, 54].map(n => (
                                            <div key={n} className="lottery-ball w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-gray-800 shadow-sm">{n}</div>
                                        ))}
                                        <div className="lottery-ball-red w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-sm">07</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ประกาศผลแล้ว</span>
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full md:w-auto px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            </div>
                        </div>

                         {/* Mega Millions Card */}
                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-8 h-auto rounded shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-lg">Mega Millions</h4>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Drawing Date: Oct 21, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {[3, 12, 38, 41, 58].map(n => (
                                            <div key={n} className="lottery-ball w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-gray-800 shadow-sm">{n < 10 ? `0${n}` : n}</div>
                                        ))}
                                        <div className="lottery-ball-red w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-sm">15</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ประกาศผลแล้ว</span>
                                    <button className="w-full md:w-auto px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">ดูรายละเอียด</button>
                                </div>
                            </div>
                        </div>

                        {/* EuroMillions Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <img src="https://flagcdn.com/w40/eu.png" alt="EU" className="w-8 h-auto rounded shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-lg">EuroMillions</h4>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Drawing Date: Oct 20, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {[5, 14, 32, 39, 44].map(n => (
                                            <div key={n} className="lottery-ball w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-gray-800 shadow-sm">{n < 10 ? `0${n}` : n}</div>
                                        ))}
                                        {/* Lucky Stars */}
                                        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xl text-white shadow-sm border-2 border-yellow-500">04</div>
                                        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xl text-white shadow-sm border-2 border-yellow-500">11</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ประกาศผลแล้ว</span>
                                    <button className="w-full md:w-auto px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">ดูรายละเอียด</button>
                                </div>
                            </div>
                        </div>

                        {/* UK Lotto Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <img src="https://flagcdn.com/w40/gb.png" alt="UK" className="w-8 h-auto rounded shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-lg">UK Lotto</h4>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Drawing Date: Oct 21, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {[2, 19, 23, 33, 45, 51].map(n => (
                                            <div key={n} className="lottery-ball w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-gray-800 shadow-sm">{n < 10 ? `0${n}` : n}</div>
                                        ))}
                                        <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center font-bold text-xl text-gray-500 shadow-sm">11</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ประกาศผลแล้ว</span>
                                    <button className="w-full md:w-auto px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">ดูรายละเอียด</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 flex flex-col gap-6">
                    {/* VIP Promo */}
                    <div 
                        onClick={() => setView(ViewState.VIP)}
                        className="relative group overflow-hidden rounded-xl aspect-[3/4] shadow-lg cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('https://picsum.photos/400/600')" }}></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h5 className="text-2xl font-black mb-2">สมัครสมาชิก VIP</h5>
                            <p className="text-sm text-gray-200 mb-4">รับสิทธิประโยชน์พิเศษและโบนัสสูงสุด 5,000 บาท</p>
                            <button className="bg-primary hover:bg-red-700 px-6 py-2 rounded-lg font-bold text-sm transition-colors">รับสิทธิ์เลย</button>
                        </div>
                    </div>

                    {/* Mobile App Promo */}
                    <div className="bg-primary rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="relative z-10">
                            <Smartphone className="mb-4" size={40} />
                            <h5 className="text-xl font-bold mb-2">เล่นง่ายผ่านมือถือ</h5>
                            <p className="text-sm opacity-90 mb-6">ดาวน์โหลดแอป Thaigrab ตรวจผลไว ทันใจ ทุกงวด</p>
                            <div className="flex gap-2">
                                <div className="bg-black/20 p-2 rounded flex-1 text-center text-[10px] font-bold cursor-pointer hover:bg-black/30">App Store</div>
                                <div className="bg-black/20 p-2 rounded flex-1 text-center text-[10px] font-bold cursor-pointer hover:bg-black/30">Play Store</div>
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-20 scale-150">
                            <QrCode size={120} />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};