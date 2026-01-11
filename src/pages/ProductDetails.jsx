import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/shop');
        }
    }, [id, products, navigate]);

    if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-primary mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div>
                    <div className="mb-2 text-primary font-bold uppercase tracking-wider text-sm">{product.category}</div>
                    <h1 className="text-4xl font-bold text-dark mb-4">{product.name}</h1>

                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">(24 reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description} Each piece is handmade with care, ensuring that no two items are exactly alike.
                        Lightweight and comfortable for all-day wear.
                    </p>

                    <div className="border-t border-b border-gray-200 py-6 mb-8">
                        <div className="flex items-center mb-4">
                            <span className="mr-4 font-bold">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-full">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100 rounded-l-full"
                                >
                                    -
                                </button>
                                <span className="px-4 font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-4 py-2 hover:bg-gray-100 rounded-r-full"
                                >
                                    +
                                </button>
                            </div>
                            <span className="ml-4 text-sm text-gray-500">{product.stock} items left</span>
                        </div>

                        <button
                            onClick={() => addToCart(product, quantity)}
                            disabled={product.stock === 0}
                            className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all transform active:scale-95 ${product.stock === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-primary text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            <ShoppingCart className="w-6 h-6 mr-2" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Truck className="w-5 h-5 mr-2 text-primary" />
                            <span>Free shipping over $50</span>
                        </div>
                        <div className="flex items-center">
                            <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
                            <span>Hypoallergenic materials</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
