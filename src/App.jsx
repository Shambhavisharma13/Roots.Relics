
import { useState } from "react";
import "./App.css";

const categories = [
  "All Products",
  "Blue Pottery",
  "Plates & Tableware",
  "Diyas & Festive Décor",
  "Mugs & Cups",
  "Bowls & Serving",
  "Vases & Planters",
  "Home Décor",
  "Lighting",
  "Gifts",
];

const products = [
  { id: 1, name: "Jaipur Blue Pottery Plate", category: "Blue Pottery", price: 699, icon: "🔵", tag: "Bestseller" },
  { id: 2, name: "Handcrafted Clay Diya Set", category: "Diyas & Festive Décor", price: 299, icon: "🪔", tag: "Festive pick" },
  { id: 3, name: "Rustic Ceramic Mug", category: "Mugs & Cups", price: 449, icon: "☕", tag: "New" },
  { id: 4, name: "Blue Pottery Bowl", category: "Bowls & Serving", price: 549, icon: "🥣", tag: "" },
  { id: 5, name: "Leaf-Shaped Serving Plate", category: "Plates & Tableware", price: 799, icon: "🍃", tag: "" },
  { id: 6, name: "Decorative Elephant", category: "Home Décor", price: 1099, icon: "🐘", tag: "Handcrafted" },
  { id: 7, name: "Ceramic Tea Cups Set", category: "Mugs & Cups", price: 699, icon: "🍵", tag: "" },
  { id: 8, name: "Handpainted Blue Vase", category: "Vases & Planters", price: 999, icon: "🏺", tag: "New" },
  { id: 9, name: "Decorative Planter", category: "Vases & Planters", price: 599, icon: "🪴", tag: "" },
  { id: 10, name: "Ceramic Candle Holder", category: "Lighting", price: 499, icon: "🕯️", tag: "" },
  { id: 11, name: "Blue Pottery Gift Set", category: "Gifts", price: 1299, icon: "🎁", tag: "Gift idea" },
  { id: 12, name: "Decorative Ceramic Bowl", category: "Bowls & Serving", price: 649, icon: "🍲", tag: "" },
  { id: 13, name: "Handpainted Wall Plate", category: "Home Décor", price: 899, icon: "🌼", tag: "" },
  { id: 14, name: "Traditional Festive Diya", category: "Diyas & Festive Décor", price: 199, icon: "🪔", tag: "" },
  { id: 15, name: "Ceramic Dinner Plate Set", category: "Plates & Tableware", price: 1199, icon: "🍽️", tag: "" },
  { id: 16, name: "Blue Pottery Showpiece", category: "Blue Pottery", price: 899, icon: "✨", tag: "" },
];

function App() {
  const [category, setCategory] = useState("All Products");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All Products" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="site">
      <div className="announcement">
        Thoughtfully handcrafted · Inspired by Indian artistry
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          <span>❧</span> Roots & Relics
          <small>HANDMADE HOME DÉCOR & CERAMICS</small>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#categories">Collections</a>
          <a href="#story">Our Story</a>
        </nav>

        <button className="cart-link" onClick={() => setShowCart(!showCart)}>
          Cart ({cartCount})
        </button>
      </header>

      {showCart && (
        <section className="cart-panel">
          <div className="cart-heading">
            <h2>Your Shopping Cart</h2>
            <button onClick={() => setShowCart(false)}>Close ✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty. Discover something beautiful!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>₹{item.price} each</p>
                  </div>
                  <div className="quantity">
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
              <h3>Total: ₹{cartTotal.toLocaleString("en-IN")}</h3>
              <p className="note">
                Checkout will be connected after the backend is ready.
              </p>
            </>
          )}
        </section>
      )}

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">TRADITIONAL CRAFTSMANSHIP · MODERN HOMES</p>
            <h1>Beautiful things<br />for a warmer home.</h1>
            <p>
              Explore handmade ceramics, blue pottery, diyas, plates,
              bowls, cups and unique home décor pieces — crafted
              with love and tradition.
            </p>
            <a href="#shop" className="primary-button">
              Shop the Collection →
            </a>
          </div>
        </section>

        <section className="category-section" id="categories">
          <p className="eyebrow">EXPLORE OUR WORLD</p>
          <h2>Something for every corner.</h2>

          <div className="category-grid">
            {categories.slice(1).map((item, index) => (
              <button
                className="category-tile"
                key={item}
                onClick={() => {
                  setCategory(item);
                  document.getElementById("shop")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span>{["🔵", "🍽️", "🪔", "☕", "🥣", "🏺", "🌿", "🕯️", "🎁"][index]}</span>
                <strong>{item}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MADE WITH SOUL</p>
              <h2>Discover our collection.</h2>
              <p>Thoughtful pieces to make your space feel like home.</p>
            </div>
            <span>{filteredProducts.length} products</span>
          </div>

          <div className="shop-controls">
            <input
              type="search"
              placeholder="Search décor, pottery, plates..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-art">
                  <span>{product.icon}</span>
                  {product.tag && <small>{product.tag}</small>}
                  <button
                    className="heart-button"
                    aria-label={"Save " + product.name}
                    onClick={(event) => {
                      event.currentTarget.classList.toggle("liked");
                    }}
                  >
                    ♡
                  </button>
                </div>

                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty-state">
              No products found. Try another search or category.
            </p>
          )}
        </section>

        <section className="story-section" id="story">
          <div className="story-art">🏺　🪔　🍵</div>
          <div className="story-content">
            <p className="eyebrow">OUR STORY</p>
            <h2>Rooted in tradition.<br />Made for today.</h2>
            <p>
              At Roots & Relics, we celebrate the beauty of handcrafted
              ceramics, traditional Indian artistry and thoughtful home
              décor. We believe the little details make a house feel like home.
            </p>
            <a className="primary-button" href="#categories">
              Explore Our World →
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <h2>Roots & Relics</h2>
          <p>Handmade treasures for beautiful everyday living.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <a href="#shop">Shop All</a>
          <a href="#categories">Collections</a>
          <a href="#story">Our Story</a>
        </div>
        <div>
          <strong>Our Promise</strong>
          <p>Thoughtful craftsmanship</p>
          <p>Timeless design</p>
          <p>Made with care</p>
        </div>
        <p className="copyright">© 2026 Roots & Relics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
