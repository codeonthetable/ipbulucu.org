import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası ve Güvenlik Bildirgesi | IP Bulucu',
  description: 'IP Bulucu web sitesi ve Chrome tarayıcı eklentisi gizlilik politikası, veri güvenliği standartları ve sıfır log taahhüdü.',
  alternates: {
    canonical: 'https://ipbulucu.org/gizlilik-politikasi',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Gizlilik Politikası ve Güvenlik İlkeleri</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Son Güncelleme: 23 Eylül 2026 • Sürüm 1.0</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" /> 1. Genel Taahhüt ve Sıfır Kayıt (Zero-Log)
              </h2>
              <p>
                <strong>ipbulucu.org</strong> ve resmi <strong>IP Bulucu Chrome Tarayıcı Eklentisi</strong>, kullanıcı gizliliğini temel ilke olarak benimser. Web sitemizi ziyaret ettiğinizde veya tarayıcı eklentimizi kullandığınızda:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 ml-2">
                <li>Kişisel kimlik bilgileriniz (ad, soyad, telefon, e-posta vb.) toplanmaz.</li>
                <li>Gezinme geçmişiniz (browsing history) asla izlenmez veya kaydedilmez.</li>
                <li>Sorgulanan IP adresleri hiçbir üçüncü şahıs, reklamveren veya veri simsarıyla paylaşılmaz ve satılmaz.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-blue-400" /> 2. Chrome Web Eklentisi Veri Kullanımı
              </h2>
              <p>
                IP Bulucu Chrome eklentisi yalnızca eklenti simgesine tıklandığında aktif olur. Eklentinin tek amacı, kullanıcının o anki genel IP adresini ve servis sağlayıcısını (ISP) göstermektir:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 ml-2">
                <li><strong>Uzak Kod Yoktur:</strong> Eklenti içinde hiçbir harici (remote) script veya eval kodu çalıştırılmaz. Tüm kodlar yerel pakette yer alır.</li>
                <li><strong>Arka Plan İzni Yoktur:</strong> Eklenti kapalıyken hiçbir arka plan işlemi yürütmez, sistem kaynaklarını tüketmez.</li>
                <li><strong>Veri Satışı Yapılmaz:</strong> Toplanan hiçbir teknik telemetri verisi üçüncü taraflara aktarılmaz.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" /> 3. API ve Ağ İletişimi
              </h2>
              <p>
                Eklenti, IP ve ISP bilgisini güvenli HTTPS protokolü üzerinden <code>https://ipbulucu.org/api/ip</code> uç noktasına anlık tek bir istek göndererek alır. Bu istek yalnızca teknik yanıtı ekranda göstermek amacıyla işlenir ve geçici bellekten silinir.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
                4. İletişim
              </h2>
              <p>
                Gizlilik politikamız veya eklentiyle ilgili her türlü soru ve geri bildiriminiz için{' '}
                <a href="mailto:iletisim@ipbulucu.org" className="text-blue-400 underline">iletisim@ipbulucu.org</a> adresinden bize ulaşabilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
