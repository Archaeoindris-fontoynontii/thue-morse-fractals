const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const shiftr = document.getElementById("shift")
const shiftout = document.getElementById("shiftout")
const shiftn = document.getElementById("shiftn")
const shiftbn = document.getElementById("shiftbn")
const maxir = document.getElementById("maxir")
const maxin = document.getElementById("maxin")
const maxiout = document.getElementById("maxiout")
const animRatr = document.getElementById("animRatr")
const animRatn = document.getElementById("animRatn")
const animRatout = document.getElementById("animRatout")
const colr = document.getElementById("colr")
const coln = document.getElementById("coln")
const colout = document.getElementById("colout")
const stepDistr = document.getElementById("stepDistr")
const stepDistn = document.getElementById("stepDistn")
const stepDistout = document.getElementById("stepDistout")
const diffb = document.getElementById("different")
const sameb = document.getElementById("same")
const safec = document.getElementById("safe")
const octant = document.getElementById("one")
const autos= document.getElementById("autos")
shiftout.textContent = shiftr.value
shiftn.value = shiftr.value
maxiout.textContent = maxir.value
maxin.value = maxir.value
animRatout.textContent = animRatr.value
animRatn.value = animRatr.value
colout.textContent = colr.value
coln.value = colr.value
stepDistn.value = stepDistr.value
stepDistout.textContent = stepDistr.value
// ctx.globalCompositeOperation = "multiply"
// ctx.shadowBlur = 10

function ThMo(n){
    let c = 0;
    while (n) {
        c += n & 1;
        n >>= 1;
    }
    return c & 1;
}

let binS = "01"
let binSNum = 4
let useS = true

function setColor(n) {
    ctx.strokeStyle = "hsl(" + (n*360) + " 100% 50% / 100%)"
    // ctx.shadowColor = "hsl(" + (n*360) + " 100% 50% / 100%)"
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

function addPrime(pri){
    let prime = pri[pri.length-1]+2
    let initlen = pri.length
    while (pri.length == initlen){
        console.log(pri)
        console.log(prime)
        let isPrime = true
        for (let im = 0; im <= pri.length; im++){
            if (prime % pri[im] == 0){
                isPrime = false
                break
            }
        }
        if (isPrime){
            pri.push(prime)
        }
        prime+=2
    }
    return pri
    }
let primearr = [2,3]


console.log(primearr)
let tl = Array.from({length:8}, () => new Turtle())
let maxT = 8
let maxi = 2**16
let animRat = 1
for (let ti = 0; ti < maxT; ti++) {
    tl[ti].left(Math.floor(ti/2)*90)
}

let diff = true
let animate = false
ctx.fillStyle = "hsl(0 0% 100% / 100%)"
ctx.fillRect(0,0,width,height)

function oneLoop(number,i) {
    if (i==0) {
        for (let ti = 0; ti < maxT; ti++) {
            tl[ti].x=width/2-width/4*(maxT==1)
            tl[ti].y=height/2+width/4*(maxT==1)
            
            tl[ti].angle=0
            tl[ti].left(180*ThMo(number-number%4)-45*(number&2)+Math.floor(ti/2)*90)
        }
        ctx.fillStyle = "hsl(0 0% 100% / 100%)"
        ctx.clearRect(0,0,width,height)
        ctx.fillRect(0,0,width,height)
        ctx.strokeStyle = "hsl(0 100% 0% / 100%)"
        ctx.strokeText(number, 10, 10)
    }
    if (autos.checked){
        setColor(i/2**(Math.floor(Math.log2(number))))
    }else{
        setColor(i/2**parseInt(colr.value))
    }
    for (let ti = 0; ti < maxT; ti++) {
        if (autos.checked){
            tl[ti].forward(parseInt(stepDistr.value)*64/Math.sqrt(number))
        } else {
            tl[ti].forward(parseInt(stepDistr.value))
        }
        if (diff){
            tl[ti].right((((ti&1))^(!!(number&2))?-1:1)*90*(Math.abs(ThMo(i)-ThMo(i+number))))
        } else{
            tl[ti].right(((-1)**(ti%2))*90*(1-Math.abs(ThMo(i)-ThMo(i+number))))
        }
    }
}

function updateShift(val,changeBin=true){
    useS=false
    shiftr.value=val
    shiftout.textContent=shiftr.value
    shiftn.value=val
    if (changeBin){
        shiftbn.value = parseInt(val).toString(2)
    }
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
function updateStepDistr(val){
    stepDistr.value = val
    stepDistout.textContent= stepDistr.value
    stepDistn.value = val
}
function updateSafety(){
    if (safec.checked){
        if (diffb.checked){
            let val = parseInt(shiftr.value)
            val-=val%2
            val++
            shiftr.step=2
            shiftr.value=val
            updateShift(shiftr.value)
        } else {
            let val = parseInt(shiftr.value)
            val-=val%4
            val+=1
            shiftr.step=4
            updateShift(shiftr.value)
        
        }
    }
    else {
        shiftr.step=1
    }
}
shiftr.addEventListener("input", ()=>updateShift(shiftr.value))
shiftn.addEventListener("input",()=>updateShift(shiftn.value))
shiftbn.addEventListener("input",() => {
    shiftbn.value = shiftbn.value.replace(/[^01]/g, '')
    updateShift(parseInt(shiftbn.value,2),false)
})
maxir.addEventListener("input",()=>updateMaxir(maxir.value))
maxin.addEventListener("input",()=>updateMaxir(maxin.value))
animRatr.addEventListener("input",()=>updateAnimRatr(animRatr.value))
animRatn.addEventListener("input",()=>updateAnimRatr(animRatn.value))
colr.addEventListener("input",()=>updateColr(colr.value))
coln.addEventListener("input",()=>updateColr(coln.value))
stepDistr.addEventListener("input",()=>updateStepDistr(stepDistr.value))
stepDistn.addEventListener("input",()=>updateStepDistr(stepDistn.value))
safec.addEventListener("input", updateSafety)
diffb.addEventListener("input", updateSafety)
sameb.addEventListener("input", updateSafety)

let number = 1;
let i = 0;
function anim(){
    //     for (let _ = 0; _ < maxi/2**7; _++) {
    //         if (i>maxi){
    //             i=0
    //             number+=2
    //         }
    //         oneLoop(number,i)
    //         i++
    // }
    let anim_num = 0
    while (anim_num < Math.min(maxi,2**animRatr.value)) {
        if (i>maxi || i+number>2**25){
            // if (i>=2**20){
            //     return
            // }
            i=0
            if (animate) {
                addPrime(primearr)
                number = primearr[primearr.length-1]
            }
            else {
                number=parseInt(shiftr.value)
                diff=diffb.checked
                maxT=octant.checked?1:8
            }
            
            maxi=2**parseInt(maxir.value)
            anim_num=0
        }
        oneLoop(number,i)
        if (i==0){
            ctx.strokeStyle = "hsl(0 100% 0% / 100%)"
            ctx.strokeText((number).toString(2), 10, 20)
        }
        i++
        anim_num++
    }
}

setInterval(anim, 30)