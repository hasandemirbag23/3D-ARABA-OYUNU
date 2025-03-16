class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.engineSound = null;
        this.initialized = false;
    }
    
    async init() {
        try {
            // AudioContext oluştur
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Ses efektleri yükle
            await Promise.all([
                this.loadSound('start', 'sounds/start.mp3'),
                this.loadSound('lap', 'sounds/lap.mp3'),
                this.loadSound('win', 'sounds/win.mp3'),
                this.loadSound('engine', 'sounds/engine.mp3', true)
            ]);
            
            // Müzik yükle
            await this.loadMusic('sounds/music.mp3');
            
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Ses yüklenirken hata oluştu:', error);
            return false;
        }
    }
    
    async loadSound(name, url, loop = false) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            this.sounds[name] = {
                buffer: audioBuffer,
                loop: loop
            };
            
            if (name === 'engine') {
                // Motor sesi için özel ayarlar
                this.setupEngineSound();
            }
        } catch (error) {
            console.error(`Ses yüklenemedi (${name}):`, error);
        }
    }
    
    async loadMusic(url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            this.music = {
                buffer: audioBuffer,
                source: null,
                gainNode: this.audioContext.createGain()
            };
            
            this.music.gainNode.connect(this.audioContext.destination);
            this.music.gainNode.gain.value = 0.3; // Müzik sesi
        } catch (error) {
            console.error('Müzik yüklenemedi:', error);
        }
    }
    
    setupEngineSound() {
        if (!this.sounds.engine) return;
        
        // Motor sesi için gain node
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = 0.2; // Başlangıç ses seviyesi
        
        this.engineSound = {
            gainNode: gainNode,
            source: null
        };
    }
    
    playSound(name) {
        if (!this.initialized || !this.sounds[name]) return;
        
        try {
            const sound = this.sounds[name];
            const source = this.audioContext.createBufferSource();
            source.buffer = sound.buffer;
            source.loop = sound.loop;
            
            const gainNode = this.audioContext.createGain();
            gainNode.connect(this.audioContext.destination);
            gainNode.gain.value = 0.5;
            
            source.connect(gainNode);
            source.start(0);
            
            return source;
        } catch (error) {
            console.error(`Ses çalınamadı (${name}):`, error);
            return null;
        }
    }
    
    playMusic() {
        if (!this.initialized || !this.music) return;
        
        try {
            // Önceki müziği durdur
            if (this.music.source) {
                this.music.source.stop();
            }
            
            // Yeni müzik kaynağı oluştur
            const source = this.audioContext.createBufferSource();
            source.buffer = this.music.buffer;
            source.loop = true;
            source.connect(this.music.gainNode);
            source.start(0);
            
            this.music.source = source;
        } catch (error) {
            console.error('Müzik çalınamadı:', error);
        }
    }
    
    stopMusic() {
        if (!this.initialized || !this.music || !this.music.source) return;
        
        try {
            this.music.source.stop();
            this.music.source = null;
        } catch (error) {
            console.error('Müzik durdurulamadı:', error);
        }
    }
    
    startEngineSound() {
        if (!this.initialized || !this.engineSound) return;
        
        try {
            // Önceki motor sesini durdur
            if (this.engineSound.source) {
                this.engineSound.source.stop();
            }
            
            // Yeni motor sesi kaynağı oluştur
            const source = this.audioContext.createBufferSource();
            source.buffer = this.sounds.engine.buffer;
            source.loop = true;
            source.connect(this.engineSound.gainNode);
            source.start(0);
            
            this.engineSound.source = source;
        } catch (error) {
            console.error('Motor sesi başlatılamadı:', error);
        }
    }
    
    updateEngineSound(speed) {
        if (!this.initialized || !this.engineSound || !this.engineSound.source) {
            this.startEngineSound();
            return;
        }
        
        try {
            // Hıza göre ses seviyesi ve tonu ayarla
            const absSpeed = Math.abs(speed);
            
            // Ses seviyesi
            const volume = 0.1 + absSpeed * 5;
            this.engineSound.gainNode.gain.value = Math.min(volume, 0.5);
            
            // Ses tonu
            const pitch = 0.5 + absSpeed * 10;
            this.engineSound.source.playbackRate.value = Math.min(pitch, 2.0);
        } catch (error) {
            console.error('Motor sesi güncellenemedi:', error);
        }
    }
} 