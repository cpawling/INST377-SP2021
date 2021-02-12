function arraysushi() {
    const iarray = []; 
    const images = document.querySelector("#imagelist"); /* UL Class not Div Class */
    iarray.forEach(Element => {
        const imagesb = document.querySelector("li");
        imagesb.append(images);
    })
    console.log(iarray);
}
arraysushi()