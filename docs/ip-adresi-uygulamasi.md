# IP adresi nereden okunur?

Bu kısa uygulama teknik destek ekipleri, kütüphane kullanıcıları ve ağ temelleri dersleri için hazırlanmıştır. Bir web sitesinin hangi adresi gördüğünü, bir cihazın yerel adresini ve bir sunucunun ağ kaydını karşılaştırabilirsiniz. Uygulama sonunda adresleri paylaşmanız gerekmez.

## Bağlantı değişikliğini kontrol etme

1. Tarayıcınızda [bağlantınızın genel IP adresini görüntüleyin](https://ipbulucu.org/). JavaScript kullanamıyorsanız sayfadaki düz metin seçeneğini açın.
2. Denediğiniz koşulu değiştirin. Örneğin telefonda Wi-Fi'den mobil veriye geçin. Bir kurumun VPN veya proxy hizmetini kontrol ediyorsanız kurumun resmî kurulum yönergesini izleyin.
3. Aynı tarayıcıda aynı sayfayı yenileyin. İki sonucu kendi ekranınızda karşılaştırın. Destek talebine yalnızca “değişti”, “aynı kaldı” veya “sonuç alınamadı” yazabilirsiniz.

**Sonucu nasıl yorumlamalı?** Adres değiştiyse bu siteye yapılan iki isteğin internete farklı IP adresleriyle ulaştığını gözlemlediniz. Adres aynı kaldıysa yalnızca bu siteye giden trafiğin görünen çıkışı aynı kaldı. Bazı kurumsal proxy'ler sadece kütüphane veri tabanları gibi belirli hedefleri kapsar. Böyle bir kurulumda erişimi kurumun belirttiği kaynak üzerinden doğrulayın.

## Ders uygulaması: cihaz, bağlantı ve sunucu

| Öğrencinin yapacağı işlem | Cevaplanacak soru |
|---|---|
| Bağlı cihazın Wi-Fi ayrıntılarındaki IP adresine bakın. Ardından genel IP adresini görüntüleyin. | Yazıcıya yerel ağdan bağlanırken hangisi işe yarar? Bir internet sitesi hangisini görür? |
| [Alan adı sorgulama sayfasında](https://ipbulucu.org/ip-sorgulama/) örnek olarak `ipbulucu.org` girin. | Gösterilen ağ numarası (ASN), interneti kullanan öğrenciye mi, sitenin yanıt veren sunucusunun ağına mı ait? |
| Aynı alan adını bir arkadaşınızla ayrı bağlantılardan sorgulayın. | Sonuçlar farklı çıkarsa neden iki sonuç da mümkün olabilir? |

**Cevap anahtarı.** İlk işlemde yazıcıyla aynı ağdaki cihazın yerel adresini ve siteye görünür genel adresi okuyorsunuz. İkinci işlem, alan adının çözümlendiği adresi ve veri kaynağı sunuyorsa o adresin ağ bilgisini verir. Birden fazla DNS kaydı veya içerik dağıtım ağı, farklı bağlantılarda farklı sunucu adreslerinin görülmesine yol açabilir. Bir ASN belirli bir kişiyi tanımlamaz. Sağlayıcı bilgi vermediyse sonucu “bilinmiyor” olarak bırakın.

**Destek dokümanına alınabilecek kısa metin**

> İnternete hangi adresle bağlandığınızı kontrol etmek için [genel IP adresinizi görüntüleyin](https://ipbulucu.org/). Bir web sitesinin hangi ağda barındığını araştırıyorsanız [alan adı sorgulamasını açın](https://ipbulucu.org/ip-sorgulama/) ve o sitenin alan adını girin.
