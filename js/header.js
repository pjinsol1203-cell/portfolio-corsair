document.addEventListener("DOMContentLoaded",()=>{

    const headerMenuLiArray = document.querySelectorAll(".header-menu>li")
    const gnbContainer = document.querySelector("#gnb-container")
    const gnbContainerSectionArray = document.querySelectorAll("#gnb-container>section")

    headerMenuLiArray.forEach((li,index)=>{
        li.addEventListener("mouseenter",()=>{
            gnbContainer.classList.add("on")
            gnbContainerSectionArray.forEach(section=>section.classList.remove("on"))
            gnbContainerSectionArray[index].classList.add("on")
        })
    })

    gnbContainer.addEventListener("mouseleave",()=>{
        gnbContainer.classList.remove("on")
        gnbContainerSectionArray.forEach(section=>section.classList.remove("on"))
    })


})