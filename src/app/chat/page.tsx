import ChatShell from "@/components/ChatShell";
import { Skull, Anchor, Wind, Cloud, Ship, Crosshair, Swords } from "lucide-react";

export const metadata = { title: "Chat - Mock UI" };

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-black relative overflow-hidden">
      {/* Dark Blood-like Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(99, 29, 29, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(120, 0, 0, 0.15) 0%, transparent 50%)
          `,
          }}
        ></div>
      </div>

      {/* Dark Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ominous Clouds */}
        <div className="absolute top-20 left-20 animate-float-slow opacity-50">
          <Cloud size={140} className="text-gray-800" fill="currentColor" />
        </div>
        <div
          className="absolute top-32 right-32 animate-float-slow opacity-45"
          style={{ animationDelay: "2s" }}
        >
          <Cloud size={120} className="text-gray-900" fill="currentColor" />
        </div>
        <div
          className="absolute top-16 right-1/4 animate-float-slow opacity-40"
          style={{ animationDelay: "3s" }}
        >
          <Cloud size={130} className="text-gray-800" fill="currentColor" />
        </div>

        {/* Thunderstorm Effects */}
        <svg
          className="absolute inset-0 w-full h-1/3 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px rgba(255, 100, 100, 0.5))" }}
        >
          {/* Lightning Bolt 1 */}
          <g
            className="lightning-bolt"
            style={{ animation: "strike 5s ease-in-out infinite", animationDelay: "0s" }}
          >
            <line
              x1="20%"
              y1="5%"
              x2="22%"
              y2="15%"
              stroke="rgba(255, 200, 100, 0.8)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="22%"
              y1="15%"
              x2="18%"
              y2="28%"
              stroke="rgba(255, 200, 100, 0.9)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="18%"
              y1="28%"
              x2="20%"
              y2="40%"
              stroke="rgba(255, 150, 100, 0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="20%"
              y1="40%"
              x2="15%"
              y2="50%"
              stroke="rgba(255, 100, 100, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Lightning Bolt 2 */}
          <g
            className="lightning-bolt"
            style={{ animation: "strike 6s ease-in-out infinite", animationDelay: "2.5s" }}
          >
            <line
              x1="75%"
              y1="8%"
              x2="73%"
              y2="18%"
              stroke="rgba(255, 180, 100, 0.8)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="73%"
              y1="18%"
              x2="77%"
              y2="30%"
              stroke="rgba(255, 180, 100, 0.9)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="77%"
              y1="30%"
              x2="74%"
              y2="44%"
              stroke="rgba(255, 130, 100, 0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="74%"
              y1="44%"
              x2="79%"
              y2="52%"
              stroke="rgba(255, 100, 80, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Lightning Bolt 3 */}
          <g
            className="lightning-bolt"
            style={{ animation: "strike 7s ease-in-out infinite", animationDelay: "4s" }}
          >
            <line
              x1="45%"
              y1="6%"
              x2="47%"
              y2="16%"
              stroke="rgba(200, 150, 255, 0.8)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="47%"
              y1="16%"
              x2="43%"
              y2="26%"
              stroke="rgba(200, 150, 255, 0.9)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="43%"
              y1="26%"
              x2="46%"
              y2="38%"
              stroke="rgba(255, 120, 100, 0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="46%"
              y1="38%"
              x2="41%"
              y2="48%"
              stroke="rgba(255, 80, 80, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Thunder Flash */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="80%"
            fill="url(#darkLightningGradient)"
            opacity={0}
            style={{ animation: "flash 5s ease-in-out infinite" }}
          />

          <defs>
            <linearGradient id="darkLightningGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#333" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#222" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dark Pirate Icons */}
        <div className="absolute top-1/2 left-16 animate-float opacity-60">
          <Skull size={110} className="text-red-900" strokeWidth={1.5} />
        </div>
        <div
          className="absolute top-2/3 right-24 animate-float opacity-50"
          style={{ animationDelay: "1.5s" }}
        >
          <Swords size={95} className="text-red-700" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 animate-float opacity-60"
          style={{ animationDelay: "2s" }}
        >
          <Crosshair size={100} className="text-red-800" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-1/3 right-1/3 animate-float opacity-45"
          style={{ animationDelay: "2.5s" }}
        >
          <Wind size={90} className="text-gray-700" strokeWidth={1.5} />
        </div>
        <div
          className="absolute top-1/2 right-20 animate-float opacity-60"
          style={{ animationDelay: "3s" }}
        >
          <Skull size={100} className="text-red-800" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-1/2 left-1/4 animate-float opacity-50"
          style={{ animationDelay: "1s" }}
        >
          <Anchor size={85} className="text-gray-800" strokeWidth={1.5} />
        </div>

        {/* Dark Ships */}
        <div className="absolute bottom-40 left-1/2 animate-sail-float opacity-50">
          <Ship size={120} className="text-gray-900" strokeWidth={1.5} />
        </div>
        <div
          className="absolute top-3/4 right-1/4 animate-sail-float opacity-40"
          style={{ animationDelay: "3s" }}
        >
          <Ship size={100} className="text-gray-800" strokeWidth={1.5} />
        </div>

        {/* Ominous Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-red-950 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gray-900 rounded-full mix-blend-darken filter blur-3xl opacity-30"></div>
      </div>

      {/* Chat Shell Container - No Box */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-4">
        <ChatShell />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes sail-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-25px) translateX(10px);
          }
        }

        @keyframes strike {
          0%, 100% {
            opacity: 0;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          5% {
            opacity: 1;
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
          15% {
            opacity: 0;
          }
        }

        @keyframes flash {
          0%, 100% {
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          10% {
            opacity: 0;
          }
          12% {
            opacity: 0.4;
          }
          15% {
            opacity: 0;
          }
        }

        @keyframes shimmer-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.01);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }

        .animate-sail-float {
          animation: sail-float 8s ease-in-out infinite;
        }

        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }

        .shimmer-float {
          animation: shimmer-float 3s ease-in-out infinite;
        }

        @keyframes fadeInSail {
          from {
            opacity: 0;
            transform: translateY(40px) translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
