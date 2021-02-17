document.addEventListener('DOMContentLoaded',()) =>{
    const grid = document.querySelector(.grid) // picking up grid item //
    const doodler = document.createElement('div') // just created a new div for the doodler

function createDoodler() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodler.style.left = doodlerleftspace + 'px'

}


createDoodler()

//STOPED AT 10 MIN IN VIDEO//