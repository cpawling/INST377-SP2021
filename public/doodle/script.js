document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid') // picking up grid item //
    const doodler = document.createElement('div') // just created a new div for the doodler
    let doodlerleftspace = 50
    let startpoint = 150
    let doodlerBottomSpace = startpoint
    let isGameOver = false 
    let platformcount = 5
    let platforms = []
    let upTimerId
    let downTimerid
    let isJumping = true
    let isgoingleft = false
    let isgoingright = false
    let lefttimerid
    let righttimerid
    let score = 0

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerleftspace = platforms[0].left
        doodler.style.left = doodlerleftspace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    
    }

    class Platform {
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let i =0; i < platformcount; i++) {
            let platformGap = 600 / platformcount
            let newPlatBottom = 100 + i * platformGap 
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform) /* push into a array */
        }
    }

    function moveplatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -=4
                let visual = platform.visual
                visual.style.bottom = platform.bottom +'px'

                if (platform.bottom < 10){
                    let firstplatform =platforms[0].visual
                    firstplatform.classList.remove('platform')
                    score++
                    platforms.shift()
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerid)
        isJumping = true
        upTimerId = setInterval(function(){
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startpoint + 200) {
                fall()
            }
        },30) /* invoke every 30 miliseconds */
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerid = setInterval(function (){
            doodlerBottomSpace -=5
            doodler.style.bottom = doodlerBottomSpace +'px'
            if (doodlerBottomSpace <= 0) {
                gameover()
            }
            platforms.forEach(platform => {
                if(
                    (doodlerBottomSpace >= platform.bottom) && 
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerleftspace + 60) >=(platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startpoint = doodlerBottomSpace
                    jump()
                }
            })
        },30)
    }
    
    function gameover (){
        console.log('game over')
        isGameOver = true
        while (grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerid)
        clearInterval(lefttimerid)
        clearInterval(righttimerid)

    }

    function control(e) {
        if (e.key === 'ArrowLeft') {
            moveleft()
        }
        else if (e.key === 'ArrowRight') {
            moveright()
        }
        else if (e.key === 'Arrowup') {
            movestraight()
        }
    }

    function moveleft(){
        if (isgoingright){
            clearInterval(righttimerid)
            isgoingright = false
        }
        isgoingleft = true
        lefttimerid = setInterval(function (){
            if (doodlerleftspace >=0){
            doodlerleftspace -=5
            doodler.style.left = doodlerleftspace + 'px'
            } else moveright()
        },30)
    }

    function moveright() {
        if (isgoingleft){
            clearInterval(lefttimerid)
            isgoingleft = false
        }
        isgoingright = true
        righttimerid = setInterval(function (){
            if (doodlerleftspace <= 340){
            doodlerleftspace +=5
            doodler.style.left = doodlerleftspace + 'px'
            } else moveleft()
        },30)
    }

    function movestraight() {
        isgoingleft = false
        isgoingright = false
        clearInterval(righttimerid)
        clearInterval(lefttimerid)
    }

    function start() {
        if (isGameOver == false) {
            createPlatforms()
            createDoodler()
            setInterval(moveplatforms,30)
            jump()
            document.addEventListener('keyup', control)
        }
    }

    start()

})

