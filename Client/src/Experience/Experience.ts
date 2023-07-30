import * as THREE from 'three' ; 
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import AssetsArray from './Utils/Assets';

import Camera from './Camera';
import Renderer from './Renderer';
import Helper from './Helper';
import Controllers from './Controllers';

import World from './World/World';
import Environment from './World/Environment';

class Experience{
    static instance : Experience ; 
    canvas : HTMLCanvasElement ; 
    scene : THREE.Scene ;
    sizes : Sizes ; 
    time : Time ; 
    resources : Resources ; 
    env : Environment ; 

    camera : Camera ;
    renderer : Renderer ; 
    helper : Helper ; 
    controllers : Controllers ; 

    world : World ; 

    constructor(canvas?: HTMLCanvasElement ){
        if(Experience.instance){
            return Experience.instance ; 
        }
        else{
            Experience.instance = this ; 
            if(canvas){
                this.canvas = canvas ; 
            }
            this.scene = new THREE.Scene() ;
            this.sizes = new Sizes() ; 
            this.time = new Time() ;
            this.resources = new Resources(AssetsArray) ;

            this.camera = new Camera() ; 
            this.renderer = new Renderer() ;
            this.controllers = new Controllers() ;
            this.helper = new Helper() ; 

            this.sizes.on('resize' , ()=>{
                this.resize() ; 
            })

            this.controllers.on('leftMove' , (e)=>{
                this.leftJoystickdata(e) ; 
            })

            this.time.on('update' , ()=>{
                this.update() ; 
            })

            this.resources.on('ready' , ()=>{
                this.env = new Environment() ; 
                this.world = new World() ; 
            })
        }
    }

    leftJoystickdata(e:any){
        if( this.world ){
            this.world.leftJoystickdata(e);
        }
    }

    resize(){
        console.log('resize');
        if(this.camera)this.camera.resize();
        if( this.renderer ) this.renderer.resize() ; 
    }

    update(){
        this.renderer.update() ;
        if( this.controllers ) this.controllers.update() ;
        if( this.world ) this.world.update() ; 
    }
} ; 


export default Experience ; 