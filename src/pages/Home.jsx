import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import heroEarring from '../assets/hero-earring.png';

const Home = () => {
    const { products } = useContext(ShopContext);

    // Get latest 4 products for featured section
    const featuredProducts = products.slice(0, 4);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                {/* Background Image with Animation */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroEarring}
                        alt="Background"
                        className="w-full h-full object-cover animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="max-w-2xl md:w-1/2 z-10">
                        <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
                            Handcrafted <span className="text-primary">Clay Jewelry</span> for the Unique You
                        </h1>
                        <p className="text-lg text-gray-800 font-medium mb-8 max-w-lg">
                            Discover our collection of lightweight, durable, and stylish acrylic clay earrings, rings, and bracelets. Made with love, just for you.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:translate-x-1 shadow-lg"
                        >
                            Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Earrings', 'Rings', 'Bracelets', 'Necklaces', 'Hair Clips', 'Brooches'].map((cat) => (
                            <Link key={cat} to={`/shop?category=${cat}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
                                <img
                                    src={
                                        cat === 'Earrings' ? "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop" :
                                            cat === 'Rings' ? "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop" :
                                                cat === 'Bracelets' ? "https://images.unsplash.com/photo-1611591437238-f954db059420?q=80&w=1000&auto=format&fit=crop" :
                                                    cat === 'Necklaces' ? "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop" :
                                                        cat === 'Hair Clips' ? "https://images.unsplash.com/photo-1588661730043-96e08849463c?q=80&w=1000&auto=format&fit=crop" :
                                                            "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1000&auto=format&fit=crop"
                                    }
                                    alt={cat}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <h3 className="text-3xl font-bold text-white tracking-wider">{cat}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-dark mb-2">New Arrivals</h2>
                            <p className="text-gray-500">Check out our latest creations</p>
                        </div>
                        <Link to="/shop" className="text-primary font-bold hover:underline flex items-center">
                            View All <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Join the Eens Community</h2>
                    <p className="mb-8 opacity-90">Subscribe to get updates on new drops, special offers, and more.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-6 py-3 border border-gray-200 border-3 rounded-full text-dark focus:outline-none w-full sm:w-auto flex-grow"
                        />
                        <button className="bg-dark text-white px-8 py-3 border-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
