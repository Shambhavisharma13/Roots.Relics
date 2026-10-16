
import React from "react";

export default function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="details-overlay">
      <div className="details-card">
        <button
          className="details-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          ✕
        </button>

        <img
          className="details-image"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x500/f2e7da/68432f?text=Roots+%26+Relics";
          }}
        />

        <div className="details-info">
          <p className="details-category">{product.category}</p>
          <h2>{product.name}</h2>

          <p className="details-price">
            {product.price == null
              ? "Price coming soon"
              : `₹${product.price}`}
          </p>

          <p className="details-description">
            A thoughtfully selected piece for your home,
            celebrating traditional craftsmanship and timeless style.
          </p>

          <button
            className="details-add-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
