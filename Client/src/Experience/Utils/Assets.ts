export interface AssetT{
    name : string ; 
    type : string ; 
    path : string ; 
}

const AssetsArray : AssetT[] = [
    {
        name : "gun" , 
        type : "glbmodel",
        path : "/Models/gun.glb" , 
    }
    ,
]

export default AssetsArray ; 