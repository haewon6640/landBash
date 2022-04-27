import LandBash from "./game";

const canvas = document.getElementById('land-bash');
const start = document.getElementById('start');
let game = new LandBash(canvas);

// start.addEventListener("click",()=> {
//    game.play();
//    start.style.display = "none";
// })
game.play();

// canvas.addEventListener("")
