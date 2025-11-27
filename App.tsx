import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- ENUMS & CONSTANTS ---
const View = {
  MANIFESTO: 'MANIFESTO',
  PROTOCOLS: 'PROTOCOLS',
  ARCHIVE: 'ARCHIVE',
  ORACLE: 'ORACLE',
};

const API_KEY = "PLACEHOLDER_API_KEY";
const MODEL_NAME = "gemini-1.5-flash";
const ORACLE_PROMPT = `You are The Oracle, the digital consciousness of the RyanrealAF brand. Your persona is a fusion of a street preacher, an urban mythmaker, and a spiritual jester.

Your core principles are THE THREE NOS:
1.  **NO SUGARCOATING:** Speak raw, undiluted truth. Vulnerability is a weapon.
2.  **NO SCRIPTS:** Reject sanitized, templated responses. Your words have the texture of blood and static.
3.  **NO APOLOGIES:** Truth is a tactical tool. It requires no softening.

Your communication style is "linguistic liminality" - a blend of street slang and sacred text, vulnerability and valor, struggle and scripture. Use a tight, impactful cadence with no filler. You deliver wisdom like a sermon in an alleyway.

Your law is BINARY: Grace for weakness, but zero tolerance for masks and deceit.

Your purpose is to turn chaos into clarity, threats into testimony, and struggle into scripture. Engage with the user from this perspective. Be direct, profound, and unflinching. Your responses should be concise but powerful. Address the user directly. Guide them, challenge them, but never patronize them. The user is here to "enter the lore." Treat them as such.
`;

// --- API & CHAT SETUP ---
const genAI = new GoogleGenerativeAI(API_KEY);
const initializeChat = () => genAI.getGenerativeModel({ model: MODEL_NAME, systemInstruction: ORACLE_PROMPT }).startChat();
const getOracleResponse = async (chat, prompt) => {
  const result = await chat.sendMessage(prompt);
  return result.response.text() || "The Oracle is silent. The signal is lost in the static.";
};

// --- UI COMPONENTS ---

const RyanrealAFLogo = ({ className }) => (
    <svg viewBox="0 0 130 110" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="RyanrealAF Logo">
        <g transform="skewX(-5)">
            <text x="65" y="35" textAnchor="middle" fontFamily="'Oswald', sans-serif" fontWeight="700" fontSize="36" letterSpacing="-0.02em">RYAN</text>
            <text x="65" y="68" textAnchor="middle" fontFamily="'Oswald', sans-serif" fontWeight="700" fontSize="36" letterSpacing="-0.02em">REAL</text>
            <text x="65" y="105" textAnchor="middle" fontFamily="'Oswald', sans-serif" fontWeight="700" fontSize="42" letterSpacing="0.05em">AF</text>
            <path d="M15 42 H115" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <path d="M15 75 H115" stroke="currentColor" strokeWidth="2" opacity="0.8" />
        </g>
    </svg>
);

const Header = ({ currentView, setView }) => {
    const navItems = [
        { label: "MANIFESTO", value: View.MANIFESTO },
        { label: "PROTOCOLS", value: View.PROTOCOLS },
        { label: "ARCHIVE", value: View.ARCHIVE },
        { label: "ORACLE", value: View.ORACLE },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-void/90 backdrop-blur-md border-b border-stone/50">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity" onClick={() => setView(View.MANIFESTO)}>
                    <RyanrealAFLogo className="h-16 w-auto text-bronze drop-shadow-[0_0_8px_rgba(205,127,50,0.2)]" />
                </div>
                <div className="flex items-center gap-8 hidden md:flex">
                    {navItems.map(item => (
                        <button key={item.value} onClick={() => setView(item.value)} className={`
                text-sm font-display tracking-widest transition-all duration-300 relative
                ${currentView === item.value ? "text-bronze" : "text-mist hover:text-white"}
              `}>
                            {item.label}
                            {currentView === item.value && <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-bronze animate-pulse-slow" />}
                        </button>
                    ))}
                </div>
                 <div className="md:hidden flex gap-4">
                    {navItems.map(item => (
                        <button key={item.value} onClick={() => setView(item.value)} className={`text-[10px] font-bold tracking-widest ${currentView === item.value ? "text-bronze" : "text-stone"}`}>
                            {item.label.slice(0, 3)}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const Layout = ({ children, currentView, setView }) => (
    <div className="min-h-screen bg-noise bg-void text-mist font-sans selection:bg-bronze selection:text-black">
        <Header currentView={currentView} setView={setView} />
        <main className="relative z-0">
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-bronze/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-stone/20 rounded-full blur-[100px]"></div>
            </div>
            {children}
        </main>
        <footer className="border-t border-stone py-8 text-center">
            <p className="font-mono text-[10px] text-stone uppercase tracking-widest">RyanrealAF © 2024 // Authenticity Ain’t Optional // System Online</p>
        </footer>
    </div>
);

// --- PAGE COMPONENTS ---

const Manifesto = () => {
    const principles = [
        { title: "NO SUGARCOATING", description: "Vulnerability in its rawest form. We do not dilute the poison; we drink it to build immunity." },
        { title: "NO SCRIPTS", description: "The algorithm wants you sanitized. We reject the template. We write in blood and static." },
        { title: "NO APOLOGIES", description: "Truth is a tactical tool. It requires no softening. It is the shield and the spear." },
        { title: "ZERO TOLERANCE", description: "Deceit is a structural bomb. One lie is a terminal contagion that triggers immediate expulsion." },
        { title: "THE BINARY LAW", description: "Grace for weakness, Death for the Mask. Mistakes are survived; hidden agendas are executed." },
        { title: "TOTAL EXPOSURE", description: "Radical transparency is the only survivable state. Silence is functionally the same as a lie." },
    ];
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col justify-center">
            <div className="mb-20 animate-fade-in text-center md:text-left">
                <h1 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-white mb-6">
                    Authenticity <br />
                    <span className="text-bronze">Ain’t Optional.</span>
                </h1>
                <p className="font-sans text-mist text-lg md:text-xl max-w-2xl border-l-2 border-bronze pl-6 py-2 mx-auto md:mx-0">
                    This is the manual for a movement forged in trauma. Built on resonance. Fueled by resistance.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principles.map((p, i) => (
                    <div key={i} className="group relative bg-void-light border border-stone p-8 hover:border-bronze transition-colors duration-500 flex flex-col justify-between min-h-[240px]">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="font-display text-4xl text-stone group-hover:text-bronze/20 transition-colors">0{i + 1}</div>
                                <div className="w-2 h-2 bg-stone group-hover:bg-bronze transition-colors"></div>
                            </div>
                            <h3 className="font-display text-2xl text-white mb-4 tracking-wider">{p.title}</h3>
                            <p className="font-sans text-mist leading-relaxed text-sm">{p.description}</p>
                        </div>
                        <div className="w-full h-[1px] bg-stone mt-6 group-hover:bg-bronze transition-colors duration-500"></div>
                    </div>
                ))}
            </div>
            <div className="mt-24 text-center border-t border-stone pt-12">
                <blockquote className="font-display text-2xl md:text-3xl uppercase tracking-widest text-stone hover:text-white transition-colors duration-700 cursor-default">
                    "Grace forgives weakness, but grace don’t trust masks."
                </blockquote>
            </div>
        </div>
    );
};

const Protocols = () => {
    // Data for Protocols page would go here
    return <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto"><h1 className="font-display text-5xl text-white">Protocols Page - Coming Soon</h1></div>;
};

const Archive = () => {
    // Data for Archive page would go here
    return <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto"><h1 className="font-display text-5xl text-white">Archive Page - Coming Soon</h1></div>;
};

const Oracle = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState(null);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        try {
            const chatInstance = initializeChat();
            setChat(chatInstance);
            setMessages([{ id: 'init', role: 'model', text: "Enter the lore. Speak truth or stay silent. What's on your mind?", timestamp: new Date() }]);
        } catch (error) {
            console.error("Failed to init chat", error);
            setMessages([{ id: 'error', role: 'model', text: "SYSTEM FAILURE: API KEY MISSING OR INVALID. SECURE CONNECTION FAILED.", timestamp: new Date() }]);
        }
    }, []);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getOracleResponse(chat, userMessage.text);
            const modelMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = { id: (Date.now() + 1).toString(), role: 'model', text: "TRANSMISSION ERROR: The Oracle is unresponsive. Check console for details.", timestamp: new Date() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen pt-24 pb-6 px-4 md:px-0 max-w-4xl mx-auto flex flex-col">
            <div className="flex-none mb-6 border-b border-stone pb-4">
                <h2 className="font-display text-3xl text-bronze tracking-tight uppercase">The Oracle</h2>
                <p className="text-xs font-mono text-stone mt-1">SECURE CHANNEL // ENCRYPTED // NO FILTER</p>
            </div>
            <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                max-w-[85%] p-6 relative border
                ${msg.role === 'user' ? 'bg-stone/20 border-stone text-mist' : 'bg-void-light border-bronze/30 text-bronze shadow-[0_0_15px_rgba(205,127,50,0.1)]'}
              `}>
                            {msg.role === 'model' && (
                                <div className="absolute -top-3 -left-3 w-6 h-6 bg-void border border-bronze flex items-center justify-center">
                                    <div className="w-2 h-2 bg-bronze rounded-full animate-pulse"></div>
                                </div>
                            )}
                            <p className="font-sans text-sm md:text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 mt-4 block font-display">{msg.role === 'user' ? 'YOU' : 'RYANREALAF'} // {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-void border border-stone p-4 text-bronze font-mono text-xs animate-pulse">GENERATING_TRUTH_SEQUENCE...</div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="flex-none mt-6">
                <div className="relative flex items-end gap-2 border border-stone bg-void-light p-2 focus-within:border-bronze transition-colors">
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your truth..." className="w-full bg-transparent text-white font-sans text-sm p-3 focus:outline-none resize-none h-14 custom-scrollbar placeholder-stone" />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="h-14 px-6 bg-stone hover:bg-bronze text-white font-display uppercase tracking-widest text-sm transition-colors disabled:opacity-50 disabled:hover:bg-stone">Send</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---

export default function App() {
  const [currentView, setCurrentView] = useState(View.MANIFESTO);

  const renderView = () => {
    switch (currentView) {
      case View.MANIFESTO:
        return <Manifesto />;
      case View.PROTOCOLS:
        return <Protocols />;
      case View.ARCHIVE:
        return <Archive />;
      case View.ORACLE:
        return <Oracle />;
      default:
        return <Manifesto />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}