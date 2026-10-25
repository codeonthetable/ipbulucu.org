"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { generateFaqSchema } from "@/lib/schemas";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: FaqItem[];
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  faqs,
  items,
  title = "Frequently Asked Questions / Sıkça Sorulan Sorular",
  subtitle = "Everything you need to know about network diagnostics and protocols.",
}: FaqAccordionProps) {
  const list = faqs || items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaJson = JSON.stringify(generateFaqSchema(list));

  return (
    <section className="my-12">
      {/* Inject FAQPage Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {list.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "transform rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800/60 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
