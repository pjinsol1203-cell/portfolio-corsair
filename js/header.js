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

    const smartMenuItems = document.querySelectorAll(".gnb-smart > li")

    const setItemState = (li, open) => {
        li.classList.toggle("open", open)
        const toggleBtn = li.querySelector(".toggle-menu")
        const label = toggleBtn?.dataset.label || li.querySelector(".gnb-smart-item a")?.textContent.trim() || "하위 메뉴"
        const openSrc = toggleBtn?.dataset.openSrc || "./img/menu-open.svg"
        const closeSrc = toggleBtn?.dataset.closeSrc || "./img/menu-close.svg"

        if(toggleBtn){
            const nextSrc = open ? openSrc : closeSrc
            toggleBtn.src = nextSrc
            toggleBtn.setAttribute("src", nextSrc)
            toggleBtn.alt = `${label} 하위 메뉴 ${open ? "열림" : "닫힘"}`
        }
    }

    const toggleItem = (li) => {
        const open = !li.classList.contains("open")

        smartMenuItems.forEach((item)=>{
            setItemState(item, item === li ? open : false)
        })
    }

    const resetSmartMenu = () => {
        smartMenuItems.forEach((item)=>setItemState(item,false))
    }

    smartMenuItems.forEach((li)=>{
        const header = li.querySelector(".gnb-smart-item")
        if(!header) return

        header.addEventListener("click",(event)=>{
            if(event.target.closest("a")){
                event.preventDefault()
            }
            event.stopPropagation()
            toggleItem(li)
        })
    })

    const categoryLinks = document.querySelectorAll(".slide-track a[data-category]")
    const smartContents = document.querySelectorAll(".gnb-smart-content")

    categoryLinks.forEach((link)=>{
        link.addEventListener("click",(event)=>{
            event.preventDefault()
            const category = link.dataset.category
            if(!category) return

            const targetContent = Array.from(smartContents).find((content)=>content.dataset.category === category)
            if(!targetContent) return

            categoryLinks.forEach((other)=>other.classList.remove("active"))
            link.classList.add("active")

            smartContents.forEach((content)=>{
                const match = content === targetContent
                content.classList.toggle("on", match)
            })

            resetSmartMenu()
        })
    })
})