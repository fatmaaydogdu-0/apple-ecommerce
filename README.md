# AppleApp E-Ticaret Projesi

Bu proje, Express + EJS + Sequelize kullanılarak geliştirilen basit bir e‑ticaret uygulamasıdır. Ürün listeleme, arama, filtreleme, sepet ve checkout akışı ile birlikte admin panelinde ürün CRUD işlemleri bulunur.

## Özellikler

- Anasayfa ve ürün listeleme
- Kategori / marka filtreleme ve sayfalama
- Ürün detay sayfası
- Ürün arama
- Sepet yönetimi (ekle/azalt/sil)
- Checkout adımları
- Kullanıcı kayıt / giriş / çıkış
- Admin paneli: ürün ekleme / düzenleme / silme (görsel yükleme dahil)

## Teknolojiler

- Node.js, Express
- EJS + express-ejs-layouts
- Sequelize (MySQL)
- Bootstrap 5
- Session yönetimi: express-session + connect-session-sequelize
- Dosya yükleme: multer

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. MySQL üzerinde bir veritabanı oluşturun (ör. `appledb`).

3. `.env` dosyasını oluşturun:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=appledb
PORT=3003
NODE_ENV=development
```

## Çalıştırma

```bash
npm run start
```

Uygulama varsayılan olarak `http://localhost:3003` adresinde çalışır.

## Varsayılan Demo Kullanıcıları

Uygulama ilk açılışta (DB boşsa) örnek verileri otomatik ekler.

Admin kullanıcıları:

- `fatma@gmail.com` / `fatma`
- `ahmet@gmail.com` / `ahmet`

Standart kullanıcı:

- `mehmet@gmail.com` / `mehmet`

## Önemli Notlar

- Veritabanı `index.js` içinde `sequelize.sync()` ile otomatik senkronize edilir.
- Örnek veri ekleme `data/dummyData.js` üzerinden çalışır (DB boşsa).
- Ürün görselleri `public/images` klasörüne yüklenir.

## Klasör Yapısı

- `controllers/` : İş mantığı
- `routes/` : Route tanımları
- `models/` : Sequelize modelleri
- `views/` : EJS şablonları
- `public/` : Statik dosyalar (css, images)
- `middlewares/` : Authentication ve yetki kontrolü
- `helpers/` : Yardımcı fonksiyonlar
- `data/` : Veritabanı bağlantısı ve dummy (seed) veriler

## Route Örnekleri

Uygulamada kullanılan bazı temel endpoint örnekleri:

- `GET /` → Anasayfa
- `GET /products` → Ürün listeleme
- `GET /product/:id` → Ürün detay
- `GET /cart` → Sepeti görüntüleme
- `POST /cart/add` → Sepete ürün ekleme
- `GET /account/login` → Giriş sayfası
- `POST /account/login` → Giriş işlemi
- `GET /admin/products` → Admin ürün yönetimi
- `POST /admin/product/create` → Yeni ürün ekleme

(Tüm route detayları `routes/` klasöründe incelenebilir.)

## Projenin Amacı

Bu proje;

- Node.js ve Express mimarisini öğrenmek
- MVC yapı mantığını kavramak
- Sequelize ORM kullanımını pekiştirmek
- Frontend (EJS) ve backend entegrasyonunu uygulamak
- Gerçek bir e-ticaret sisteminin temel akışlarını modellemek

amacıyla geliştirilmiştir.

## Geliştirici

**Fatma Aydoğdu**

## Not

Bu proje akademik bir ödev kapsamında geliştirilmiştir ve eğitim amaçlıdır.
