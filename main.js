// Juan Sebastian Amaya, Angel Gustavo Bastos
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Loaders
const loader = new THREE.TextureLoader();
const metalTexture = loader.load('assets/metal.jpg' ); 
const blackMetalTexture = loader.load('assets/blackmetal.jpg' ); 
const slot1 = loader.load('assets/slot1.jpg' ); 
const slot2 = loader.load('assets/slot2.jpg' ); 
const slot3 = loader.load('assets/slot3.jpg' ); 
const slot4 = loader.load('assets/slot4.jpg' );
const slot5 = loader.load('assets/slot5.jpg' ); 
const bjTableTexture = loader.load('assets/bjTable.jpg');
const chairTexture = loader.load('assets/chair.jpg');
const floorTexture = loader.load('assets/floor.jpg');
const bg = loader.load('assets/bg.jpg');
const ruletaTexture = loader.load('assets/ruleta.png');

const logo = new loader.load('assets/jplogo.jpg' ); 
const logo2 = loader.load('assets/logo2.jpg' ); 


// Partes de la máquina tragaperras
const geometry = new THREE.BoxGeometry( 15, 4.7, 2.4 ); 
const material = new THREE.MeshStandardMaterial( { map: blackMetalTexture } ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.position.set(0, 2, 2.2);

const geometry2 = new THREE.BoxGeometry( 15, 4.3, 5 ); 
const cube2 = new THREE.Mesh( geometry2, material ); 
scene.add(cube2)
cube2.position.y = 6.5;
cube2.position.z = 3.5;

const geometry4 = new THREE.BoxGeometry( 15, 8.3, 7 ); 
const cube4 = new THREE.Mesh( geometry4, material ); 
scene.add(cube4)
cube4.position.set(0, -4.5, 4.5);

const geometry3 = new THREE.CylinderGeometry( 2, 2, 2.9, 32, 1,  ); 
const material3 = new THREE.MeshStandardMaterial( {map: slot1} ); 
const cylinder = new THREE.Mesh( geometry3, material3 ); 
cylinder.rotation.z = Math.PI / 2;

const material9 = new THREE.MeshStandardMaterial( {map: slot2} ); 
const cylinder2 = new THREE.Mesh( geometry3, material9 ); 
cylinder2.rotation.z = Math.PI / 2;
cylinder2.position.set(2.9, 2, 5);

const material10 = new THREE.MeshStandardMaterial( {map: slot3} ); 
const cylinder3 = new THREE.Mesh( geometry3, material10 ); 
cylinder3.rotation.z = Math.PI / 2;
cylinder3.position.set(-2.9, 2, 5);

const material11 = new THREE.MeshStandardMaterial( {map: slot5} ); 
const cylinder4 = new THREE.Mesh( geometry3, material11 ); 
cylinder4.rotation.z = Math.PI / 2;
cylinder4.position.set(-5.9, 2, 5);

const material12 = new THREE.MeshStandardMaterial( {map: slot5} ); 
const cylinder5 = new THREE.Mesh( geometry3, material12 ); 
cylinder5.rotation.z = Math.PI / 2;
cylinder5.position.set(5.8, 2, 5);

const geometry5 = new THREE.PlaneGeometry( 10, 5 );
const material5 = new THREE.MeshStandardMaterial( {map: logo, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry5, material5 );
plane.position.set(0, -4, 8.2)
scene.add( plane );

const geometry6 = new THREE.PlaneGeometry( 12, 3 );
const material6 = new THREE.MeshStandardMaterial( {map: logo2, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( geometry6, material6 );
plane2.position.set(0, 6.5, 6.1)
scene.add( plane2 );

const geometry7 = new THREE.PlaneGeometry( 4, 2 );
const material7 = new THREE.MeshStandardMaterial( {color: 0x000000, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( geometry7, material7 );
plane3.position.set(0, -7, 8.3)
scene.add( plane3 );


// Añadir la máquina al grupo
const slotMachine = new THREE.Group();
slotMachine.add(cube, cube2, cylinder, cylinder2, cylinder3, cylinder4, cylinder5, cube4, plane, plane2, plane3);
scene.add( slotMachine);
cylinder.position.set(0, 2, 5);

slotMachine.scale.set(0.3, 0.3, 0.3);
slotMachine.position.set(0, 0, -3)
slotMachine.castShadow = true; 

// Crear luces de colores
const redLight = new THREE.PointLight(0xff0000, 1, 0, 2);
redLight.position.set(0, 10, 0);
scene.add(redLight);

const greenLight = new THREE.PointLight(0x00ff00, 1, 0, 2);
greenLight.position.set(10, 0, 0);
scene.add(greenLight);
greenLight.castShadow = true; 


const blueLight = new THREE.PointLight(0x0000ff, 1, 0, 2);
blueLight.position.set(0, -10, 0);
scene.add(blueLight);
blueLight.castShadow = true; 

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 100);
scene.add(directionalLight);

// Función para la textura de las cartas
const cardTextures = [];
for (let i = 1; i <= 13; i++) {
    const cardTexture = new THREE.TextureLoader().load(`assets/card${i}.png`);
    cardTextures.push(cardTexture);
}

// Generar las cartas en la mesa proceduralmente
function createCardsOnTable() {
    const numRows = 2; 
    const numCols = 5; 
    const cardSpacingX = 2.0; 
    const cardSpacingZ = 2.0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cardGeometry = new THREE.PlaneGeometry(1, 2);
            const cardMaterial = new THREE.MeshStandardMaterial({
                map: cardTextures[Math.floor(Math.random() * cardTextures.length)],
                side: THREE.DoubleSide,
            });
            const card = new THREE.Mesh(cardGeometry, cardMaterial);

            const xPos = col * cardSpacingX - (numCols - 1) * cardSpacingX / 2;
            const zPos = row * cardSpacingZ + 11; 
            card.position.set(xPos, -4, zPos);

            card.rotation.x = Math.PI / 2;
            card.rotation.y = Math.PI; 

            scene.add(card);
        }
    }
}

createCardsOnTable();



camera.position.z = 20;

// Función para duplicar máquinas
function createSlotMachine(x, y, z) {
    const slotMachine = new THREE.Group();
    
    // Agregar todos los componentes de la máquina
    slotMachine.add(cube.clone(), cube2.clone(), cylinder.clone(), cylinder2.clone(), cylinder3.clone(), cylinder4.clone(), cylinder5.clone(), cube4.clone(), plane.clone(), plane2.clone(), plane3.clone());
    
    // Posicionar la máquina en la ubicación deseada
    slotMachine.position.set(x, y, z);
    slotMachine.castShadow = true; 

    return slotMachine;
}


const slotMachine2 = createSlotMachine(5, 0, -3);
scene.add(slotMachine2);
slotMachine2.scale.set(0.3, 0.3, 0.3);

const slotMachine3 = createSlotMachine(21, -1, 11);
slotMachine3.rotation.y = 3.5;
scene.add(slotMachine3);
slotMachine3.scale.set(1, 1, 1);


// Mesa
const tableGeometry = new THREE.BoxGeometry( 15, 1, 6 ); 
const tableMaterial = new THREE.MeshStandardMaterial( {map: bjTableTexture} ); 
const table = new THREE.Mesh( tableGeometry, tableMaterial );
table.receiveShadow = true; 
table.position.set(0, -5.5, 10);
scene.add( table );

// Partes de la silla
const chairTopGeometry = new THREE.CylinderGeometry( 5, 4, 3, 32 ); 
const chairTopMaterial = new THREE.MeshStandardMaterial( {map: chairTexture} ); 
const chairTop = new THREE.Mesh( chairTopGeometry, chairTopMaterial );

const chairBaseGeometry = new THREE.CylinderGeometry( 1, 1, 6, 32 ); 
const chairBaseMaterial = new THREE.MeshStandardMaterial( {map: blackMetalTexture} ); 
const chairBase = new THREE.Mesh( chairBaseGeometry, chairBaseMaterial );
chairBase.position.set(0, -4, 0)

function createChair(x, y, z) {
    const chair = new THREE.Group();
    
    chair.add(chairBase.clone(), chairTop.clone());
    
    chair.position.set(x, y, z);
    
    scene.add(chair);
    return chair;
}

const chair = createChair(-0.1, -1, 2);
chair.scale.set(0.2, 0.2, 0.2);

const chair2 = createChair(5, -1, 2);
chair2.scale.set(0.2, 0.2, 0.2);

const chair3 = createChair(1, -5, 2.5);
chair3.scale.set(0.5, 0.5, 0.5);

// Ruleta

const rultageometry = new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ); 
const ruletamaterial = new THREE.MeshStandardMaterial( {map: ruletaTexture} ); 
const ruleta = new THREE.Mesh( rultageometry, ruletamaterial ); 
ruleta.rotation.x = (Math.PI/2);
ruleta.position.set(0, 18, -10)
ruleta.scale.set(2.5,2.5,2.5);
scene.add(ruleta);

// Planos de la escena
const planeBg1Geometry = new THREE.PlaneGeometry(70, 80); 
const planeBg1Material = new THREE.MeshStandardMaterial({ map: floorTexture, side: THREE.DoubleSide });
const planeBg1 = new THREE.Mesh(planeBg1Geometry, planeBg1Material);
planeBg1.rotation.x = -Math.PI / 2; 
planeBg1.position.set(0, -7, 0); 
scene.add(planeBg1);
planeBg1.receiveShadow = true; 


const planeBg2Geometry = new THREE.PlaneGeometry(190, 100); 
const planeBg2Material = new THREE.MeshBasicMaterial({ map: bg, side: THREE.DoubleSide });
const planeBg2 = new THREE.Mesh(planeBg2Geometry, planeBg2Material);
planeBg2.rotation.x = 0; 
planeBg2.rotation.y = 0; 
planeBg2.position.set(0, 20, -39); 
scene.add(planeBg2);


function animate() {
	requestAnimationFrame( animate );
    const time = Date.now() * 0.001;
    redLight.position.x = Math.sin(time) * 10;
    redLight.position.z = Math.cos(time) * 10;

    greenLight.position.y = Math.sin(time) * 10;
    greenLight.position.z = Math.cos(time) * 10;

    blueLight.position.x = Math.sin(time) * 10;
    blueLight.position.y = Math.cos(time) * 10;

    cylinder.rotation.x += 0.05 * Math.PI / 2;
    cylinder2.rotation.x += 0.05 * Math.PI / 2;
    cylinder3.rotation.x += 0.07 * Math.PI;
    cylinder4.rotation.x += 0.1 * Math.PI * 1.5;
    cylinder5.rotation.x += 0.04 * Math.PI * 0.5;

    const cylinders = slotMachine2.children.filter(child => child.type === 'Mesh' && child.geometry.type === 'CylinderGeometry');
    cylinders[0].rotation.x += 0.05 * Math.PI / 2;
    cylinders[1].rotation.x += 0.05 * Math.PI / 2;
    cylinders[2].rotation.x += 0.07 * Math.PI;
    cylinders[3].rotation.x += 0.1 * Math.PI * 1.5;
    cylinders[4].rotation.x += 0.04 * Math.PI * 0.5;
    
    chair3.rotation.y += 0.05;

    ruleta.rotation.y += 0.05;


	renderer.render( scene, camera );
}

animate();