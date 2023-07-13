let allBoxes = document.querySelectorAll('.box')

let startBoxNo = null
let endBoxNo = null

allBoxes.forEach((box,boxNo)=>{
    if(box.innerHTML=='S'){startBoxNo = boxNo}
    else if(box.innerHTML=='E'){endBoxNo = boxNo}
    box.innerHTML += boxNo
})

let startState = Result('no state needed',startBoxNo)
let endState = Result('no state needed',endBoxNo)

//Algorithm starts here
let state = {marginLeft:`${startState.marginLeft}`, marginTop:`${startState.marginTop}`}
let parentNode = null
let parentAction = null
let pathCost = 0
let firstNode = {state:state, parentAction:parentAction, parentNode:parentNode, pathCost:pathCost}

let frontier = []
let explored = []
let goalState = false
let frontierLen = true
let heuristicValues = []
let gValues = []
let sumValues = []
let starIndex = null

frontier.push(firstNode)

while(!goalState){
    if(!frontier.length){frontierLen = false; break}

    frontier.forEach((node)=>{
        heuristicValues.push(heuristic(node.state))
        gValues.push(node.pathCost)
    })
    for(let i=0; i<frontier.length; i++){
        let sum = heuristicValues[i] + gValues[i]
        sumValues.push(sum)
    }
    starIndex = sumValues.indexOf(Math.min(...sumValues))

    goalState = checkGoalState(frontier[starIndex].state,endState)
    if(goalState){break}

    let possibleBoxNos = Actions(frontier[starIndex].state)

    let temp = []

    possibleBoxNos.forEach((boxNo)=>{
        let state = Result('no state needed',boxNo)
        let parentAction = boxNo
        let parentNode = frontier[starIndex]
        let pathCost = g(parentNode)
        let node = {state:state, parentAction:parentAction, parentNode:parentNode, pathCost:pathCost}
        
        let alreadyDone = false
        let combinedArr = frontier.concat(explored)
        combinedArr.forEach((cnode)=>{
            if(cnode.state.marginLeft==node.state.marginLeft && cnode.state.marginTop==node.state.marginTop){
                alreadyDone = true
            }
        })
        if(!alreadyDone){
            temp.push(node)
        }    
    })
    
    explored.push(frontier[starIndex])
    frontier.splice(starIndex,1)

    temp.forEach((node)=>{
        frontier.push(node)
    })

    heuristicValues = []
    gValues = []
    sumValues = []
}

if(frontierLen){
    let cellsArr = []
    let actionsArr = []
    let State = frontier[starIndex].state
    let Node = frontier[starIndex]

    while(State != state){
        cellsArr.push(Node.state)
        actionsArr.push(Node.parentAction)
        Node = Node.parentNode
        State = Node.state
    }

    cellsArr.reverse()
    actionsArr.reverse()

    show=='S' ? showSol(actionsArr) : showExp()
}    
else{
    alert('No solution possible!')
}