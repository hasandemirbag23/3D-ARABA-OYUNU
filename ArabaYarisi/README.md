# 3D Araba Yarışı Oyunu

Bu proje, Three.js kullanılarak geliştirilmiş basit bir 3D araba yarışı oyunudur.

## Özellikler

- 3D araba modeli ve pist
- Gerçekçi fizik ve kontroller
- Yapay zeka rakipler
- Farklı pist seçenekleri
- Ses efektleri ve müzik
- Skor tablosu ve zamanlama
- Mobil cihaz desteği

## Kurulum

1. Projeyi bilgisayarınıza indirin
2. Proje klasöründe aşağıdaki komutu çalıştırın:

```
npm install
```

## Çalıştırma

Oyunu başlatmak için aşağıdaki komutu çalıştırın:

```
npm start
```

Ardından tarayıcınızda `http://localhost:8080` adresini açın.

## Kontroller

- **W / Yukarı Ok**: İleri git
- **S / Aşağı Ok**: Fren yap / Geri git
- **A / Sol Ok**: Sola dön
- **D / Sağ Ok**: Sağa dön
- **P / ESC**: Oyunu duraklat/devam ettir

Mobil cihazlarda ekrandaki kontrol düğmelerini kullanabilirsiniz.

## Klasör Yapısı

- `index.html`: Ana HTML dosyası
- `js/`: JavaScript dosyaları
  - `game.js`: Ana oyun mantığı
  - `car.js`: Araba modeli ve kontrolü
  - `tracks.js`: Pist oluşturma ve yönetimi
  - `audio.js`: Ses yönetimi
- `sounds/`: Ses dosyaları
- `textures/`: Doku dosyaları

## Teknolojiler

- Three.js: 3D grafik kütüphanesi
- JavaScript: Programlama dili
- HTML/CSS: Kullanıcı arayüzü 