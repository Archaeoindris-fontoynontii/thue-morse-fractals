console.log("Hello World!")
const canvas = document.querySelector("canvas")
console.log(canvas)
const ctx = canvas.getContext("2d")
const shift = document.getElementById("shift")
const shiftout = document.getElementById("shiftout")
shiftout.textContent = shift.value
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
const maxi = 2**18
for (var ti = 0; ti < maxT; ti++) {
    tl[ti].left(Math.floor(ti/2)*90)
}


ctx.fillStyle = "hsl(0 0% 0% / 100%)"
ctx.fillRect(0,0,width,height)

function oneLoop(number,i) {
    if (i==0) {
        for (var ti = 0; ti < maxT; ti++) {
            tl[ti].x=width/2
            tl[ti].y=height/2
            tl[ti].angle=0
            tl[ti].left(Math.floor(ti/2)*90)
        }
        ctx.fillStyle = "hsl(0 0% 0% / 100%)"
        ctx.clearRect(0,0,width,height)
        ctx.fillRect(0,0,width,height)
        ctx.strokeStyle = "hsl(0 100% 100% / 100%)"
        ctx.strokeText(number, 10, 10)

    }
    setColor(i/2**13)
    for (var ti = 0; ti < maxT; ti++) {
        tl[ti].forward(2)
        tl[ti].right(((-1)**(ti%2))*90*(Math.abs(stri[i]-stri[i+number])))
    }

}
shift.addEventListener("input", ()=>shiftout.textContent=shift.value)

function anim(number,i){
    console.log(shift.value)
    // if (number!=shift.nodeValue()) {
    //     number = shift.nodeValue()
    //     for (var _ = 0; _ < maxi; _++) {
    //         if (i>maxi){
    //             i=0
    //             number+=2
    //         }
    //         oneLoop(number,i)
    //         i++
    // }
    // }
    
    for (var _ = 0; _ < maxi; _++) {
        if (i>maxi){
            i=0
            number=parseInt(shift.value)
        }
        oneLoop(number,i)
        i++
    }
    
    ctx.strokeStyle = "hsl(0 100% 100% / 100%)"
    ctx.strokeText((number>>>0).toString(2), 10, 20)
    setTimeout(() => anim(number,i),0)
    
}
setTimeout(() => anim(8125,0),1)