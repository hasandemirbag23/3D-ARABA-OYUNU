class TrackManager {
    constructor(scene) {
        this.scene = scene;
        this.tracks = [
            {
                name: 'Oval Pist',
                points: [
                    new THREE.Vector3(-120, 0, -180),
                    new THREE.Vector3(-120, 0, 120),
                    new THREE.Vector3(-90, 0, 150),
                    new THREE.Vector3(90, 0, 150),
                    new THREE.Vector3(120, 0, 120),
                    new THREE.Vector3(120, 0, -120),
                    new THREE.Vector3(90, 0, -150),
                    new THREE.Vector3(-90, 0, -150),
                    new THREE.Vector3(-120, 0, -180)
                ]
            },
            {
                name: 'Sekiz Pisti',
                points: [
                    new THREE.Vector3(0, 0, -180),
                    new THREE.Vector3(-120, 0, -60),
                    new THREE.Vector3(-120, 0, 60),
                    new THREE.Vector3(0, 0, 180),
                    new THREE.Vector3(120, 0, 60),
                    new THREE.Vector3(120, 0, -60),
                    new THREE.Vector3(0, 0, -180)
                ]
            },
            {
                name: 'Dağ Pisti',
                points: [
                    new THREE.Vector3(0, 0, -240),
                    new THREE.Vector3(-180, 3, -120),
                    new THREE.Vector3(-240, 6, 0),
                    new THREE.Vector3(-180, 3, 120),
                    new THREE.Vector3(0, 0, 180),
                    new THREE.Vector3(180, 3, 120),
                    new THREE.Vector3(240, 6, 0),
                    new THREE.Vector3(180, 3, -120),
                    new THREE.Vector3(0, 0, -240)
                ]
            },
            {
                name: 'BMW Test Pisti',
                points: [
                    new THREE.Vector3(0, 0, -240),
                    new THREE.Vector3(-60, 0, -220),
                    new THREE.Vector3(-120, 0, -180),
                    new THREE.Vector3(-180, 0, -120),
                    new THREE.Vector3(-220, 0, -60),
                    new THREE.Vector3(-240, 0, 0),
                    new THREE.Vector3(-220, 0, 60),
                    new THREE.Vector3(-180, 0, 120),
                    new THREE.Vector3(-120, 0, 180),
                    new THREE.Vector3(-60, 0, 220),
                    new THREE.Vector3(0, 0, 240),
                    new THREE.Vector3(60, 0, 220),
                    new THREE.Vector3(120, 0, 180),
                    new THREE.Vector3(180, 0, 120),
                    new THREE.Vector3(220, 0, 60),
                    new THREE.Vector3(240, 0, 0),
                    new THREE.Vector3(220, 0, -60),
                    new THREE.Vector3(180, 0, -120),
                    new THREE.Vector3(120, 0, -180),
                    new THREE.Vector3(60, 0, -220),
                    new THREE.Vector3(0, 0, -240)
                ]
            },
            {
                name: 'Nürburgring Benzeri',
                points: [
                    new THREE.Vector3(0, 0, -240),
                    new THREE.Vector3(-60, 0, -220),
                    new THREE.Vector3(-120, 0, -180),
                    new THREE.Vector3(-180, 0, -120),
                    new THREE.Vector3(-220, 0, -60),
                    new THREE.Vector3(-240, 0, 0),
                    new THREE.Vector3(-220, 0, 60),
                    new THREE.Vector3(-180, 0, 120),
                    new THREE.Vector3(-120, 0, 180),
                    new THREE.Vector3(-60, 0, 220),
                    new THREE.Vector3(0, 0, 240),
                    new THREE.Vector3(60, 0, 220),
                    new THREE.Vector3(120, 0, 180),
                    new THREE.Vector3(120, 0, 120),
                    new THREE.Vector3(60, 0, 60),
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(-60, 0, -60),
                    new THREE.Vector3(-120, 0, -120),
                    new THREE.Vector3(-60, 0, -180),
                    new THREE.Vector3(0, 0, -120),
                    new THREE.Vector3(60, 0, -60),
                    new THREE.Vector3(120, 0, 0),
                    new THREE.Vector3(180, 0, 60),
                    new THREE.Vector3(240, 0, 0),
                    new THREE.Vector3(180, 0, -60),
                    new THREE.Vector3(120, 0, -120),
                    new THREE.Vector3(60, 0, -180),
                    new THREE.Vector3(0, 0, -240)
                ]
            },
            {
                name: 'Uzun Pist',
                points: [
                    new THREE.Vector3(0, 0, -300),
                    new THREE.Vector3(-100, 0, -280),
                    new THREE.Vector3(-200, 0, -200),
                    new THREE.Vector3(-280, 0, -100),
                    new THREE.Vector3(-300, 0, 0),
                    new THREE.Vector3(-280, 0, 100),
                    new THREE.Vector3(-200, 0, 200),
                    new THREE.Vector3(-100, 0, 280),
                    new THREE.Vector3(0, 0, 300),
                    new THREE.Vector3(100, 0, 280),
                    new THREE.Vector3(200, 0, 200),
                    new THREE.Vector3(280, 0, 100),
                    new THREE.Vector3(300, 0, 0),
                    new THREE.Vector3(280, 0, -100),
                    new THREE.Vector3(200, 0, -200),
                    new THREE.Vector3(100, 0, -280),
                    new THREE.Vector3(0, 0, -300),
                    new THREE.Vector3(-50, 0, -250),
                    new THREE.Vector3(-100, 0, -200),
                    new THREE.Vector3(-150, 0, -150),
                    new THREE.Vector3(-200, 0, -100),
                    new THREE.Vector3(-250, 0, -50),
                    new THREE.Vector3(-250, 0, 50),
                    new THREE.Vector3(-200, 0, 100),
                    new THREE.Vector3(-150, 0, 150),
                    new THREE.Vector3(-100, 0, 200),
                    new THREE.Vector3(-50, 0, 250),
                    new THREE.Vector3(50, 0, 250),
                    new THREE.Vector3(100, 0, 200),
                    new THREE.Vector3(150, 0, 150),
                    new THREE.Vector3(200, 0, 100),
                    new THREE.Vector3(250, 0, 50),
                    new THREE.Vector3(250, 0, -50),
                    new THREE.Vector3(200, 0, -100),
                    new THREE.Vector3(150, 0, -150),
                    new THREE.Vector3(100, 0, -200),
                    new THREE.Vector3(50, 0, -250),
                    new THREE.Vector3(0, 0, -300)
                ]
            }
        ];
        
        this.currentTrack = null;
        this.trackMesh = null;
        this.trackCurve = null;
        this.barriers = null;
        this.decorations = null;
        this.minimap = null;
    }
    
    getTrackNames() {
        return this.tracks.map(track => track.name);
    }
    
    createTrack(index) {
        // Önceki pisti temizle
        if (this.trackMesh) {
            this.scene.remove(this.trackMesh);
        }
        
        if (this.barriers) {
            this.scene.remove(this.barriers);
        }
        
        if (this.decorations) {
            this.scene.remove(this.decorations);
        }
        
        // Zemin oluştur - daha büyük zemin
        const groundGeometry = new THREE.PlaneGeometry(800, 800);
        
        // Varsayılan zemin malzemesi
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1E8449,
            roughness: 0.8
        });
        
        // Zemin dokusu
        try {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                'textures/grass.jpg', 
                function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(100, 100);
                    texture.anisotropy = 16;
                    
                    groundMaterial.map = texture;
                    groundMaterial.needsUpdate = true;
                },
                undefined,
                function(err) {
                    console.error('Zemin dokusu yüklenemedi:', err);
                }
            );
        } catch (error) {
            console.error('Zemin dokusu yüklenirken hata oluştu:', error);
        }
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.1;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        const trackData = this.tracks[index % this.tracks.length];
        this.currentTrack = trackData;
        
        // Eğri oluştur
        this.trackCurve = new THREE.CatmullRomCurve3(trackData.points);
        this.trackCurve.closed = true;
        
        // Pist mesh'i oluştur - genişliği arttırıldı
        const trackGeometry = new THREE.TubeGeometry(this.trackCurve, 300, 5.0, 16, true);
        
        // Pist malzemesi
        const trackMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x333333,
            roughness: 0.5,
            metalness: 0.0
        });
        
        // Pist dokusu
        try {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                'textures/asphalt.jpg',
                function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(120, 1);
                    
                    trackMaterial.map = texture;
                    trackMaterial.needsUpdate = true;
                },
                undefined,
                function(err) {
                    console.error('Pist dokusu yüklenemedi:', err);
                }
            );
        } catch (error) {
            console.error('Pist dokusu yüklenirken hata oluştu:', error);
        }
        
        this.trackMesh = new THREE.Mesh(trackGeometry, trackMaterial);
        this.trackMesh.position.y = 0.0; // Pist yüksekliği düşürüldü
        this.trackMesh.receiveShadow = true;
        this.scene.add(this.trackMesh);
        
        // Yol kenarları ve dekorasyonlar
        this.createBarriers();
        this.createDecorations();
        
        // Minimap oluştur
        this.createMinimap();
        
        return this.trackCurve;
    }
    
    createBarriers() {
        // Bariyerleri temizle
        if (this.barriers) {
            this.scene.remove(this.barriers);
        }
        
        this.barriers = new THREE.Group();
        
        // Pist eğrisi üzerinde bariyerler oluştur
        const segments = 300;
        const barrierHeight = 0.5;
        const barrierWidth = 0.2;
        const barrierSpacing = 5.0; // Bariyer aralığı
        const trackWidth = 5.0; // Pist genişliği
        
        // Bariyer malzemeleri - alternatif renkler
        const barrierMaterial1 = new THREE.MeshStandardMaterial({ 
            color: 0xFF0000, // Kırmızı
            roughness: 0.5,
            metalness: 0.2
        });
        
        const barrierMaterial2 = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, // Beyaz
            roughness: 0.5,
            metalness: 0.2
        });
        
        // Pist çizgileri için malzeme
        const lineMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF,
            roughness: 0.5,
            metalness: 0.0
        });
        
        // Bariyer geometrisi
        const barrierGeometry = new THREE.BoxGeometry(barrierWidth, barrierHeight, barrierSpacing * 0.8);
        
        // Pist çizgisi geometrisi
        const lineGeometry = new THREE.BoxGeometry(0.1, 0.01, 1.0);
        
        for (let i = 0; i < segments; i++) {
            const t = i / segments;
            const point = this.trackCurve.getPointAt(t);
            const tangent = this.trackCurve.getTangentAt(t);
            
            // Normal vektör (pistin dışına doğru)
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            
            // Sağ ve sol bariyerler
            const rightOffset = trackWidth / 2 + barrierWidth / 2;
            const leftOffset = -rightOffset;
            
            // Sağ bariyer
            const rightBarrierPos = point.clone().add(normal.clone().multiplyScalar(rightOffset));
            const rightBarrier = new THREE.Mesh(
                barrierGeometry, 
                i % 2 === 0 ? barrierMaterial1 : barrierMaterial2
            );
            rightBarrier.position.copy(rightBarrierPos);
            rightBarrier.position.y = barrierHeight / 2;
            
            // Bariyeri yola paralel döndür
            rightBarrier.lookAt(rightBarrierPos.clone().add(tangent));
            
            this.barriers.add(rightBarrier);
            
            // Sol bariyer
            const leftBarrierPos = point.clone().add(normal.clone().multiplyScalar(leftOffset));
            const leftBarrier = new THREE.Mesh(
                barrierGeometry, 
                i % 2 === 0 ? barrierMaterial1 : barrierMaterial2
            );
            leftBarrier.position.copy(leftBarrierPos);
            leftBarrier.position.y = barrierHeight / 2;
            
            // Bariyeri yola paralel döndür
            leftBarrier.lookAt(leftBarrierPos.clone().add(tangent));
            
            this.barriers.add(leftBarrier);
            
            // Pist çizgileri (her 10 segmentte bir)
            if (i % 10 === 0) {
                // Orta çizgi
                const centerLine = new THREE.Mesh(lineGeometry, lineMaterial);
                centerLine.position.copy(point);
                centerLine.position.y = 0.01; // Pistin hemen üzerinde
                centerLine.lookAt(point.clone().add(tangent));
                this.barriers.add(centerLine);
                
                // Sağ şerit çizgisi
                const rightLine = new THREE.Mesh(lineGeometry, lineMaterial);
                rightLine.position.copy(point.clone().add(normal.clone().multiplyScalar(trackWidth / 4)));
                rightLine.position.y = 0.01;
                rightLine.lookAt(rightLine.position.clone().add(tangent));
                this.barriers.add(rightLine);
                
                // Sol şerit çizgisi
                const leftLine = new THREE.Mesh(lineGeometry, lineMaterial);
                leftLine.position.copy(point.clone().add(normal.clone().multiplyScalar(-trackWidth / 4)));
                leftLine.position.y = 0.01;
                leftLine.lookAt(leftLine.position.clone().add(tangent));
                this.barriers.add(leftLine);
            }
        }
        
        this.barriers.castShadow = true;
        this.barriers.receiveShadow = true;
        this.scene.add(this.barriers);
    }
    
    createDecorations() {
        // Dekorasyonları temizle
        if (this.decorations) {
            this.scene.remove(this.decorations);
        }
        
        this.decorations = new THREE.Group();
        
        // Ağaç oluştur
        const createTree = (position) => {
            const treeGroup = new THREE.Group();
            
            // Gövde
            const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 4, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x8B4513,
                roughness: 0.8
            });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.y = 2;
            trunk.castShadow = true;
            treeGroup.add(trunk);
            
            // Yapraklar
            const leavesGeometry = new THREE.ConeGeometry(3, 6, 8);
            const leavesMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x228B22,
                roughness: 0.8
            });
            const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
            leaves.position.y = 6;
            leaves.castShadow = true;
            treeGroup.add(leaves);
            
            treeGroup.position.copy(position);
            return treeGroup;
        };
        
        // Tribün oluştur
        const createStand = (position, rotation) => {
            const standGroup = new THREE.Group();
            
            // Tribün yapısı
            const standGeometry = new THREE.BoxGeometry(20, 10, 5);
            const standMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                roughness: 0.7
            });
            const stand = new THREE.Mesh(standGeometry, standMaterial);
            stand.position.y = 5;
            stand.castShadow = true;
            stand.receiveShadow = true;
            standGroup.add(stand);
            
            // Tribün çatısı
            const roofGeometry = new THREE.BoxGeometry(22, 0.5, 7);
            const roofMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xAA0000,
                roughness: 0.5
            });
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.y = 10.5;
            roof.position.z = -1;
            roof.castShadow = true;
            standGroup.add(roof);
            
            // Koltuklar
            const seatRowCount = 8;
            const seatColCount = 18;
            const seatGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
            
            const seatColors = [
                0xFF0000, // Kırmızı
                0x0000FF, // Mavi
                0xFFFF00, // Sarı
                0x00FF00  // Yeşil
            ];
            
            for (let row = 0; row < seatRowCount; row++) {
                const seatMaterial = new THREE.MeshStandardMaterial({ 
                    color: seatColors[row % seatColors.length],
                    roughness: 0.5
                });
                
                for (let col = 0; col < seatColCount; col++) {
                    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
                    seat.position.set(
                        -9 + col * 1.1,
                        1.5 + row * 1.1,
                        -2 + row * 0.5
                    );
                    standGroup.add(seat);
                }
            }
            
            standGroup.position.copy(position);
            standGroup.rotation.y = rotation;
            return standGroup;
        };
        
        // Reklam panosu oluştur
        const createBillboard = (position, rotation, text = "SPONSOR") => {
            const billboardGroup = new THREE.Group();
            
            // Pano yapısı
            const boardGeometry = new THREE.BoxGeometry(10, 3, 0.2);
            const boardMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xFFFFFF,
                roughness: 0.5
            });
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            board.position.y = 2;
            board.castShadow = true;
            billboardGroup.add(board);
            
            // Destekler
            const supportGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 8);
            const supportMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x444444,
                roughness: 0.7
            });
            
            const leftSupport = new THREE.Mesh(supportGeometry, supportMaterial);
            leftSupport.position.set(-4, 0.5, 0);
            billboardGroup.add(leftSupport);
            
            const rightSupport = new THREE.Mesh(supportGeometry, supportMaterial);
            rightSupport.position.set(4, 0.5, 0);
            billboardGroup.add(rightSupport);
            
            // Metin oluşturmak için canvas kullan
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            context.fillStyle = '#0066CC';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = 'Bold 60px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#FFFFFF';
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const textMaterial = new THREE.MeshBasicMaterial({ 
                map: texture,
                transparent: true
            });
            
            const textGeometry = new THREE.PlaneGeometry(9.8, 2.8);
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(0, 2, 0.11);
            billboardGroup.add(textMesh);
            
            billboardGroup.position.copy(position);
            billboardGroup.rotation.y = rotation;
            return billboardGroup;
        };
        
        // Pist etrafına ağaçlar ekle
        const treeCount = 100;
        const treeRadius = 200;
        
        for (let i = 0; i < treeCount; i++) {
            const angle = (i / treeCount) * Math.PI * 2;
            const radius = treeRadius + Math.random() * 50;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            // Rastgele ağaç boyutu
            const scale = 0.8 + Math.random() * 0.4;
            const tree = createTree(new THREE.Vector3(x, 0, z));
            tree.scale.set(scale, scale, scale);
            
            this.decorations.add(tree);
        }
        
        // Tribünler ekle
        const standPositions = [
            { pos: new THREE.Vector3(0, 0, -100), rot: 0 },
            { pos: new THREE.Vector3(100, 0, 0), rot: Math.PI / 2 },
            { pos: new THREE.Vector3(0, 0, 100), rot: Math.PI },
            { pos: new THREE.Vector3(-100, 0, 0), rot: -Math.PI / 2 }
        ];
        
        standPositions.forEach(standPos => {
            const stand = createStand(standPos.pos, standPos.rot);
            this.decorations.add(stand);
        });
        
        // Reklam panoları ekle
        const billboardTexts = ["RACING", "SPEED", "TURBO", "CHAMPION", "NITRO"];
        const billboardCount = 20;
        const billboardRadius = 120;
        
        for (let i = 0; i < billboardCount; i++) {
            const angle = (i / billboardCount) * Math.PI * 2;
            const radius = billboardRadius + Math.random() * 20;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const text = billboardTexts[i % billboardTexts.length];
            const billboard = createBillboard(
                new THREE.Vector3(x, 0, z),
                angle + Math.PI / 2,
                text
            );
            
            this.decorations.add(billboard);
        }
        
        this.scene.add(this.decorations);
    }
    
    createMinimap() {
        // Minimap için geometri oluştur
        const minimapGeometry = new THREE.RingGeometry(0.8, 1.0, 32);
        const minimapMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xFFFFFF,
            side: THREE.DoubleSide
        });
        
        this.minimap = new THREE.Mesh(minimapGeometry, minimapMaterial);
        this.minimap.rotation.x = -Math.PI / 2;
        this.minimap.position.y = 90; // Kameradan biraz aşağıda
        
        // Pist şeklini oluştur
        const trackShape = new THREE.Shape();
        
        // İlk noktayı al
        const firstPoint = this.trackCurve.getPointAt(0);
        trackShape.moveTo(firstPoint.x / 300, firstPoint.z / 300);
        
        // Eğri boyunca noktaları ekle
        const segments = 100;
        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const point = this.trackCurve.getPointAt(t);
            trackShape.lineTo(point.x / 300, point.z / 300);
        }
        
        const trackGeometry = new THREE.ShapeGeometry(trackShape);
        const trackMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        
        const minimapTrack = new THREE.Mesh(trackGeometry, trackMaterial);
        minimapTrack.rotation.x = -Math.PI / 2;
        minimapTrack.position.y = 90.1; // Minimap'in üzerinde
        
        this.scene.add(this.minimap);
        this.scene.add(minimapTrack);
    }
} 