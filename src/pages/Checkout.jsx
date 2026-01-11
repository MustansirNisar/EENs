import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(ShopContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Redirect if cart is empty
    if (cart.length === 0 && !isSuccess) {
        navigate('/cart');
        return null;
    }

    // Redirect if not logged in
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Please Login to Checkout</h2>
                <p className="mb-8">You need to be registered to place an order.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            orderId: `ORD-${Date.now()}`,
            customer: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                address: `${formData.address}, ${formData.city} ${formData.zip}`,
                phone: formData.phone
            },
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total: (cartTotal * 1.08).toFixed(2),
            date: new Date().toISOString()
        };

        // Simulate Google Sheets API call
        console.log("Submitting Order to Google Sheets:", orderData);

        // In a real app, this would be:
        // await fetch('YOUR_GOOGLE_SHEETS_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(orderData) });

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-lg">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase, {formData.firstName}. We have sent a confirmation email to {formData.email}.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                required
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                <input
                                    required
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full mt-8 bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-6">Your Order</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-white p-1 rounded border border-gray-200 mr-3 relative">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.category}</p>
                                    </div>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
