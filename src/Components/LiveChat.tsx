import React, { useState, useRef, useEffect } from "react";
import "./LiveChat.css";

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Merhaba! 👋 Size nasıl yardımcı olabilirim?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const getBotResponse = (msg: string): string => {
    const text = msg.toLowerCase();

    if (lastQuestion === "nasılsın") {
      if (text.includes("iyi")) return "Harika! 😊 Böyle duymak güzel.";
      if (text.includes("kötü")) return "Üzülme 😔, bazen kötü günler geçer.";
      return "Anladım, umarım günün güzel geçer 💫";
    }

    if (text.includes("merhaba") || text.includes("selam")) {
      setLastQuestion("nasılsın");
      return "Merhaba! 😊 Nasılsınız bugün?";
    }
    if (text.includes("nasılsın")) {
      setLastQuestion("nasılsın");
      return "Harikayım! Siz nasılsınız? 💫";
    }
    if (text.includes("sipariş")) {
      return "Siparişinizle ilgili yardımcı olabilirim. Kargo durumunu mu öğrenmek istiyorsunuz?";
    }
    if (text.includes("iade")) {
      return "Ürün iadesi için 14 gün içinde başvuru yapabilirsiniz.";
    }
    if (text.includes("kargo")) {
      return "Kargo süremiz genellikle 2-4 iş günüdür 🚚";
    }
    if (text.includes("ürün")) {
      return "Hangi üründen bahsediyorsunuz?";
    }
    if (text.includes("teşekkür")) {
      return "Rica ederim 💖 Yardımcı olabildiysem ne mutlu bana!";
    }

    const fallback = [
      "Anlayamadım 🤔 Biraz daha açıklar mısınız?",
      "Bu konuda emin değilim ama yardımcı olmaya çalışırım.",
      "İstersen farklı bir konuda da konuşabiliriz 😊",
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { from: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((msgs) => [...msgs, { from: "bot", text: botResponse }]);
    }, 800);
  };

  return (
    <div className={"live-chat-container" + (isOpen ? " open" : "")}>
      <button className="live-chat-toggle" onClick={() => setIsOpen((v) => !v)}>
        💬 {isOpen ? "Kapat" : "Canlı Destek"}
      </button>

      {isOpen && (
        <div className="live-chat-box">
          <div className="live-chat-header">
            Canlı Destek
            <span
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer", float: "right" }}
            >
              ✖
            </span>
          </div>

          <div className="live-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={"chat-msg " + msg.from}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form className="live-chat-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesajınızı yazın..."
              autoFocus
            />
            <button type="submit">Gönder</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
