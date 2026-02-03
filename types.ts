export interface LotteryResult {
    id: string;
    name: string;
    date: string;
    numbers: number[];
    specialNumber: number;
    specialType: 'powerball' | 'megaball' | 'star';
    status: 'completed' | 'pending';
}

export interface CartItem {
    id: string;
    name: string;
    type: string;
    numbers: number[];
    specialNumbers: number[];
    price: number;
    draws: number;
    drawDate?: string;
}

export enum ViewState {
    HOME = 'HOME',
    BUY = 'BUY',
    CHECKOUT = 'CHECKOUT',
    VIP = 'VIP',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    HELP = 'HELP',
    HISTORY = 'HISTORY',
    PROFILE = 'PROFILE',
    ADMIN = 'ADMIN'
}