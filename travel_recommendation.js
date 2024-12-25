let searchInput = document.getElementById("searchInput")
let clearBtn = document.getElementById("clearBtn")
let searchBtn = document.getElementById("searchBtn")
let result = document.getElementById("result")

const clearBt = ()=>{
    searchInput.value = ""
    clearResult()
}
clearBtn.addEventListener("click", clearBt)

const clearResult = ()=>{
    result.innerHTML = ""
}
const showresult = (city)=>{
    result.innerHTML += `<div class="resCard">
    <img src=${city.imageUrl} alt="">
    <h3>${city.name}</h3>
    <p>${city.description}</p>
    <button>View</button>
    </div>`
} 

fetch("travel_recommendation_api.json")
.then(res => res.json())
.then(data => {
    const search = ()=>{
        clearResult()
        data.countries.map(country=>{
            country.cities.map(city=>{
                if(city.name.toLowerCase().includes(searchInput.value.toLowerCase())){
                    showresult(city)
                }
            })
        })
        data.temples.map(temple=>{
            if(temple.name.toLowerCase().includes(searchInput.value.toLowerCase())){
                showresult(temple)
            }
        })
        data.beaches.map(beach=>{
            if(beach.name.toLowerCase().includes(searchInput.value.toLowerCase())){
                showresult(beach)
            }
        })
        if("beaches".includes(searchInput.value.toLowerCase())){
            data.beaches.map(beach=>{
                showresult(beach)
            })
        }
        if("temples".includes(searchInput.value.toLowerCase())){
            data.temples.map(temple=>{
                showresult(temple)
            })
        }
        if("countries".includes(searchInput.value.toLowerCase())){
            data.countries.map(country=>{
                country.cities.map(city=>{
                    showresult(city)
                })
            })
        }
    } 
    
    searchBtn.addEventListener('click', search)
})
