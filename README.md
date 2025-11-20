# 📸 LuminaLens - YZ Destekli Fotoğrafçılık Asistanı

LuminaLens, fotoğrafçılar, videografikerler ve içerik üreticileri için geliştirilmiş; çekim planlama, ekipman yönetimi ve teknik destek süreçlerini yapay zeka (Google Gemini 2.5) ile güçlendiren modern bir web uygulamasıdır.

## 🌟 Temel Özellikler

### 1. 🎒 Çanta Hazırlama (My Kit)
Çekim öncesi ekipmanlarınızı eksiksiz hazırlamanız için geliştirilmiş, akıllı veritabanına sahip manuel kontrol listesi.
*   **Genişletilmiş 2025 Veritabanı:** Phase One, RED, ARRI gibi sinema ve orta format devlerinden; Sony A9 III, Canon R1 gibi en yeni gövdelere kadar geniş kapsam.
*   **Akıllı Otomatik Tamamlama:** "35-150", "G Master", "Probe Lens" gibi terimlerle hızlı arama ve ekleme.
*   **Kategorize Edilmiş Yapı:** Kameralar, Lensler, Drone & Aksiyon, Işık Sistemleri (Aputure/Profoto), Ses Ekipmanları ve Aksesuarlar.
*   **İlerleme Takibi:** Çantanızın doluluk oranını görsel ilerleme çubuğu ile takip edin.

### 2. 📷 Ekipman Uyumluluk Kontrolü (Gear Check)
Sahip olduğunuz veya satın almayı düşündüğünüz bir kamera modelini girin, yapay zeka teknik özelliklerini analiz etsin.
*   **Lens Önerileri:** Kamera bayonet yapısına (Mount) uygun prime ve zoom lens önerileri.
*   **Aksesuar Analizi:** Doğru hafıza kartı (SD/CFexpress) ve batarya tipleri.
*   **Sensör Bilgisi:** Full Frame, APS-C, Medium Format veya Micro Four Thirds sensör uyumluluk kontrolleri.

### 3. 🗺️ Çekim Planlayıcı (Shoot Planner)
Gideceğiniz konumu ve koşulları belirtin, LuminaLens sizin için teknik bir çekim reçetesi oluştursun.
*   **Girdiler:** Çekim Türü (Portre, Manzara, Sokak vb.), Konum, Günün Saati, Hava Durumu.
*   **Çıktılar:** 
    *   İdeal Kamera Ayarları (ISO, Diyafram, Enstantane, Beyaz Dengesi).
    *   Aydınlatma Stratejisi ve Altın Saat ipuçları.
    *   Kompozisyon teknikleri.
    *   Götürülmesi gereken spesifik ekipman listesi.

### 4. 💬 Ayarlar Sihirbazı (Settings Wizard)
Sahada anlık teknik desteğe mi ihtiyacınız var? Yapay zeka asistanı ile sohbet edin.
*   Doğal dil işleme yeteneği ile senaryonuzu anlatın (örn: "Gece vakti hareket eden arabaları ışık izi olarak çekmek istiyorum").
*   "Derin Düşünme" modu ile karmaşık optik sorunlarına çözüm bulun.

---

## 🛠️ Teknolojiler

Proje, modern web teknolojileri ve güçlü yapay zeka modelleri üzerine inşa edilmiştir:

*   **Frontend:** React 19, TypeScript, Vite
*   **UI/UX:** Tailwind CSS, Lucide React (İkon Seti)
*   **Yapay Zeka:** Google Gemini 2.5 Flash Model (`@google/genai` SDK)
*   **Routing:** React Router DOM

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone https://github.com/kullaniciadi/luminalens.git
    cd luminalens
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **API Anahtarını Ayarlayın:**
    Google AI Studio'dan bir API anahtarı alın ve ortam değişkenlerine ekleyin.
    (Not: Bu proje `process.env.API_KEY` üzerinden anahtarı okur).

4.  **Uygulamayı Başlatın:**
    ```bash
    npm start
    ```

---

## 💡 Kullanım İpuçları

*   **Profesyonel Aramalar:** "Phase One" veya "RED" yazarak high-end ekipmanları listeleyebilirsiniz.
*   **Çekim Planlarken:** Hava durumunu ve saati ne kadar detaylı girerseniz (örn: "Parçalı bulutlu gün batımı"), yapay zeka o kadar nokta atışı ayar önerir.
*   **Ekipman Kontrolü:** Sadece modern kameralar değil, eski modelleri de (örn: "Canon 5D Mark II") sorgulayabilirsiniz.

---

## 📄 Lisans

Bu proje açık kaynaklıdır ve MIT lisansı ile sunulmaktadır. Fotoğrafçılık topluluğuna katkı sağlamak amacıyla geliştirilmiştir.
