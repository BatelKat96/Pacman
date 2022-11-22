'use strict'

const GHOST = '&#9781'
var gGhosts
var gDiedGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function stopghost() {
    clearInterval(gIntervalGhosts)
}

function createGhost(board) {
    // DONE

    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    console.log('gl', gGhosts);
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }


}

function moveGhost(ghost) {
    // console.log('ghost i:', ghost.location.i)
    // console.log('ghost j:', ghost.location.j)

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === POWERFOOD) return

    // DONE: hitting a pacman? call gameOver
    if ((nextCell === PACMAN)) {
        if (gPacman.isSuper) return
        isWin(false)
        return
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="background-color: ${color};">${GHOST}</span>`
}

function eatingGhost(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        // console.log('gGhosts[i].location :', gGhosts[i].location)
        var ghostLoction = gGhosts[i].location

        if (ghostLoction.i === pos.i && ghostLoction.j === pos.j) {
            console.log('gGhosts[i]:', gGhosts[i])
            console.log('i:', i)

            if (gGhosts[i].currCellContent === FOOD) {
                gFoodOnBoard--
                updateScore(1)
                gGhosts[i].currCellContent = EMPTY
            }

            var deadGhost = gGhosts.splice(i, 1)[0]
            console.log('ghostLoction:', ghostLoction)
            console.log('deadGhost:', deadGhost)
            // console.log('pos:', pos)

            gDiedGhosts.push(deadGhost)
        }
    }
    // console.log('gDiedGhosts:', gDiedGhosts)
    // console.log('gGhosts:', gGhosts)
}



function moveBackGhost() {
    // console.log('gDiedGhosts:', gDiedGhosts)
    // console.log('gGhosts:', gGhosts)
    for (var i = 0; i < gDiedGhosts.length; i++) {
        var currGhost = gDiedGhosts[i]
        if (currGhost.location.i === gPacman.location.i &&
            currGhost.location.j === gPacman.location.j) {
            currGhost.location.i = 2
            currGhost.location.j = 6
        }
        gGhosts.push(currGhost)
    }
    gDiedGhosts = []
}