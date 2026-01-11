import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Eens</h3>
                        <p className="text-gray-400 text-sm">
                            Handcrafted acrylic clay jewelry, made with love and attention to detail. Unique pieces for unique people.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/shop" className="hover:text-primary">All Products</a></li>
                            <li><a href="/shop?category=Earrings" className="hover:text-primary">Earrings</a></li>
                            <li><a href="/shop?category=Rings" className="hover:text-primary">Rings</a></li>
                            <li><a href="/shop?category=Bracelets" className="hover:text-primary">Bracelets</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Customer Care</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-primary">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Eens Jewelry. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
