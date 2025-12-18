"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!phone) return alert("Enter phone number");

    // Simulate login success
    const fakeUser = {
      uid: "user_" + phone,
      phone: phone,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Welcome</h2>
        <p className="text-center text-gray-500">Enter your phone number</p>

        <input
          type="tel"
          placeholder="Phone number"
          className="w-full border px-4 py-2 rounded-xl"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-teal-500 text-white py-2 rounded-xl font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
