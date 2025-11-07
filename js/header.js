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

    // 모바일/태블릿 메뉴 열기/닫기
    const btnAllMenu = document.querySelector(".btn-all-menu")
    const btnClose = document.querySelector(".btn-close")
    const hiddenGnb = document.querySelector(".hidden-gnb")

    if(btnAllMenu && hiddenGnb){
        btnAllMenu.addEventListener("click",()=>{
            hiddenGnb.classList.add("on")
        })
    }

    if(btnClose && hiddenGnb){
        btnClose.addEventListener("click",()=>{
            hiddenGnb.classList.remove("on")
        })
    }
})