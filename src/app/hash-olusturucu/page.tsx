"use client";

import { useState } from "react";
import {
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  Binary,
  Shield,
  Code2,
  Lock,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

const HASH_FAQS = [
  {
    question: "Hash ve Şifreleme (Encryption) arasındaki fark nedir?",
    answer: "Şifreleme (AES, RSA vb.) çift yönlüdür; yani bir anahtarla şifrelenen veri tekrar eski haline çözülebilir. Hash (MD5, SHA-256) ise tek yönlü matematiksel bir özet fonksiyondur; geri döndürülemez.",
  },
  {
    question: "SHA-256 nerede kullanılır?",
    answer: "SHA-256, parola saklama, SSL sertifikaları, blokzincir (Bitcoin), veri bütünlüğü doğrulama ve dijital imzalarda güvenle kullanılan endüstri standardı hash algoritmasıdır.",
  },
];

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState("IPBulucu.org");
  const [base64Encoded, setBase64Encoded] = useState("");
  const [base64Decoded, setBase64Decoded] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passLength, setPassLength] = useState(16);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateHashes = async (text: string) => {
    setInputText(text);

    try {
      setBase64Encoded(btoa(unescape(encodeURIComponent(text))));
    } catch {
      setBase64Encoded("Geçersiz metin");
    }

    try {
      setBase64Decoded(decodeURIComponent(escape(atob(text))));
    } catch {
      setBase64Decoded("Geçersiz Base64 formatı");
    }

    if (text) {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha256Hash(hashHex);
    } else {
      setSha256Hash("");
    }
  };

  const generateStrongPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const array = new Uint32Array(passLength);
    crypto.getRandomValues(array);
    let pass = "";
    for (let i = 0; i < passLength; i++) {
      pass += chars[array[i] % chars.length];
    }
    setGeneratedPassword(pass);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          Geliştirici Güvenlik & Kripto Araçları
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          SHA-256, Base64 & Güçlü Şifre Üretici
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Anında SHA-256 hash hesaplama, Base64 dönüştürme ve kırılması imkansız rastgele güvenli parolalar oluşturun.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hash & Base64 Box */}
        <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-4">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Dönüştürülecek Metin / Veri:
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => calculateHashes(e.target.value)}
            placeholder="Bir metin girin..."
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
          />

          {/* Results */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase">
                  SHA-256 Hash
                </span>
                <p className="font-mono text-xs text-gray-800 dark:text-gray-200 truncate mt-1">
                  {sha256Hash || "Hesaplanıyor..."}
                </p>
              </div>
              <button
                onClick={() => handleCopy(sha256Hash, "sha256")}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 text-gray-700 dark:text-gray-300 shadow-sm shrink-0"
              >
                {copiedKey === "sha256" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block uppercase">
                  Base64 Encode
                </span>
                <p className="font-mono text-xs text-gray-800 dark:text-gray-200 truncate mt-1">
                  {base64Encoded}
                </p>
              </div>
              <button
                onClick={() => handleCopy(base64Encoded, "b64enc")}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 text-gray-700 dark:text-gray-300 shadow-sm shrink-0"
              >
                {copiedKey === "b64enc" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Strong Password Generator */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-900/40 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Kriptografik Güçlü Parola Oluşturucu
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Uzunluk:</span>
              <input
                type="number"
                min="8"
                max="64"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                className="w-16 px-2.5 py-1 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-center"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm font-bold text-gray-900 dark:text-white truncate">
              {generatedPassword || "Parola üretmek için butona tıklayın."}
            </div>

            <button
              onClick={generateStrongPassword}
              className="px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition-all shrink-0 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Yeni Üret</span>
            </button>

            {generatedPassword && (
              <button
                onClick={() => handleCopy(generatedPassword, "pwd")}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-sm shrink-0"
              >
                {copiedKey === "pwd" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="hash-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={HASH_FAQS}
        title="Kriptografi ve Hash Hakkında SSS"
        subtitle="Veri güvenliği ve şifreleme algoritmaları"
      />
    </div>
  );
}
