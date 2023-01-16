const topp = document.getElementById('top')
const bot = document.getElementById('bottom')

const clear = document.getElementById('clear')
const del = document.getElementById('delete')

clear.addEventListener("click", clearScreen)
del.addEventListener("click", deleteDigit)

const btns = document.getElementById('digits').children

for (const button of btns){
    button.addEventListener("click",log)
}

numbers = []
newInp = false
operator = ""
eq = false

function log(e){
    
    if(newInp){
        bot.innerHTML = ""
    }
    input = e.target.innerHTML
    
    wholeInput = bot.innerHTML
    if(!isNaN(input) || (input === "." && (wholeInput.split(".").length - 1 < 1))){
        bot.innerHTML += e.target.innerHTML
        newInp = false
    }else if(input !== "." && wholeInput.length > 0 && !newInp){
        if(input === "=" && eq){
            return
        }
        numbers[numbers.length] = parseFloat(wholeInput)
        if(numbers.length === 2){
            
            a = numbers[0]
            b = numbers[1]
            res = solve(a,b,operator)
            
            numbers =[]
            topp.innerHTML = res+" "+operator
            bot.innerHTML = res
            newInp = true
            eq = false
            if(input === "="){
                topp.innerHTML = a + " " + operator + " " + b + " ="
                if(res === "You stupid"){
                    newInp = true
                }else{
                    newInp = false
                }
                eq = true
            }
            operator = input
        }else{
            eq = false
            topp.innerHTML = wholeInput+" "+input
            newInp = true
            operator = input
        }
    }
    
}

function solve(x,y,op){
    if(op === "x"){
        return a*b
    }else if(op === "-"){
        return a-b
    }else if(op === "/"){
        if(b === 0){
            return "You stupid"
        }
        return (a/b).toFixed(3);
    }else if(op === "+"){
        return a+b
    }
}

function clearScreen(){
    topp.innerHTML =""
    bot.innerHTML=""
    newInp = false
    operator = ""
    eq = false
    numbers = []
}

function deleteDigit(){
    str = bot.innerHTML
    bot.innerHTML = str.slice(0, -1); 
}