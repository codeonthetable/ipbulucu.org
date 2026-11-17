import DnsSetupFeedback from "@/components/DnsSetupFeedback";

const disclosure = "scroll-mt-24 rounded-xl border border-gray-200 dark:border-gray-700 p-4";
const trigger = "cursor-pointer min-h-11 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const source = "text-blue-700 dark:text-blue-400 underline";

export default function MobileDnsGuide() {
  return <div id="telefonda-dns" className="max-w-3xl scroll-mt-24 space-y-4">
    <h3 className="text-xl font-bold">Telefonda DNS değiştirme ve bağlantıyı kontrol etme</h3>
    <p className="text-sm leading-relaxed">Önce aynı siteyi Wi-Fi ve mobil veride ayrı ayrı deneyin. Mevcut DNS ayarını telefonunuzda not edin; deneme sırasında yalnızca DNS ayarını değiştirin. Aşağıdan cihazınızı seçin.</p>
    <details id="android-dns" className={disclosure}>
      <summary className={trigger}>Android 9 ve üzeri: Özel / Gizli DNS</summary>
      <div className="mt-3 space-y-4 text-sm leading-relaxed">
        <ol className="list-decimal pl-5 space-y-3">
          <li>Ayarlar içinde <strong>Özel DNS</strong> veya <strong>Gizli DNS</strong> arayın. Android’in standart yolu Ağ ve internet → Gizli DNS’tir; menü adı üreticiye göre değişebilir.</li>
          <li>Mevcut seçeneği not edip <strong>DNS sağlayıcının ana makine adı</strong> seçeneğini açın.</li>
          <li>Tek bir sağlayıcı seçin: Google için <code className="break-all">dns.google</code>, Cloudflare için <code className="break-all">one.one.one.one</code>. Bu alana <code>8.8.8.8</code>, <code>1.1.1.1</code> veya <code>https://</code> ile başlayan bir URL yazmayın.</li>
          <li>Kaydedin. Sorun yaşadığınız siteyi aynı ağda yeniden açın; ardından Wi-Fi ve mobil veride ayrı ayrı kontrol edin.</li>
        </ol>
        <p>Bu ayar Wi-Fi ve mobil ağlarda kullanılabilir. Eski Android sürümlerinde aynı menü yoktur; yalnızca DNS değiştirmek için rastgele statik IP veya ağ geçidi girmeyin.</p>
        <p><strong>Geri alma:</strong> aynı menüde önceki seçimi geri yükleyin. Önceki ayarınız Otomatik ise <strong>Otomatik</strong> seçip kaydedin. “Özel DNS sunucusuna erişilemiyor” hatasında önce sunucu adını kontrol edin; bağlantı düzelmiyorsa eski ayara dönün.</p>
        <p>VPN, DNS uygulaması veya tarayıcının güvenli DNS seçimi nedeniyle uygulamalar farklı çözümleyiciler kullanabilir. Kurumsal bir profili silmek yerine yöneticinizin ayarını doğrulayın.</p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <a className={source} href="https://support.google.com/android/answer/9654714?hl=tr">Android ağ ayarları</a>
          <a className={source} href="https://developers.google.com/speed/public-dns/docs/using/">Google Public DNS kurulumu</a>
          <a className={source} href="https://developers.cloudflare.com/1.1.1.1/setup/android/">Cloudflare Android kurulumu</a>
        </p>
        <DnsSetupFeedback device="android" />
      </div>
    </details>
    <details id="iphone-dns" className={disclosure}>
      <summary className={trigger}>iPhone / iPad: bağlı Wi-Fi ağının DNS ayarı</summary>
      <div className="mt-3 space-y-4 text-sm leading-relaxed">
        <p>Bu işlem yalnızca seçtiğiniz Wi-Fi ağı içindir. <strong>Hücresel verinin DNS ayarını değiştirmez</strong>; başka bir Wi-Fi ağına geçtiğinizde o ağın ayarı geçerlidir.</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Ayarlar → Wi-Fi → bağlı ağın yanındaki <strong>ⓘ</strong> → <strong>DNS’i Ayarla</strong> yolunu açın.</li>
          <li>Mevcut seçimi ve varsa elle girilmiş adresleri not edin. <strong>Elle</strong> seçeneğini açın.</li>
          <li><strong>Sunucu Ekle</strong> ile seçtiğiniz sağlayıcının adreslerini ayrı satırlara ekleyin: Google için <code>8.8.8.8</code> ve <code>8.8.4.4</code>; Cloudflare için <code>1.1.1.1</code> ve <code>1.0.0.1</code>. Yalnızca seçtiğiniz sağlayıcıyı denemek istiyorsanız eski DNS satırlarını not ettikten sonra kaldırın.</li>
          <li>Kaydet’e dokunun. Aynı Wi-Fi bağlantısında sorunlu siteyi yeniden açın; telefonun hücresel veriye geçmediğini kontrol edin.</li>
        </ol>
        <p><strong>Geri alma:</strong> DNS’i Ayarla → <strong>Otomatik</strong> → Kaydet, ağın verdiği DNS’e döner. Daha önce Elle kullanıyorsanız not ettiğiniz eski adresleri geri yükleyin. IP’yi Ayarla, yöneltici ve alt ağ maskesi alanlarını değiştirmeyin.</p>
        <p>Hücresel bağlantıda DNS seçmek farklı bir yapılandırma gerektirir; Wi-Fi adımlarını uygulamak yeterli değildir. VPN veya DNS profili varsa hangi bağlantıyı yönettiğini ayrıca kontrol edin.</p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <a className={source} href="https://developers.google.com/speed/public-dns/docs/using/">Google Public DNS kurulumu</a>
          <a className={source} href="https://developers.cloudflare.com/1.1.1.1/setup/ios/">Cloudflare iOS kurulumu</a>
        </p>
        <DnsSetupFeedback device="ios" />
      </div>
    </details>
    <p className="text-sm text-gray-600 dark:text-gray-300">Bir sitenin açılması, seçtiğiniz DNS’in bütün uygulamalarda kullanıldığını veya pingin düştüğünü kanıtlamaz. Buradaki DNS kayıt sorgusu da telefonunuzun çözümleyicisini ölçmez. Kaynak kontrolü: 17 Kasım 2026.</p>
  </div>;
}
