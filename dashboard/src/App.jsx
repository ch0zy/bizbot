import { useState, useRef, useEffect } from "react";

// ─── Zero Foundation — Brand Colour Tokens ────────────────────────────────────
const brand = {
  10: "#E9F4F5", 20: "#CEE6E8", 30: "#9FCED3", 40: "#6BB3BA",
  50: "#2D949E", 60: "#03727D", 70: "#02545D", 80: "#013D43",
  90: "#01282C", 100: "#01181B",
};

const color = {
  bgDefault: "#FFFFFF",
  bgSubtle: brand[10],
  bgSurface: "#FFFFFF",
  bgOverlay: "#F2F5F5",
  bgDisabled: "#F0F1F2",
  borderLighter: "#DEE1E7",
  borderLight: brand[20],
  borderDark: brand[40],
  borderPrimary: brand[60],
  typeHeaderDark: "#13151A",
  typeLabelDark: "#323743",
  typeBodyLight: "#444C5D",
  typePlaceholder: brand[40],
  typeHelper: brand[50],
  typeDisabled: brand[30],
  typeInverse: "#FFFFFF",
  iconLight: brand[30],
  iconDefault: brand[50],
  iconDark: brand[70],
  primary: brand[60],
  primaryHover: brand[70],
  primaryActive: brand[80],
  primarySubtle: brand[10],
  primarySubtleBorder: brand[20],
};

const font = "'Lexend', system-ui, sans-serif";
const sp = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

const type = {
  displaySmBold: { fontSize: 32, fontWeight: 700, lineHeight: "40px", letterSpacing: "-0.4px" },
  headingLgBold: { fontSize: 28, fontWeight: 700, lineHeight: "36px", letterSpacing: "-0.4px" },
  headingMdSemi: { fontSize: 24, fontWeight: 600, lineHeight: "32px", letterSpacing: "0" },
  headingSmSemi: { fontSize: 20, fontWeight: 600, lineHeight: "28px", letterSpacing: "0" },
  labelLgSemi:   { fontSize: 16, fontWeight: 600, lineHeight: "24px", letterSpacing: "0" },
  labelLgReg:    { fontSize: 16, fontWeight: 400, lineHeight: "24px", letterSpacing: "0" },
  labelMdReg:    { fontSize: 14, fontWeight: 400, lineHeight: "20px", letterSpacing: "0" },
  labelSmReg:    { fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0" },
  caption:       { fontSize: 11, fontWeight: 500, lineHeight: "16px", letterSpacing: "0.04em" },
};

// ─── GoBusiness URLs ──────────────────────────────────────────────────────────
const urls = {
  dashboard:       "https://dashboard.gobusiness.gov.sg/",
  licencesHome:    "https://www.gobusiness.gov.sg/licences/",
  renewLicence:    "https://www.gobusiness.gov.sg/licences/renew-amend-licence/",
  foodShopLicence: "https://www.gobusiness.gov.sg/browse-all-licences/singapore-food-agency-(sfa)/food-shop-licence",
  liquorLicence:   "https://licensing.gobusiness.gov.sg/licence-directory/spf/liquor-licence",
  acraReg:         "https://www.gobusiness.gov.sg/start-a-business/",
  trackLicence:    "https://dashboard.gobusiness.gov.sg/",
  grantsHome:      "https://www.gobusiness.gov.sg/gov-assist/grants/",
  bgp:             "https://grants.gobusiness.gov.sg/",
  edg:             "https://grants.gobusiness.gov.sg/support/enterprise-development-grant",
  psg:             "https://grants.gobusiness.gov.sg/support/productivity-solutions-grant",
  mra:             "https://grants.gobusiness.gov.sg/support/market-readiness-assistance",
  eServices:       "https://www.gobusiness.gov.sg/e-services",
  advisory:        "https://www.gobusiness.gov.sg/gov-assist/",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const licences = [
  {
    id: "L-2024-001", name: "Food Business Licence", authority: "Singapore Food Agency",
    status: "active", issued: "15 Jan 2024", expiry: "14 Jan 2026", daysLeft: 315,
    category: "F&B", icon: "🍽️",
    viewUrl: urls.foodShopLicence,
    renewUrl: urls.renewLicence,
  },
  {
    id: "L-2023-047", name: "Business Registration", authority: "ACRA",
    status: "active", issued: "03 Mar 2023", expiry: "02 Mar 2028", daysLeft: 727,
    category: "Corporate", icon: "🏢",
    viewUrl: urls.acraReg,
    renewUrl: urls.renewLicence,
  },
  {
    id: "L-2024-089", name: "Liquor Licence (Class 1A)", authority: "Singapore Police Force",
    status: "expiring", issued: "01 Jun 2024", expiry: "31 May 2025", daysLeft: 28,
    category: "F&B", icon: "🍷",
    viewUrl: urls.liquorLicence,
    renewUrl: urls.renewLicence,
  },
  {
    id: "L-2024-112", name: "NEA Hawker Licence", authority: "National Environment Agency",
    status: "pending", issued: "—", expiry: "—", daysLeft: null,
    category: "F&B", icon: "🥢",
    viewUrl: urls.licencesHome,
    trackUrl: urls.dashboard,
  },
];

const grants = [
  {
    id: "G-EDG-2024", name: "Enterprise Development Grant", agency: "Enterprise Singapore",
    amount: "S$45,000", status: "approved", type: "Productivity & Innovation",
    deadline: "Ongoing", match: 95, icon: "💡",
    learnUrl: urls.edg,
    applyUrl: urls.bgp,
    reportUrl: urls.bgp,
  },
  {
    id: "G-PSG-2024", name: "Productivity Solutions Grant", agency: "Enterprise Singapore",
    amount: "Up to S$30,000", status: "eligible", type: "Digital Solutions",
    deadline: "31 Dec 2025", match: 88, icon: "📱",
    learnUrl: urls.psg,
    applyUrl: urls.bgp,
  },
  {
    id: "G-MRA-2024", name: "Market Readiness Assistance", agency: "Enterprise Singapore",
    amount: "Up to S$100,000", status: "eligible", type: "Overseas Expansion",
    deadline: "Ongoing", match: 72, icon: "🌏",
    learnUrl: urls.mra,
    applyUrl: urls.bgp,
  },
  {
    id: "G-CDG-2023", name: "Capability Development Grant", agency: "SkillsFuture",
    amount: "S$12,500", status: "disbursed", type: "Workforce Training",
    deadline: "Completed", match: 100, icon: "🎓",
    learnUrl: urls.grantsHome,
    reportUrl: urls.bgp,
  },
];

const suggestions = [
  "What licences are expiring soon?",
  "Am I eligible for the PSG grant?",
  "How do I renew my Liquor Licence?",
  "What grants help with overseas expansion?",
];

// ─── Status Pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const map = {
    active:    { bg: "#E6F4EA", text: "#1E7E34", label: "Active" },
    expiring:  { bg: "#FFF3CD", text: "#856404", label: "Expiring Soon" },
    pending:   { bg: brand[10],  text: brand[60], label: "Pending" },
    approved:  { bg: "#E6F4EA", text: "#1E7E34", label: "Approved" },
    eligible:  { bg: brand[10],  text: brand[60], label: "Eligible" },
    disbursed: { bg: "#F3E5F5", text: "#6A1B9A", label: "Disbursed" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      ...type.caption, fontFamily: font, background: s.bg, color: s.text,
      borderRadius: 100, padding: "3px 10px", fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

// ─── Licence Card ─────────────────────────────────────────────────────────────
function LicenceCard({ licence }) {
  const isExpiring = licence.status === "expiring";
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color.bgSurface,
        border: `1px solid ${isExpiring ? "#F5C518" : color.borderLighter}`,
        borderRadius: 12, padding: sp.xl,
        display: "flex", flexDirection: "column", gap: sp.md,
        position: "relative", overflow: "hidden",
        boxShadow: hovered ? "0 4px 20px rgba(3,114,125,0.10)" : "none",
        transition: "box-shadow 0.15s ease",
      }}
    >
      {isExpiring && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "#FFF3CD", padding: "4px 12px",
          borderBottomLeftRadius: 8,
          ...type.caption, fontFamily: font, color: "#856404", fontWeight: 700,
        }}>⚠ Renew in {licence.daysLeft}d</div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: sp.md }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: color.primarySubtle,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>{licence.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>{licence.name}</div>
          <div style={{ ...type.labelSmReg, fontFamily: font, color: color.typeHelper, marginTop: 2 }}>{licence.authority}</div>
        </div>
        <StatusPill status={licence.status} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: sp.sm }}>
        {[
          { label: "Licence ID", value: licence.id },
          { label: "Issued", value: licence.issued },
          { label: "Expiry", value: licence.expiry },
        ].map(item => (
          <div key={item.label}>
            <div style={{ ...type.caption, fontFamily: font, color: color.typeHelper, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
            <div style={{ ...type.labelMdReg, fontFamily: font, color: color.typeLabelDark, fontWeight: 600 }}>{item.value}</div>
          </div>
        ))}
      </div>
      {licence.status !== "pending" && licence.daysLeft && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ ...type.caption, fontFamily: font, color: color.typeHelper }}>Validity progress</span>
            <span style={{ ...type.caption, fontFamily: font, color: isExpiring ? "#856404" : color.primary, fontWeight: 700 }}>{licence.daysLeft} days left</span>
          </div>
          <div style={{ height: 4, background: color.borderLight, borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.min(100, (licence.daysLeft / 730) * 100)}%`,
              background: isExpiring ? "#F5C518" : color.primary,
              borderRadius: 2,
            }} />
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: sp.sm }}>
        <a href={licence.viewUrl} target="_blank" rel="noopener noreferrer" style={{
          ...type.labelSmReg, fontFamily: font, fontWeight: 600,
          background: color.primarySubtle, color: color.primary,
          border: `1px solid ${color.primarySubtleBorder}`,
          borderRadius: 6, padding: "7px 14px", cursor: "pointer",
          textDecoration: "none", display: "inline-block",
        }}>View Details ↗</a>
        {(licence.status === "expiring" || licence.status === "active") && (
          <a href={licence.renewUrl} target="_blank" rel="noopener noreferrer" style={{
            ...type.labelSmReg, fontFamily: font, fontWeight: 600,
            backgroundColor: color.primary, color: color.typeInverse,
            border: "none", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>Renew ↗</a>
        )}
        {licence.status === "pending" && (
          <a href={licence.trackUrl} target="_blank" rel="noopener noreferrer" style={{
            ...type.labelSmReg, fontFamily: font, fontWeight: 600,
            background: "#FFF3CD", color: "#856404",
            border: "1px solid #F5C518", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>Track Status ↗</a>
        )}
      </div>
    </div>
  );
}

// ─── Grant Card ───────────────────────────────────────────────────────────────
function GrantCard({ grant }) {
  const isDisbursed = grant.status === "disbursed";
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color.bgSurface,
        border: `1px solid ${color.borderLighter}`,
        borderRadius: 12, padding: sp.xl,
        display: "flex", flexDirection: "column", gap: sp.md,
        boxShadow: hovered ? "0 4px 20px rgba(3,114,125,0.10)" : "none",
        transition: "box-shadow 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: sp.md }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: isDisbursed ? "#F3E5F5" : color.primarySubtle,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>{grant.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>{grant.name}</div>
          <div style={{ ...type.labelSmReg, fontFamily: font, color: color.typeHelper, marginTop: 2 }}>{grant.agency}</div>
        </div>
        <StatusPill status={grant.status} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: sp.sm }}>
        {[
          { label: "Quantum", value: grant.amount },
          { label: "Deadline", value: grant.deadline },
          { label: "Category", value: grant.type },
          { label: "Match Score", value: `${grant.match}%`, highlight: true },
        ].map(item => (
          <div key={item.label}>
            <div style={{ ...type.caption, fontFamily: font, color: color.typeHelper, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
            <div style={{ ...type.labelMdReg, fontFamily: font, fontWeight: 600, color: item.highlight ? color.primary : color.typeLabelDark }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ ...type.caption, fontFamily: font, color: color.typeHelper }}>Eligibility match</span>
          <span style={{ ...type.caption, fontFamily: font, color: color.primary, fontWeight: 700 }}>{grant.match}%</span>
        </div>
        <div style={{ height: 4, background: color.borderLight, borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${grant.match}%`,
            background: `linear-gradient(90deg, ${brand[60]}, ${brand[40]})`, borderRadius: 2,
          }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: sp.sm }}>
        <a href={grant.learnUrl} target="_blank" rel="noopener noreferrer" style={{
          ...type.labelSmReg, fontFamily: font, fontWeight: 600,
          background: color.primarySubtle, color: color.primary,
          border: `1px solid ${color.primarySubtleBorder}`,
          borderRadius: 6, padding: "7px 14px", cursor: "pointer",
          textDecoration: "none", display: "inline-block",
        }}>Learn More ↗</a>
        {grant.status === "eligible" && (
          <a href={grant.applyUrl} target="_blank" rel="noopener noreferrer" style={{
            ...type.labelSmReg, fontFamily: font, fontWeight: 600,
            backgroundColor: color.primary, color: color.typeInverse,
            border: "none", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>Apply Now ↗</a>
        )}
        {grant.status === "approved" && (
          <a href={grant.reportUrl} target="_blank" rel="noopener noreferrer" style={{
            ...type.labelSmReg, fontFamily: font, fontWeight: 600,
            background: "#E6F4EA", color: "#1E7E34",
            border: "1px solid #A8D5B5", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>View on BGP ↗</a>
        )}
        {grant.status === "disbursed" && (
          <a href={grant.reportUrl} target="_blank" rel="noopener noreferrer" style={{
            ...type.labelSmReg, fontFamily: font, fontWeight: 600,
            background: "#F3E5F5", color: "#6A1B9A",
            border: "1px solid #CE93D8", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>View Report ↗</a>
        )}
      </div>
    </div>
  );
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────
function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your business advisor. I can help with licence renewals, grant eligibility, compliance, and growth planning. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setLoading(true);

    const systemPrompt = `You are a concise Singapore business advisor in a dashboard. User profile:
- Business: F&B restaurant "Wok & Barrel Pte. Ltd."
- Active licences: Food Business Licence (SFA, expires Jan 2026), Business Registration (ACRA, expires Mar 2028)
- Expiring: Liquor Licence Class 1A (28 days left!)
- Pending: NEA Hawker Licence
- Approved grant: Enterprise Development Grant S$45,000
- Eligible: Productivity Solutions Grant (S$30K, 88% match), Market Readiness Assistance (S$100K, 72% match)
- Disbursed: Capability Development Grant S$12,500
Keep answers under 100 words. Be specific, practical, and actionable. Use plain language.`;

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const headers = { "Content-Type": "application/json" };
      if (apiKey) headers["x-api-key"] = apiKey;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, couldn't get a response.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const showSuggestions = messages.length === 1;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: color.bgSurface, borderLeft: `1px solid ${color.borderLighter}`,
    }}>
      {/* Header */}
      <div style={{
        padding: `${sp.lg}px ${sp.xl}px`,
        borderBottom: `1px solid ${color.borderLighter}`,
        flexShrink: 0, background: color.bgSurface,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: sp.md }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: `linear-gradient(135deg, ${brand[60]}, ${brand[40]})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 16, fontWeight: 700,
          }}>✦</div>
          <div>
            <div style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>Business Advisor</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ ...type.labelSmReg, fontFamily: font, color: color.typeHelper }}>AI-powered · Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: `${sp.lg}px`, display: "flex", flexDirection: "column", gap: sp.md }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-end", gap: sp.sm,
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${brand[60]}, ${brand[40]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 11, fontWeight: 700,
              }}>✦</div>
            )}
            <div style={{
              maxWidth: "82%",
              background: msg.role === "user" ? color.primary : color.bgSubtle,
              color: msg.role === "user" ? color.typeInverse : color.typeLabelDark,
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              padding: "10px 14px",
              ...type.labelMdReg, fontFamily: font, lineHeight: "20px",
              whiteSpace: "pre-wrap",
            }}>{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: sp.sm }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${brand[60]}, ${brand[40]})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 11, fontWeight: 700,
            }}>✦</div>
            <div style={{
              background: color.bgSubtle, borderRadius: "16px 16px 16px 4px",
              padding: "12px 16px", display: "flex", gap: 4, alignItems: "center",
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: brand[40],
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div style={{ padding: `0 ${sp.lg}px ${sp.md}px`, flexShrink: 0 }}>
          <div style={{ ...type.caption, fontFamily: font, color: color.typeHelper, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: sp.sm }}>Try asking</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                ...type.labelSmReg, fontFamily: font, fontWeight: 400,
                background: color.primarySubtle, color: color.primary,
                border: `1px solid ${color.primarySubtleBorder}`,
                borderRadius: 8, padding: "8px 12px",
                cursor: "pointer", textAlign: "left",
                transition: "background 0.12s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = color.borderLight}
                onMouseLeave={e => e.currentTarget.style.background = color.primarySubtle}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: `${sp.md}px ${sp.lg}px ${sp.lg}px`,
        borderTop: `1px solid ${color.borderLighter}`, flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: sp.sm, alignItems: "flex-end" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask about licences, grants, compliance…"
            rows={2}
            style={{
              flex: 1, borderRadius: 10,
              border: `1px solid ${focused ? color.borderPrimary : color.borderDark}`,
              outline: focused ? `3px solid ${brand[50]}33` : "none",
              padding: "10px 14px", resize: "none",
              ...type.labelMdReg, fontFamily: font,
              color: color.typeLabelDark, background: color.bgDefault,
              transition: "border-color 0.12s ease, outline 0.12s ease",
              lineHeight: "20px",
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44, borderRadius: 10, border: "none",
              background: !input.trim() || loading ? color.bgDisabled : color.primary,
              color: !input.trim() || loading ? color.typeDisabled : color.typeInverse,
              cursor: !input.trim() || loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "background 0.12s", flexShrink: 0,
            }}
          >↑</button>
        </div>
        <div style={{ ...type.caption, fontFamily: font, color: color.typeDisabled, marginTop: 6, textAlign: "center" }}>
          Powered by Claude · Press Enter to send
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: color.bgSurface, border: `1px solid ${color.borderLighter}`,
      borderRadius: 12, padding: sp.xl,
      borderTop: `3px solid ${accent || color.primary}`,
    }}>
      <div style={{ ...type.caption, fontFamily: font, color: color.typeHelper, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: sp.sm }}>{label}</div>
      <div style={{ ...type.displaySmBold, fontFamily: font, color: color.typeHeaderDark }}>{value}</div>
      <div style={{ ...type.labelSmReg, fontFamily: font, color: color.typeHelper, marginTop: sp.xs }}>{sub}</div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState("licences");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CEE6E8; border-radius: 2px; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", background: color.bgOverlay, fontFamily: font, overflow: "hidden" }}>

        {/* ── Main Content (75%) ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Top Bar */}
          <div style={{
            background: color.bgSurface, borderBottom: `1px solid ${color.borderLighter}`,
            padding: `${sp.md}px ${sp.xl}px`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0, height: 60,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: sp.lg }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `linear-gradient(135deg, ${brand[60]}, ${brand[40]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: font,
              }}>Z</div>
              <div>
                <div style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>Business Hub</div>
                <div style={{ ...type.labelSmReg, fontFamily: font, color: color.typeHelper }}>Wok & Barrel Pte. Ltd.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: sp.md }}>
              <a href={urls.renewLicence} target="_blank" rel="noopener noreferrer" style={{
                background: "#FFF3CD", border: "1px solid #F5C51888",
                borderRadius: 8, padding: "6px 14px",
                ...type.labelSmReg, fontFamily: font, color: "#856404", fontWeight: 600,
                textDecoration: "none",
              }}>⚠ Liquor Licence expires in 28 days — Renew ↗</a>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: color.primary, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                ...type.labelMdReg, fontFamily: font, fontWeight: 700,
              }}>WB</div>
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: `${sp.xl}px` }}>

            {/* Welcome */}
            <div style={{ marginBottom: sp.xl }}>
              <div style={{ ...type.headingLgBold, fontFamily: font, color: color.typeHeaderDark }}>Good morning, Wei Bin 👋</div>
              <div style={{ ...type.labelLgReg, fontFamily: font, color: color.typeBodyLight, marginTop: sp.xs }}>
                Here's a summary of your licences and grant portfolio.
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: sp.lg, marginBottom: sp.xl }}>
              <StatCard label="Active Licences" value="3" sub="1 pending approval" accent={brand[60]} />
              <StatCard label="Expiring Soon" value="1" sub="Renew within 30 days" accent="#F5C518" />
              <StatCard label="Grant Funding" value="S$45K" sub="Approved & disbursing" accent="#22C55E" />
              <StatCard label="Grants Eligible" value="2" sub="Ready to apply" accent={brand[40]} />
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, marginBottom: sp.lg, borderBottom: `1px solid ${color.borderLighter}` }}>
              {[
                { key: "licences", label: "🪪 Licences", count: 4 },
                { key: "grants",   label: "💰 Grants & Funding", count: 4 },
              ].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  ...type.labelLgSemi, fontFamily: font, background: "transparent", border: "none",
                  borderBottom: tab === t.key ? `2px solid ${color.primary}` : "2px solid transparent",
                  color: tab === t.key ? color.primary : color.typeBodyLight,
                  padding: `${sp.sm}px ${sp.lg}px ${sp.md}px`,
                  cursor: "pointer", marginBottom: -1,
                  transition: "color 0.12s",
                }}>{t.label}</button>
              ))}
            </div>

            {/* Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: sp.lg }}>
              {tab === "licences"
                ? licences.map(l => <LicenceCard key={l.id} licence={l} />)
                : grants.map(g => <GrantCard key={g.id} grant={g} />)
              }
            </div>

            {/* CTA Banner */}
            <div style={{
              marginTop: sp.xl,
              background: `linear-gradient(135deg, ${brand[80]}, ${brand[60]})`,
              borderRadius: 12, padding: `${sp.xl}px`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: sp.lg,
            }}>
              <div>
                <div style={{ ...type.headingSmSemi, fontFamily: font, color: "#fff" }}>Ready to scale your business?</div>
                <div style={{ ...type.labelMdReg, fontFamily: font, color: brand[20], marginTop: sp.xs }}>
                  Discover more grants and expansion pathways available to F&B businesses in Singapore.
                </div>
              </div>
              <div style={{ display: "flex", gap: sp.md, flexShrink: 0 }}>
                <a href={urls.grantsHome} target="_blank" rel="noopener noreferrer" style={{
                  ...type.labelLgSemi, fontFamily: font,
                  background: "rgba(255,255,255,0.12)", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                  textDecoration: "none", display: "inline-block",
                }}>Browse Grants ↗</a>
                <a href={urls.advisory} target="_blank" rel="noopener noreferrer" style={{
                  ...type.labelLgSemi, fontFamily: font,
                  background: "#fff", color: color.primary,
                  border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                  textDecoration: "none", display: "inline-block",
                }}>Book Advisory Session ↗</a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Chat Panel (25%) ── */}
        <div style={{ width: "25%", minWidth: 300, maxWidth: 380, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <ChatPanel />
        </div>

      </div>
    </>
  );
}
