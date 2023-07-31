import Experience from "../Experience";

class Bullet {
    experience : Experience ; 
    owner_name: string;
    bullet_speed: number;
    bullet_position: number;
    bullet_frequency: number;
    bullet_damage: number; // how much damage
    bullet_gun: string;
    position: THREE.Vector3;

    constructor(name: string, _speed: number, _frequency: number, _damage: number, gun: string, _position : THREE.Vector3 ) {
        this.experience = new Experience(); 
        this.owner_name = name;
        this.bullet_speed = _speed;
        this.bullet_frequency = _frequency;
        this.bullet_damage = _damage;
        this.bullet_gun = gun;
        this.position = _position ; 
    }
}

export default Bullet; 