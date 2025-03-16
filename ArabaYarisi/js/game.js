class Game {
    constructor() {
        // Oyun değişkenleri
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        this.deltaTime = 0;
        this.totalTime = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.totalLaps = 10; // Toplam tur sayısı
        
        // Oyun nesneleri
        this.trackManager = null;
        this.trackCurve = null;
        this.playerCar = null;
        this.aiCars = [];
        this.audioManager = null;
        
        // UI elemanları
        this.menu = null;
        this.ui = null;
        this.message = null;
        this.gameOver = null;
        this.controls = null;
        this.leaderboard = null;
        this.speedometer = null;
        this.minimapRenderer = null;
        this.minimapCamera = null;
        
        // Kontrol değişkenleri
        this.keysPressed = {};
        this.touchControls = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };
        
        // Oyun başlangıcı
        this.init();
    }
    
    init() {
        // Sahne oluştur
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Gökyüzü rengi
        
        // Kamera oluştur
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, -10);
        this.camera.lookAt(0, 0, 0);
        
        // Renderer oluştur
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        // Minimap renderer
        this.setupMinimap();
        
        // Işıklandırma
        this.setupLighting();
        
        // Ses yöneticisi
        this.audioManager = new AudioManager();
        
        // Pist yöneticisi
        this.trackManager = new TrackManager(this.scene);
        
        // UI elemanları
        this.setupUI();
        
        // Olay dinleyicileri
        this.setupEventListeners();
        
        // Menüyü göster
        this.createMenu();
        
        // Animasyon döngüsü
        this.animate();
    }
    
    setupLighting() {
        // Ana ışık (güneş)
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(100, 100, 50);
        directionalLight.castShadow = true;
        
        // Gölge kalitesi
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        
        this.scene.add(directionalLight);
        
        // Ortam ışığı
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Yardımcı ışıklar
        const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x404040, 0.6);
        this.scene.add(hemisphereLight);
    }
    
    setupMinimap() {
        // Minimap kamerası
        this.minimapCamera = new THREE.OrthographicCamera(-50, 50, 50, -50, 1, 1000);
        this.minimapCamera.position.set(0, 100, 0);
        this.minimapCamera.lookAt(0, 0, 0);
        this.minimapCamera.rotation.z = Math.PI; // Kuzey yukarıda
        
        // Minimap renderer
        this.minimapRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.minimapRenderer.setSize(150, 150);
        this.minimapRenderer.setClearColor(0x000000, 0);
        
        // Minimap container
        const minimapContainer = document.createElement('div');
        minimapContainer.style.position = 'absolute';
        minimapContainer.style.bottom = '20px';
        minimapContainer.style.left = '20px';
        minimapContainer.style.width = '150px';
        minimapContainer.style.height = '150px';
        minimapContainer.style.borderRadius = '50%';
        minimapContainer.style.overflow = 'hidden';
        minimapContainer.style.border = '3px solid white';
        minimapContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        minimapContainer.style.display = 'none';
        
        minimapContainer.appendChild(this.minimapRenderer.domElement);
        document.body.appendChild(minimapContainer);
        
        this.minimapContainer = minimapContainer;
    }
    
    setupUI() {
        // UI elemanları
        this.ui = document.getElementById('ui');
        this.message = document.getElementById('message');
        this.leaderboard = document.getElementById('leaderboard');
        this.controls = document.getElementById('controls');
        
        // Hız göstergesi
        this.speedometer = document.createElement('div');
        this.speedometer.id = 'speedometer';
        this.speedometer.style.position = 'absolute';
        this.speedometer.style.bottom = '20px';
        this.speedometer.style.right = '20px';
        this.speedometer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.speedometer.style.color = 'white';
        this.speedometer.style.padding = '10px 20px';
        this.speedometer.style.borderRadius = '10px';
        this.speedometer.style.fontSize = '24px';
        this.speedometer.style.fontWeight = 'bold';
        this.speedometer.style.display = 'none';
        document.body.appendChild(this.speedometer);
        
        // Oyun sonu ekranı
        this.gameOver = document.createElement('div');
        this.gameOver.id = 'gameOver';
        this.gameOver.style.position = 'absolute';
        this.gameOver.style.top = '50%';
        this.gameOver.style.left = '50%';
        this.gameOver.style.transform = 'translate(-50%, -50%)';
        this.gameOver.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.gameOver.style.color = 'white';
        this.gameOver.style.padding = '30px';
        this.gameOver.style.borderRadius = '10px';
        this.gameOver.style.textAlign = 'center';
        this.gameOver.style.minWidth = '300px';
        this.gameOver.style.display = 'none';
        document.body.appendChild(this.gameOver);
    }
    
    setupEventListeners() {
        // Pencere yeniden boyutlandırma
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Klavye kontrolleri
        document.addEventListener('keydown', (event) => {
            this.keysPressed[event.key] = true;
            
            // Oyuncu kontrolleri
            if (this.playerCar) {
                const controls = {
                    forward: this.keysPressed['ArrowUp'] || this.keysPressed['w'] || this.keysPressed['W'],
                    backward: this.keysPressed['ArrowDown'] || this.keysPressed['s'] || this.keysPressed['S'],
                    left: this.keysPressed['ArrowLeft'] || this.keysPressed['a'] || this.keysPressed['A'],
                    right: this.keysPressed['ArrowRight'] || this.keysPressed['d'] || this.keysPressed['D']
                };
                
                this.playerCar.setControls(controls);
            }
            
            // Duraklat/devam et
            if (event.key === 'p' || event.key === 'P' || event.key === 'Escape') {
                this.togglePause();
            }
        });
        
        document.addEventListener('keyup', (event) => {
            this.keysPressed[event.key] = false;
            
            // Oyuncu kontrolleri
            if (this.playerCar) {
                const controls = {
                    forward: this.keysPressed['ArrowUp'] || this.keysPressed['w'] || this.keysPressed['W'],
                    backward: this.keysPressed['ArrowDown'] || this.keysPressed['s'] || this.keysPressed['S'],
                    left: this.keysPressed['ArrowLeft'] || this.keysPressed['a'] || this.keysPressed['A'],
                    right: this.keysPressed['ArrowRight'] || this.keysPressed['d'] || this.keysPressed['D']
                };
                
                this.playerCar.setControls(controls);
            }
        });
        
        // Dokunmatik kontroller
        const touchButtons = {
            'up': { forward: true },
            'down': { backward: true },
            'left': { left: true },
            'right': { right: true }
        };
        
        for (const [id, controls] of Object.entries(touchButtons)) {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    Object.assign(this.touchControls, controls);
                    
                    if (this.playerCar) {
                        this.playerCar.setControls({
                            ...this.touchControls
                        });
                    }
                });
                
                button.addEventListener('touchend', (event) => {
                    event.preventDefault();
                    for (const key in controls) {
                        this.touchControls[key] = false;
                    }
                    
                    if (this.playerCar) {
                        this.playerCar.setControls({
                            ...this.touchControls
                        });
                    }
                });
            }
        }
    }
    
    createMenu() {
        // Önceki menüyü temizle
        if (this.menu) {
            document.body.removeChild(this.menu);
        }
        
        // Menü oluştur
        this.menu = document.createElement('div');
        this.menu.id = 'menu';
        
        // Başlık
        const title = document.createElement('h1');
        title.textContent = '3D Araba Yarışı';
        this.menu.appendChild(title);
        
        // Pist seçimi
        const trackLabel = document.createElement('label');
        trackLabel.textContent = 'Pist Seçin:';
        this.menu.appendChild(trackLabel);
        
        const trackSelect = document.createElement('select');
        trackSelect.id = 'trackSelect';
        
        // Pist seçenekleri
        const trackNames = this.trackManager.getTrackNames();
        trackNames.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            trackSelect.appendChild(option);
        });
        
        this.menu.appendChild(trackSelect);
        
        // Rakip sayısı
        const opponentLabel = document.createElement('label');
        opponentLabel.textContent = 'Rakip Sayısı:';
        this.menu.appendChild(opponentLabel);
        
        const opponentSelect = document.createElement('select');
        opponentSelect.id = 'opponentSelect';
        
        // Rakip seçenekleri
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i.toString();
            if (i === 3) option.selected = true;
            opponentSelect.appendChild(option);
        }
        
        this.menu.appendChild(opponentSelect);
        
        // Başlat butonu
        const startButton = document.createElement('button');
        startButton.textContent = 'Yarışı Başlat';
        startButton.addEventListener('click', () => {
            const trackIndex = parseInt(trackSelect.value);
            const opponentCount = parseInt(opponentSelect.value);
            
            this.startGame(trackIndex, opponentCount);
        });
        
        this.menu.appendChild(startButton);
        
        // Menüyü ekle
        document.body.appendChild(this.menu);
    }
    
    async startGame(trackIndex, opponentCount) {
        // Menüyü gizle
        this.menu.style.display = 'none';
        
        // Pisti oluştur
        this.trackCurve = this.trackManager.createTrack(trackIndex);
        
        // Oyuncu arabasını oluştur
        this.playerCar = new Car(this.scene, this.trackCurve, true);
        
        // AI arabalarını oluştur
        this.aiCars = [];
        for (let i = 0; i < opponentCount; i++) {
            const aiCar = new Car(this.scene, this.trackCurve, false);
            this.aiCars.push(aiCar);
        }
        
        // Ses yöneticisini başlat
        await this.audioManager.init();
        this.audioManager.playMusic();
        this.audioManager.startEngineSound();
        
        // UI'ı göster
        this.ui.style.display = 'block';
        this.speedometer.style.display = 'block';
        this.minimapContainer.style.display = 'block';
        
        // Mobil cihazlar için kontrolleri göster
        if (this.isMobileDevice()) {
            this.controls.style.display = 'block';
        }
        
        // Başlangıç mesajı
        this.showMessage('Yarış Başladı!', 2000);
        
        // Oyunu başlat
        this.isPlaying = true;
        this.isPaused = false;
        this.totalTime = 0;
        
        // Başlangıç sesi
        this.audioManager.playSound('start');
    }
    
    endGame() {
        // Oyunu bitir
        this.isPlaying = false;
        
        // Sonuçları hesapla
        const results = [...this.aiCars, this.playerCar].sort((a, b) => {
            if (a.lapCount !== b.lapCount) {
                return b.lapCount - a.lapCount;
            }
            return a.trackPosition - b.trackPosition;
        });
        
        // Oyuncunun pozisyonu
        const playerPosition = results.findIndex(car => car === this.playerCar) + 1;
        
        // Oyun sonu ekranı
        this.gameOver.innerHTML = '';
        
        const title = document.createElement('h2');
        title.textContent = playerPosition === 1 ? 'Tebrikler! Kazandın!' : 'Yarış Bitti!';
        this.gameOver.appendChild(title);
        
        const positionText = document.createElement('p');
        positionText.textContent = `Pozisyon: ${playerPosition}/${results.length}`;
        this.gameOver.appendChild(positionText);
        
        const timeText = document.createElement('p');
        timeText.textContent = `Toplam Süre: ${this.formatTime(this.totalTime)}`;
        this.gameOver.appendChild(timeText);
        
        if (this.playerCar.bestLapTime !== Infinity) {
            const bestLapText = document.createElement('p');
            bestLapText.textContent = `En İyi Tur: ${this.formatTime(this.playerCar.bestLapTime)}`;
            this.gameOver.appendChild(bestLapText);
        }
        
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Ana Menüye Dön';
        restartButton.addEventListener('click', () => {
            this.resetGame();
        });
        this.gameOver.appendChild(restartButton);
        
        // Oyun sonu ekranını göster
        this.gameOver.style.display = 'block';
        
        // UI'ı gizle
        this.ui.style.display = 'none';
        this.speedometer.style.display = 'none';
        this.minimapContainer.style.display = 'none';
        this.controls.style.display = 'none';
        
        // Müziği durdur
        this.audioManager.stopMusic();
        
        // Kazanma sesi
        this.audioManager.playSound('win');
    }
    
    resetGame() {
        // Oyun sonu ekranını gizle
        this.gameOver.style.display = 'none';
        
        // Arabaları temizle
        if (this.playerCar) {
            this.scene.remove(this.playerCar.mesh);
            this.playerCar = null;
        }
        
        for (const car of this.aiCars) {
            this.scene.remove(car.mesh);
        }
        this.aiCars = [];
        
        // Menüyü göster
        this.createMenu();
    }
    
    togglePause() {
        if (!this.isPlaying) return;
        
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.showMessage('Oyun Duraklatıldı', 0);
            this.audioManager.stopMusic();
        } else {
            this.hideMessage();
            this.audioManager.playMusic();
        }
    }
    
    showMessage(text, duration = 2000) {
        this.message.textContent = text;
        this.message.style.display = 'block';
        
        if (duration > 0) {
            setTimeout(() => {
                this.hideMessage();
            }, duration);
        }
    }
    
    hideMessage() {
        this.message.style.display = 'none';
    }
    
    updateCamera() {
        if (!this.playerCar || !this.isPlaying) return;
        
        // Araba pozisyonu
        const carPosition = this.playerCar.mesh.position.clone();
        
        // Araba yönü
        const carDirection = this.playerCar.direction.clone();
        
        // Kamera pozisyonu - arabayı takip et
        const cameraOffset = new THREE.Vector3(
            -carDirection.x * 6, // Daha yakın
            3, // Daha alçak
            -carDirection.z * 6 // Daha yakın
        );
        
        // Kamera pozisyonunu yumuşak geçişle güncelle
        this.camera.position.lerp(carPosition.clone().add(cameraOffset), 0.1);
        
        // Kamera bakış noktası - arabanın biraz ilerisine bak
        const lookAtOffset = carDirection.clone().multiplyScalar(10);
        const targetLookAt = carPosition.clone().add(lookAtOffset);
        
        // Geçici bir vektör oluştur
        const currentLookAt = new THREE.Vector3();
        this.camera.getWorldDirection(currentLookAt);
        currentLookAt.multiplyScalar(10).add(this.camera.position);
        
        // Bakış noktasını yumuşak geçişle güncelle
        const newLookAt = currentLookAt.lerp(targetLookAt, 0.1);
        this.camera.lookAt(newLookAt);
    }
    
    updateUI() {
        if (!this.playerCar || !this.isPlaying) return;
        
        // Pozisyon hesapla
        const positions = [...this.aiCars, this.playerCar].sort((a, b) => {
            if (a.lapCount !== b.lapCount) {
                return b.lapCount - a.lapCount;
            }
            return b.trackPosition - a.trackPosition;
        });
        
        const playerPosition = positions.findIndex(car => car === this.playerCar) + 1;
        
        // UI güncelle
        document.getElementById('position').textContent = `${playerPosition}/${positions.length}`;
        document.getElementById('lap').textContent = `${this.playerCar.lapCount + 1}/${this.totalLaps}`;
        document.getElementById('time').textContent = this.formatTime(this.totalTime);
        
        // Hız göstergesi
        const speedKmh = Math.abs(this.playerCar.speed) * 3600; // Yaklaşık km/h değeri
        this.speedometer.textContent = `${Math.floor(speedKmh)} KM/H`;
        
        // Lider tablosu
        this.updateLeaderboard(positions);
        
        // Yarış bitimi kontrolü
        if (this.playerCar.lapCount >= this.totalLaps) {
            this.playerCar.isFinished = true;
            this.endGame();
        }
    }
    
    updateLeaderboard(positions) {
        this.leaderboard.innerHTML = '';
        
        // Başlık
        const title = document.createElement('div');
        title.textContent = 'SIRALAMA';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        this.leaderboard.appendChild(title);
        
        // Pozisyonlar
        positions.forEach((car, index) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            
            // Oyuncu arabası için vurgu
            if (car === this.playerCar) {
                row.style.color = '#FFD700';
                row.style.fontWeight = 'bold';
            }
            
            row.textContent = `${index + 1}. ${car === this.playerCar ? 'SEN' : 'AI ' + (index + 1)} - Tur ${car.lapCount + 1}`;
            this.leaderboard.appendChild(row);
        });
    }
    
    updateMinimap() {
        if (!this.playerCar || !this.isPlaying) return;
        
        // Minimap kamerasını oyuncunun üzerine yerleştir
        this.minimapCamera.position.set(
            this.playerCar.mesh.position.x,
            100,
            this.playerCar.mesh.position.z
        );
        
        // Minimap'i render et
        this.minimapRenderer.render(this.scene, this.minimapCamera);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Delta time hesapla
        this.deltaTime = this.clock.getDelta();
        
        // Oyun durumu kontrolü
        if (this.isPlaying && !this.isPaused) {
            // Toplam süreyi güncelle
            this.totalTime += this.deltaTime;
            
            // Arabaları güncelle
            if (this.playerCar) {
                this.playerCar.update(this.deltaTime, this.aiCars);
                
                // Motor sesini güncelle
                this.audioManager.updateEngineSound(this.playerCar.speed);
            }
            
            for (const car of this.aiCars) {
                car.update(this.deltaTime, [...this.aiCars, this.playerCar]);
            }
            
            // Kamerayı güncelle
            this.updateCamera();
            
            // UI güncelle
            this.updateUI();
            
            // Minimap güncelle
            this.updateMinimap();
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const millis = Math.floor((seconds % 1) * 1000);
        
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${millis.toString().padStart(3, '0').substring(0, 2)}`;
    }
    
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

// Oyunu başlat
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
}); 