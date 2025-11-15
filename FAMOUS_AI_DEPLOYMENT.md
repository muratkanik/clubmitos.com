# 🚀 Famous.ai Domain Bağlantısı / Famous.ai Domain Connection

## 🇹🇷 Türkçe Adım Adım Kılavuz

### Şu Anki Durum
✅ Vercel'de proje yayında
✅ Domain Famous.ai'a bağlandı
❌ SSL sertifikası henüz hazır değil

### Yapılması Gerekenler

#### 1. Famous.ai Kontrol Paneli
1. Famous.ai hesabınıza giriş yapın
2. **Domains** veya **Domain Yönetimi** bölümüne gidin
3. `clubmitos.com` domaininizi bulun

#### 2. SSL Sertifikasını Aktif Edin
Famous.ai panelinde:
- **SSL/TLS** veya **Security** sekmesini bulun
- **Auto SSL** veya **Let's Encrypt SSL** seçeneğini aktif edin
- **Force HTTPS** seçeneğini KAPALI tutun (şimdilik)
- Kaydet butonuna tıklayın

#### 3. Vercel Bağlantısını Kontrol Edin
Famous.ai'da domain ayarlarında:
- **Target/Destination**: Vercel projenizin URL'si olmalı
- Örnek: `club-mitos.vercel.app` veya benzeri
- Eğer yoksa, Vercel'den aldığınız URL'yi buraya ekleyin

#### 4. Bekleme Süresi
- SSL sertifikası oluşturulması: **1-48 saat**
- İlk 1 saat: Genellikle hızlı çalışır
- Maksimum: 48 saat bekleyin

#### 5. Test Etme
**Hemen test için:**
```
http://clubmitos.com
```
(https değil, http kullanın)

**SSL hazır olduktan sonra:**
```
https://clubmitos.com
```

#### 6. Tarayıcı Önbelleğini Temizleyin
Chrome'da:
- `Ctrl + Shift + Delete` (Windows)
- `Cmd + Shift + Delete` (Mac)
- "Önbelleğe alınmış resimler ve dosyalar" seçin
- Temizle

---

## 🇬🇧 English Step-by-Step Guide

### Current Status
✅ Project live on Vercel
✅ Domain connected to Famous.ai
❌ SSL certificate not ready yet

### What To Do

#### 1. Famous.ai Control Panel
1. Log into your Famous.ai account
2. Go to **Domains** or **Domain Management**
3. Find your `clubmitos.com` domain

#### 2. Enable SSL Certificate
In Famous.ai panel:
- Find **SSL/TLS** or **Security** tab
- Enable **Auto SSL** or **Let's Encrypt SSL**
- Keep **Force HTTPS** OFF (for now)
- Click Save

#### 3. Check Vercel Connection
In Famous.ai domain settings:
- **Target/Destination**: Should be your Vercel project URL
- Example: `club-mitos.vercel.app` or similar
- If missing, add the URL from Vercel here

#### 4. Waiting Period
- SSL certificate generation: **1-48 hours**
- First 1 hour: Usually works quickly
- Maximum: Wait 48 hours

#### 5. Testing
**For immediate test:**
```
http://clubmitos.com
```
(use http, not https)

**After SSL is ready:**
```
https://clubmitos.com
```

#### 6. Clear Browser Cache
In Chrome:
- `Ctrl + Shift + Delete` (Windows)
- `Cmd + Shift + Delete` (Mac)
- Select "Cached images and files"
- Clear

---

## 🆘 Sorun Devam Ediyorsa / If Problem Persists

### Famous.ai Destek / Support
- Email: support@famous.ai
- Konu: "SSL Certificate for clubmitos.com"
- Açıklama: "ERR_CERTIFICATE_TRANSPARENCY_REQUIRED hatası alıyorum"

### Alternatif Çözüm / Alternative
Famous.ai yerine doğrudan Vercel'de domain bağlayabilirsiniz:
1. Vercel projesine gidin
2. Settings > Domains
3. clubmitos.com ekleyin
4. DNS kayıtlarını Famous.ai'dan Vercel'e yönlendirin
