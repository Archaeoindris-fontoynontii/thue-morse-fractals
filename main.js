const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const shiftr = document.getElementById("shift")
const shiftout = document.getElementById("shiftout")
const shiftn = document.getElementById("shiftn")
const maxir = document.getElementById("maxir")
const maxin = document.getElementById("maxin")
const maxiout = document.getElementById("maxiout")
const animRatr = document.getElementById("animRatr")
const animRatn = document.getElementById("animRatn")
const animRatout = document.getElementById("animRatout")
const colr = document.getElementById("colr")
const coln = document.getElementById("coln")
const colout = document.getElementById("colout")
shiftout.textContent = shiftr.value
maxiout.textContent = maxir.value
animRatout.textContent = animRatr.value
colout.textContent = colr.value

function ThueMorse(n) {
    if (n == 0) {
        return [0]
    } else {
        const prev = ThueMorse(n-1)
        return prev.concat(prev.map(x => 1-x))
    }
}

console.log("stri not yet created")
const stri = ThueMorse(20)
console.log("stri created")
function setColor(n) {
    ctx.strokeStyle = "hsl(" + (n*360) + " 100% 50% / 100%)"
}

const width = canvas.width
const height = canvas.height
class Turtle {
    constructor(x=width/2, y=height/2, angle=0) {
        this.x = x
        this.y = y
        this.angle = angle
    }
    forward(distance) {
        const x1 = this.x + distance * Math.cos(this.angle)
        const y1 = this.y + distance * Math.sin(this.angle)
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(x1, y1)
        ctx.stroke()
        this.x = x1
        this.y = y1
    }
    left(angle) {
        this.angle += angle * Math.PI / 180
    }
    right(angle) {
        this.angle -= angle * Math.PI / 180
    }
}

var tl = [new Turtle(), new Turtle(), new Turtle(), new Turtle(), new Turtle(), new Turtle(), new Turtle(), new Turtle()]
const maxT = 8
var maxi = 2**16
var animRat = 1
for (var ti = 0; ti < maxT; ti++) {
    tl[ti].left(Math.floor(ti/2)*90)
}


ctx.fillStyle = "hsl(0 0% 100% / 100%)"
ctx.fillRect(0,0,width,height)

function oneLoop(number,i) {
    if (i==0) {
        for (var ti = 0; ti < maxT; ti++) {
            tl[ti].x=width/2
            tl[ti].y=height/2
            tl[ti].angle=0
            tl[ti].left(Math.floor(ti/2)*90)
        }
        ctx.fillStyle = "hsl(0 0% 100% / 100%)"
        ctx.clearRect(0,0,width,height)
        ctx.fillRect(0,0,width,height)
        ctx.strokeStyle = "hsl(0 100% 0% / 100%)"
        ctx.strokeText(number, 10, 10)

    }
    setColor(i/2**parseInt(colr.value))
    for (var ti = 0; ti < maxT; ti++) {
        tl[ti].forward(2)
        tl[ti].right(((-1)**(ti%2))*90*(Math.abs(stri[i]-stri[i+number])))
    }

}
function updateShift(val){
    shiftr.value=val
    shiftout.textContent=shiftr.value
    shiftn.value=val

}
function updateMaxir(val){
    maxir.value=val
    maxiout.textContent=maxir.value
    maxin.value=val
}
function updateAnimRatr(val){
    animRatr.value = val
    animRatout.textContent= animRatr.value
    animRatn.value = val
}
function updateColr(val){
    colr.value = val
    colout.textContent= colr.value
    coln.value = val
}
shiftr.addEventListener("input", ()=>updateShift(shiftr.value))
shiftn.addEventListener("input",()=>updateShift(shiftn.value))
maxir.addEventListener("input",()=>updateMaxir(maxir.value))
maxin.addEventListener("input",()=>updateMaxir(maxin.value))
animRatr.addEventListener("input",()=>updateAnimRatr(animRatr.value))
animRatn.addEventListener("input",()=>updateAnimRatr(animRatn.value))
colr.addEventListener("input",()=>updateColr(colr.value))
coln.addEventListener("input",()=>updateColr(coln.value))
function anim(number,i){

    //     for (var _ = 0; _ < maxi/2**7; _++) {
    //         if (i>maxi){
    //             i=0
    //             number+=2
    //         }
    //         oneLoop(number,i)
    //         i++
    // }
    var anim_num = 0
    while (anim_num < Math.min(maxi,2**animRatr.value)) {
        if (i>maxi){
            i=0
            number=parseInt(shiftr.value)
            maxi=2**parseInt(maxir.value)
            anim_num=0
        }
        oneLoop(number,i)
        if (i==0){
            ctx.strokeStyle = "hsl(0 100% 0% / 100%)"
            ctx.strokeText((number>>>0).toString(2), 10, 20)
        }
        i++
        anim_num++
    }
    
    setTimeout(() => anim(number,i),30)
    
}
setTimeout(() => anim(1,0),1)