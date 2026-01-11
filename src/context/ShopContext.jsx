import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Sunset Arch Earrings",
        category: "Earrings",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1617038224558-28809c880797?q=80&w=1000&auto=format&fit=crop",
        description: "Handmade polymer clay earrings with a sunset gradient arch design.",
        stock: 10
    },
    {
        id: 2,
        name: "Teal Drop Earrings",
        category: "Earrings",
        price: 22.00,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=1000&auto=format&fit=crop",
        description: "Elegant teal drop earrings with gold accents.",
        stock: 15
    },
    {
        id: 3,
        name: "Marble Studs",
        category: "Earrings",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1635767798638-3e252a018695?q=80&w=1000&auto=format&fit=crop",
        description: "Classic marble pattern studs, perfect for everyday wear.",
        stock: 20
    },
    {
        id: 4,
        name: "Chunky Clay Ring",
        category: "Rings",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
        description: "Statement chunky ring made from durable acrylic clay.",
        stock: 8
    },
    {
        id: 5,
        name: "Pastel Beaded Bracelet",
        category: "Bracelets",
        price: 30.00,
        image: "https://images.unsplash.com/photo-1611591437238-f954db059420?q=80&w=1000&auto=format&fit=crop",
        description: "Delicate bracelet with pastel clay beads.",
        stock: 12
    },
    {
        id: 6,
        name: "Geometric Necklace",
        category: "Necklaces",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop",
        description: "Modern geometric pendant on a gold chain.",
        stock: 8
    },
    {
        id: 7,
        name: "Floral Hair Clip",
        category: "Hair Clips",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1588661730043-96e08849463c?q=80&w=1000&auto=format&fit=crop",
        description: "Cute floral clay hair clip for a touch of spring.",
        stock: 25
    },
    {
        id: 8,
        name: "Vintage Style Brooch",
        category: "Brooches",
        price: 28.00,
        image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1000&auto=format&fit=crop",
        description: "Vintage-inspired clay brooch with intricate details.",
        stock: 5
    }
];

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('eens_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('eens_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('eens_cart');
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </ShopContext.Provider>
    );
};
