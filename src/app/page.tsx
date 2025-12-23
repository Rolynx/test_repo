import Link from "next/link";
import { Bot, Settings, Zap, Code, Cpu, MessageCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 overflow-hidden relative">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        <div className="absolute top-10 left-12 animate-float opacity-20">
          <Bot size={80} className="text-cyan-400" />
        </div>
        <div
          className="absolute top-20 right-16 animate-float-delay-1 opacity-20"
          style={{ animationDelay: "1s" }}
        >
          <Settings size={70} className="text-purple-400" />
        </div>
        <div
          className="absolute bottom-32 left-20 animate-float-delay-2 opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <Zap size={75} className="text-yellow-400" />
        </div>
        <div
          className="absolute top-1/3 right-32 animate-float opacity-20"
          style={{ animationDelay: "3s" }}
        >
          <Code size={65} className="text-blue-400" />
        </div>
        <div
          className="absolute bottom-20 right-1/4 animate-float-delay-1 opacity-20"
          style={{ animationDelay: "2.5s" }}
        >
          <Cpu size={70} className="text-pink-400" />
        </div>
        <div
          className="absolute top-1/2 left-1/4 animate-float-delay-2 opacity-20"
          style={{ animationDelay: "4s" }}
        >
          <MessageCircle size={75} className="text-green-400" />
        </div>
        <div
          className="absolute bottom-10 left-1/3 animate-float opacity-15"
          style={{ animationDelay: "1.5s" }}
        >
          <Settings size={60} className="text-indigo-400" />
        </div>
        <div
          className="absolute top-2/3 right-10 animate-float-delay-2 opacity-15"
          style={{ animationDelay: "3.5s" }}
        >
          <Bot size={85} className="text-cyan-300" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Title with Gradient Sweep */}
        <div className="relative mb-6">
          <h1 className="text-6xl md:text-7xl font-black tracking-wider relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Welcome to Rohbot
            </span>
            {/* Animated Shine Effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{
                animation: "sweep 4s infinite",
              }}
            ></div>
          </h1>
          <style>{`
            @keyframes sweep {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            @keyframes float {
              0%, 100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(5deg);
              }
            }
          `}</style>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-lg backdrop-blur-sm bg-white/5 rounded-2xl px-8 py-4 border border-white/10">
          A clean and simple mock chatbot frontend built with the expertise of Rolynx (Uncle AI)
        </p>

        {/* CTA Button */}
        <Link
          href="/chat"
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 relative group"
        >
          <span className="relative z-10">Go to Chat</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
