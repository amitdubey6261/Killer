import * as THREE from 'three' ; 
import Experience from '../Experience';

class Environment{
    experience : Experience ; 
    scene : THREE.Scene ; 
    
    constructor(){
        this.experience = new Experience() ;
        this.scene = this.experience.scene ; 

        this.addLIGHT() ; 
    }

    addLIGHT(){
        const l = new THREE.AmbientLight( new THREE.Color('0xff0000') , 10 );
        this.scene.add(l);
    }
} ; 

export default Environment ; 