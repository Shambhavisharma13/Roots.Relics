
const products = [
  // Blue Pottery Bowls
  { id: 1, name: "Floral Blue Bowl", category: "Blue Pottery Bowls", price: 599, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80", description: "A decorative ceramic bowl inspired by traditional blue pottery." },
  { id: 2, name: "Blue Pattern Bowl", category: "Blue Pottery Bowls", price: 699, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80", description: "A patterned bowl for serving or display." },
  { id: 3, name: "Blue Serving Bowl", category: "Blue Pottery Bowls", price: 899, image: "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&w=700&q=80", description: "A statement bowl for your dining table." },

  // Simple Bowls
  { id: 4, name: "Classic Cream Bowl", category: "Simple Bowls", price: 349, image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80", description: "A simple, versatile bowl for everyday use." },
  { id: 5, name: "Earth Tone Bowl", category: "Simple Bowls", price: 399, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80", description: "A warm, earthy accent for your home." },
  { id: 6, name: "Minimal Serving Bowl", category: "Simple Bowls", price: 499, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80", description: "A minimal serving piece for your table." },

  // Blue Pottery Plates
  { id: 7, name: "Floral Round Plate", category: "Blue Pottery Plates", price: 599, image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=80", description: "A decorative plate with a floral-inspired design." },
  { id: 8, name: "Geometric Blue Plate", category: "Blue Pottery Plates", price: 799, image: "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&w=700&q=80", description: "A striking plate for display or serving." },
  { id: 9, name: "Blue Serving Plate", category: "Blue Pottery Plates", price: 999, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80", description: "A larger plate for entertaining guests." },
  { id: 10, name: "Blue Snack Plate", category: "Blue Pottery Plates", price: 399, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80", description: "A small plate for snacks and treats." },

  // Simple Plates
  { id: 11, name: "Classic Dinner Plate", category: "Simple Plates", price: 449, image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80", description: "An understated plate for everyday dining." },
  { id: 12, name: "Minimal Side Plate", category: "Simple Plates", price: 299, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80", description: "A compact side plate for daily meals." },

  // Candle holders
  { id: 13, name: "Artisan Candle Holder", category: "Candle Holders", price: 499, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80", description: "A handcrafted-style accent for cosy evenings." },
  { id: 14, name: "Blue Pottery Candle Holder", category: "Blue Pottery Candle Holders", price: 699, image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=700&q=80", description: "A decorative candle holder with a blue-and-white look." },

  // Diyas
  { id: 15, name: "Traditional Diya Set", category: "Diyas", price: 299, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=80", description: "Decorative diyas for festive occasions." },
  { id: 16, name: "Blue Pottery Diya", category: "Blue Pottery Diyas", price: 399, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=80", description: "A decorative diya inspired by blue pottery." },

  // Additional collections
  { id: 17, name: "Blue Pottery Coffee Mug", category: "Blue Pottery Coffee Mugs", price: 449, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80", description: "A decorative mug for your coffee ritual." },
  { id: 18, name: "Handcrafted Vase", category: "Vases", price: 899, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80", description: "A statement vase for flowers or shelf styling." },
  { id: 19, name: "Decorative Planter", category: "Planters", price: 549, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80", description: "A decorative planter for your favourite greenery." },
  { id: 20, name: "Home Accent Piece", category: "Home Décor", price: 749, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80", description: "A thoughtful accent for your living space." },
  { id: 21, name: "Artisan Coffee Mug", category: "Coffee Mugs", price: 349, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80", description: "A simple mug for everyday coffee." },
  { id: 22, name: "Decorative Tea Cup", category: "Tea Cups", price: 249, image: "https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=700&q=80", description: "A delicate cup for your tea break." },
  { id: 23, name: "Decorative Coasters", category: "Coasters", price: 299, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80", description: "A useful finishing touch for your table." },
  { id: 24, name: "Blue Pottery Knob", category: "Blue Pottery Knobs", price: 149, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80", description: "A decorative accent for cabinets and drawers." },
  { id: 25, name: "Blue Pottery Tile", category: "Blue Pottery Tiles", price: 199, image: "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&w=700&q=80", description: "A decorative tile for an accent wall or display." },
  { id: 26, name: "Scented Candle", category: "Candles", price: 399, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80", description: "A candle to add warmth to your space." },
];

export default products;
