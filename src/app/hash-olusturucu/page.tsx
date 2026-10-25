"use client";

import { useEffect, useState } from "react";
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
    answer: "SHA-256, verilerin özetini hesaplamak ve bütünlüğünü karşılaştırmak için kullanılır. Bu araç bir parola saklama sistemi değildir; tek başına SHA-256 özeti hesaplamak güvenli parola saklama tasarımı yerine geçmez.",
  },
];

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState("IPBulucu.org");
  const [base64Encoded, setBase64Encoded] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const [hashError, setHashError] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passLength, setPassLength] = useState("16");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    let current = true;
    setSha256Hash("");
    setHashError(false);
    setCopiedKey(null);
    try {
      const bytes = new TextEncoder().encode(inputText);
      setBase64Encoded(btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join("")));
    } catch {
      setBase64Encoded("Geçersiz metin");
    }
    async function calculateHash() {
      try {
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(inputText));
        const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
        if (current) setSha256Hash(hex);
      } catch {
        if (current) setHashError(true);
      }
    }
    void calculateHash();
    return () => { current = false; };
  }, [inputText]);

  const generateStrongPassword = () => {
    const length = Math.min(64, Math.max(8, Math.trunc(Number(passLength)) || 8));
    setPassLength(String(length));
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[array[i] % chars.length];
    }
    setGeneratedPassword(pass);
  };

  const handleCopy = async (text: string, key: string) => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      setCopyError(true);
    }
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
          Tarayıcınızda SHA-256 özeti hesaplayın, Base64 dönüşümü yapın ve rastgele parolalar üretin.
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
            aria-label="Dönüştürülecek metin"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
                  {hashError ? "SHA-256 hesaplanamadı. Güncel bir tarayıcı ve HTTPS bağlantısı kullanın." : sha256Hash || "Hesaplanıyor..."}
                </p>
              </div>
              <button
                aria-label="SHA-256 özetini kopyala"
                disabled={!sha256Hash}
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
                aria-label="Base64 sonucunu kopyala"
                onClick={() => handleCopy(base64Encoded, "b64enc")}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 text-gray-700 dark:text-gray-300 shadow-sm shrink-0"
              >
                {copiedKey === "b64enc" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {inputText === "" && <p className="text-xs text-gray-500">Boş metnin SHA-256 özeti gösteriliyor; Base64 sonucu boş bir dizgedir.</p>}
          {copyError && <p role="status" className="text-sm text-amber-700">Kopyalanamadı. Sonucu seçerek elle kopyalayabilirsiniz.</p>}
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
                onChange={(e) => setPassLength(e.target.value)}
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
