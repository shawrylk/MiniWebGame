import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Quote, ChevronDown, Camera, Shield } from 'lucide-react';

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((currentHearts) => [
        ...currentHearts,
        {
          id: Math.random(),
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 4,
          size: Math.random() * 15 + 10,
        },
      ]);

      // Cleanup old hearts
      setTimeout(() => {
        setHearts((currentHearts) => currentHearts.slice(1));
      }, 7000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] text-rose-300 opacity-50"
          style={{
            left: `${heart.left}%`,
            animation: `float ${heart.animationDuration}s ease-in forwards`,
            fontSize: `${heart.size}px`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const TraitCard = ({ icon: Icon, title, description, delay }) => (
  <div
    className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 transform hover:-translate-y-2 transition-all duration-300"
    style={{ animation: `fadeInUp 0.8s ease-out ${delay}s both` }}
  >
    <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-500 shadow-inner">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const PhotoGallery = () => {
  const photos = [
    { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800", caption: "Nụ cười tỏa nắng nè" },
    { url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800", caption: "Cùng nhau đi muôn nơi" },
    { url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800", caption: "Cute xỉu ngang" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4 max-w-6xl mx-auto z-10 relative">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 border border-gray-100"
        >
          <div className="aspect-square rounded-lg overflow-hidden mb-4 relative group">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Heart className="text-white fill-current" size={32} />
            </div>
          </div>
          <p className="text-center font-serif italic text-gray-600 pb-2">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
        
        .font-sans {
          font-family: 'Nunito', sans-serif !important;
        }
        
        .font-serif {
          font-family: 'Lora', serif !important;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {!isOpen ? (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* Subtle background stars */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: Math.random() * 3 + 'px',
                  height: Math.random() * 3 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDuration: (Math.random() * 2 + 1) + 's'
                }}
              />
            ))}
          </div>

          <div className="z-10 text-center transform transition-all hover:scale-105 cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="w-24 h-24 mx-auto bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.4)] mb-8 animate-bounce">
              <Heart className="text-white fill-current" size={40} />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-wide">
              Có một bất ngờ nhỏ nè!
            </h1>
            <p className="text-rose-200 font-light text-lg tracking-widest uppercase">
              Bấm vô mở quà nha
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 font-sans selection:bg-rose-200 selection:text-rose-900">
          <FloatingHearts />

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10">
            <div className="animate-[fadeIn_1.5s_ease-in]">
              <span className="inline-block py-1 px-4 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm border border-rose-200">
                Mùng 8 tháng 3
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Chúc mừng 8/3 nha,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                  Cô gái dũng cảm của anh!
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                Hôm nay không chỉ là ngày của phái đẹp, mà còn là ngày để tụi mình ăn mừng vì em lúc nào cũng siêu ngầu và đáng yêu hết sức!
              </p>
            </div>

            {showScroll && (
              <div className="absolute bottom-10 animate-bounce text-rose-400">
                <ChevronDown size={32} />
              </div>
            )}
          </section>

          {/* Qualities Section */}
          <section className="py-20 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Sao anh lại mê em đến vậy?</h2>
                <div className="w-24 h-1 bg-rose-300 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TraitCard
                  icon={Shield}
                  title="Siêu dũng cảm"
                  description="Lúc nào cũng mạnh mẽ đối mặt với mọi thứ. Nhiều lúc thấy em dũng cảm mà anh cũng phải nể luôn đó nha!"
                  delay={0}
                />
                <TraitCard
                  icon={Sparkles}
                  title="Đầu nảy số cực nhanh"
                  description="Thông minh, lanh lợi lại còn hiểu chuyện. Cứ thế này bảo sao anh không đổ đứ đừ cơ chứ!"
                  delay={0.2}
                />
                <TraitCard
                  icon={Heart}
                  title="Trái tim ấm áp"
                  description="Bên ngoài dũng cảm thế thôi chứ bên trong lại siêu cấp đáng yêu. Anh là số dách mới vớ được em đấy!"
                  delay={0.4}
                />
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-20 bg-white/40 backdrop-blur-sm relative z-10">
            <div className="text-center">
              <Camera className="mx-auto text-rose-400 mb-4" size={32} />
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Góc dìm hàng... à nhầm, góc sống ảo!</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Vài khoảnh khắc cute hột me của hai đứa mình nè.</p>
            </div>
            <PhotoGallery />
          </section>

          {/* Love Letter Section */}
          <section className="py-24 px-6 relative z-10 flex justify-center">
            <div className="max-w-3xl w-full bg-white p-8 md:p-12 rounded-2xl shadow-2xl relative">
              <Quote className="absolute top-6 left-6 text-rose-100 transform -scale-x-100" size={64} />
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Gửi người yêu dấu!</h2>
                <div className="space-y-6 text-lg text-gray-700 font-serif leading-loose italic">
                  <p>
                    Gửi cô bạn gái xinh đẹp và "siêu nhân" của anh. Nhân ngày 8/3, chúc em luôn vui vẻ, ăn nhiều không béo và lúc nào cũng cười tít mắt nhé.
                  </p>
                  <p>
                    Cứ tiếp tục dũng cảm và làm những gì em thích nha. Dù có chuyện gì xảy ra thì cứ hú một tiếng, anh sẽ luôn ở đây làm "bảo kê" cho em, sẵn sàng tiếp tế trà sữa và đồ ăn ngon mọi lúc!
                  </p>
                  <p className="font-semibold text-rose-600 not-italic pt-4 text-xl">
                    Thương em nhiều nhiều! ❤️
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center text-gray-500 relative z-10 border-t border-rose-100/50">
            <p className="flex items-center justify-center gap-2">
              Code bằng <Heart size={16} className="text-rose-500 fill-current animate-pulse" /> và sự chân thành dành cho em.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}