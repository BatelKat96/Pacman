'use strict'

const WALL = '🪨'
const FOOD = '🔹'
const EMPTY = ' '
const POWERFOOD = '⭐'
const CHERRY = '🍒'


var gFoodOnBoard
var gAddCherryIntervalId


const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    gFoodOnBoard = 0
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)

    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gAddCherryIntervalId = setInterval(addCherry, 15000)
    resetHTML()
}

function resetHTML() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodOnBoard++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodOnBoard--
                // console.log('gFoodOnBoard:', gFoodOnBoard)

            } else if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = POWERFOOD
                gFoodOnBoard--
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}


function addCherry() {
    var emptyCells = getEmptyCells(gBoard)
    if (!emptyCells) return
    var pos = (chooseRandeemptyCell(emptyCells))

    // if (!pos) return
    // console.log('pos:', pos)

    //model
    gBoard[pos.i][pos.j] = CHERRY
    //dom
    renderCell(pos, CHERRY)

}

function isWin(msg) {
    console.log('Game Over')

    clearInterval(gIntervalGhosts)
    clearInterval(gAddCherryIntervalId)

    gGame.isOn = false

    var elModal = document.querySelector('.modal')
    var elMsg = elModal.querySelector('.msg')
    if (msg) {
        elMsg.innerText = 'You won!'
    } else {
        renderCell(gPacman.location, '🪦')
        elMsg.innerText = 'You lose!'

    }
    elModal.style.display = 'block'
}