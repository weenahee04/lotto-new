import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
    MessageCircle, Phone, Mail, HelpCircle, ChevronDown, ChevronUp, 
    Wallet, QrCode, Smartphone, CheckCircle2, ArrowRight, Send
} from 'lucide-react';

interface HelpViewProps {
    setView: (view: ViewState) => void;
}

type Tab = 'contact' | 'faq' | 'topup';

export const HelpView: React.FC<HelpViewProps> = ({ setView }) => {
    const [activeTab, setActiveTab] = useState<Tab>('contact');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "ถูกรางวัลแล้วจะขึ้นเงินอย่างไร?",
            a: "เงินรางวัลจะถูกโอนเข้า 'กระเป๋าเครดิต' ของท่านโดยอัตโนมัติทันทีที่ผลรางวัลประกาศ ท่านสามารถกดถอนเงินเข้าบัญชีธนาคารที่ผูกไว้ได้ตลอด 24 ชั่วโมง โดยไม่มีขั้นต่ำ"
        },
        {
            q: "ซื้อสลากออนไลน์กับ Thaigrab ปลอดภัยหรือไม่?",
            a: "ปลอดภัย 100% เราเป็นแพลตฟอร์มที่จดทะเบียนถูกต้องตามกฎหมาย มีใบรับรอง DBD และใช้ระบบความปลอดภัยมาตรฐานเดียวกับธนาคาร (SSL Encryption) สลากทุกใบมีตัวจริงยืนยัน"
        },
        {
            q: "มีค่าธรรมเนียมในการฝาก-ถอน หรือไม่?",
            a: "การเติมเงินเครดิตฟรีไม่มีค่าธรรมเนียม สำหรับการถอนเงิน อาจมีค่าธรรมเนียม 10-15 บาท ขึ้นอยู่กับธนาคารปลายทางของท่าน"
        },
        {
            q: "สามารถยกเลิกโพยหลังจากกดซื้อไปแล้วได้หรือไม่?",
            a: "ท่านสามารถกดยกเลิกโพยได้ภายใน 30 นาทีหลังจากทำรายการซื้อ และต้องเป็นเวลาก่อนหวยปิดรับแทงอย่างน้อย 1 ชั่วโมง"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-4">ศูนย์ช่วยเหลือสมาชิก</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    มีคำถามหรือปัญหาการใช้งาน? ทีมงาน Thaigrab พร้อมดูแลคุณตลอด 24 ชั่วโมง 
                    เลือกหัวข้อที่คุณต้องการความช่วยเหลือด้านล่าง
                </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex flex-wrap justify-center gap-1">
                    <button 
                        onClick={() => setActiveTab('contact')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'contact' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <MessageCircle size={18} /> ติดต่อเรา
                    </button>
                    <button 
                        onClick={() => setActiveTab('faq')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'faq' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <HelpCircle size={18} /> คำถามที่พบบ่อย
                    </button>
                    <button 
                        onClick={() => setActiveTab('topup')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'topup' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Wallet size={18} /> วิธีเติมเงิน
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                
                {/* Contact Us Tab */}
                {activeTab === 'contact' && (
                    <div className="p-8 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-6">ช่องทางการติดต่อ</h3>
                                <div className="space-y-6">
                                    <div className="bg-[#06C755]/10 p-6 rounded-xl border border-[#06C755]/20 hover:bg-[#06C755]/20 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center text-white text-2xl font-black">
                                                L
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#06C755] group-hover:underline">LINE Official Account</h4>
                                                <p className="text-sm text-gray-600">แอดไลน์ @thaigrab (มี @ นำหน้า)</p>
                                                <p className="text-xs text-gray-400 mt-1">ตอบกลับภายใน 5 นาที (24 ชม.)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white">
                                                <MessageCircle size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1877F2] group-hover:underline">Facebook Page</h4>
                                                <p className="text-sm text-gray-600">Thaigrab Lottery Online</p>
                                                <p className="text-xs text-gray-400 mt-1">ติดตามข่าวสารและโปรโมชั่น</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 p-4 rounded-xl border border-gray-200">
                                            <Phone className="text-primary mb-2" />
                                            <p className="text-xs text-gray-400 font-bold uppercase">Call Center</p>
                                            <p className="font-bold">02-123-4567</p>
                                        </div>
                                        <div className="flex-1 p-4 rounded-xl border border-gray-200">
                                            <Mail className="text-primary mb-2" />
                                            <p className="text-xs text-gray-400 font-bold uppercase">Email Support</p>
                                            <p className="font-bold">support@thaigrab.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Send size={20} className="text-primary" /> ส่งข้อความถึงเรา
                                </h3>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">หัวข้อติดต่อ</label>
                                        <select className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                            <option>แจ้งปัญหาการเติมเงิน</option>
                                            <option>แจ้งปัญหาการถอนเงิน</option>
                                            <option>สอบถามเรื่องโปรโมชั่น</option>
                                            <option>อื่นๆ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">เบอร์โทรศัพท์ติดต่อกลับ</label>
                                        <input type="tel" className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="08x-xxx-xxxx" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">ข้อความ</label>
                                        <textarea rows={4} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="รายละเอียดปัญหา..."></textarea>
                                    </div>
                                    <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
                                        ส่งข้อความ
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <div className="p-8 max-w-3xl mx-auto animate-in fade-in duration-300">
                        <h3 className="text-2xl font-bold mb-6 text-center">คำถามที่สมาชิกถามบ่อย</h3>
                        <div className="space-y-4">
                            {faqs.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button 
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 text-left transition-colors"
                                    >
                                        <span className="font-bold text-gray-900">{item.q}</span>
                                        {openFaqIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-400" />}
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <p className="font-bold text-blue-900 mb-2">ไม่พบคำตอบที่คุณต้องการ?</p>
                            <button onClick={() => setActiveTab('contact')} className="text-primary font-bold hover:underline">
                                ติดต่อเจ้าหน้าที่ได้ทันที
                            </button>
                        </div>
                    </div>
                )}

                {/* Top Up Tab */}
                {activeTab === 'topup' && (
                    <div className="p-8 animate-in fade-in duration-300">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold mb-8 text-center">วิธีเติมเงินเข้าระบบ (อัตโนมัติ)</h3>
                            
                            <div className="relative">
                                {/* Connector Line */}
                                <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 hidden md:block"></div>

                                <div className="space-y-12 relative z-10">
                                    {/* Step 1 */}
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="flex-1 text-center md:text-right">
                                            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase mb-2">Step 1</div>
                                            <h4 className="font-bold text-xl mb-2">เข้าสู่หน้ากระเป๋าเงิน</h4>
                                            <p className="text-sm text-gray-500">
                                                ล็อกอินเข้าสู่ระบบ กดที่ไอคอน <span className="font-bold text-gray-900">"กระเป๋าเงิน"</span> หรือยอดเงินคงเหลือที่มุมขวาบนของหน้าจอ
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/30 shrink-0">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 max-w-xs mx-auto md:mx-0">
                                                <Wallet size={48} className="text-gray-400 mx-auto" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase mb-2">Step 2</div>
                                            <h4 className="font-bold text-xl mb-2">ระบุจำนวนเงิน</h4>
                                            <p className="text-sm text-gray-500">
                                                เลือกเมนู <span className="font-bold text-gray-900">"ฝากเงิน"</span> ระบุจำนวนเงินที่ต้องการ (ขั้นต่ำ 100 บาท) และเลือกช่องทาง <span className="font-bold text-gray-900">QR PromptPay</span>
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 max-w-xs mx-auto md:mx-0 text-center">
                                                <div className="text-2xl font-bold font-mono bg-white rounded p-2 border border-gray-200 inline-block">฿500.00</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="flex-1 text-center md:text-right">
                                            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase mb-2">Step 3</div>
                                            <h4 className="font-bold text-xl mb-2">สแกนจ่ายเงิน</h4>
                                            <p className="text-sm text-gray-500">
                                                ระบบจะแสดง QR Code ขึ้นมา ให้ท่านใช้แอปธนาคาร <span className="font-bold text-gray-900">สแกนจ่าย</span> ภายในเวลาที่กำหนด
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 max-w-xs mx-auto md:mx-0 flex justify-center">
                                                <QrCode size={48} className="text-gray-800" />
                                            </div>
                                        </div>
                                    </div>

                                     {/* Step 4 */}
                                     <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase mb-2">Finish</div>
                                            <h4 className="font-bold text-xl mb-2">รอปรับยอดอัตโนมัติ</h4>
                                            <p className="text-sm text-gray-500">
                                                เมื่อโอนเสร็จสิ้น ระบบจะตรวจสอบและปรับยอดเครดิตให้ท่านภายใน <span className="font-bold text-green-600">30 วินาที</span>
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-green-50 p-4 rounded-xl border border-green-200 max-w-xs mx-auto md:mx-0 text-center">
                                                <div className="text-green-700 font-bold flex items-center justify-center gap-2">
                                                    <CheckCircle2 size={16} /> ยอดเงินเข้าแล้ว
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};