import * as THREE from 'three' ;
import Experience from "../Experience";
import Resources from '../Utils/Resources';
import Controllers from '../Controllers';


class World{
    experience : Experience ;
    controller : Controllers ; 
    scene : THREE.Scene ; 
    resources : Resources ; 
    model : THREE.Scene  ; 
    camera : THREE.PerspectiveCamera ; 

    constructor(){
       this.experience = new Experience() ; 
       this.camera = this.experience.camera.perspectiveCamera ; 
        this.scene = this.experience.scene ; 
        this.resources = this.experience.resources ; 
        this.controller = this.experience.controllers ; 

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
        this.updatePlayer();
    }

    updatePlayer(){
        const angle = this.controller.orbitControls.getAzimuthalAngle() ; 
        if(this.controller.fwdValue != undefined ){

            if( this.controller.fwdValue > 0 ){
                this.controller.tempVector.set( 0 , 0 , -this.controller.fwdValue ).applyAxisAngle(this.controller.upVector , angle ) ; 
                this.model.position.addScaledVector(this.controller.tempVector , 1);
            }

            if( this.controller.bkdValue > 0 ){
                this.controller.tempVector.set( 0 , 0 , this.controller.bkdValue ).applyAxisAngle(this.controller.upVector , angle) ;
                this.model.position.addScaledVector(this.controller.tempVector , 1 );  
            }

            if( this.controller.lftValue > 0 ){
                this.controller.tempVector.set( -this.controller.lftValue , 0 , 0 ).applyAxisAngle(this.controller.upVector , angle) ;
                this.model.position.addScaledVector(this.controller.tempVector , 1 );  
            }

            if( this.controller.rgtValue > 0 ){
                this.controller.tempVector.set( this.controller.rgtValue , 0 , 0 ).applyAxisAngle(this.controller.upVector , angle) ;
                this.model.position.addScaledVector(this.controller.tempVector , 1 );  
            }

            this.model.updateMatrixWorld() ; 

            this.camera.position.sub(this.controller.orbitControls.target); 
            this.controller.orbitControls.target.copy(this.model.position);
            this.camera.position.add(this.model.position);

        } 
    }
}

export default World ; 