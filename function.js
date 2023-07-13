function Actions(state){
    let x = Number(state.marginLeft.split('v')[0])
    let y = Number(state.marginTop.split('v')[0])
    let nth = (x/11) + ((y/11)*15)

    //left then right then bottom then top
    let fourBoxNos = [nth-1,nth+1,nth-15,nth+15]
    let possibleBoxNos = []

    fourBoxNos.forEach((boxNo,i)=>{
        if(boxNo>=0 && boxNo<=104 && allBoxes[boxNo].classList.contains('blackBox')){
            if(i==0 && x!=0){possibleBoxNos.push(boxNo)}
            else if(i==1 && x!=154){possibleBoxNos.push(boxNo)}
            else if(i!=0 && i!=1){possibleBoxNos.push(boxNo)}
        }  
    })
    return possibleBoxNos
}

function Result(no_state_needed,boxNo){
    let x = (boxNo%15)*11
    let y = Math.trunc(boxNo/15)*11
    return {marginLeft:`${x}vmin`, marginTop:`${y}vmin`}
}

function checkGoalState(state,endState){
    if(state.marginLeft==`${endState.marginLeft}` && state.marginTop==`${endState.marginTop}`){
        return true
    }
    else{
        return false
    }
}

function currentBox(marginLeft,marginTop){
    let x = Number(marginLeft.split('v')[0])
    let y = Number(marginTop.split('v')[0])
    let nth = (x/11) + ((y/11)*15)
    return nth
}

function heuristic(state){
    let x = Number(state.marginLeft.split('v')[0]) - Number(endState.marginLeft.split('v')[0])
    if(x<0){x = -x}
    let y = Number(state.marginTop.split('v')[0]) - Number(endState.marginTop.split('v')[0])
    if(y<0){y = -y}
    let manhattanDistance = ((x+y)/11) 
    return manhattanDistance
}

function g(parentNode){
    let arr = []
    let node = parentNode
    while (node.parentNode!=null){
        arr.push(node)
        node = node.parentNode
    }
    return arr.length+1
}

function showSol(actionsArr){
    return new Promise(async(resolve,reject)=>{
        for(let i=0; i<actionsArr.length; i++){
            await new Promise(resolve => setTimeout(resolve,350))
            allBoxes[actionsArr[i]].style.background = 'lightgreen'
        }

        await new Promise(resolve => setTimeout(resolve,500))
        alert(`Explored Nodes: ${explored.length}`)
        resolve()
    })
}

function showExp(){
    return new Promise(async(resolve,reject)=>{
        for(let i=0; i<explored.length; i++){
            await new Promise(resolve => setTimeout(resolve,350))
            allBoxes[currentBox(explored[i].state.marginLeft,explored[i].state.marginTop)].style.background = 'purple'
        }

        await new Promise(resolve => setTimeout(resolve,500))
        alert(`Explored Nodes: ${explored.length}`)
        resolve()
    })
}