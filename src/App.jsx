import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart } from 'lucide-react';

// --- Card Icons (love themed emojis) ---
const CARD_ICONS = ['💕', '💘', '💝', '💖', '🌹', '🎀', '💎', '🦋', '🌸', '✨', '🍫', '💌'];

// --- Utility: shuffle array ---
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// --- Create card deck (12 pairs = 24 cards) ---
function createDeck() {
    const pairs = CARD_ICONS.flatMap((icon, idx) => [
        { id: idx * 2, icon, pairId: idx },
        { id: idx * 2 + 1, icon, pairId: idx },
    ]);
    return shuffleArray(pairs);
}

// --- Floating Hearts Background ---
const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((cur) => [
                ...cur,
                {
                    id: Math.random(),
                    left: Math.random() * 100,
                    dur: Math.random() * 3 + 5,
                    size: Math.random() * 14 + 10,
                },
            ]);
            setTimeout(() => {
                setHearts((cur) => cur.slice(1));
            }, 8000);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((h) => (
                <div
                    key={h.id}
                    className="absolute bottom-[-50px] text-rose-300 opacity-40"
                    style={{
                        left: `${h.left}%`,
                        animation: `floatHeart ${h.dur}s ease-in forwards`,
                        fontSize: `${h.size}px`,
                    }}
                >
                    <Heart fill="currentColor" />
                </div>
            ))}
        </div>
    );
};

// --- Confetti Effect ---
const Confetti = () => {
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        dur: Math.random() * 2 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 5,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.left}%`,
                        top: '-10px',
                        width: p.shape === 'circle' ? `${p.size}px` : `${p.size * 0.6}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        borderRadius: p.shape === 'circle' ? '50%' : '2px',
                        animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`,
                        opacity: 0.9,
                    }}
                />
            ))}
        </div>
    );
};

// --- Format time mm:ss ---
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// --- Sacombank Notification ---
const SacombankNotification = ({ show }) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const refCode = `FT${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 900000 + 100000)}`;

    return (
        <div
            className="fixed top-4 left-1/2 z-[100] w-[92%] max-w-[420px]"
            style={{
                transform: 'translateX(-50%)',
                animation: show ? 'slideDownNotif 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'slideUpNotif 0.4s ease-in forwards',
                pointerEvents: show ? 'auto' : 'none',
            }}
        >
            {/* Phone notification card */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60" style={{ background: '#fff' }}>
                {/* Notification header bar */}
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg, #00713D, #009750)' }}>
                    {/* Sacombank Icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: '#fff' }}>
                        <span className="font-bold text-sm" style={{ color: '#00713D' }}>STB</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-sm tracking-wide">Sacombank</span>
                            <span className="text-white/70 text-xs">Bây giờ</span>
                        </div>
                        <p className="text-white/90 text-xs mt-0.5">Thông báo giao dịch</p>
                    </div>
                </div>

                {/* Notification body */}
                <div className="px-5 py-4 space-y-3">
                    {/* Success badge */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#e8f5e9' }}>
                            <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">Giao dịch thành công</span>
                    </div>

                    {/* Amount */}
                    <div className="text-center py-3 px-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)' }}>
                        <p className="text-xs text-gray-500 mb-1">Số tiền nhận</p>
                        <p className="text-3xl font-bold" style={{ color: '#00713D' }}>+8,383,838</p>
                        <p className="text-sm font-semibold text-gray-500 mt-0.5">VND</p>
                    </div>

                    {/* Transaction details */}
                    <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Người gửi</span>
                            <span className="text-gray-700 font-medium">NGUYEN XUAN H***</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Nội dung</span>
                            <span className="text-gray-700 font-medium text-right max-w-[60%]">Chuc mung 8/3 yeu em nhieu ❤️</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Thời gian</span>
                            <span className="text-gray-700 font-medium">{timeStr}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Mã GD</span>
                            <span className="text-gray-700 font-medium text-xs">{refCode}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-gray-100" style={{ background: '#fafafa' }}>
                    <p className="text-[11px] text-gray-400 text-center">Sacombank — Ngân hàng thương mại cổ phần Sài Gòn Thương Tín</p>
                </div>
            </div>
        </div>
    );
};

// --- Memory Card Component ---
const MemoryCard = ({ card, isFlipped, isMatched, isWrong, onClick }) => {
    return (
        <div
            className={`card-container cursor-pointer select-none ${isMatched ? 'card-matched' : ''} ${isWrong ? 'card-wrong' : ''}`}
            style={{ aspectRatio: '1' }}
            onClick={onClick}
            id={`card-${card.id}`}
        >
            <div className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
                {/* Back of card (face down) */}
                <div
                    className="card-back bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 border-2 border-white/30 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200"
                    style={{ cursor: isMatched ? 'default' : 'pointer' }}
                >
                    <div className="text-white/90 text-2xl md:text-3xl">💗</div>
                </div>

                {/* Front of card (face up) */}
                <div
                    className={`card-front border-2 shadow-lg ${isMatched
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                        : 'bg-white border-rose-200'
                        }`}
                >
                    <span className="text-3xl md:text-4xl lg:text-5xl select-none">{card.icon}</span>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
export default function App() {
    // Screens: 'intro' | 'game' | 'win'
    const [screen, setScreen] = useState('intro');
    const [cards, setCards] = useState([]);
    const [flippedIds, setFlippedIds] = useState([]);
    const [matchedPairIds, setMatchedPairIds] = useState(new Set());
    const [wrongIds, setWrongIds] = useState(new Set());
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const timerRef = useRef(null);
    const gameStartedRef = useRef(false);

    // Initialize game
    const initGame = useCallback(() => {
        setCards(createDeck());
        setFlippedIds([]);
        setMatchedPairIds(new Set());
        setWrongIds(new Set());
        setMoves(0);
        setTimer(0);
        setIsLocked(false);
        setShowNotif(false);
        gameStartedRef.current = false;
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    // Start timer on first card click
    const startTimer = useCallback(() => {
        if (!gameStartedRef.current) {
            gameStartedRef.current = true;
            timerRef.current = setInterval(() => {
                setTimer((t) => t + 1);
            }, 1000);
        }
    }, []);

    // Cleanup timer
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Check win condition
    useEffect(() => {
        if (matchedPairIds.size === CARD_ICONS.length && matchedPairIds.size > 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Delay a bit before showing win screen
            setTimeout(() => {
                setScreen('win');
            }, 800);
            // Show notification after another delay
            setTimeout(() => {
                setShowNotif(true);
            }, 2500);
        }
    }, [matchedPairIds]);

    // Handle card click
    const handleCardClick = useCallback(
        (card) => {
            if (isLocked) return;
            if (matchedPairIds.has(card.pairId)) return;
            if (flippedIds.includes(card.id)) return;
            if (flippedIds.length >= 2) return;

            startTimer();

            const newFlipped = [...flippedIds, card.id];
            setFlippedIds(newFlipped);

            if (newFlipped.length === 2) {
                setMoves((m) => m + 1);
                setIsLocked(true);

                const [firstId, secondId] = newFlipped;
                const firstCard = cards.find((c) => c.id === firstId);
                const secondCard = cards.find((c) => c.id === secondId);

                if (firstCard.pairId === secondCard.pairId) {
                    // Match found!
                    setTimeout(() => {
                        setMatchedPairIds((prev) => new Set([...prev, firstCard.pairId]));
                        setFlippedIds([]);
                        setIsLocked(false);
                    }, 400);
                } else {
                    // No match — shake + flip back
                    setTimeout(() => {
                        setWrongIds(new Set([firstId, secondId]));
                    }, 500);
                    setTimeout(() => {
                        setFlippedIds([]);
                        setWrongIds(new Set());
                        setIsLocked(false);
                    }, 1100);
                }
            }
        },
        [isLocked, flippedIds, matchedPairIds, cards, startTimer]
    );

    // Start game from intro
    const startGame = () => {
        initGame();
        setScreen('game');
    };

    // --- Render ---

    // Screen 1: Intro
    if (screen === 'intro') {
        return (
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Twinkling stars */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse"
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                animationDuration: Math.random() * 2 + 1 + 's',
                            }}
                        />
                    ))}
                </div>

                <div
                    className="z-10 text-center transform transition-all hover:scale-105 cursor-pointer"
                    onClick={startGame}
                >
                    <div className="w-24 h-24 mx-auto bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.4)] mb-8 animate-bounce">
                        <Heart className="text-white fill-current" size={40} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-wide">
                        Có một bất ngờ nhỏ nè!
                    </h1>
                    <p className="text-rose-200 font-light text-lg tracking-widest uppercase">
                        Bấm vô chơi game nha
                    </p>
                </div>
            </div>
        );
    }

    // Screen 3: Win
    if (screen === 'win') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <Confetti />
                <FloatingHearts />

                <div className="z-10 text-center animate-[fadeIn_1s_ease-in]">
                    <div className="text-6xl md:text-8xl mb-6">🎉</div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
                        Chúc mừng em!
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light mb-2">
                        Em đã hoàn thành trong <span className="font-semibold text-rose-500">{moves} lượt</span> và{' '}
                        <span className="font-semibold text-rose-500">{formatTime(timer)}</span>
                    </p>
                    <p className="text-lg text-gray-500 mt-4 animate-[fadeInUp_1s_ease-out_1s_both]">
                        Em có một phần thưởng đặc biệt nè... 🎁
                    </p>
                </div>

                <SacombankNotification show={showNotif} />
            </div>
        );
    }

    // Screen 2: Game
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col relative overflow-hidden selection:bg-rose-200">
            <FloatingHearts />

            {/* Header bar */}
            <div className="relative z-10 px-4 py-4">
                <div className="max-w-2xl mx-auto">
                    {/* Title */}
                    <h1 className="text-center text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
                        💕 Tìm đôi yêu thương 💕
                    </h1>

                    {/* Stats bar */}
                    <div className="flex items-center justify-center gap-6 md:gap-10">
                        {/* Moves */}
                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-white/50">
                            <span className="text-sm text-gray-500">Lượt</span>
                            <span className="text-xl font-bold text-rose-500">{moves}</span>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-white/50">
                            <span className="text-sm text-gray-500">⏱️</span>
                            <span className="text-xl font-bold text-purple-500 tabular-nums">{formatTime(timer)}</span>
                        </div>

                        {/* Pairs found */}
                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-white/50">
                            <span className="text-sm text-gray-500">Đôi</span>
                            <span className="text-xl font-bold text-emerald-500">{matchedPairIds.size}/{CARD_ICONS.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card grid */}
            <div className="flex-1 flex items-center justify-center px-3 py-2 relative z-10">
                <div className="w-full max-w-lg">
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                        {cards.map((card) => (
                            <MemoryCard
                                key={card.id}
                                card={card}
                                isFlipped={flippedIds.includes(card.id)}
                                isMatched={matchedPairIds.has(card.pairId)}
                                isWrong={wrongIds.has(card.id)}
                                onClick={() => handleCardClick(card)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Restart button */}
            <div className="relative z-10 text-center pb-4">
                <button
                    onClick={initGame}
                    className="text-sm text-gray-400 hover:text-rose-500 transition-colors underline underline-offset-4"
                >
                    Chơi lại từ đầu
                </button>
            </div>
        </div>
    );
}
