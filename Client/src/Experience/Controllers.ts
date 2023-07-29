import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import nipplejs from 'nipplejs';

import Experience from "./Experience";
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import { EventEmitter } from 'events';

class Controllers extends EventEmitter {
    experience: Experience;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    sizes: Sizes;
    renderer: Renderer;
    camera: Camera;
    orbitControls: OrbitControls;

    fwdValue: number;
    bkdValue: number;
    lftValue: number;
    rgtValue: number;
    tempVector: THREE.Vector3;
    upVector: THREE.Vector3;

    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.renderer = this.experience.renderer;
        this.sizes = this.experience.sizes;

        this.createControlls();
    }

    createControlls() {
        this.createOrbitControlls();
        this.createjoyStick();
    }

    createjoyStick() {
        this.tempVector = new THREE.Vector3() ; 
        this.upVector = new THREE.Vector3( 0 , 1 , 0 );

        //left joystick

        const manager = nipplejs.create({
            zone: document.getElementById('left-joyStick') as HTMLElement,
            color: 'red',
            position: {
                top: '50%',
                left: '50%',
            },
            mode: 'static',
        })

        manager.on('move', ( _ , nipple) => {
            this.emit('leftMove', nipple);
        })

        //right joy stick

        const manager2 = nipplejs.create({
            zone: document.getElementById('right-joyStick') as HTMLElement,
            color: 'red',
            position: {
                top: '50%',
                left: '50%',
            },
            mode: 'static',
        })

        manager2.on('move', (_, data)=>{
            const forward = data.vector.y
            const turn = data.vector.x

            if (forward > 0) {
                this.fwdValue = Math.abs(forward) ; 
                this.bkdValue = 0 ; 
            } else if (forward < 0) {
                this.fwdValue = 0 ; 
                this.bkdValue = Math.abs(forward) ; 
            }

            if (turn > 0) {
                this.lftValue = 0 ; 
                this.rgtValue = Math.abs(turn) ; 
            } else if (turn < 0) {
                this.lftValue = Math.abs(turn) ; 
                this.rgtValue = 0 ; 
            }
        })

        manager2.on('end', ()=>{
            this.bkdValue = 0
            this.fwdValue = 0
            this.lftValue = 0
            this.rgtValue = 0
        })

    }

    createOrbitControlls() {
        this.orbitControls = new OrbitControls(this.camera.perspectiveCamera, this.experience.canvas);
        this.orbitControls.maxDistance = 100;
        this.orbitControls.minDistance = 100;
        // this.orbitControls.maxPolarAngle = (Math.PI / 4) * 3;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minPolarAngle = 0;
        this.orbitControls.autoRotate = false;
        this.orbitControls.autoRotateSpeed = 0;
        this.orbitControls.rotateSpeed = 0.5;
        this.orbitControls.enableDamping = false;
        this.orbitControls.dampingFactor = 0.1;
        this.orbitControls.enableZoom = false;
        this.orbitControls.enablePan = false;
        // this.orbitControls.minAzimuthAngle = - Math.PI / 2; // radians
        // this.orbitControls.maxAzimuthAngle = Math.PI / 4 // radians
    }

    update() {
        this.orbitControls.update();
    }
}

export default Controllers; 