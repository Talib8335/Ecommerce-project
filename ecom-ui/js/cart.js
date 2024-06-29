window.onload = async ()=>{
    const session = await checkAuth()

    if(!session) 
        return window.location.href = "/"

    if(session.role === "admin")
        return window.location.href = "/"

    // Do after login success
    showCart()
}

const showCart = async ()=>{
    try {
        const token = localStorage.getItem("auth")
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.get('/cart',options)
        const cartContainer = document.getElementById("cart-container")
        let loopIndex = 0
        for(let cart of data)
        {
            const dynamicId = `cart-box-${loopIndex}`

            const ui = `
                <div class="flex gap-6 bg-white border rounded-md p-4" id="${dynamicId}">
                        <img src="${server}/${cart.product.thumbnail}" class="w-[100px]" />
                        <div class="flex-grow">
                            <h1 class="text-lg font-semibold capitalize">${cart.product.title}</h1>
                            <p class="text-gray-600 text-sm">${cart.product.description}</p>
                            <div class="mt-4 flex gap-4 items-center">
                                <h1 class="font-semibold text-lg">₹${cart.product.price-(cart.product.price*cart.product.discount)/100}</h1>
                                <div class="flex gap-2">
                                    <del>₹${cart.product.price}</del>
                                    <p>${cart.product.discount}% Off</p>
                                </div>
                                <div class="flex items-center">
                                    <button class="border border-r-0 border-gray-300 w-[34px] h-[34px] flex items-center justify-center">-</button>
                                    <button class="border border-r-0 border-gray-300 w-[34px] h-[34px] flex items-center justify-center">4</button>
                                    <button class="border border-gray-300 w-[34px] h-[34px] flex items-center justify-center">-</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="bg-green-500 text-white w-[150px] py-3 rounded mb-4">
                                <i class="ri-shopping-cart-line mr-1"></i>
                                Buy Now
                            </button>
    
                            <button class="bg-rose-500 text-white w-[150px] py-3 rounded" onclick="removeCart('${cart._id}', '${dynamicId}')">
                                <i class="ri-delete-bin-6-line mr-1"></i>
                                Remove
                            </button>
                        </div>
                    </div>
            `
            cartContainer.innerHTML += ui
            loopIndex = loopIndex+1
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

const removeCart = async (id, cartBoxId)=>{
    try {
        const token = localStorage.getItem("auth")
        const options = {
           headers:  {
            Authorization: `Bearer ${token}`
           }
        }
        await axios.delete(`/cart/${id}`, options)
        const cartBox = document.getElementById(cartBoxId)
        cartBox.remove()
    }
    catch(err)
    {
        console.log(err)
    }
}