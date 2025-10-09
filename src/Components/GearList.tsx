import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imagesSrc/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import About from "./About";
import "./AboutModal.css";
import type { Product } from "../types/Product";
import { dogProducts } from "../types/dogProducts";
import { birdProducts } from "../types/birdProducts";
import { fishProducts } from "../types/fishProducts";
import { horseProducts } from "../types/horseProducts";
import { rabbitProducts } from "../types/rabbitProducts";
import { chickProducts } from "../types/chickProducts";

type GearListProps = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const GearList = ({ cart, setCart }: GearListProps) => {
  const [category, setCategory] = useState("cat");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number|null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim().length > 0) {
      const exact = products.find(
        (p) => p.name.toLowerCase() === search.trim().toLowerCase()
      );
      if (exact) {
        setSelectedId(exact.id);
      } else {
        setSelectedId(null);
      }
    } else {
      setSelectedId(null);
    }
  }, [search]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedId) {
      navigate(`/product/${selectedId}`);
    }
  };

  type CartItem = Product & { quantity: number };
  const cartWithQty: CartItem[] = cart.reduce((acc: CartItem[], item) => {
    const found = acc.find((p) => p.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const addToCart = (product: Product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      setCart([...cart, product]);
    } else {
      setCart([...cart, product]);
    }
  };

  
  const bestsellers: Product[] = [
    { id: 1, category: "cat", image: "/KedimMaması.jpg", name: "Kedi Maması", brand: "Royal Canin", description: "Yetişkin kediler için tam besleyici mama", price: 350 },
    { id: 7, category: "dog", image: "/KopekMaması.jpg", name: "Köpek Maması", brand: "ProPlan", description: "Yetişkin köpekler için mama", price: 400 },
    { id: 202, category: "bird", image: "/KuşKafesi.jpg", name: "Kuş Kafesi", brand: "Ferplast", description: "Dayanıklı ve geniş kuş kafesi", price: 600 },
    { id: 302, category: "fish", image: "/Akvaryum.jpg", name: "Akvaryum", brand: "AquaWorld", description: "Cam ve dayanıklı akvaryum", price: 1200 },
    { id: 401, category: "horse", image: "/AtYemi.jpg", name: "At Yemi", brand: "HorseFeed", description: "Vitamin ve mineralli at yemi", price: 800 },
    { id: 501, category: "rabbit", image: "/TavsanYemi.jpg", name: "Tavşan Yemi", brand: "BunnyFood", description: "Vitaminli ve doğal tavşan yemi", price: 200 },
    { id: 601, category: "Civciv", image: "/CivcivYemi.jpg", name: "Civciv Yemi", brand: "ChickFeed", description: "Büyüme destekli civciv yemi", price: 150 },
  ];
  const products: Product[] = [
    {
      id: 1,
      category: "cat",
      image: "/KedimMaması.jpg",
      name: "Kedi Maması",
      brand: "Royal Canin",
      description: "Yetişkin kediler için tam besleyici mama",
      price: 350,
    },
    {
      id: 2,
      category: "cat",
      image: "/KediKumu.jpg",
      name: "Kedi Kumu",
      brand: "Ever Clean",
      description: "Topaklanan ve kokuyu hapseden kedi kumu",
      price: 120,
    },
    {
      id: 3,
      category: "cat",
      image: "/KediOyuncagı.jpg",
      name: "Kedi Oyuncağı",
      brand: "PetLove",
      description: "Eğlenceli tüylü oyuncak",
      price: 60,
    },
    {
      id: 4,
      category: "cat",
      image: "/TırmalamaTahtası.jpg",
      name: "Tırmalama Tahtası",
      brand: "CatTree",
      description: "Kedinizin tırnak sağlığı için ideal",
      price: 250,
    },
    {
      id: 5,
      category: "cat",
      image: "/kediçantası.jpg",
      name: "Taşıma Çantası",
      brand: "PawSafe",
      description: "Hava alan ve rahat taşıma çantası",
      price: 180,
    },
    {
      id: 6,
      category: "cat",
      image: "/Kediyatagı.jpg",
      name: "Kedi Yatağı",
      brand: "SoftPet",
      description: "Yumuşak ve rahat kedi yatağı",
      price: 220,
    },
  ...dogProducts,
  ...birdProducts,
  ...fishProducts,
  ...horseProducts,
  ...rabbitProducts,
  ...chickProducts,
  ];

  const Gear = ({
    product,
    onAddToCart,
    isSelected,
    children,
  }: {
    product: Product;
    onAddToCart: () => void;
    isSelected?: boolean;
    children?: React.ReactNode;
  }) => (
    <article className="gear-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <img src={product.image} alt={product.name} />
        <h2 style={isSelected ? { color: '#d81b60' } : {}}>{product.name} {children}</h2>
        <h3 style={isSelected ? { color: '#d81b60' } : {}}>{product.brand}</h3>
        <p style={isSelected ? { color: '#d81b60' } : {}}>{product.description}</p>
        <div style={{ fontWeight: 600, color: isSelected ? '#d81b60' : '#388e3c', marginBottom: 8 }}>
          {product.price ? `${product.price} TL` : ''}
        </div>
      </Link>
      <button onClick={onAddToCart}>🛒 Sepete Ekle</button>
    </article>
  );

  let filteredProducts: Product[];
  if (category === "all") {
    filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  } else if (category === "bestseller") {
    filteredProducts = bestsellers.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  } else {
    filteredProducts = products.filter((p) => p.category === category && p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const [dark, setDark] = useState(false);
  const toggleDark = () => {
    console.log("Toggling dark mode");
    setDark((prev) => !prev);
  };

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [dark]);

  const [aboutOpen, setAboutOpen] = useState(false);

  
  return (
    <div className="GearList">
      <div className="gearlist-header">
        <img src={logo} alt="ShopCat Logo" />
        <h1>2500 TL ve Üzeri Alışverişlerde İstanbul İçi Kargo Bedava!</h1>
        <div className="header-right" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="search-box"
            style={selectedId ? { borderColor: '#d81b60', color: '#d81b60', fontWeight: 600 } : {}}
            autoComplete="off"
          />
          {search.length > 0 && (
            <ul style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 6,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              zIndex: 100,
              margin: 0,
              padding: '4px 0',
              listStyle: 'none',
              maxHeight: 180,
              overflowY: 'auto',
            }}>
              {products
                .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 7)
                .map(p => (
                  <li key={p.id} style={{ padding: '6px 14px', cursor: 'pointer', color: '#d81b60', fontWeight: 500 }}
                    onMouseDown={() => setSearch(p.name)}
                  >
                    {p.name}
                  </li>
                ))}
            </ul>
          )}
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <Link to="/cart" style={{ zIndex: 2, position: 'relative' }}>
              🛒 Sepet: <b>{cartWithQty.reduce((sum, p) => sum + p.quantity, 0)}</b> ürün
            </Link>
            <button
              style={{ marginLeft: 8, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 6, padding: '2px 10px', cursor: 'pointer', fontSize: 14 }}
              onClick={() => setAboutOpen(true)}
            >
              Hakkımızda
            </button>
            {aboutOpen && createPortal(
              <div
                className="about-modal-backdrop"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}
                onClick={() => setAboutOpen(false)}
              >
                <div
                  className="about-modal"
                  style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', minWidth: 520, maxWidth: 760, width: '99vw', maxHeight: '420px', overflowY: 'auto', transition: 'none' }}
                  onClick={e => e.stopPropagation()}
                >
                  <button className="about-modal-close" onClick={() => setAboutOpen(false)}>&times;</button>
                  <About />
                </div>
              </div>,
              document.body
            )}
          </div>
        </div>
      </div>
      <Navbar setCategory={setCategory} />
      <section className="product-grid">
        {filteredProducts.map((p) => {
          const inCart = cartWithQty.find((item) => item.id === p.id);
          const isSelected = selectedId === p.id;
          return (
            <Gear
              key={p.id}
              product={p}
              onAddToCart={() => addToCart(p)}
              isSelected={isSelected}
            >
              {inCart && inCart.quantity > 1 && (
                <span style={{ fontWeight: 600, color: '#d81b60', marginLeft: 4 }}>
                  {inCart.quantity}x
                </span>
              )}
            </Gear>
          );
        })}
      </section>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "32px 0 16px 0",
        }}
      >
        <button className="dark-toggle" onClick={toggleDark}>
          {dark ? "☀️ Aydınlık Moda Geç" : "🌙 Karanlık Moda Geç"}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default GearList;
