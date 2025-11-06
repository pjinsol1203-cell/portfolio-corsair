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

        })
    .catch(error => console.log("에러 : ",error))

    



    fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector(".footer-wrap").innerHTML += data
    })
    .catch(error => console.log("에러 : ",error))