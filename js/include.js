



    fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector(".header-wrap").innerHTML += data
        // 성공 시 이벤트 추가
        
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
            if(toggleBtn){
                const openSrc = toggleBtn.dataset.openSrc || "./img/menu-open.svg"
                const closeSrc = toggleBtn.dataset.closeSrc || "./img/menu-close.svg"
                const label = toggleBtn.dataset.label || li.querySelector(".gnb-smart-item a")?.textContent.trim() || "하위 메뉴"
                const nextSrc = open ? openSrc : closeSrc
                toggleBtn.src = nextSrc
                toggleBtn.setAttribute("src", nextSrc)
                toggleBtn.alt = `${label} 하위 메뉴 ${open ? "열림" : "닫힘"}`
            }
        }

        const resetSmartMenu = () => {
            smartMenuItems.forEach((li)=>setItemState(li,false))
        }

        const toggleItem = (targetLi) => {
            const willOpen = !targetLi.classList.contains("open")
            smartMenuItems.forEach((li)=>{
                setItemState(li, li === targetLi ? willOpen : false)
            })
        }

        smartMenuItems.forEach((li)=>{
            const header = li.querySelector(".gnb-smart-item")
            if(!header) return

            header.addEventListener("click",(event)=>{
                const linkClicked = event.target.closest("a")
                if(linkClicked){
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

        const cartLink = document.querySelector(".lnb .cart-link")
        const cartBadgeEl = cartLink?.querySelector(".cart-badge")
        let cartCount = 0
        let storageAvailable = true

        try {
            const testKey = "__cart_test__"
            sessionStorage.setItem(testKey, "1")
            sessionStorage.removeItem(testKey)
        } catch (error) {
            storageAvailable = false
        }

        if (storageAvailable) {
            const stored = Number(sessionStorage.getItem("corsairCartCount") || "0")
            if (!Number.isNaN(stored) && stored > 0) {
                cartCount = stored
            }
        }

        const renderCartBadge = () => {
            if (!cartBadgeEl) return
            if (cartCount > 0) {
                cartBadgeEl.textContent = cartCount
                cartBadgeEl.classList.add("cart-badge--visible")
            } else {
                cartBadgeEl.textContent = ""
                cartBadgeEl.classList.remove("cart-badge--visible")
            }
        }

        const syncStorage = () => {
            if (!storageAvailable) return
            try {
                sessionStorage.setItem("corsairCartCount", String(cartCount))
            } catch (error) {
                // ignore storage errors
            }
        }

        const cartAPI = {
            increment(step = 1) {
                const numericStep = Number(step)
                const safeStep = Number.isFinite(numericStep) ? numericStep : 1
                cartCount += safeStep > 0 ? safeStep : 1
                renderCartBadge()
                syncStorage()
                return cartCount
            },
            set(count) {
                cartCount = Math.max(0, Math.floor(Number(count) || 0))
                renderCartBadge()
                syncStorage()
                return cartCount
            },
            reset() {
                cartCount = 0
                renderCartBadge()
                syncStorage()
            },
            get value() {
                return cartCount
            }
        }

        renderCartBadge()

        window.cartBadge = cartAPI
        document.dispatchEvent(new CustomEvent("cartBadgeReady", { detail: cartAPI }))

        })
    .catch(error => console.log("에러 : ",error))

    



    fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector(".footer-wrap").innerHTML += data
    })
    .catch(error => console.log("에러 : ",error))