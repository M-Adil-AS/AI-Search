let allBoxes = document.querySelectorAll('.box')

let startBoxNo = null
let endBoxNo = null

allBoxes.forEach((box,boxNo)=>{
    if(box.innerHTML=='I'){startBoxNo = boxNo}
    else if(box.innerHTML=='G'){endBoxNo = boxNo}
    //box.innerHTML += boxNo
})

let startState = Result('no state needed',startBoxNo)
let endState = Result('no state needed',endBoxNo)

//Algorithm starts here
let state = {marginLeft:`${startState.marginLeft}`, marginTop:`${startState.marginTop}`}
let parentNode = null
let parentAction = null
let firstNode = {state:state, parentAction:parentAction, parentNode:parentNode}

let frontier = []
let explored = []
let goalState = false
let frontierLen = true

frontier.push(firstNode)

while(!goalState){
    if(!frontier.length){frontierLen = false; break}

    goalState = checkGoalState(frontier[0].state,endState)
    if(goalState){break}

    let possibleBoxNos = Actions(frontier[0].state)

    let temp = []

    possibleBoxNos.forEach((boxNo)=>{
        let state = Result('no state needed',boxNo)
        let parentAction = boxNo
        let parentNode = frontier[0]
        let node = {state:state, parentAction:parentAction, parentNode:parentNode}
        
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

    explored.push(frontier[0])
    frontier = frontier.slice(1)

    temp.forEach((node)=>{
        frontier.push(node)
    })
}

if(frontierLen){
    let cellsArr = []
    let actionsArr = []
    let State = frontier[0].state
    let Node = frontier[0]

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