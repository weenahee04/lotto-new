import React, { useState } from 'react';
import { ViewState, CartItem } from './types';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { BuyTicketView } from './views/BuyTicketView';
import { CheckoutView } from './views/CheckoutView';
import { VipView } from './views/VipView';
import { AuthView } from './views/AuthView';
import { HelpView } from './views/HelpView';
import { HistoryView } from './views/HistoryView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>(ViewState.HOME);
    const [cart, setCart] = useState<CartItem[]>([]);
    
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleLogin = (userData: any) => {
        setIsLoggedIn(true);
        setUser(userData);
        setView(ViewState.HOME);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setView(ViewState.HOME);
    };

    // Admin View renders without the public layout
    if (view === ViewState.ADMIN) {
        return <AdminView setView={setView} />;
    }

    const renderView = () => {
        switch (view) {
            case ViewState.HOME:
                return <HomeView setView={setView} />;
            case ViewState.BUY:
                return (
                    <BuyTicketView 
                        setView={setView} 
                        addToCart={addToCart} 
                        cart={cart}
                        removeFromCart={removeFromCart}
                    />
                );
            case ViewState.CHECKOUT:
                return <CheckoutView setView={setView} cart={cart} clearCart={clearCart} />;
            case ViewState.VIP:
                return <VipView setView={setView} />;
            case ViewState.LOGIN:
                return <AuthView setView={setView} onLogin={handleLogin} initialMode="login" />;
            case ViewState.REGISTER:
                return <AuthView setView={setView} onLogin={handleLogin} initialMode="register" />;
            case ViewState.HELP:
                return <HelpView setView={setView} />;
            case ViewState.HISTORY:
                return <HistoryView setView={setView} />;
            case ViewState.PROFILE:
                return <ProfileView setView={setView} user={user} onLogout={handleLogout} />;
            default:
                return <HomeView setView={setView} />;
        }
    };

    return (
        <Layout 
            currentView={view} 
            setView={setView} 
            cartCount={cart.length}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
        >
            {renderView()}
        </Layout>
    );
};

export default App;