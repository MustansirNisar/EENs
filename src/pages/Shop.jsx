import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

const Shop = () => {
    const { products } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(50);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Get category from URL on load
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Filter logic
    useEffect(() => {
        let result = products;

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);
    }, [products, selectedCategory, priceRange]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchParams(category === 'All' ? {} : { category });
    };

    const categories = ['All', 'Earrings', 'Rings', 'Bracelets', 'Necklaces', 'Hair Clips', 'Brooches'];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                        <h3 className="font-bold text-lg mb-4 flex items-center">
                            <Filter className="w-5 h-5 mr-2" /> Filters
                        </h3>

                        <div className="mb-8">
                            <h4 className="font-medium mb-3">Category</h4>
                            <ul className="space-y-2">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`text-sm hover:text-primary transition-colors ${selectedCategory === cat ? 'font-bold text-primary' : 'text-gray-600'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-medium mb-3">Max Price: ${priceRange}</h4>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$0</span>
                                <span>$100</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Filter Button */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center bg-white px-4 py-2 rounded shadow-sm text-sm font-medium"
                    >
                        <Filter className="w-4 h-4 mr-2" /> Filters
                    </button>
                </div>

                {/* Mobile Filter Drawer */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
                        <div className="bg-white w-80 h-full p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Filters</h3>
                                <button onClick={() => setIsMobileFilterOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-medium mb-3">Category</h4>
                                <ul className="space-y-2">
                                    {categories.map(cat => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => { handleCategoryChange(cat); setIsMobileFilterOpen(false); }}
                                                className={`text-sm hover:text-primary transition-colors ${selectedCategory === cat ? 'font-bold text-primary' : 'text-gray-600'}`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Max Price: ${priceRange}</h4>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-2">{selectedCategory}</h1>
                        <p className="text-gray-500 text-sm">{filteredProducts.length} products found</p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg">
                            <p className="text-gray-500">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setPriceRange(100); handleCategoryChange('All'); }}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
