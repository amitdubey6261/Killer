import * as THREE from 'three' ;
import Experience from "../Experience";
import Resources from '../Utils/Resources';
import { mod } from 'three/examples/jsm/nodes/Nodes.js';


class World{
    experience : Experience ;
    controller : any ; 
    scene : THREE.Scene ; 
    resources : Resources ; 
    model : any  ; 

    constructor(){
        this.experience = new Experience() ; 
        this.scene = this.experience.scene ; 
        this.resources = this.experience.resources ; 

        this.setModel() ; 
    }

    leftJoystickdata(e:any){
        this.model.rotation.y = e.angle.radian ; 
    }

    setModel(){
        this.model = this.resources.items.gun.scene ; 
        this.scene.add(this.model) ; 
    }

    update(){
    }
}

export default World ; 