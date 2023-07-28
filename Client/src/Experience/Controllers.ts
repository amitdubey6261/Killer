import * as THREE from 'three' ; 

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' ; 
import nipplejs from 'nipplejs';

import Experience from "./Experience";
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import { EventEmitter } from 'events';

class Controllers extends EventEmitter{
    experience : Experience ; 
    scene : THREE.Scene ; 
    canvas : HTMLCanvasElement ;
    sizes : Sizes ; 
    renderer : Renderer ; 
    camera : Camera ; 
    orbitControls : OrbitControls ; 

    constructor(){
        super();
        this.experience = new Experience() ; 
        this.scene = this.experience.scene ; 
        this.canvas = this.experience.canvas ; 
        this.camera = this.experience.camera  ; 
        this.renderer = this.experience.renderer ; 
        this.sizes = this.experience.sizes ; 

        this.createControlls() ; 
    }
    
    createControlls(){
        this.createOrbitControlls() ; 
        this.createjoyStick() ; 
    }

    createjoyStick(){
        const manager = nipplejs.create({
            zone : document.getElementById('left-joyStick') as HTMLElement ,
            color : 'red' , 
            position : {
                top : '50%' , 
                left : '50%' ,
            } ,
            mode : 'static' , 
        })

        manager.on('move' , (e:any , nipple)=>{
            this.emit('leftMove' , nipple ) ; 
        })
    }

    createOrbitControlls(){
        this.orbitControls = new OrbitControls( this.camera.perspectiveCamera , this.canvas);
        this.orbitControls.enableDamping = true ; 
        this.orbitControls.enableZoom = true ; 
        this.orbitControls.enableRotate = true ; 
    }

    update(){
        this.orbitControls.update();
    }
}

export default Controllers ; 