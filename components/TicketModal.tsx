import React from 'react';
import { X, Lock, Download, CheckCircle2 } from 'lucide-react';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary" size={24} />
                        <h3 className="text-xl font-bold text-gray-900">ภาพสแกนสลากตัวจริง</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Ticket Visual */}
                    <div className="relative ticket-pattern border border-gray-300 shadow-inner rounded-md overflow-hidden p-6 mb-6">
                        {/* Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-6xl font-black text-primary opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
                            THAIGRAB VERIFIED
                        </div>

                        {/* Ticket Content */}
                        <div className="flex flex-col items-center mb-6 border-b-2 border-dashed border-gray-200 pb-4">
                            <h4 className="text-4xl font-black text-red-600 italic tracking-tighter mb-1">POWERBALL</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OFFICIAL PLAY TICKET - STATE OF FLORIDA</p>
                        </div>

                        <div className="space-y-4 mb-6 px-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-400">A. QP</span>
                                <div className="flex gap-3 font-mono text-2xl font-black text-gray-800">
                                    <span>18</span>
                                    <span>23</span>
                                    <span>35</span>
                                    <span>45</span>
                                    <span>54</span>
                                    <span className="text-primary bg-primary/10 rounded px-1">07</span>
                                </div>
                                <span className="text-xs font-bold text-gray-400">$2.00</span>
                            </div>
                            <div className="flex items-center justify-between opacity-30">
                                <span className="text-sm font-bold text-gray-400">B. QP</span>
                                <div className="flex gap-3 font-mono text-2xl font-black text-gray-800">
                                    <span>04</span>
                                    <span>12</span>
                                    <span>29</span>
                                    <span>44</span>
                                    <span>52</span>
                                    <span className="text-primary">19</span>
                                </div>
                                <span className="text-xs font-bold text-gray-400">$2.00</span>
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                <span>DRAW ID: #PB-2023-OCT-23</span>
                                <span>TRANS: 08849-2993-2101</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                <span>DATE: OCT 21, 2023 14:32 ET</span>
                                <span>TERMINAL: #99402</span>
                            </div>
                            
                            {/* Barcode Simulation */}
                            <div className="pt-4 flex flex-col items-center">
                                <div className="h-12 w-3/4 bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px)] opacity-80 mb-1"></div>
                                <span className="text-[9px] font-mono tracking-[0.4em] text-gray-400">000492837492019283</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Box */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">รหัสการซื้อ (Draw ID)</p>
                            <p className="text-sm font-bold text-gray-900">PB-2023-OCT-23</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">วันที่ซื้อ (Purchase Date)</p>
                            <p className="text-sm font-bold text-gray-900">21 ต.ค. 2023, 14:32</p>
                        </div>
                        <div className="col-span-2 pt-2 mt-2 border-t border-gray-200">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">สถานะสลาก</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-bold text-green-600">เก็บรักษาที่สำนักงานปลอดภัย (Security Vault)</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20">
                            <Download size={18} />
                            ดาวน์โหลดไฟล์ PDF
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all"
                        >
                            ปิดหน้าต่าง
                        </button>
                    </div>
                </div>

                <div className="px-6 py-3 bg-gray-100 flex items-center justify-center gap-2 border-t border-gray-200">
                    <Lock size={12} className="text-gray-400" />
                    <p className="text-[10px] text-gray-500 font-medium">เอกสารฉบับนี้เป็นกรรมสิทธิ์ของสมาชิก Thaigrab อย่างถูกต้องตามกฎหมาย</p>
                </div>
            </div>
        </div>
    );
};