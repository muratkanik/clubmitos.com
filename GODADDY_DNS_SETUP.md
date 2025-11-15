# 🌐 GoDaddy DNS Ayarları / GoDaddy DNS Setup

## 🇹🇷 Türkçe - GoDaddy + Famous.ai + Vercel

### Şu Anki Durum
❌ SSL Hatası: `ERR_CERTIFICATE_TRANSPARENCY_REQUIRED`
✅ Domain: GoDaddy'den alındı
✅ DNS değişiklikleri yapıldı

### Sorun Nedir?
Bu hata **NORMAL** ve geçicidir. Nedenleri:
1. DNS değişiklikleri henüz yayılmadı (24-48 saat sürer)
2. SSL sertifikası henüz oluşturulmadı
3. Eski SSL sertifikası cache'de kalmış olabilir

---

## ✅ DOĞRU DNS Ayarları (GoDaddy)

### Seçenek 1: Famous.ai Üzerinden (Önerilen)

#### GoDaddy'de Yapılması Gerekenler:
1. GoDaddy hesabınıza giriş yapın
2. **My Products** > **Domains** > `clubmitos.com`
3. **DNS** > **Manage DNS**
4. **Nameservers** bölümüne gidin
5. **Change** butonuna tıklayın
6. **Custom** seçin
7. Famous.ai'ın nameserver'larını girin:
   ```
   ns1.famous.ai
   ns2.famous.ai
   ```
8. **Save** butonuna tıklayın

#### Famous.ai'da Yapılması Gerekenler:
1. Famous.ai hesabınıza giriş yapın
2. Domain ayarlarına gidin
3. **Target URL** olarak Vercel URL'nizi girin:
   ```
   https://club-mitos.vercel.app
   ```
4. **SSL/TLS** ayarlarını aktif edin
5. Kaydedin

---

### Seçenek 2: Doğrudan Vercel'e Bağlama (Daha Hızlı)

#### 1. Vercel'de Domain Ekleme:
1. https://vercel.com/dashboard
2. Projenizi seçin
3. **Settings** > **Domains**
4. `clubmitos.com` yazın ve **Add**
5. Vercel size DNS kayıtlarını gösterecek

#### 2. GoDaddy'de DNS Kayıtları:
1. GoDaddy > **My Products** > **Domains** > `clubmitos.com`
2. **DNS** > **Manage DNS**
3. **Nameservers** DEĞIL, **DNS Records** kullanın
4. Mevcut A ve CNAME kayıtlarını silin
5. Vercel'in verdiği kayıtları ekleyin:

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)
- TTL: 600

**CNAME Record (www):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 600

6. **Save** butonuna tıklayın

---

## 🔍 Durum Kontrolü

### 1. DNS Yayılma Kontrolü
Tarayıcıda açın:
```
https://dnschecker.org/#A/clubmitos.com
```
- Yeşil ✓ işaretleri görmelisiniz
- Tüm lokasyonlarda aynı IP'yi görmeli

### 2. Hemen Test Edin (HTTP)
```
http://clubmitos.com
```
**NOT:** `http` kullanın, `https` değil

### 3. SSL Sertifika Kontrolü
```
https://www.ssllabs.com/ssltest/analyze.html?d=clubmitos.com
```

---

## ⏰ Bekleme Süreleri

| Adım | Süre |
|------|------|
| DNS Yayılması | 1-48 saat |
| SSL Sertifikası | 1-24 saat |
| Toplam | Maksimum 48 saat |

**İpucu:** Genellikle 2-6 saat içinde çalışır

---

## 🚨 Acil Çözüm - Şimdi Çalıştırın

### 1. Tarayıcı Önbelleğini Temizleyin
**Chrome:**
1. `chrome://settings/clearBrowserData` adresine gidin
2. **Time range**: All time
3. Sadece "Cached images and files" seçin
4. **Clear data**

### 2. Gizli Pencerede Test Edin
- `Ctrl + Shift + N` (Windows)
- `Cmd + Shift + N` (Mac)
- `http://clubmitos.com` açın

### 3. HSTS Önbelleğini Temizleyin
**Chrome:**
1. `chrome://net-internals/#hsts` adresine gidin
2. **Delete domain security policies** bölümüne `clubmitos.com` yazın
3. **Delete** butonuna tıklayın
4. Tarayıcıyı kapatıp açın

---

## 🇬🇧 English - GoDaddy + Famous.ai + Vercel

### Current Status
❌ SSL Error: `ERR_CERTIFICATE_TRANSPARENCY_REQUIRED`
✅ Domain: Purchased from GoDaddy
✅ DNS changes made

### What's the Issue?
This error is **NORMAL** and temporary. Causes:
1. DNS changes haven't propagated yet (takes 24-48 hours)
2. SSL certificate not generated yet
3. Old SSL certificate cached in browser

---

## ✅ CORRECT DNS Settings (GoDaddy)

### Option 1: Through Famous.ai (Recommended)

#### In GoDaddy:
1. Log into GoDaddy
2. **My Products** > **Domains** > `clubmitos.com`
3. **DNS** > **Manage DNS**
4. Go to **Nameservers** section
5. Click **Change**
6. Select **Custom**
7. Enter Famous.ai nameservers:
   ```
   ns1.famous.ai
   ns2.famous.ai
   ```
8. Click **Save**

#### In Famous.ai:
1. Log into Famous.ai
2. Go to domain settings
3. Set **Target URL** to your Vercel URL:
   ```
   https://club-mitos.vercel.app
   ```
4. Enable **SSL/TLS** settings
5. Save

---

### Option 2: Direct Vercel Connection (Faster)

#### 1. Add Domain in Vercel:
1. https://vercel.com/dashboard
2. Select your project
3. **Settings** > **Domains**
4. Type `clubmitos.com` and **Add**
5. Vercel will show DNS records

#### 2. DNS Records in GoDaddy:
1. GoDaddy > **My Products** > **Domains** > `clubmitos.com`
2. **DNS** > **Manage DNS**
3. Use **DNS Records**, NOT Nameservers
4. Delete existing A and CNAME records
5. Add Vercel's records:

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)
- TTL: 600

**CNAME Record (www):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 600

6. Click **Save**

---

## 🔍 Status Check

### 1. DNS Propagation Check
Open in browser:
```
https://dnschecker.org/#A/clubmitos.com
```
- Should see green ✓ marks
- Same IP in all locations

### 2. Test Immediately (HTTP)
```
http://clubmitos.com
```
**NOTE:** Use `http`, not `https`

### 3. SSL Certificate Check
```
https://www.ssllabs.com/ssltest/analyze.html?d=clubmitos.com
```

---

## ⏰ Wait Times

| Step | Duration |
|------|----------|
| DNS Propagation | 1-48 hours |
| SSL Certificate | 1-24 hours |
| Total | Max 48 hours |

**Tip:** Usually works within 2-6 hours

---

## 🚨 Quick Fix - Work Now

### 1. Clear Browser Cache
**Chrome:**
1. Go to `chrome://settings/clearBrowserData`
2. **Time range**: All time
3. Select only "Cached images and files"
4. **Clear data**

### 2. Test in Incognito
- `Ctrl + Shift + N` (Windows)
- `Cmd + Shift + N` (Mac)
- Open `http://clubmitos.com`

### 3. Clear HSTS Cache
**Chrome:**
1. Go to `chrome://net-internals/#hsts`
2. In **Delete domain security policies** type `clubmitos.com`
3. Click **Delete**
4. Close and reopen browser
