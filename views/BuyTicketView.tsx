import React, { useState, useEffect } from 'react';
import { ViewState, CartItem } from '../types';
import { Zap, Trash2, ChevronRight, X, ShoppingBasket, TrendingUp, CalendarClock, Check, Calendar } from 'lucide-react';

interface BuyTicketViewProps {
    setView: (view: ViewState) => void;
    addToCart: (item: CartItem) => void;
    cart: CartItem[];
    removeFromCart: (id: string) => void;
}

type GameId = 'powerball' | 'megamillions' | 'euromillions' | 'uklotto';

interface GameConfig {
    id: GameId;
    name: string;
    flag: string;
    mainRange: number;
    mainCount: number;
    specialRange: number;
    specialCount: number;
    specialLabel: string | null;
    price: number;
    jackpot: string;
    color: string;
    bgColor: string;
    accentColor: string;
    drawDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
}

const GAMES: Record<GameId, GameConfig> = {
    powerball: {
        id: 'powerball',
        name: 'USA Powerball',
        flag: 'https://flagcdn.com/w40/us.png',
        mainRange: 69,
        mainCount: 5,
        specialRange: 26,
        specialCount: 1,
        specialLabel: 'Powerball',
        price: 180,
        jackpot: '฿16,500,000,000',
        color: 'bg-primary',
        bgColor: 'bg-red-50',
        accentColor: 'text-primary',
        drawDays: [1, 3, 6] // Mon, Wed, Sat
    },
    megamillions: {
        id: 'megamillions',
        name: 'Mega Millions',
        flag: 'https://flagcdn.com/w40/us.png',
        mainRange: 70,
        mainCount: 5,
        specialRange: 25,
        specialCount: 1,
        specialLabel: 'Mega Ball',
        price: 180,
        jackpot: '฿14,200,000,000',
        color: 'bg-indigo-900',
        bgColor: 'bg-indigo-50',
        accentColor: 'text-indigo-900',
        drawDays: [2, 5] // Tue, Fri
    },
    euromillions: {
        id: 'euromillions',
        name: 'EuroMillions',
        flag: 'https://flagcdn.com/w40/eu.png',
        mainRange: 50,
        mainCount: 5,
        specialRange: 12,
        specialCount: 2,
        specialLabel: 'Lucky Stars',
        price: 160,
        jackpot: '฿6,200,000,000',
        color: 'bg-blue-900',
        bgColor: 'bg-blue-50',
        accentColor: 'text-blue-900',
        drawDays: [2, 5] // Tue, Fri
    },
    uklotto: {
        id: 'uklotto',
        name: 'UK Lotto',
        flag: 'https://flagcdn.com/w40/gb.png',
        mainRange: 59,
        mainCount: 6,
        specialRange: 0,
        specialCount: 0,
        specialLabel: null,
        price: 100,
        jackpot: '฿850,000,000',
        color: 'bg-red-700',
        bgColor: 'bg-red-50',
        accentColor: 'text-red-700',
        drawDays: [3, 6] // Wed, Sat
    }
};

export const BuyTicketView: React.FC<BuyTicketViewProps> = ({ setView, addToCart, cart, removeFromCart }) => {
    const [activeGameId, setActiveGameId] = useState<GameId>('powerball');
    const [selectedMainNumbers, setSelectedMainNumbers] = useState<number[]>([]);
    const [selectedSpecialNumbers, setSelectedSpecialNumbers] = useState<number[]>([]);
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
    
    // Purchase Mode: 'single' (allows picking 1 specific date) or 'bundle' (all draws in 7 days)
    const [purchaseMode, setPurchaseMode] = useState<'single' | 'bundle'>('single');
    
    // For 'single' mode: index of the selected date from the available list
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
    
    // Calculated available draw dates
    const [availableDates, setAvailableDates] = useState<Date[]>([]);

    const activeGame = GAMES[activeGameId];

    // Reset and Recalculate dates when game changes
    useEffect(() => {
        setSelectedMainNumbers([]);
        setSelectedSpecialNumbers([]);
        setPurchaseMode('single');
        setSelectedDateIndex(0);

        // Calculate upcoming draw dates for the next 8 days (to ensure full week coverage)
        const dates: Date[] = [];
        const today = new Date();
        // Start looking from "today" (or tomorrow if cut-off passed, simplifying to today for demo)
        for (let i = 0; i < 8; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            if (activeGame.drawDays.includes(d.getDay())) {
                dates.push(d);
            }
        }
        setAvailableDates(dates);
    }, [activeGameId]);

    const toggleMainNumber = (num: number) => {
        if (selectedMainNumbers.includes(num)) {
            setSelectedMainNumbers(selectedMainNumbers.filter(n => n !== num));
        } else {
            if (selectedMainNumbers.length < activeGame.mainCount) {
                setSelectedMainNumbers([...selectedMainNumbers, num].sort((a, b) => a - b));
            }
        }
    };

    const toggleSpecialNumber = (num: number) => {
        if (selectedSpecialNumbers.includes(num)) {
            setSelectedSpecialNumbers(selectedSpecialNumbers.filter(n => n !== num));
        } else {
            if (selectedSpecialNumbers.length < activeGame.specialCount) {
                setSelectedSpecialNumbers([...selectedSpecialNumbers, num].sort((a, b) => a - b));
            }
        }
    };

    const quickPick = () => {
        const mainNums = new Set<number>();
        while(mainNums.size < activeGame.mainCount) {
            mainNums.add(Math.floor(Math.random() * activeGame.mainRange) + 1);
        }
        setSelectedMainNumbers(Array.from(mainNums).sort((a, b) => a - b));

        if (activeGame.specialCount > 0) {
            const specialNums = new Set<number>();
            while(specialNums.size < activeGame.specialCount) {
                specialNums.add(Math.floor(Math.random() * activeGame.specialRange) + 1);
            }
            setSelectedSpecialNumbers(Array.from(specialNums).sort((a, b) => a - b));
        }
    };

    const clear = () => {
        setSelectedMainNumbers([]);
        setSelectedSpecialNumbers([]);
    };

    // Calculation logic
    const currentDraws = purchaseMode === 'bundle' ? availableDates.length : 1;
    const currentPrice = activeGame.price * currentDraws;
    const selectedDrawDate = availableDates[selectedDateIndex];

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    const handleAddToCart = () => {
        const isMainComplete = selectedMainNumbers.length === activeGame.mainCount;
        const isSpecialComplete = selectedSpecialNumbers.length === activeGame.specialCount;

        if (isMainComplete && isSpecialComplete) {
            addToCart({
                id: Math.random().toString(36).substr(2, 9),
                name: activeGame.name,
                type: purchaseMode === 'bundle' ? '7-Day Package' : 'Standard Play',
                numbers: selectedMainNumbers,
                specialNumbers: selectedSpecialNumbers,
                price: currentPrice,
                draws: currentDraws,
                drawDate: purchaseMode === 'single' && selectedDrawDate ? formatDate(selectedDrawDate) : undefined
            });
            clear();
            // Reset to default
            setPurchaseMode('single');
            setSelectedDateIndex(0);
        }
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

    // Reusable Cart List Component Logic
    const CartList = () => (
        <div className="space-y-4">
            {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p>ยังไม่มีรายการในตะกร้า</p>
                </div>
            ) : (
                cart.map((item, index) => (
                    <div key={item.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 relative group">
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -top-2 -right-2 bg-white shadow-sm border border-gray-200 rounded-full p-1 text-gray-400 hover:text-red-500 transition-opacity z-10"
                        >
                            <X size={14} />
                        </button>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{item.name} #{index + 1}</span>
                                {/* Display Logic for Draws/Date */}
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {item.drawDate ? (
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">
                                            <Calendar size={10} /> {item.drawDate}
                                        </span>
                                    ) : item.draws > 1 && (
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            <CalendarClock size={10} /> {item.draws} งวด
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-primary">฿{item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-1.5 mb-2 flex-wrap">
                            {item.numbers.map(n => (
                                <div key={n} className="w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold">{n}</div>
                            ))}
                            {item.specialNumbers.map(n => (
                                <div key={n} className="w-7 h-7 bg-yellow-400 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">{n}</div>
                            ))}
                        </div>
                        <div className="text-[10px] text-gray-500">ประเภท: {item.type}</div>
                    </div>
                ))
            )}
        </div>
    );

    // Reusable Summary Logic
    const CartSummary = () => (
        <div className="space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">ยอดรวมสลาก</span>
                <span className="font-bold">฿{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">ส่วนลด (0%)</span>
                <span className="text-green-500 font-bold">- ฿0.00</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
                <span className="font-bold text-gray-900">ยอดชำระสุทธิ</span>
                <div className="text-right">
                    <span className="block text-2xl font-black text-primary leading-none">฿{cartTotal.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 uppercase">Includes Taxes</span>
                </div>
            </div>
            <button 
                onClick={() => setView(ViewState.CHECKOUT)}
                disabled={cart.length === 0}
                className={`w-full mt-4 py-4 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                    cart.length > 0 ? 'bg-primary text-white hover:bg-red-700 shadow-primary/30' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                ยืนยันการสั่งซื้อ <ChevronRight size={20} />
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-32 lg:pb-6">
            {/* Game Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                {Object.values(GAMES).map((game) => (
                    <button
                        key={game.id}
                        onClick={() => setActiveGameId(game.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${
                            activeGameId === game.id 
                            ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <img src={game.flag} alt={game.name} className="w-5 h-auto rounded-sm" />
                        <span className="font-bold text-sm">{game.name}</span>
                    </button>
                ))}
            </div>

            {/* Hero Header */}
            <div className={`relative w-full rounded-2xl ${activeGame.color} overflow-hidden mb-8 shadow-xl transition-colors duration-500`}>
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0 0 L100 0 L100 100 L0 100 Z" />
                    </svg>
                </div>
                <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between text-white text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Global Jackpot</span>
                            <span className="flex items-center gap-1 text-yellow-300 font-bold text-sm">
                                <TrendingUp size={16} /> Hot Sale
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic mb-2 tracking-tight uppercase">{activeGame.name}</h2>
                        <p className="text-lg md:text-2xl font-medium opacity-90">เงินรางวัลแจ็กพอตพุ่งสูงถึง <span className="text-yellow-300 font-black">{activeGame.jackpot}</span></p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                         <div className="text-center">
                            <p className="text-sm font-bold uppercase opacity-80 mb-2">ปิดรับแทงในอีก</p>
                            <div className="flex gap-3">
                                <div className="bg-black/30 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-white/10 min-w-[60px] sm:min-w-[70px]">
                                    <span className="block text-xl sm:text-3xl font-black">01</span>
                                    <span className="text-[10px] uppercase font-bold opacity-60">Day</span>
                                </div>
                                <div className="bg-black/30 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-white/10 min-w-[60px] sm:min-w-[70px]">
                                    <span className="block text-xl sm:text-3xl font-black">12</span>
                                    <span className="text-[10px] uppercase font-bold opacity-60">Hrs</span>
                                </div>
                                <div className="bg-black/30 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-white/10 min-w-[60px] sm:min-w-[70px]">
                                    <span className="block text-xl sm:text-3xl font-black">45</span>
                                    <span className="text-[10px] uppercase font-bold opacity-60">Min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Number Selection Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">เลือกตัวเลขของคุณ</h3>
                                <p className="text-gray-500 text-xs sm:text-sm italic">
                                    เลือกหมายเลขหลัก {activeGame.mainCount} ตัว 
                                    {activeGame.specialCount > 0 && ` และ ${activeGame.specialLabel} ${activeGame.specialCount} ตัว`}
                                </p>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button 
                                    onClick={quickPick}
                                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 ${activeGame.bgColor} ${activeGame.accentColor} rounded-lg font-bold text-sm hover:opacity-80 transition-colors`}
                                >
                                    <Zap size={18} /> สุ่มเลข
                                </button>
                                <button 
                                    onClick={clear}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
                                >
                                    <Trash2 size={18} /> ล้างค่า
                                </button>
                            </div>
                        </div>

                        {/* Main Numbers */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500">1</div>
                                <h4 className="font-bold text-base sm:text-lg">หมายเลขหลัก <span className={activeGame.accentColor}>(เลือก {activeGame.mainCount})</span></h4>
                            </div>
                            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 sm:gap-3">
                                {Array.from({ length: activeGame.mainRange }, (_, i) => i + 1).map(num => (
                                    <button
                                        key={num}
                                        onClick={() => toggleMainNumber(num)}
                                        className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold transition-all text-sm sm:text-base ${
                                            selectedMainNumbers.includes(num)
                                            ? `${activeGame.color} text-white shadow-lg scale-110`
                                            : `border border-gray-200 text-gray-700 hover:border-gray-400 hover:${activeGame.accentColor} bg-white`
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Special Numbers (Conditional) */}
                        {activeGame.specialCount > 0 && (
                            <div className={`mb-8 p-4 sm:p-6 ${activeGame.bgColor} rounded-2xl border border-gray-100`}>
                                 <div className="flex items-center gap-2 mb-6">
                                    <div className={`w-8 h-8 rounded-lg ${activeGame.color} flex items-center justify-center font-bold text-white shadow-sm`}>2</div>
                                    <h4 className={`font-bold text-base sm:text-lg ${activeGame.accentColor}`}>{activeGame.specialLabel} <span className="opacity-70">(เลือก {activeGame.specialCount})</span></h4>
                                </div>
                                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 sm:gap-3">
                                    {Array.from({ length: activeGame.specialRange }, (_, i) => i + 1).map(num => (
                                        <button
                                            key={num}
                                            onClick={() => toggleSpecialNumber(num)}
                                            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold transition-all text-sm sm:text-base ${
                                                selectedSpecialNumbers.includes(num)
                                                ? 'bg-yellow-400 text-white ring-4 ring-yellow-100 scale-110'
                                                : `border border-gray-200 text-gray-600 hover:bg-white bg-white`
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Draw Date Selection & Advance Play */}
                        <div className="mb-8 p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <CalendarClock className="text-gray-900" size={24} />
                                <h4 className="font-bold text-base sm:text-lg text-gray-900">เลือกวันที่ต้องการเล่น <span className="text-sm font-normal text-gray-500 hidden sm:inline">(Advance Play)</span></h4>
                            </div>

                            {/* Mode Toggles */}
                            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                <button 
                                    onClick={() => setPurchaseMode('single')}
                                    className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${purchaseMode === 'single' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    เลือกวันเดียว
                                </button>
                                <button 
                                    onClick={() => setPurchaseMode('bundle')}
                                    className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${purchaseMode === 'bundle' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    เหมา 7 วัน
                                </button>
                            </div>

                            {/* Specific Draw Selection (Only in Single Mode) */}
                            {purchaseMode === 'single' ? (
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">รอบถัดไปและล่วงหน้า 7 วัน</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {availableDates.map((date, idx) => (
                                            <div 
                                                key={idx}
                                                onClick={() => setSelectedDateIndex(idx)}
                                                className={`cursor-pointer p-3 rounded-xl border-2 transition-all relative overflow-hidden ${
                                                    selectedDateIndex === idx 
                                                    ? `${activeGame.bgColor} ${activeGame.accentColor} border-current` 
                                                    : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                                                }`}
                                            >
                                                {idx === 0 && (
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl">NEXT</div>
                                                )}
                                                <div className="text-xs font-normal opacity-70 mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                                                <div className="text-sm font-bold">{date.getDate()} {date.toLocaleDateString('th-TH', { month: 'short' })}</div>
                                                {selectedDateIndex === idx && (
                                                    <div className="absolute bottom-2 right-2">
                                                        <Check size={14} strokeWidth={4} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                                        <Calendar size={14} />
                                        งวดวันที่: <span className="font-bold text-gray-900">{availableDates[selectedDateIndex]?.toLocaleDateString('th-TH', { dateStyle: 'long' })}</span>
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                                    <div>
                                        <h5 className="font-bold text-gray-900 flex items-center gap-2">
                                            แพ็กเกจสุดคุ้ม 7 วัน
                                            <span className="bg-yellow-400 text-[10px] text-black px-2 py-0.5 rounded-full">POPULAR</span>
                                        </h5>
                                        <p className="text-sm text-gray-500 mt-1">ครอบคลุมการออกรางวัลทั้งหมด {availableDates.length} งวด ในสัปดาห์นี้</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-2xl font-black text-gray-900">{availableDates.length}</span>
                                        <span className="text-[10px] uppercase font-bold text-gray-400">Draws</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="border-t border-gray-100 pt-8 flex justify-end">
                            <button 
                                onClick={handleAddToCart}
                                disabled={selectedMainNumbers.length !== activeGame.mainCount || selectedSpecialNumbers.length !== activeGame.specialCount}
                                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                                    selectedMainNumbers.length === activeGame.mainCount && selectedSpecialNumbers.length === activeGame.specialCount
                                    ? 'bg-gray-900 hover:bg-black shadow-lg' 
                                    : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <ShoppingBasket size={20} />
                                เพิ่มลงตะกร้า (+฿{currentPrice.toLocaleString()})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Cart Sidebar */}
                <aside className="hidden lg:block w-96 shrink-0">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h5 className="text-xl font-bold flex items-center gap-2">
                                    <ShoppingBasket className="text-primary" />
                                    รายการสั่งซื้อ
                                </h5>
                                <span className="bg-primary/10 text-primary text-xs font-black px-2 py-1 rounded">{cart.length} ใบ</span>
                            </div>
                        </div>

                        {/* Cart Items List - Desktop */}
                        <div className="p-6 max-h-[400px] overflow-y-auto">
                            <CartList />
                        </div>

                        {/* Summary Footer */}
                        <div className="p-6 bg-white border-t border-gray-100">
                            <CartSummary />
                        </div>
                    </div>
                </aside>

                {/* Mobile Floating Action Bar */}
                {cart.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-40 lg:hidden flex items-center justify-between pb-safe animate-in slide-in-from-bottom">
                        <div onClick={() => setIsMobileCartOpen(true)} className="flex flex-col cursor-pointer">
                            <span className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                                <ShoppingBasket size={12} /> {cart.length} Items <span className="text-gray-300">|</span> View Cart
                            </span>
                            <div className="text-xl font-black text-primary">฿{cartTotal.toFixed(2)}</div>
                        </div>
                        <button
                            onClick={() => setView(ViewState.CHECKOUT)}
                            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md"
                        >
                            Checkout <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Mobile Cart Sheet Overlay */}
                {isMobileCartOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileCartOpen(false)}></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300 pb-safe shadow-2xl">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
                                <h5 className="font-bold text-lg flex items-center gap-2 text-gray-900"><ShoppingBasket className="text-primary"/> ตะกร้าสินค้าของคุณ</h5>
                                <button onClick={() => setIsMobileCartOpen(false)} className="p-2 bg-white border border-gray-200 rounded-full text-gray-500"><X size={20}/></button>
                            </div>
                            
                            {/* Scrollable Content */}
                            <div className="p-4 overflow-y-auto flex-1">
                                <CartList />
                            </div>
                            
                            {/* Footer Summary */}
                            <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <CartSummary />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};