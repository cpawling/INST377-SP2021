document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gamedisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdleft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startgame() {
        birdBottom -= gravity // negative gravity each time 
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdleft + 'px'
    }
    let gamestarttimerID = setInterval(startgame,20)

    function control(e) {
        if (e.keyCode === 32) {
            jump() // if you push the spacebar you jump, keycode lets you put to a key, 32 is spacebar code
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log (birdBottom)
    }

    document.addEventListener('keyup', control)

    function generateObstacles() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const top0obstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            top0obstacle.classList.add('top0obstacle')
        }
        gamedisplay.appendChild(obstacle)
        gamedisplay.appendChild(top0obstacle) // putting div into game container
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        top0obstacle.style.left = obstacleLeft + 'px'
        top0obstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            top0obstacle.style.left = obstacleLeft + 'px'
            obstacle.style.left = obstacleLeft + 'px' // lets obstacle move

            if (obstacleLeft === -60) {
                clearInterval(timerID)
                gamedisplay.removeChild(obstacle) // lets it be despawned
                gamedisplay.removeChild(top0obstacle) 
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdleft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerID) // trigger game over if true 
            }
        }
        let timerID = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacles, 3000) // spawns multiple obstacles
        
    }
    generateObstacles()

    function gameOver() {
        clearInterval(gamestarttimerID)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

    })