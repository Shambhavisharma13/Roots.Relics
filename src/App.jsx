
import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import products from "./products";
import "./App.css";

const categories = [
  "Blue Pottery Bowls",
  "Simple Bowls",
  "Blue Pottery Plates",
  "Simple Plates",
  "Candle Holders",
  "Blue Pottery Candle Holders",
  "Diyas",
  "Blue Pottery Diyas",
  "Blue Pottery Coffee Mugs",
  "Coffee Mugs",
  "Tea Cups",
  "Vases",
  "Planters",
  "Home Décor",
  "Candles",
  "Coasters",
  "Blue Pottery Knobs",
  "Blue Pottery Tiles",
];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const categoryPath = (category) =>
  `/category/${slugify(category)}`;

const productPath = (id) => `/product/${id}`;

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString("en-IN");
}

function Store() {
  const [wishlist, setWishlist] = useState(() =>
    readStorage("rr-wishlist", [])
  );
  const [cart, setCart] = useState(() =>
    readStorage("rr-cart", [])
  );
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState("");
  const [notice, setNotice] = useState("");
  const [sort, setSort] = useState("featured");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("rr-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("rr-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPanel("");
    setSearch("");
  }, [location.pathname]);

  useEffect(() => {
    if (!notice) return undefined;

    const timer = window.setTimeout(() => setNotice(""), 2500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const showNotice = (message) => setNotice(message);

  const toggleWishlist = (product) => {
    const alreadySaved = wishlist.some(
      (item) => item.id === product.id
    );

    setWishlist((current) =>
      alreadySaved
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );

    showNotice(
      alreadySaved
        ? "Removed from your wishlist"
        : "Added to your wishlist"
    );
  };

  const addToCart = (product, quantity = 1) => {
    const amount = Math.max(1, Number(quantity) || 1);

    setCart((current) => {
      const found = current.find(
        (item) => item.id === product.id
      );

      return found
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + amount }
              : item
          )
        : [...current, { ...product, quantity: amount }];
    });

    showNotice(
      `${product.name} added to your bag`
    );
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
    showNotice("Item removed from your bag");
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [search]);

  return (
    <div className="store">
      <div className="announcement">
        Thoughtfully chosen pieces for a home with a story
      </div>

      <header className="site-header">
        <Link
          to="/"
          className="brand"
          aria-label="Roots and Relics homepage"
        >
          <img src="/logo.jpeg" alt="Roots & Relics logo" />
          <span>
            <strong>Roots & Relics</strong>
            <small>CRAFTED WITH LOVE</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/#collections">Collections</Link>
          <Link to={categoryPath("Blue Pottery Plates")}>
            Blue Pottery
          </Link>
        </nav>

        <div className="header-actions">
          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault();

              if (searchResults.length > 0) {
                navigate(productPath(searchResults[0].id));
              } else if (search.trim()) {
                showNotice("No matching products found");
              }
            }}
          >
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit" aria-label="Search">
              ⌕
            </button>

            {search.trim() && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      type="button"
                      key={product.id}
                      onClick={() =>
                        navigate(productPath(product.id))
                      }
                    >
                      <img src={product.image} alt="" />
                      <span>
                        {product.name}
                        <small>{product.category}</small>
                      </span>
                      <b>₹{formatPrice(product.price)}</b>
                    </button>
                  ))
                ) : (
                  <p>No matching products found.</p>
                )}
              </div>
            )}
          </form>

          <button
            className="icon-action"
            onClick={() => setPanel("wishlist")}
            aria-label={`Open wishlist with ${wishlist.length} items`}
          >
            <span className="action-symbol">♡</span>
            <span className="action-label">Wishlist</span>
            <b>{wishlist.length}</b>
          </button>

          <button
            className="icon-action"
            onClick={() => setPanel("cart")}
            aria-label={`Open bag with ${cartCount} items`}
          >
            <span className="action-symbol">♧</span>
            <span className="action-label">Bag</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/category/:categorySlug"
          element={
            <CategoryPage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              sort={sort}
              setSort={setSort}
            />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductDetail
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="empty-page">
              <span className="eyebrow">A LITTLE DETOUR</span>
              <h1>Page not found</h1>
              <p>Let's help you find something lovely.</p>
              <Link className="primary-button" to="/">
                Back to home
              </Link>
            </main>
          }
        />
      </Routes>

      <footer className="site-footer">
        <div className="footer-about">
          <Link to="/" className="footer-brand">
            Roots & Relics
          </Link>
          <p>
            Handpicked details. Meaningful spaces.
            A little more soul in every corner.
          </p>
        </div>

        <div className="footer-links">
          <strong>Explore</strong>
          <Link to="/">Home</Link>
          <Link to={categoryPath("Blue Pottery Plates")}>
            Blue Pottery Plates
          </Link>
          <Link to={categoryPath("Simple Bowls")}>
            Simple Bowls
          </Link>
        </div>

        <div className="footer-links">
          <strong>Our promise</strong>
          <p>Beautiful finds, thoughtfully selected.</p>
          <small>
            Demo store: product prices and images are examples.
          </small>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Roots & Relics
        </div>
      </footer>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {panel && (
        <div
          className="drawer-backdrop"
          onClick={() => setPanel("")}
        >
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={
              panel === "cart" ? "Shopping bag" : "Wishlist"
            }
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <small>ROOTS & RELICS</small>
                <h2>
                  {panel === "cart"
                    ? "Your Shopping Bag"
                    : "Your Wishlist"}
                </h2>
              </div>

              <button
                className="close-button"
                onClick={() => setPanel("")}
                aria-label="Close panel"
              >
                ×
              </button>
            </div>

            {panel === "cart" ? (
              <>
                {cart.length === 0 ? (
                  <div className="empty-message">
                    <span>♡</span>
                    <p>Your bag is waiting for something lovely.</p>
                    <button
                      className="secondary-button"
                      onClick={() => setPanel("")}
                    >
                      Keep exploring
                    </button>
                  </div>
                ) : (
                  <div className="drawer-items">
                    {cart.map((item) => (
                      <div className="drawer-item" key={item.id}>
                        <Link
                          to={productPath(item.id)}
                          onClick={() => setPanel("")}
                        >
                          <img src={item.image} alt={item.name} />
                        </Link>

                        <div className="drawer-item-info">
                          <Link
                            to={productPath(item.id)}
                            className="drawer-product-name"
                            onClick={() => setPanel("")}
                          >
                            {item.name}
                          </Link>

                          <small>
                            Example price: ₹{formatPrice(item.price)}
                          </small>

                          <div className="quantity-control">
                            <button
                              onClick={() =>
                                changeQuantity(item.id, -1)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                changeQuantity(item.id, 1)
                              }
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="text-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="drawer-total">
                    <div>
                      <span>Example subtotal</span>
                      <strong>
                        ₹{formatPrice(cartTotal)}
                      </strong>
                    </div>

                    <small>
                      Example total only. Shipping and taxes are
                      not included. Checkout and payments are
                      not enabled.
                    </small>

                    <button
                      className="primary-button full-button"
                      onClick={() =>
                        showNotice(
                          "Checkout is not enabled in this demo."
                        )
                      }
                    >
                      Checkout coming soon
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {wishlist.length === 0 ? (
                  <div className="empty-message">
                    <span>♡</span>
                    <p>Save your favourite finds here.</p>
                    <button
                      className="secondary-button"
                      onClick={() => setPanel("")}
                    >
                      Explore products
                    </button>
                  </div>
                ) : (
                  <div className="drawer-items">
                    {wishlist.map((item) => (
                      <div className="drawer-item" key={item.id}>
                        <Link
                          to={productPath(item.id)}
                          onClick={() => setPanel("")}
                        >
                          <img src={item.image} alt={item.name} />
                        </Link>

                        <div className="drawer-item-info">
                          <Link
                            to={productPath(item.id)}
                            className="drawer-product-name"
                            onClick={() => setPanel("")}
                          >
                            {item.name}
                          </Link>

                          <small>
                            Example price: ₹{formatPrice(item.price)}
                          </small>

                          <button
                            className="text-button"
                            onClick={() => addToCart(item)}
                          >
                            Add to bag
                          </button>

                          <button
                            className="text-button"
                            onClick={() => toggleWishlist(item)}
                          >
                            Remove from wishlist
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function HomePage({ wishlist, toggleWishlist, addToCart }) {
  const featured = products
    .filter((product) =>
      [
        "Blue Pottery Plates",
        "Blue Pottery Bowls",
        "Vases",
        "Candle Holders",
      ].includes(product.category)
    )
    .slice(0, 4);

  const collectionImages = [
    "Blue Pottery Plates",
    "Blue Pottery Bowls",
    "Simple Bowls",
    "Simple Plates",
    "Candle Holders",
    "Blue Pottery Candle Holders",
    "Diyas",
    "Blue Pottery Diyas",
    "Blue Pottery Coffee Mugs",
    "Coffee Mugs",
    "Tea Cups",
    "Vases",
    "Planters",
    "Home Décor",
    "Candles",
    "Coasters",
    "Blue Pottery Knobs",
    "Blue Pottery Tiles",
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            THE ART OF THOUGHTFUL LIVING
          </span>

          <h1>
            Little treasures.
            <br />
            <em>Lasting stories.</em>
          </h1>

          <p>
            Discover pottery and thoughtful details that make
            your space feel like home. Find the little things
            that bring beauty to everyday living.
          </p>

          <div className="hero-buttons">
            <Link className="primary-button" to="/#collections">
              Explore collections <span>↗</span>
            </Link>

            <Link
              className="secondary-button"
              to={categoryPath("Blue Pottery Plates")}
            >
              Discover Blue Pottery
            </Link>
          </div>

          <div className="hero-note">
            <span>✳</span> Made for homes with heart
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85"
            alt="Decorative ceramic pottery"
          />
          <div className="hero-stamp">
            A HOME
            <br />
            WITH A
            <br />
            <em>STORY</em>
          </div>
        </div>
      </section>

      <section
        className="section collection-section"
        id="collections"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR FAVOURITE</span>
            <h2>Explore our collections</h2>
          </div>
          <p>
            From everyday essentials to statement pieces,
            find something that feels uniquely yours.
          </p>
        </div>

        <div className="category-grid">
          {collectionImages.map((category) => {
            const firstProduct = products.find(
              (product) => product.category === category
            );

            return (
              <Link
                className="category-card"
                to={categoryPath(category)}
                key={category}
              >
                <div className="category-image">
                  <img
                    src={
                      firstProduct?.image ||
                      products[0]?.image ||
                      "/logo.jpeg"
                    }
                    alt={category}
                    loading="lazy"
                  />
                  <span className="category-arrow">↗</span>
                </div>

                <div className="category-caption">
                  <h3>{category}</h3>
                  <span>Explore collection</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A FEW FAVOURITES</span>
            <h2>Pieces to fall for</h2>
          </div>

          <Link
            className="underlined-link"
            to={categoryPath("Blue Pottery Plates")}
          >
            Explore Blue Pottery ↗
          </Link>
        </div>

        <ProductGrid
          products={featured.length ? featured : products.slice(0, 4)}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      </section>

      <section className="story-banner">
        <div className="story-copy">
          <span className="eyebrow">ROOTED IN DETAIL</span>
          <h2>
            Make room for
            <br />
            <em>meaningful things.</em>
          </h2>
          <p>
            We believe little things can make a house feel
            like your own — a favourite cup, a beautiful bowl,
            or a corner that makes you smile.
          </p>

          <Link
            className="secondary-button"
            to={categoryPath("Home Décor")}
          >
            Explore home décor
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
          alt="Warm, thoughtfully styled home"
          loading="lazy"
        />
      </section>

      <div className="sample-note">
        Demo storefront: all prices are examples and product
        images are temporary. No online payments are enabled.
      </div>
    </main>
  );
}

function CategoryPage({
  wishlist,
  toggleWishlist,
  addToCart,
  sort,
  setSort,
}) {
  const { categorySlug } = useParams();

  const category = categories.find(
    (item) => slugify(item) === categorySlug
  );

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return Number(a.id) - Number(b.id);
  });

  if (!category) {
    return (
      <main className="empty-page">
        <h1>Collection not found</h1>
        <p>Choose another collection from the homepage.</p>
        <Link className="primary-button" to="/">
          Browse collections
        </Link>
      </main>
    );
  }

  return (
    <main className="category-page section">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{category}</span>
      </div>

      <section className="category-intro">
        <span className="eyebrow">
          THE ROOTS & RELICS COLLECTION
        </span>
        <h1>{category}</h1>
        <p>
          Explore thoughtfully selected pieces, discover your
          favourites, and find little details for your home.
        </p>
      </section>

      <div className="category-toolbar">
        <span>
          {sortedProducts.length}{" "}
          {sortedProducts.length === 1 ? "piece" : "pieces"} to explore
        </span>

        <label>
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <ProductGrid
          products={sortedProducts}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      ) : (
        <div className="empty-message">
          <p>There are no products in this collection yet.</p>
          <Link className="secondary-button" to="/">
            Explore other collections
          </Link>
        </div>
      )}

      <section className="more-collections">
        <h2>Keep exploring</h2>
        <div>
          {categories
            .filter((item) => item !== category)
            .slice(0, 6)
            .map((item) => (
              <Link key={item} to={categoryPath(item)}>
                {item} ↗
              </Link>
            ))}
        </div>
      </section>

      <div className="sample-note">
        Prices are temporary examples, not confirmed selling prices.
      </div>
    </main>
  );
}

function ProductGrid({
  products: items,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  return (
    <div className="product-grid">
      {items.map((product) => {
        const saved = wishlist.some(
          (item) => item.id === product.id
        );

        return (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              <Link
                to={productPath(product.id)}
                aria-label={`View ${product.name}`}
              >
                <img
                  src={product.image || "/logo.jpeg"}
                  alt={product.name}
                  loading="lazy"
                />
              </Link>

              <span className="sample-price-tag">
                Example price
              </span>

              <button
                className={`wishlist-button ${
                  saved ? "is-saved" : ""
                }`}
                onClick={() => toggleWishlist(product)}
                aria-label={
                  saved
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                {saved ? "♥" : "♡"}
              </button>
            </div>

            <div className="product-info">
              <span className="product-category">
                {product.category}
              </span>

              <h3>
                <Link to={productPath(product.id)}>
                  {product.name}
                </Link>
              </h3>

              <div className="product-price">
                ₹{formatPrice(product.price)}
                <small>example</small>
              </div>

              <p>
                {product.description ||
                  "A thoughtfully selected piece for your home."}
              </p>

              <div className="product-card-actions">
                <Link
                  className="view-product-link"
                  to={productPath(product.id)}
                >
                  View details ↗
                </Link>

                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Bag <span>+</span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ProductDetail({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => String(item.id) === productId
  );

  if (!product) {
    return (
      <main className="empty-page">
        <span className="eyebrow">A LITTLE DETOUR</span>
        <h1>Product not found</h1>
        <p>This product may not be available in the demo data.</p>
        <Link className="primary-button" to="/">
          Browse all products
        </Link>
      </main>
    );
  }

  const saved = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <main className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={categoryPath(product.category)}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.image || "/logo.jpeg"}
            alt={product.name}
          />
          <span className="sample-price-tag">
            Temporary sample image
          </span>
        </div>

        <div className="product-detail-info">
          <span className="eyebrow">
            ROOTS & RELICS COLLECTION
          </span>

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="detail-price">
            ₹{formatPrice(product.price)}
          </p>

          <p className="example-disclaimer">
            Example price only — not a confirmed selling price.
          </p>

          <div className="detail-divider" />

          <h3>A little piece of something special</h3>

          <p className="detail-description">
            {product.description ||
              `Discover this thoughtfully selected ${product.name.toLowerCase()}, a lovely addition to your home and everyday rituals.`}
          </p>

          <div className="detail-note">
            This is a demonstration storefront. Product details,
            prices, and images should be verified before launch.
          </div>

          <div className="detail-quantity">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(10, current + 1)
                  )
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="primary-button full-button"
            onClick={() => addToCart(product, quantity)}
          >
            Add {quantity} to Bag · ₹
            {formatPrice(product.price * quantity)}
          </button>

          <button
            className="secondary-button detail-wishlist"
            onClick={() => toggleWishlist(product)}
          >
            {saved ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
          </button>

          <div className="detail-benefits">
            <p>✳ Thoughtfully selected home accents</p>
            <p>✳ Example prices; checkout is not enabled</p>
          </div>

          <Link
            className="underlined-link"
            to={categoryPath(product.category)}
          >
            ← Back to {product.category}
          </Link>
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MORE TO DISCOVER</span>
            <h2>You may also love</h2>
          </div>
        </div>

        <ProductGrid
          products={products
            .filter(
              (item) =>
                item.category === product.category &&
                item.id !== product.id
            )
            .slice(0, 4)}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      </section>

      <div className="sample-note">
        Demo storefront only. No online payments or checkout are enabled.
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Store />
    </BrowserRouter>
  );
}
