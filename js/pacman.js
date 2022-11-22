'use strict'

const PACMAN = '👉'
var gPacman

function createPacman(board) {
    gFoodOnBoard--
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: '0'
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            eatingGhost(nextLocation)
        } else {
            isWin(false)
            return
        }
    }

    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) {
            return
        }

        gPacman.isSuper = true
        // for (var i = 0; i < gGhosts.length; i++) {
        //     var currGhost = gGhosts[i]
        //     renderCell(currGhost.location, getGhostHTML(currGhost))
        // }
        setTimeout(() => {
            gPacman.isSuper = false
            moveBackGhost()
            console.log('hi:')
        }, 7000)

    }

    if (nextCell === CHERRY) {
        updateScore(10)

    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodOnBoard--
        // console.log(gFoodOnBoard)

        if (gFoodOnBoard === 0) {
            isWin(true)
            // return
        }
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}


function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = '270'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = '0'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = '90'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = '180'
            break;
    }
    return nextLocation
}

function getPacmanHTML(deg) {

    return `<div class="pacman" style="transform:rotate(${deg}deg);">${PACMAN}</span>`

}
