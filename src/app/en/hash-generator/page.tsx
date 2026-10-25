"use client";

import { useState, useEffect } from "react";
import { KeyRound, Copy, Check } from "lucide-react";

export default function EnglishHashGeneratorPage() {
  const [input, setInput] = useState("Hello World");
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    if (!text) {
      setHashes({});
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const res: { [key: string]: string } = {};

    try {
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      res["SHA-256"] = Array.from(new Uint8Array(sha256Buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
      res["SHA-1"] = Array.from(new Uint8Array(sha1Buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      const sha512Buffer = await crypto.subtle.digest("SHA-512", data);
      res["SHA-512"] = Array.from(new Uint8Array(sha512Buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch {
      // fallback
    }

    setHashes(res);
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  const copyHash = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900 mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          Client-Side Web Crypto API
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Cryptographic Hash Generator
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Calculate SHA-256, SHA-1 and SHA-512 hashes in your browser. The text entered into this tool is not sent to the server.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Plaintext Input String
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white shadow-sm font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hashVal]) => (
            <div
              key={algo}
              className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-mono">
                  {algo}
                </span>
                <button
                  onClick={() => copyHash(algo, hashVal)}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
                >
                  {copiedKey === algo ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-gray-800 dark:text-gray-200 break-all bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl">
                {hashVal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
