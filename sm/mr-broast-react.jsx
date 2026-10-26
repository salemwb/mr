import { useState, useEffect, useRef } from "react";

const BRANCHES = [
  { name: "بني حارثة", phone: "966554892026" },
  { name: "الراية (النصر)", phone: "966554892626" },
  { name: "الرانوناء", phone: "966554892727" },
];

const MENU = [
  {
    id: "starters", icon: "🥗", title: "المقبلات", items: [
      { name: "سلطة ملفوف", desc: "سلطة ملفوف طازجة بصلصة خفيفة", price: 7.5, cal: 136, emoji: "🥗" },
      { name: "حمص", desc: "حمص مهروس بزيت الزيتون وتتبيلة مميزة", price: 9.5, cal: 121, emoji: "🫘" },
    ]
  },
  {
    id: "burger", icon: "🍔", title: "البرجر", items: [
      { name: "برجر زنجر دبل", desc: "قطعتا دجاج مقلي مع صوصات", price: 28, cal: 342, emoji: "🍔", spicy: true },
      { name: "برجر زنجر", desc: "دجاج مقرمش مع صوصات مميزة", price: 19, cal: 663, emoji: "🍔", spicy: true },
      { name: "برجر مسحب", desc: "دجاج مسحب مقرمش داخل برجر لذيذ", price: 17, cal: 541, emoji: "🍔", spicy: true },
      { name: "وجبة زنجر + بطاطس + عصير توت", desc: "برجر زنجر مع بطاطس مقلية وعصير توت", price: 28, cal: 663, emoji: "🍔" },
    ]
  },
  {
    id: "broast", icon: "🍗", title: "بروستد", items: [
      { name: "نصف بروستد (4 قطع)", desc: "دجاج بروستد مقلي مقرمش", price: 36, cal: 669, emoji: "🍗", spicy: true },
      { name: "ربع بروستد فخذ", desc: "قطعة فخذ دجاج بروستد مقرمشة", price: 19, cal: 200, emoji: "🍗", spicy: true },
      { name: "ربع بروستد صدر", desc: "صدر دجاج بروستد بطعم غني", price: 19, cal: 220, emoji: "🍗", spicy: true },
    ]
  },
  {
    id: "economic", icon: "💰", title: "الوجبة الاقتصادية", items: [
      { name: "الوجبة الاقتصادية", desc: "ربع بروستد + برجر زنجر + عصير توت طازج", price: 30, emoji: "🍱" },
    ]
  },
  {
    id: "mashab", icon: "🍖", title: "المسحب", items: [
      { name: "مسحب 10 قطع", desc: "دجاج مسحب مقرمش كمية كبيرة", price: 32, cal: 663, emoji: "🍖", spicy: true },
      { name: "مسحب 5 قطع", desc: "مسحب طازج محضر يومياً", price: 22, emoji: "🍖" },
      { name: "استربس 5 قطع", desc: "أصابع دجاج مقلية مقرمشة", price: 28, cal: 259, emoji: "🍗", spicy: true },
    ]
  },
  {
    id: "shrimp", icon: "🍤", title: "الجمبري", items: [
      { name: "جمبري 6 قطع", desc: "جمبري مقلي مقرمش لذيذ", price: 28, cal: 304, emoji: "🍤", spicy: true },
      { name: "جمبري 10 قطع", desc: "كمية أكبر من الجمبري المقرمش", price: 38, cal: 502, emoji: "🍤", spicy: true },
    ]
  },
  {
    id: "kids", icon: "👶", title: "وجبات الأطفال", items: [
      { name: "وجبة الأطفال نوني نجت + عصير", desc: "قطع دجاج مع عصير مناسب للأطفال", price: 23, cal: 323, emoji: "👶" },
    ]
  },
  {
    id: "potato", icon: "🍟", title: "البطاطس", items: [
      { name: "تشكن فرايز", desc: "بطاطس مع قطع دجاج وصوص", price: 34, cal: 220, emoji: "🍟", spicy: true },
      { name: "بطاطس مقلي", desc: "بطاطس ذهبية مقرمشة ساخنة", price: 11, emoji: "🍟" },
      { name: "بطاطس كبير", desc: "بطاطس طازجة مقطعة بحجم كبير", price: 19, emoji: "🍟" },
    ]
  },
  {
    id: "sides", icon: "🥣", title: "الأطباق الجانبية", items: [
      { name: "ثوم بارد", desc: "صوص ثوم كريمي خفيف", price: 2, cal: 146, emoji: "🧄" },
      { name: "ثوم حار", desc: "صوص ثوم بلمسة حارة", price: 2, emoji: "🌶️" },
      { name: "ثوم دبل حار", desc: "صوص ثوم حار بنكهة قوية", price: 2, cal: 254, emoji: "🔥" },
      { name: "جبنة", desc: "جبن سائل كريمي", price: 4, cal: 187, emoji: "🧀" },
      { name: "باربيكيو", desc: "صوص مدخن بطعم حلو", price: 4, cal: 172, emoji: "🫙" },
      { name: "ماسترد", desc: "صوص خردل بنكهة مميزة", price: 4, cal: 107, emoji: "🌭" },
      { name: "خبز", desc: "خبز طازج يقدم مع الوجبات", price: 2, cal: 102, emoji: "🥖" },
    ]
  },
  {
    id: "drinks", icon: "🥤", title: "المشروبات", items: [
      { name: "بيبسي", desc: "مشروب غازي بارد ومنعش", price: 5, cal: 140, emoji: "🥤" },
      { name: "عصير توت", desc: "طازج من أجود أنواع التوت", price: 6, cal: 46, emoji: "🫐" },
      { name: "مياه", desc: "مياه معدنية نقية", price: 2, emoji: "💧" },
    ]
  },
];

const WA = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

export default function App() {
  const [branch, setBranch] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("starters");
  const toastTimer = useRef(null);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(i => i.name === item.name);
      if (ex) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
    showToast("✅ تمت إضافة " + item.name);
  };

  const changeQty = (name, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.name === name ? { ...i, qty: i.qty + delta } : i);
      return updated.filter(i => i.qty > 0);
    });
  };

  const sendOrder = () => {
    if (cart.length === 0) return;
    const b = BRANCHES[branch];
    let msg = `السلام عليكم ورحمة الله وبركاته 🍗\nأبغى أطلب من فرع ${b.name}:\n\n`;
    cart.forEach(i => {
      msg += `🛒 ${i.name}${i.qty > 1 ? " × " + i.qty : ""} — ${(i.price * i.qty).toFixed(1)} ر.س\n`;
    });
    msg += `\n💰 المجموع: ${totalPrice.toFixed(1)} ر.س\n\nشكراً لكم 🙏`;
    window.open(`https://wa.me/${b.phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir="rtl" style={{ background: "#0D0A06", minHeight: "100vh", fontFamily: "'Tajawal', sans-serif", color: "#F5EDD8", overflowX: "hidden" }}>

      {/* Toast */}
      <div style={{
        position: "fixed", top: 70, left: "50%", transform: `translateX(-50%) translateY(${toastVisible ? 0 : -20}px)`,
        background: "rgba(26,21,9,0.97)", border: "1px solid rgba(200,146,42,0.4)",
        color: "#F0B840", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 700,
        whiteSpace: "nowrap", opacity: toastVisible ? 1 : 0, transition: "all 0.3s", zIndex: 400, pointerEvents: "none"
      }}>{toast}</div>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "40px 20px 80px",
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,146,42,0.18) 0%, transparent 70%), linear-gradient(160deg,#0D0A06 0%,#1A1509 50%,#0D0A06 100%)",
        position: "relative"
      }}>
        <div style={{ fontSize: 80, marginBottom: 8, filter: "drop-shadow(0 0 30px rgba(200,146,42,0.6))" }}>🍗</div>
        <div style={{
          fontSize: "clamp(48px,10vw,96px)", fontWeight: 900, lineHeight: 1,
          background: "linear-gradient(160deg,#F0B840 0%,#C8922A 50%,#8B6010 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>مستر بروست</div>
        <div style={{ width: 70, height: 2, background: "linear-gradient(90deg,transparent,#C8922A,transparent)", margin: "16px auto" }} />
        <div style={{ fontSize: 15, color: "#EDE0C4" }}>إذا سألت عن البروست فاسأل عن مستر بروست 🍗</div>
        <div style={{ fontSize: 11, color: "#C8922A", letterSpacing: 4, marginTop: 6 }}>المدينة المنورة · ثلاثة فروع</div>

        {/* اختيار الفرع */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 12, color: "rgba(245,237,216,0.45)", letterSpacing: 2, marginBottom: 12 }}>اختر الفرع الذي تريد الطلب منه</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {BRANCHES.map((b, i) => (
              <button key={i} onClick={() => { setBranch(i); showToast("تم اختيار فرع " + b.name + " 📍"); }}
                style={{
                  background: branch === i ? "linear-gradient(135deg,#C8922A,#F0B840)" : "rgba(200,146,42,0.1)",
                  border: branch === i ? "none" : "1.5px solid rgba(200,146,42,0.35)",
                  color: branch === i ? "#0D0A06" : "#EDE0C4",
                  padding: "10px 18px", borderRadius: 50, fontFamily: "inherit",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.3s",
                  boxShadow: branch === i ? "0 4px 16px rgba(200,146,42,0.4)" : "none"
                }}>
                📍 {b.name}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "rgba(245,237,216,0.4)" }}>
            الطلب سيُرسل إلى: <span style={{ color: "#F0B840", fontWeight: 700 }}>{BRANCHES[branch].name}</span>
          </div>
        </div>
        <div style={{ marginTop: 32, color: "rgba(200,146,42,0.4)", fontSize: 12, letterSpacing: 2 }}>▼ المنيو</div>
      </div>

      {/* شريط التنقل */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,10,6,0.93)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(200,146,42,0.2)"
      }}>
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: "0 8px", maxWidth: 1100, margin: "0 auto" }}>
          {MENU.map(s => (
            <button key={s.id} onClick={() => scrollToSection(s.id)}
              style={{
                flexShrink: 0, background: "none", border: "none",
                borderBottom: activeSection === s.id ? "2px solid #F0B840" : "2px solid transparent",
                color: activeSection === s.id ? "#F0B840" : "rgba(245,237,216,0.5)",
                padding: "14px 15px", fontFamily: "inherit", fontSize: 13,
                fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.3s"
              }}>
              {s.icon} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* المحتوى */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 16px 160px" }}>
        {MENU.map(section => (
          <div key={section.id} id={section.id} style={{ marginBottom: 60 }}>
            {/* عنوان القسم */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg,rgba(200,146,42,0.4),transparent)" }} />
              <div style={{ fontSize: "clamp(17px,4vw,24px)", fontWeight: 800, color: "#F0B840", whiteSpace: "nowrap" }}>
                {section.icon} {section.title}
              </div>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(200,146,42,0.4),transparent)" }} />
            </div>

            {/* كروت الأصناف */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
              {section.items.map((item, idx) => (
                <div key={idx} style={{
                  background: "rgba(26,21,9,0.9)", border: "1px solid rgba(200,146,42,0.18)",
                  borderRadius: 14, overflow: "hidden", transition: "all 0.3s"
                }}>
                  {/* صورة / إيموجي */}
                  <div style={{
                    height: 130, background: "linear-gradient(135deg,#2A1F0A,#1A1509)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 60, position: "relative"
                  }}>
                    {item.emoji}
                    {item.spicy && (
                      <div style={{
                        position: "absolute", top: 10, left: 10,
                        background: "#C0392B", color: "white",
                        fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 50
                      }}>عادي / حراق</div>
                    )}
                  </div>

                  {/* تفاصيل */}
                  <div style={{ padding: "13px 15px 15px" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#F5EDD8", marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(245,237,216,0.45)", lineHeight: 1.6, marginBottom: 12, minHeight: 36 }}>{item.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#F0B840" }}>
                          <span style={{ fontSize: 11, fontWeight: 400, color: "#C8922A" }}>ر.س</span>{item.price}
                        </div>
                        {item.cal && <div style={{ fontSize: 10, color: "rgba(245,237,216,0.3)" }}>🔥 {item.cal} سعرة</div>}
                      </div>

                      {/* زر أضف للسلة */}
                      <button onClick={() => addToCart(item)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          background: "rgba(200,146,42,0.15)", border: "1.5px solid rgba(200,146,42,0.45)",
                          color: "#F0B840", padding: "9px 14px", borderRadius: 50,
                          fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                          cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                          transition: "all 0.22s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,146,42,0.3)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,146,42,0.15)"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        🛒 أضف للسلة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* الفروع */}
        <div id="branches" style={{
          background: "linear-gradient(135deg,rgba(200,146,42,0.08),rgba(26,21,9,0.95))",
          border: "1px solid rgba(200,146,42,0.2)", borderRadius: 20,
          padding: "40px 28px", textAlign: "center", marginBottom: 40
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#F0B840", marginBottom: 6 }}>📍 فروعنا في المدينة المنورة</div>
          <div style={{ color: "rgba(245,237,216,0.45)", marginBottom: 28, fontSize: 13 }}>اختر الفرع الأقرب إليك للتواصل المباشر عبر واتساب</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, textAlign: "right" }}>
            {[
              { num: "١", name: "حي بني حارثة", phone: "0554892026", wa: "966554892026", map: "https://maps.app.goo.gl/Z3cmunYqQiNvgjt19" },
              { num: "٢", name: "حي الراية (النصر)", phone: "0554892626", wa: "966554892626", map: "https://maps.app.goo.gl/kPX8TGfaqR9KinuD8" },
              { num: "٣", name: "الرانوناء", phone: "0554892727", wa: "966554892727", map: "https://maps.app.goo.gl/7v2ZWzKyaa5UDZqQ6" },
            ].map((b, i) => (
              <div key={i} style={{ background: "rgba(13,10,6,0.8)", border: "1px solid rgba(200,146,42,0.2)", borderRadius: 12, padding: 20 }}>
                <div style={{ width: 30, height: 30, background: "#C8922A", color: "#0D0A06", borderRadius: "50%", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{b.num}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{b.name}</div>
                <div style={{ fontSize: 14, color: "#C8922A", fontWeight: 600, direction: "ltr", textAlign: "right", marginBottom: 6 }}>{b.phone}</div>
                <a href={b.map} target="_blank" rel="noreferrer" style={{ color: "#F0B840", fontSize: 11, textDecoration: "none", opacity: 0.65 }}>📌 عرض على الخريطة</a>
                <br />
                <a href={`https://wa.me/${b.wa}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته 🍗")}`}
                  target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#25D366", color: "white", textDecoration: "none", padding: "9px 14px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginTop: 12 }}>
                  <WA size={16} /> واتساب
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== السلة ===== */}
      {totalQty > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
          background: "rgba(13,10,6,0.97)", borderTop: "1px solid rgba(200,146,42,0.3)",
          backdropFilter: "blur(20px)"
        }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "12px 16px" }}>

            {/* ملخص السلة — قابل للضغط */}
            <div onClick={() => setCartOpen(o => !o)}
              style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <CartIcon />
                <div style={{
                  position: "absolute", top: -6, right: -6,
                  background: "#C0392B", color: "white",
                  fontSize: 10, fontWeight: 800, width: 18, height: 18,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                }}>{totalQty}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>سلة طلباتك 🛒</div>
                <div style={{ fontSize: 11, color: "rgba(245,237,216,0.45)" }}>{totalQty} صنف · اضغط للتفاصيل</div>
              </div>
              <div style={{
                background: "linear-gradient(135deg,#C8922A,#F0B840)", color: "#0D0A06",
                fontSize: 14, fontWeight: 800, padding: "8px 16px", borderRadius: 50, whiteSpace: "nowrap"
              }}>{totalPrice.toFixed(1)} ر.س</div>
              <div style={{ color: "#C8922A", fontSize: 18, transition: "transform 0.3s", transform: cartOpen ? "rotate(180deg)" : "rotate(0)" }}>▲</div>
            </div>

            {/* تفاصيل السلة */}
            {cartOpen && (
              <div style={{ borderTop: "1px solid rgba(200,146,42,0.15)", marginTop: 12, paddingTop: 12, maxHeight: "45vh", overflowY: "auto" }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 0", borderBottom: "1px solid rgba(200,146,42,0.08)"
                  }}>
                    <div style={{ flex: 1, fontSize: 14 }}>{item.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => changeQty(item.name, -1)} style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.3)",
                        color: "#F0B840", fontSize: 16, fontWeight: 700, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => changeQty(item.name, 1)} style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.3)",
                        color: "#F0B840", fontSize: 16, fontWeight: 700, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>+</button>
                    </div>
                    <div style={{ fontSize: 13, color: "#C8922A", fontWeight: 700, minWidth: 55, textAlign: "left" }}>
                      {(item.price * item.qty).toFixed(1)} ر.س
                    </div>
                  </div>
                ))}

                {/* أزرار السلة */}
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button onClick={() => { setCart([]); setCartOpen(false); }} style={{
                    background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.4)",
                    color: "#e74c3c", padding: "11px 16px", borderRadius: 50,
                    fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
                  }}>🗑 مسح السلة</button>

                  <button onClick={sendOrder} style={{
                    flex: 1, background: "linear-gradient(135deg,#25D366,#1ebe57)",
                    color: "white", border: "none", padding: "12px", borderRadius: 50,
                    fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                  }}>
                    <WA size={20} /> أرسل الطلب عبر واتساب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
