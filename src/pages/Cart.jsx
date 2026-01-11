import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    to="/shop"
                    className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-grow">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 font-bold text-sm text-gray-600">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {cart.map(item => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center">
                                <div className="col-span-1 md:col-span-6 flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                    <div>
                                        <h3 className="font-bold text-dark">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-xs hover:underline mt-1 flex items-center md:hidden"
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 text-center font-medium">
                                    ${item.price.toFixed(2)}
                                </div>

                                <div className="col-span-1 md:col-span-2 flex justify-center">
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 hover:bg-gray-100 rounded-l-full"
                                        >
                                            -
                                        </button>
                                        <span className="px-2 text-sm font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 hover:bg-gray-100 rounded-r-full"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 text-right font-bold text-primary flex justify-between md:block items-center">
                                    <span className="md:hidden text-gray-500 font-normal">Subtotal:</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full hidden md:inline-block ml-2 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={clearCart}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Clear Cart
                        </button>
                        <Link to="/shop" className="text-primary font-bold hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax Estimate</span>
                                <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold mb-8">
                            <span>Total</span>
                            <span className="text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center"
                        >
                            Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
