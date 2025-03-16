const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // URL'yi normalize et
    let url = req.url;
    
    // Kök dizin için index.html'e yönlendir
    if (url === '/') {
        url = '/index.html';
    }
    
    // Dosya yolunu oluştur
    const filePath = path.join(__dirname, url);
    
    // Dosya uzantısını al
    const extname = path.extname(filePath).toLowerCase();
    
    // MIME türünü belirle
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Dosyayı oku
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Dosya bulunamadı
                console.error(`Dosya bulunamadı: ${filePath}`);
                res.writeHead(404);
                res.end('404 - Dosya Bulunamadı');
            } else {
                // Sunucu hatası
                console.error(`Sunucu hatası: ${err.code}`);
                res.writeHead(500);
                res.end(`500 - Sunucu Hatası: ${err.code}`);
            }
        } else {
            // Başarılı yanıt
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
    console.log(`Oyunu oynamak için tarayıcınızda http://localhost:${PORT} adresini açın`);
}); 