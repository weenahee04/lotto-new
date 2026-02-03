import React, { useState } from 'react';
import { ViewState } from '../types';
import { Receipt, Calendar, Trophy, Clock, Search, ArrowRight, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface HistoryViewProps {
    setView: (view: ViewState) => void;
}

type TicketStatus = 'pending' | 'won' | 'lost';

interface TicketHistoryItem {
    id: string;
    game: string;
    gameId: 'powerball' | 'megamillions' | 'euromillions' | 'uklotto';
    flag: string;
    purchaseDate: string;
    drawDate: string;
    numbers: number[];
    specialNumbers: number[];
    price: number;
    status: TicketStatus;
    winAmount?: number;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ setView }) => {
    const [filter, setFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all');

    // Mock Data
    const tickets: TicketHistoryItem[] = [
        {
            id: 'TX-8849201',
            game: 'USA Powerball',
            gameId: 'powerball',
            flag: 'https://flagcdn.com/w40/us.png',
            purchaseDate: '23 Oct 2023, 10:30',
            drawDate: '24 Oct 2023',
            numbers: [18, 23, 35, 45, 54],
            specialNumbers: [7],
            price: 180,
            status: 'won',
            winAmount: 5000
        },
        {
            id: 'TX-8849202',
            game: 'Mega Millions',
            gameId: 'megamillions',
            flag: 'https://flagcdn.com/w40/us.png',
            purchaseDate: '23 Oct 2023, 10:35',
            drawDate: '25 Oct 2023',
            numbers: [5, 12, 28, 33, 49],
            specialNumbers: [14],
            price: 180,
            status: 'pending'
        },
        {
            id: 'TX-8849203',
            game: 'EuroMillions',
            gameId: 'euromillions',
            flag: 'https://flagcdn.com/w40/eu.png',
            purchaseDate: '20 Oct 2023, 14:15',
            drawDate: '21 Oct 2023',
            numbers: [2, 11, 25, 30, 41],
            specialNumbers: [4, 9],
            price: 160,
            status: 'lost'
        },
        {
            id: 'TX-8849204',
            game: 'USA Powerball',
            gameId: 'powerball',
            flag: 'https://flagcdn.com/w40/us.png',
            purchaseDate: '23 Oct 2023, 10:30',
            drawDate: '24 Oct 2023',
            numbers: [10, 22, 31, 40, 50],
            specialNumbers: [5],
            price: 180,
            status: 'pending'
        }
    ];

    const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

    const getStatusBadge = (status: TicketStatus) => {
        switch (status) {
            case 'won':
                return (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        <Trophy size={12} /> ถูกรางวัล
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">
                        <Clock size={12} /> รอผลรางวัล
                    </div>
                );
            case 'lost':
                return (
                    <div className="flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">
                        <XCircle size={12} /> ไม่ถูกรางวัล
                    </div>
                );
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Receipt className="text-primary" size={32} /> ประวัติการซื้อ
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">รายการสลากทั้งหมดที่คุณทำรายการซื้อ</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="ค้นหาเลขสลาก หรือ รหัส..."
                        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary w-full md:w-64"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    ทั้งหมด
                </button>
                <button 
                    onClick={() => setFilter('won')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'won' ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    ถูกรางวัล
                </button>
                <button 
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    รอผลรางวัล
                </button>
                <button 
                    onClick={() => setFilter('lost')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'lost' ? 'bg-gray-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    ไม่ถูกรางวัล
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredTickets.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <Receipt className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-gray-900">ไม่พบประวัติการซื้อ</h3>
                        <p className="text-gray-500 text-sm mb-6">คุณยังไม่มีรายการซื้อในสถานะนี้</p>
                        <button 
                            onClick={() => setView(ViewState.BUY)}
                            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            ซื้อสลากเลย
                        </button>
                    </div>
                ) : (
                    filteredTickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            {/* Decorative Status Bar */}
                            <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                                ticket.status === 'won' ? 'bg-green-500' : 
                                ticket.status === 'pending' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></div>

                            <div className="pl-4 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                {/* Left: Game Info */}
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center justify-between md:justify-start gap-4">
                                        <div className="flex items-center gap-3">
                                            <img src={ticket.flag} alt="flag" className="w-6 h-auto rounded shadow-sm" />
                                            <div>
                                                <h4 className="font-bold text-gray-900">{ticket.game}</h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="font-mono">{ticket.id}</span>
                                                    <span>•</span>
                                                    <span>{ticket.purchaseDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:hidden">
                                            {getStatusBadge(ticket.status)}
                                        </div>
                                    </div>

                                    {/* Numbers */}
                                    <div className="flex flex-wrap gap-2">
                                        {ticket.numbers.map((n, i) => (
                                            <span key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 font-bold text-gray-700 text-sm">
                                                {n}
                                            </span>
                                        ))}
                                        {ticket.specialNumbers.map((n, i) => (
                                            <span key={`s-${i}`} className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-sm shadow-sm border border-yellow-500">
                                                {n}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Status & Actions */}
                                <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                    <div className="text-right hidden md:block">
                                        {getStatusBadge(ticket.status)}
                                    </div>
                                    
                                    <div className="flex flex-col items-end">
                                        <div className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1">
                                            <Calendar size={12} /> งวดวันที่
                                        </div>
                                        <div className="font-bold text-gray-900">{ticket.drawDate}</div>
                                    </div>

                                    {ticket.status === 'won' && (
                                        <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-right w-full md:w-auto">
                                            <span className="text-[10px] uppercase font-bold text-green-600 block">เงินรางวัลที่ได้</span>
                                            <span className="text-xl font-black text-green-600">฿{ticket.winAmount?.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <button className="text-xs font-bold text-gray-400 hover:text-primary flex items-center gap-1 transition-colors">
                                        ดูใบสลาก <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};