class Car {
    constructor(scene, trackCurve, isPlayer = false) {
        this.scene = scene;
        this.trackCurve = trackCurve;
        this.isPlayer = isPlayer;
        
        // Araba özellikleri
        this.maxSpeed = isPlayer ? 0.8 : 0.6 + Math.random() * 0.2;
        this.acceleration = isPlayer ? 0.005 : 0.003 + Math.random() * 0.002;
        this.deceleration = isPlayer ? 0.003 : 0.002;
        this.brakeDeceleration = isPlayer ? 0.01 : 0.008;
        this.turnSpeed = isPlayer ? 0.03 : 0.02 + Math.random() * 0.01;
        
        // Araba durumu
        this.speed = 0;
        this.trackPosition = isPlayer ? 0 : Math.random(); // Pist üzerindeki pozisyon (0-1 arası)
        this.direction = new THREE.Vector3(0, 0, 1);
        this.mesh = null;
        this.lapCount = 0;
        this.lastCheckpoint = 0;
        this.isFinished = false;
        this.totalTime = 0;
        this.bestLapTime = Infinity;
        this.currentLapTime = 0;
        this.lapTimes = [];
        
        // Kontrol tuşları (sadece oyuncu için)
        this.controls = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };
        
        // AI için değişkenler
        this.aiSteerAmount = 0;
        this.aiRandomOffset = Math.random() * 0.4 - 0.2; // -0.2 ile 0.2 arası
        
        // Araba modelini oluştur
        this.createCarMesh();
    }
    
    createCarMesh() {
        // Ana grup
        this.mesh = new THREE.Group();
        
        // Araba rengi - oyuncu için kırmızı, AI için rastgele
        const carColor = this.isPlayer ? 0xFF0000 : Math.random() * 0xFFFFFF;
        
        // Gövde
        const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 4);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: carColor,
            metalness: 0.7,
            roughness: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        body.castShadow = true;
        this.mesh.add(body);
        
        // Ön kısım (eğimli)
        const frontGeometry = new THREE.BoxGeometry(2, 0.4, 1);
        const front = new THREE.Mesh(frontGeometry, bodyMaterial);
        front.position.set(0, 0.7, 1.5);
        front.rotation.x = -Math.PI / 12;
        front.castShadow = true;
        this.mesh.add(front);
        
        // Kabin
        const cabinGeometry = new THREE.BoxGeometry(1.8, 0.5, 2);
        const cabinMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.5,
            roughness: 0.2
        });
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.set(0, 0.9, 0);
        cabin.castShadow = true;
        this.mesh.add(cabin);
        
        // Camlar
        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0x88CCFF,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.7
        });
        
        // Ön cam
        const frontWindowGeometry = new THREE.PlaneGeometry(1.7, 0.5);
        const frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial);
        frontWindow.position.set(0, 1.0, 1.0);
        frontWindow.rotation.x = Math.PI / 3;
        this.mesh.add(frontWindow);
        
        // Arka cam
        const rearWindowGeometry = new THREE.PlaneGeometry(1.7, 0.5);
        const rearWindow = new THREE.Mesh(rearWindowGeometry, windowMaterial);
        rearWindow.position.set(0, 1.0, -1.0);
        rearWindow.rotation.x = -Math.PI / 3;
        this.mesh.add(rearWindow);
        
        // Yan camlar
        const sideWindowGeometry = new THREE.PlaneGeometry(2, 0.4);
        
        const leftWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
        leftWindow.position.set(0.91, 0.9, 0);
        leftWindow.rotation.y = -Math.PI / 2;
        this.mesh.add(leftWindow);
        
        const rightWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
        rightWindow.position.set(-0.91, 0.9, 0);
        rightWindow.rotation.y = Math.PI / 2;
        this.mesh.add(rightWindow);
        
        // Farlar
        const headlightGeometry = new THREE.CircleGeometry(0.2, 16);
        const headlightMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            emissive: 0xFFFFFF,
            emissiveIntensity: 0.5
        });
        
        const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
        leftHeadlight.position.set(0.6, 0.5, 2.01);
        this.mesh.add(leftHeadlight);
        
        const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
        rightHeadlight.position.set(-0.6, 0.5, 2.01);
        this.mesh.add(rightHeadlight);
        
        // Arka lambalar
        const taillightGeometry = new THREE.CircleGeometry(0.15, 16);
        const taillightMaterial = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 0.5
        });
        
        const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
        leftTaillight.position.set(0.6, 0.5, -2.01);
        this.mesh.add(leftTaillight);
        
        const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
        rightTaillight.position.set(-0.6, 0.5, -2.01);
        this.mesh.add(rightTaillight);
        
        // Tamponlar
        const bumperMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.5,
            roughness: 0.8
        });
        
        // Ön tampon
        const frontBumperGeometry = new THREE.BoxGeometry(2.1, 0.3, 0.3);
        const frontBumper = new THREE.Mesh(frontBumperGeometry, bumperMaterial);
        frontBumper.position.set(0, 0.3, 2.0);
        frontBumper.castShadow = true;
        this.mesh.add(frontBumper);
        
        // Arka tampon
        const rearBumperGeometry = new THREE.BoxGeometry(2.1, 0.3, 0.3);
        const rearBumper = new THREE.Mesh(rearBumperGeometry, bumperMaterial);
        rearBumper.position.set(0, 0.3, -2.0);
        rearBumper.castShadow = true;
        this.mesh.add(rearBumper);
        
        // Aynalar
        const mirrorGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.3);
        const mirrorMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.5,
            roughness: 0.5
        });
        
        const leftMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
        leftMirror.position.set(1.05, 0.8, 0.8);
        leftMirror.castShadow = true;
        this.mesh.add(leftMirror);
        
        const rightMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
        rightMirror.position.set(-1.05, 0.8, 0.8);
        rightMirror.castShadow = true;
        this.mesh.add(rightMirror);
        
        // Tekerlekler
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.9
        });
        
        // Jant malzemesi
        const rimGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.31, 16);
        const rimMaterial = new THREE.MeshStandardMaterial({
            color: 0xCCCCCC,
            metalness: 0.8,
            roughness: 0.2
        });
        
        // Ön sol tekerlek
        const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontLeftWheel.position.set(1.1, 0.4, 1.3);
        frontLeftWheel.rotation.z = Math.PI / 2;
        frontLeftWheel.castShadow = true;
        this.mesh.add(frontLeftWheel);
        
        // Ön sol jant
        const frontLeftRim = new THREE.Mesh(rimGeometry, rimMaterial);
        frontLeftRim.position.set(1.1, 0.4, 1.3);
        frontLeftRim.rotation.z = Math.PI / 2;
        this.mesh.add(frontLeftRim);
        
        // Ön sağ tekerlek
        const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontRightWheel.position.set(-1.1, 0.4, 1.3);
        frontRightWheel.rotation.z = Math.PI / 2;
        frontRightWheel.castShadow = true;
        this.mesh.add(frontRightWheel);
        
        // Ön sağ jant
        const frontRightRim = new THREE.Mesh(rimGeometry, rimMaterial);
        frontRightRim.position.set(-1.1, 0.4, 1.3);
        frontRightRim.rotation.z = Math.PI / 2;
        this.mesh.add(frontRightRim);
        
        // Arka sol tekerlek
        const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        rearLeftWheel.position.set(1.1, 0.4, -1.3);
        rearLeftWheel.rotation.z = Math.PI / 2;
        rearLeftWheel.castShadow = true;
        this.mesh.add(rearLeftWheel);
        
        // Arka sol jant
        const rearLeftRim = new THREE.Mesh(rimGeometry, rimMaterial);
        rearLeftRim.position.set(1.1, 0.4, -1.3);
        rearLeftRim.rotation.z = Math.PI / 2;
        this.mesh.add(rearLeftRim);
        
        // Arka sağ tekerlek
        const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        rearRightWheel.position.set(-1.1, 0.4, -1.3);
        rearRightWheel.rotation.z = Math.PI / 2;
        rearRightWheel.castShadow = true;
        this.mesh.add(rearRightWheel);
        
        // Arka sağ jant
        const rearRightRim = new THREE.Mesh(rimGeometry, rimMaterial);
        rearRightRim.position.set(-1.1, 0.4, -1.3);
        rearRightRim.rotation.z = Math.PI / 2;
        this.mesh.add(rearRightRim);
        
        // Süspansiyon
        const suspensionGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.5);
        const suspensionMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.7
        });
        
        // Ön sol süspansiyon
        const frontLeftSuspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);
        frontLeftSuspension.position.set(0.9, 0.4, 1.3);
        this.mesh.add(frontLeftSuspension);
        
        // Ön sağ süspansiyon
        const frontRightSuspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);
        frontRightSuspension.position.set(-0.9, 0.4, 1.3);
        this.mesh.add(frontRightSuspension);
        
        // Arka sol süspansiyon
        const rearLeftSuspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);
        rearLeftSuspension.position.set(0.9, 0.4, -1.3);
        this.mesh.add(rearLeftSuspension);
        
        // Arka sağ süspansiyon
        const rearRightSuspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);
        rearRightSuspension.position.set(-0.9, 0.4, -1.3);
        this.mesh.add(rearRightSuspension);
        
        // Sahneye ekle
        this.scene.add(this.mesh);
        
        // Başlangıç pozisyonunu ayarla
        this.updatePosition();
    }
    
    update(deltaTime, otherCars = []) {
        if (this.isFinished) return;
        
        // Zaman güncelleme
        this.totalTime += deltaTime;
        this.currentLapTime += deltaTime;
        
        if (this.isPlayer) {
            this.updatePlayerControls(deltaTime);
        } else {
            this.updateAI(deltaTime, otherCars);
        }
        
        // Pozisyonu güncelle
        this.updatePosition();
        
        // Tur kontrolü
        this.checkLap();
    }
    
    updatePlayerControls(deltaTime) {
        // Hızlanma/yavaşlama
        if (this.controls.forward) {
            this.speed += this.acceleration * deltaTime * 60;
        } else if (this.controls.backward) {
            this.speed -= this.brakeDeceleration * deltaTime * 60;
        } else {
            // Sürtünme ile yavaşlama
            if (this.speed > 0) {
                this.speed -= this.deceleration * deltaTime * 60;
                if (this.speed < 0) this.speed = 0;
            } else if (this.speed < 0) {
                this.speed += this.deceleration * deltaTime * 60;
                if (this.speed > 0) this.speed = 0;
            }
        }
        
        // Maksimum hız sınırı
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        
        // Dönüş
        if (this.speed != 0) {
            const rotation = this.turnSpeed * deltaTime * 60 * (this.speed / this.maxSpeed);
            
            if (this.controls.left) {
                this.mesh.rotation.y += rotation;
            }
            if (this.controls.right) {
                this.mesh.rotation.y -= rotation;
            }
        }
        
        // Yön vektörünü güncelle
        this.direction.set(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        
        // Pist üzerindeki pozisyonu güncelle
        this.trackPosition += this.speed * deltaTime;
        if (this.trackPosition >= 1) {
            this.trackPosition -= 1;
        } else if (this.trackPosition < 0) {
            this.trackPosition += 1;
        }
    }
    
    updateAI(deltaTime, otherCars) {
        // Pist üzerindeki hedef noktayı hesapla
        const lookAhead = 0.05; // İlerideki bir noktaya bak
        let targetPosition = (this.trackPosition + lookAhead) % 1;
        
        // Hedef noktadaki pist pozisyonunu al
        const targetPoint = this.trackCurve.getPointAt(targetPosition);
        
        // Şu anki pozisyonu al
        const currentPoint = this.trackCurve.getPointAt(this.trackPosition);
        
        // Hedef noktaya yönelim
        const targetDirection = new THREE.Vector3().subVectors(targetPoint, currentPoint).normalize();
        
        // Şu anki yön ile hedef yön arasındaki açıyı hesapla
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        const dot = forward.dot(targetDirection);
        const cross = new THREE.Vector3().crossVectors(forward, targetDirection).y;
        
        // Dönüş miktarını hesapla
        this.aiSteerAmount = cross * 2;
        
        // Diğer arabalara çarpmamak için kaçınma davranışı
        this.avoidOtherCars(otherCars);
        
        // Dönüş uygula
        this.mesh.rotation.y += this.aiSteerAmount * this.turnSpeed * deltaTime * 60;
        
        // Hızlanma/yavaşlama
        // Virajlarda yavaşla
        const turnSharpness = Math.abs(this.aiSteerAmount);
        const speedFactor = 1 - turnSharpness * 0.5;
        
        const targetSpeed = this.maxSpeed * speedFactor;
        
        if (this.speed < targetSpeed) {
            this.speed += this.acceleration * deltaTime * 60;
        } else {
            this.speed -= this.deceleration * deltaTime * 60;
        }
        
        // Yön vektörünü güncelle
        this.direction.set(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        
        // Pist üzerindeki pozisyonu güncelle
        this.trackPosition += this.speed * deltaTime;
        if (this.trackPosition >= 1) {
            this.trackPosition -= 1;
        }
    }
    
    avoidOtherCars(otherCars) {
        // Diğer arabalara çarpmamak için kaçınma davranışı
        const avoidDistance = 5; // Kaçınma mesafesi
        const avoidForce = 0.5; // Kaçınma kuvveti
        
        for (const car of otherCars) {
            if (car === this) continue;
            
            const distance = this.mesh.position.distanceTo(car.mesh.position);
            
            if (distance < avoidDistance) {
                // Diğer arabaya doğru vektör
                const toOther = new THREE.Vector3().subVectors(car.mesh.position, this.mesh.position).normalize();
                
                // Sağa mı sola mı kaçınacağını belirle
                const avoidDir = Math.sign(toOther.cross(this.direction).y);
                
                // Kaçınma kuvvetini mesafeye göre ayarla
                const force = avoidForce * (1 - distance / avoidDistance) * avoidDir;
                
                // Dönüş miktarını güncelle
                this.aiSteerAmount -= force;
            }
        }
    }
    
    updatePosition() {
        if (!this.trackCurve) return;
        
        if (this.isPlayer) {
            // Oyuncu için pozisyonu yön vektörüne göre güncelle
            this.mesh.position.add(this.direction.clone().multiplyScalar(this.speed));
            
            // Pist üzerindeki en yakın noktayı bul
            this.findClosestPointOnTrack();
        } else {
            // AI için pist üzerindeki pozisyonu doğrudan kullan
            const point = this.trackCurve.getPointAt(this.trackPosition);
            
            // Rastgele offset ekle (şerit içinde kalmak için)
            const tangent = this.trackCurve.getTangentAt(this.trackPosition);
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            
            // Pist üzerindeki pozisyonu ayarla
            this.mesh.position.copy(point.clone().add(normal.clone().multiplyScalar(this.aiRandomOffset)));
            
            // Arabayı pist yönüne döndür
            if (this.speed > 0.01) {
                const lookAtPoint = this.trackCurve.getPointAt((this.trackPosition + 0.01) % 1);
                this.mesh.lookAt(lookAtPoint);
            }
        }
    }
    
    findClosestPointOnTrack() {
        // Pist üzerindeki en yakın noktayı bul
        const segments = 100;
        let closestDistance = Infinity;
        let closestPosition = this.trackPosition;
        
        for (let i = 0; i < segments; i++) {
            const t = i / segments;
            const point = this.trackCurve.getPointAt(t);
            const distance = this.mesh.position.distanceTo(point);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPosition = t;
            }
        }
        
        // Pist üzerindeki pozisyonu güncelle
        this.trackPosition = closestPosition;
    }
    
    checkLap() {
        // Tur tamamlama kontrolü
        const checkpointCount = 20;
        const currentCheckpoint = Math.floor(this.trackPosition * checkpointCount);
        
        // Başlangıç/bitiş çizgisini geçtiyse
        if (currentCheckpoint === 0 && this.lastCheckpoint === checkpointCount - 1) {
            this.lapCount++;
            
            // Tur zamanını kaydet
            if (this.currentLapTime < this.bestLapTime) {
                this.bestLapTime = this.currentLapTime;
            }
            
            this.lapTimes.push(this.currentLapTime);
            this.currentLapTime = 0;
        }
        
        this.lastCheckpoint = currentCheckpoint;
    }
    
    setControls(controls) {
        this.controls = controls;
    }
    
    reset() {
        this.speed = 0;
        this.trackPosition = this.isPlayer ? 0 : Math.random();
        this.lapCount = 0;
        this.lastCheckpoint = 0;
        this.isFinished = false;
        this.totalTime = 0;
        this.bestLapTime = Infinity;
        this.currentLapTime = 0;
        this.lapTimes = [];
        
        // Pozisyonu güncelle
        this.updatePosition();
    }
} 