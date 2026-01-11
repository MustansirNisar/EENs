import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.stock < 5 && product.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Low Stock
                    </span>
                )}
                {product.stock === 0 && (
                    <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Sold Out
                    </span>
                )}
            </Link>

            <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-dark hover:text-primary truncate mb-2">{product.name}</h3>
                </Link>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`p-2 rounded-full transition-colors ${product.stock === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-secondary hover:bg-primary hover:text-white text-dark'
                            }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
