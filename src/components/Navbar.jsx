import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LogOut } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useContext(ShopContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-primary tracking-tighter">
                    Eens
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className="text-dark hover:text-primary transition-colors font-medium">Home</Link>
                    <Link to="/shop" className="text-dark hover:text-primary transition-colors font-medium">Shop</Link>
                    <Link to="/about" className="text-dark hover:text-primary transition-colors font-medium">About</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-8 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-primary text-sm"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
                    </div>

                    <button onClick={() => setIsCartOpen(true)} className="relative text-dark hover:text-primary transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-dark hover:text-primary">
                                <User className="w-6 h-6" />
                                <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <button
                                    onClick={() => { logout(); navigate('/login'); }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2" /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="text-dark hover:text-primary font-medium text-sm">
                            Login
                        </Link>
                    )}

                    <button className="md:hidden text-dark">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
