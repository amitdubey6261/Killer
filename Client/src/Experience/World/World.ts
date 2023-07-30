import * as THREE from 'three';
import Experience from "../Experience";
import Resources from '../Utils/Resources';
import Controllers from '../Controllers';
import Time from '../Utils/Time';


class World {
    experience: Experience;
    controller: Controllers;
    scene: THREE.Scene;
    resources: Resources;
    model: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    dv: THREE.Vector3;
    time : Time ; 
    angle : number ; 

    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera.perspectiveCamera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.controller = this.experience.controllers;
        this.time = this.experience.time ; 
        this.dv = new THREE.Vector3( 0 , 0 , 0 );
        this.angle = 0 ; 

        this.setModel();
    }

    leftJoystickdata(e: any) {
        // this.model.rotation.y = e.angle.radian;
        this.angle = e.angle.radian ; 
        const directionVectorXZ = new THREE.Vector3(
            Math.cos(e.angle.radian),
            0, // Y component is 0 in XZ plane
            Math.sin(e.angle.radian),
        );
        // const directionVectorXZ = new THREE.Vector3(
        //     Math.cos(e.angle.radian),
        //     0, // Y component is 0 in XZ plane
        //     Math.sin(e.angle.radian)
        // );

        directionVectorXZ.normalize();

        this.setBullet(directionVectorXZ, e);

    }

    setBullet(dv: THREE.Vector3, e: any) {
        this.model.rotation.y = e.angle.radian ; 
        this.dv = dv ; 
    }

    setModel() {
        this.model = this.resources.items.gun.scene;
        this.scene.add(this.model);
    }

    update() {
        this.updatePlayer();
        this.animateBullet() ; 
    }

    updatePlayer() {
        const angle = this.controller.orbitControls.getAzimuthalAngle();
        if (this.controller.fwdValue != undefined) {

            if (this.controller.fwdValue > 0) {
                this.controller.tempVector.set(0, 0, -this.controller.fwdValue).applyAxisAngle(this.controller.upVector, angle);
                this.model.position.addScaledVector(this.controller.tempVector, 1);
            }

            if (this.controller.bkdValue > 0) {
                this.controller.tempVector.set(0, 0, this.controller.bkdValue).applyAxisAngle(this.controller.upVector, angle);
                this.model.position.addScaledVector(this.controller.tempVector, 1);
            }

            if (this.controller.lftValue > 0) {
                this.controller.tempVector.set(-this.controller.lftValue, 0, 0).applyAxisAngle(this.controller.upVector, angle);
                this.model.position.addScaledVector(this.controller.tempVector, 1);
            }

            if (this.controller.rgtValue > 0) {
                this.controller.tempVector.set(this.controller.rgtValue, 0, 0).applyAxisAngle(this.controller.upVector, angle);
                this.model.position.addScaledVector(this.controller.tempVector, 1);
            }

            this.model.updateMatrixWorld();

            // this.model.add(velocity.clone().multiplyScalar(deltaTime));

            this.camera.position.sub(this.controller.orbitControls.target);
            this.controller.orbitControls.target.copy(this.model.position);
            this.camera.position.add(this.model.position);

        }
    }

    animateBullet(){
        // this.model.lookAt(this.dv);
        const speed = .001 ;
        const velocity = this.dv.clone().multiplyScalar(speed).multiply(new THREE.Vector3( 1 , 0 , -1)) ; 
        this.model.position.add(velocity.clone().multiplyScalar(this.time.delta)); 

    }
}

export default World; 