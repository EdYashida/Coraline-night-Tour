const { OBJLoader } = require("three/examples/jsm/Addons.js");

function init() {
    const renderer = initRenderer();
    const scene = initScene();
    const camera = initCamera();
    const stats = initStats();


    // Cria e adiciona um plano à cena com MeshStandardMaterial


    const starNinght = new THREE.TextureLoader();
    starNinght.load('/public/source/textures/star2.png', function (texture) {
        scene.background = texture;
    });

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 700),
        new THREE.MeshStandardMaterial({ color: 0x008000 })
    );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane);

    // Cria e adiciona um cubo à cena com MeshPhongMaterial
    let cabecaPoste = new THREE.Mesh(
        new THREE.BoxGeometry(4, 1, 12),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    cabecaPoste.position.set(5, 42, 0);
    cabecaPoste.castShadow = true;
    scene.add(cabecaPoste);

    //luz do poste
    let luzPoste;
    luzPoste = new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x8B8000 })
    );
    luzPoste.position.set(5, 39, 0);
    luzPoste.castShadow = true;
    scene.add(luzPoste);

    // Cria e adiciona uma esfera à cena com MeshStandardMaterial
    let corpoPoste = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 2, 80),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    corpoPoste.position.set(5, 4, -8);
    corpoPoste.castShadow = true;
    scene.add(corpoPoste);

    //arvores

    // Grupo para a árvore
    let arvore = new THREE.Group();

    // Tronco
    let tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 50),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    tronco.position.set(0, 4, 0); // Ajustado para a posição relativa dentro do grupo
    tronco.castShadow = true;
    arvore.add(tronco);

    // Folhas (primeira camada)
    let folhas1 = new THREE.Mesh(
        new THREE.ConeGeometry(20, 15, 8),
        new THREE.MeshStandardMaterial({ color: 0x006900 })
    );
    folhas1.position.set(0, 25, 0); // Ajustado para a posição relativa dentro do grupo
    folhas1.castShadow = true;
    arvore.add(folhas1);

    // Folhas (segunda camada)
    let folhas2 = new THREE.Mesh(
        new THREE.ConeGeometry(15, 15, 8),
        new THREE.MeshStandardMaterial({ color: 0x006900 })
    );
    folhas2.position.set(0, 35, 0); // Ajustado para a posição relativa dentro do grupo
    folhas2.castShadow = true;
    arvore.add(folhas2);

    // Ajuste a posição x do grupo da árvore
    arvore.position.set(-80, 0, -120);
    scene.add(arvore);

    // Adicionar outras árvores
    let arvore2 = arvore.clone();
    arvore2.position.set(-400, 0, -20);
    scene.add(arvore2);

    let arvore3 = arvore.clone();
    arvore3.position.set(-350, 0, -40);
    scene.add(arvore3);

    let arvore4 = arvore.clone();
    arvore4.position.set(-480, 0, -50);
    scene.add(arvore4);

    //carregando texturas da coraline
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('/public/source/textures/');

    const textures = [
        textureLoader.load('__auto_4.png'),
        textureLoader.load('__auto_.png'),
        textureLoader.load('__auto_1.png'),
        textureLoader.load('__auto_2.png')
    ];

    // Criar materiais com texturas
    const materials = textures.map(texture => new THREE.MeshPhongMaterial({ map: texture }));


    let coraline;

    //carregando modelo da coraline
    const objLoader = new THREE.OBJLoader();
    objLoader.setPath('/public/source/source/');
    objLoader.load('Coraline.obj', function (object) {

        // Aplicar os materiais às partes do objeto
        coraline = object;
        coraline.traverse(function (child) {
            if (child.isMesh) {
                // Aplicar material em cada mesh
                child.material = materials.shift() || new THREE.MeshPhongMaterial();
            }
        });


        coraline.rotation.y = - Math.PI / 2; //rodar 90º pra camera
        coraline.position.set(40, 0, 24);
        coraline.scale.setScalar(10);
        coraline.castShadow = true;

        scene.add(coraline);
    });


    camera.lookAt(scene.position);

    //luz do ambiente
    let ambientLight = new THREE.AmbientLight(0x333333);  // Adiciona luz ambiente
    scene.add(ambientLight);

    //luz do poste
    let pointLight = new THREE.PointLight(0xffffff, 1);  // Adiciona luz pontual
    pointLight.position.set(2, 32, 32);
    pointLight.castShadow = true;
    scene.add(pointLight);

    document.getElementById("webgloutput").appendChild(renderer.domElement);

    const trackballControls = initTrackballControls(camera, renderer);
    const clock = new THREE.Clock();

    let objectSpeed = 0.1;
    let step = 0;
    function renderScene() {
        stats.update();
        trackballControls.update(clock.getDelta());


        step += 0.04;
        corpoPoste.position.x += 0.5;
        luzPoste.position.x += 0.5;
        cabecaPoste.position.x += 0.5;
        plane.position.x += 0.5;
        pointLight.position.x += 0.5;
        camera.position.x += 0.5;
        arvore.position.x += 0.5;
        arvore2.position.x += 0.5;
        arvore3.position.x += 0.5;
        arvore4.position.x += 0.5;

        if (corpoPoste.position.x == 110) {
            corpoPoste.position.x = 5;
            luzPoste.position.x = 5;
            cabecaPoste.position.x = 5;
            plane.position.x = 15;
            pointLight.position.x = 2;
            camera.position.x = -30;
            arvore.position.x = -80;
            arvore2.position.x = -400;
            arvore3.position.x = -350;
            arvore4.position.x = -480;
        }

        // Renderiza a cena
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    renderScene();
}

function initRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000050));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
}

function initScene() {
    let scene = new THREE.Scene();
    return scene;
}

function initCamera() {
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-30, 70, 90);
    return camera;
}

function initStats(type) {
    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();
    stats.showPanel(panelType); // 0: fps, 1: ms
    document.body.appendChild(stats.dom);
    return stats;
}

function initTrackballControls(camera, renderer) {
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.staticMoving = true;
    return trackballControls;
}
