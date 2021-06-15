const dirty = "DIRTY"
const clean = "CLEAN"
const right = "RIGHT"
const left = "LEFT"
const a = "A"
const b = "B"
let visitedStateArray = [false, false, false, false, false, false, false, false]
//********************      s0,    s1,    s2,    s3,    s4,    s5,    s6,    s7*/

function reflex_agent(location, state, otherState){
    let myRandomInt = getRandomInt()
    if(location == a){
        if(state == dirty && otherState == dirty) return myRandomInt == 0 ? right : clean   //
        if(state == dirty && otherState == clean) return myRandomInt == 0 ? clean : right   //
        if(state == clean && otherState == dirty) return myRandomInt == 0 ? dirty : right   //
        if(state == clean && otherState == clean) return myRandomInt == 0 ? dirty : right   //
    }else{
        if(state == dirty && otherState == dirty) return myRandomInt == 0 ? left : clean    //
        if(state == dirty && otherState == clean) return myRandomInt == 0 ? left : dirty    //
        if(state == clean && otherState == dirty) return myRandomInt == 0 ? clean : left    //
        if(state == clean && otherState == clean) return myRandomInt == 0 ? left : dirty    //
    }
}

function test(states){
    let location = states[0];		
    let state = location == a ? states[1] : states[2];
    let otherState = location == a ? states[2] : states[1]
    let action = location == a ? reflex_agent(location, state, otherState) : reflex_agent(location, otherState, state);

    let siguienteEstado = ""
    let visited = getActualState(location, states[1], states[2])

    if(action == clean){
        siguienteEstado = (location == a ? (states[2] == dirty ? 2 : 3) : (states[1] == dirty ? 5 : 7))
        states[location == a ? 1 : 2] = clean
    }else if(action == dirty){
        siguienteEstado = (location == a ? (states[2] == dirty ? 0 : 1) : (states[1] == dirty ? 4 : 6))
        states[location == a ? 1 : 2] = dirty
    }else{
        siguienteEstado = (action == right ? (
            (state == dirty ? (states[2] == dirty ? 4 : 5) : (states[2] == dirty ? 6 : 7))
        ) : (siguienteEstado = (state == dirty ? (states[1] == dirty ? 0 : 2) : (states[1] == dirty ? 1 : 3))))
        states[0] = action == right ? b : a
    }
    console.log(visitedStateArray)
    if(visitedStateArray.filter(x => !x).length > 0){//mientras encuentre un estado en falso del arreglo va a seguir iterando
        document.getElementById("log").innerHTML+="<br>Estado Actual: ".concat(visited).concat(" ||||||||||||| Siguiente Estado: ").concat(siguienteEstado);
        visitedStateArray[visited] = true
        setTimeout(function(){ test(states); }, 2000);
    }else{
        document.getElementById("log").innerHTML+="<br><h2>VISITO 8 ESTADOS</h2>"
    }
}

function getRandomInt() {// obtener cero o uno en entero
    return Math.floor(Math.random() * (2));
}

function getActualState(location, s1, s2){
    return ((location == a) ? (
        ((s1 == dirty ? (s2 == dirty ? 0 : 1) : (s2 == dirty ? 2 : 3))) // locacion a
    ) : ((((s1 == dirty) ? (s2 == dirty ? 4 : 5) : (s2 == dirty ? 6 : 7)))))// locacion b
}

var states = [a, dirty, dirty];
test(states);
