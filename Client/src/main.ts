import Experience from "./Experience/Experience";
import './style.css' ;

const canvas = document.getElementById('Experience-canvas') as HTMLCanvasElement ; 
const app = document.getElementById('app') as HTMLElement ;
const request = document.getElementById('request') as HTMLHtmlElement ; 

const setEvent = () =>{
    request.addEventListener('click' , ()=>{
        if(!document.fullscreenElement){
            app.requestFullscreen().catch((e)=>{alert(e)});
        }
        else{
            document.exitFullscreen() ;
        }
    })  
}

setEvent() ; 

const experience = new Experience( canvas ) ; 
console.log(experience);
