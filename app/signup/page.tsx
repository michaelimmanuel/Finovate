"use client";

// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* LEFT SECTION */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-20 text-center shadow-lg">
        <h2 className="text-4xl font-bold mb-3">Create Account</h2>
        <p className="text-gray-500 mb-10">Join us and start your journey 🚀</p>

        {/* INPUTS */}
        <div className="space-y-5 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="border rounded-lg w-full px-4 py-2 mt-1 focus:ring focus:ring-blue-200"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="border rounded-lg w-full px-4 py-2 mt-1 focus:ring focus:ring-blue-200"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg w-full px-4 py-2 mt-1 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* BUTTON */}
        <Link href="/onboard">
          <button className="mt-8 w-full bg-gray-200 text-black py-3 rounded-lg transition font-semibold hover:bg-gray-300">
            Sign Up
          </button>
        </Link>

        <p className="text-gray-400 text-sm my-4">OR</p>

        {/* SOCIAL LOGIN */}
        <div className="flex gap-4">
          <button className="border py-2 flex-1 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <img src="/google.png" alt="Google" width={20} height={20} />
            Google
          </button>

          <button className="border py-2 flex-1 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <img src="/apple.png" alt="Apple" width={20} height={20} />
            Apple
          </button>
        </div>

        {/* NAVIGATE TO LOGIN */}
        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-yellow-600 font-medium cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </span>
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center text-center relative">
        <h3 className="text-2xl font-semibold text-gray-700 px-16 mb-6">
          "Success starts with the first step — and you've already taken it."
        </h3>

        {/* FLOATING UI */}
        <div className="relative animate-bounce-slow">
          <img
            src="/Devices.png"
            alt="Devices"
            width={520}
            height={520}
            className="drop-shadow-lg"
          />

          {/* Big Coin */}
          <img
            src="/coin.png"
            alt="coin"
            width={110}
            height={110}
            className="absolute -right-12 top-6 drop-shadow-xl animate-coinFloat"
          />

          {/* Small Coin */}
          <img
            src="/coin.png"
            alt="coin"
            width={65}
            height={65}
            className="absolute bottom-7 -left-10 drop-shadow-lg animate-coinFloatDelay"
          />
        </div>
      </div>

      {/* ANIMATION CSS */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 4s ease-in-out infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }

        .animate-coinFloat {
          animation: float 5s ease-in-out infinite;
        }

        .animate-coinFloatDelay {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(8deg);
          }
        }
      `}</style>
    </div>
  );
}
