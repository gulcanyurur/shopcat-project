import { useState, useRef, useEffect } from "react";

type NavbarProps = {
  setCategory: (category: string) => void;
};

const categories = [
  { key: "cat", label: "Kedi" },
  { key: "dog", label: "Köpek" },
  { key: "bird", label: "Kuş" },
  { key: "fish", label: "Balık" },
  { key: "horse", label: "At" },
  { key: "rabbit", label: "Tavşann" },
  { key: "Civciv", label: "Civciv" },
];

const Navbar = ({ setCategory }: NavbarProps) => {
  const [active, setActive] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (category: string) => {
    setCategory(category);
    setActive(category);
    setModalOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    }
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li style={{ position: "relative" }}>
          <button
            className={active === "all" ? "active" : ""}
            onClick={() => setModalOpen((v) => !v)}
          >
            ☰ Tümü
          </button>
          {modalOpen && (
            <div
              className="category-modal"
              ref={modalRef}
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 8,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                zIndex: 1000,
                minWidth: 180,
                padding: 12,
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <button
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "8px 12px",
                        fontSize: 16,
                        cursor: "pointer",
                        color: active === cat.key ? "#d81b60" : "#222",
                        fontWeight: active === cat.key ? 700 : 400,
                      }}
                      onClick={() => handleClick(cat.key)}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li>
          <button
            className={active === "bestseller" ? "active" : ""}
            onClick={() => handleClick("bestseller")}
          >
            Çok Satanlar
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.key}>
            <button
              className={active === cat.key ? "active" : ""}
              onClick={() => handleClick(cat.key)}
            >
              {cat.label.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
