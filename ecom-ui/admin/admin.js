let quill = null
let filename = null
let token = null
axios.defaults.baseURL = server

window.onload = async ()=>{
    const session = await checkAuth()
    
    if(!session)
        return location.href = "/"

    if(session.role !== "admin")
        return location.href = "/"

    token = localStorage.getItem("auth")

    quill = new Quill('#editor', {
        theme: 'snow'
    });

    await fetchProducts()

    await fetchPayments()

    await fetchOrder()

    await fetchUsers()
}

const onTap = (element)=>{
    // Hide all tabs data
    const tabData = document.getElementsByClassName("tab-data")
    for(let el of tabData)
    {
        el.style.display = "none"
    }

    // then show only active tab data
    const tabContent = document.getElementById(element)
    tabContent.style.display = "block"
}

const openDrawer = async ()=>{
    const drawer = document.getElementById("drawer")
    drawer.style.width = "80%"
    drawer.style.transition = "0.3s"
    drawer.classList.add("p-16")
    await fetchBrands()
    await fetchCategory()
}

const closeDrawer = ()=>{
    const drawer = document.getElementById("drawer")
    const form = document.getElementById("product-form")
    form.reset()
    quill.root.innerHTML = ""
    drawer.style.width = "0%"
    drawer.style.transition = "0.1s"
    drawer.classList.remove("p-16")
}

const createProduct = async (e)=>{
    e.preventDefault()
    const description = quill.root.innerHTML
    const form = e.target
    const formdata = {
        title: form.title.value,
        description: description,
        price: form.price.value,
        discount: form.discount.value,
        category: form.category.value,
        brand: form.brand.value,
        quantity: form.quantity.value
    }
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post("/product", formdata, options)
        closeDrawer()
        fetchProducts()
        new Swal({
            icon: 'success',
            title: 'Success',
            text: 'Product Added Successfully'
        })
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed',
            text: 'Unable to create product please try after sometime'
        })
    }
}

const fetchProducts = async ()=>{
    const productsContainer = document.getElementById("products-container")
    const {data} = await axios.get("/product")
    productsContainer.innerHTML = ""
    for(let product of data)
    {
        const ui = `
        <div class="shadow-lg bg-white">
            <div class="relative">
                <img class="w-full" src="${product.thumbnail ? server+'/'+product.thumbnail : '/images/products/product-avt.png'}" />
                <input onchange="uploadeProductImage(this, '${product._id}')" type="file" accept="image/*" class="absolute top-0 left-0 w-full h-full opacity-0" />
            </div>
            <div class="p-4">
                <label class="text-sm text-gray-600 mb-1">May 16, 2024 10:00 Am</label>
                <h1 class="text-lg font-semibold">${product.title}</h1>
                <button class="font-bold text-rose-600 text-sm">${product.brand}</button>
                <div class="flex gap-2 mt-1">
                    <h1 class="text-md font-bold">₹${product.price-(product.price*product.discount)/100}</h1>
                    <del>₹${product.price}</del>
                    <label class="text-gray-600">(${product.discount}% OFF)</label>
                </div>
                <div class="flex items-center gap-3 mt-3">
                    <button class="bg-indigo-100 w-8 h-8 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white">
                        <i class="ri-edit-box-line"></i>
                    </button>

                    <button onclick="deleteProduct('${product._id}')" class="bg-rose-100 w-8 h-8 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white">
                        <i class="ri-delete-bin-3-line"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        productsContainer.innerHTML += ui
    }
}

const deleteProduct = async (id)=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`/product/${id}`, options)
        fetchProducts()
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed',
            text: 'Unable to delete product'
        })
    }
}

const uploadProgress = (progress)=>{
    const loaded = (progress.loaded/1024)/1024
    const total = (progress.total/1024)/1024
    const percent = (loaded*100)/total

    // Width increasing
    const progressBar = document.getElementById("progress-bar")
    progressBar.style.width = percent+'%'

    // showing filesize and loaded
    const loadedEl = document.getElementById("loaded")
    loadedEl.innerHTML = loaded.toFixed(1)+'Mb'

    const totalEl = document.getElementById("total")
    totalEl.innerHTML = total.toFixed(1)+'Mb'    

    // showing filename
    const filenameEl = document.getElementById("filename")
    filenameEl.innerHTML = filename
}

const uploadeProductImage = async (input, id)=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const file = input.files[0]
        const uploader = document.getElementById("uploader")
        uploader.style.display = "block" // show progress uploade loader
        filename = file.name
        const formData = new FormData()
        formData.append("fileData", file)
        const {data} = await axios.post('/storage', formData, {onUploadProgress: uploadProgress, ...options}) // upload image
        await axios.put(`/product/${id}`, {thumbnail: data.filename}, options) // update image path in product
        fetchProducts()
        uploader.style.display = "none"
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed',
            text: 'Failed to upload file on server'
        })
    }
}

const fetchPayments = async ()=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.get("/razorpay/payments", options)
        const paymentsTable = document.getElementById("payments-table")
        const noOfPayments = document.getElementById("no-of-payments")
        let totalSales = 0
        let totalFee = 0
        let tax = 0
        for(let payment of data.items)
        {
            totalSales = totalSales+(payment.amount/100)
            totalFee = totalFee+payment.fee
            tax = tax+payment.tax

            const ui = `
            <tr class="border-b">
                <td class="py-3 pl-3">
                    <div class="flex items-center gap-3">
                        <img src="/images/pic.jpg" class="w-12 h-12 rounded-full" />
                        <div class="flex flex-col">
                            <h1 class="font-semibold">${payment.notes.name ? payment.notes.name : payment.email.split('@')[0]}</h1>
                            <small class="text-gray-600">May 21, 2024</small>
                        </div>
                    </div>
                </td>
                <td>${payment.email}</td>
                <td>${payment.contact}</td>
                <td>Electronic city, Phase-2, Bengaluru, Karnatka 560100</td>
            </tr>
            `
            paymentsTable.innerHTML += ui
        }

        noOfPayments.innerHTML = '₹'+data.count
        const totalSalesEl = document.getElementById("total-sales")
        const totalTaxEl = document.getElementById("total-tax")
        const totalFeeEl = document.getElementById("total-fee")
        totalFeeEl.innerHTML = '₹'+Math.round(totalFee).toLocaleString()
        totalTaxEl.innerHTML = '₹'+Math.round(tax).toLocaleString()
        totalSalesEl.innerHTML = '₹'+Math.round(totalSales).toLocaleString()
    }
    catch(err)
    {
        console.log(err)
    }
}

const fetchOrder = async ()=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const ordersTable = document.getElementById("orders-table")
        const {data} = await axios.get("/order", options)
        for(let order of data)
        {
            console.log("hi", order)
            const ui = `
                <tr class="border-b">
                    <td class="pr-16">${moment(order.createdAt).format('DD MMM YYYY hh:mm a')}</td>
                    <td class="py-3 pr-16">
                        <div class="flex items-center gap-3">
                            <img src="${server}/${order.product.thumbnail}" class="w-12 h-12" />
                            <div class="flex flex-col">
                                <h1 class="font-semibold capitalize">${order.product.title}</h1>
                                <small class="text-gray-600">id - ${order.product._id}</small>
                            </div>
                        </div>
                    </td>
                    <td class="pr-16">₹${order.price}</td>
                    <td class="pr-16">${order.discount}%</td>
                    <td class="capitalize font-semibold pr-16">${order.user.fullname}</td>
                    <td class="pr-16">${order.user.email}</td>
                    <td class="pr-16">${order.user.mobile}</td>
                    <td class="pr-16">${order.user.address}</td>
                    <td>
                        <select class="border border-gray-300 p-2 rounded" onChange="updateStatus(this, '${order._id}')">
                            <option disabled>Created</option>
                            <option value="packaging" ${order.status === "packaging" && 'selected'}>Packaging</option>
                            <option value="dispatched" ${order.status === "dispatched" && 'selected'}>Dispatched</option>
                        </select>
                    </td>
                </tr>
            `
            ordersTable.innerHTML += ui
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

const updateStatus = async (select, id)=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.put(`/order/${id}`, {status: select.value}, options)
        new Swal({
            icon: 'success',
            title: 'Status Updated !'
        })
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed',
            text: 'Failed to update status'
        })
    }
}


const showCreateBrand = ()=>{
    const brandCreatorBox = document.getElementById("brand-creator")
    if(brandCreatorBox.className === "hidden")
    {
        brandCreatorBox.className = "block"
    }
    else {
        brandCreatorBox.className = "hidden"
    }
}

const showCreateCategory = ()=>{
    const categoryCreatorBox = document.getElementById("category-creator")
    if(categoryCreatorBox.className === "hidden")
    {
        categoryCreatorBox.className = "block"
    }
    else {
        categoryCreatorBox.className = "hidden"
    }
}

const createBrand = async ()=>{
    const brandCreatorBox = document.getElementById("brand-creator")
    const brand = document.getElementById("brand")

    if(brand.value.length === 0) 
        return alert("This field is required")

    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post('/brand', {title: brand.value}, options)
        fetchBrands()
        brand.value = ""
        brandCreatorBox.className = "hidden"
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed !',
            text: err.message
        })
    }
}

const createCategory = async ()=>{
    const categoryCreatorBox = document.getElementById("category-creator")
    const category = document.getElementById("category")

    if(category.value.length === 0) 
        return alert("This field is required")

    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post('/category', {title: category.value}, options)
        fetchCategory()
        category.value = ""
        categoryCreatorBox.className = "hidden"
    }
    catch(err)
    {
        new Swal({
            icon: 'error',
            title: 'Failed !',
            text: err.message
        })
    }
}

const fetchBrands = async ()=>{
    try {  
        const select = document.getElementById("choose-brand")
        const defaultOption = document.createElement("option")
        select.innerHTML = "<option>Choose a brand</option>"
        const {data} = await axios.get('/brand')
        for(let brand of data)
        {
            const option = `<option value="${brand.title}" class="uppercase">${brand.title}</option>`
            select.innerHTML += option
        }
    }   
    catch(err)
    {
        console.log(err)
    }
}

const fetchCategory = async ()=>{
    try {  
        const select = document.getElementById("choose-category") 
        select.innerHTML = "<option>Choose a category</option>"
        const {data} = await axios.get('/category')
        for(let category of data)
        {
            const option = `<option value="${category.title}" class="uppercase">${category.title}</option>`
            select.innerHTML += option
        }
    }   
    catch(err)
    {
        console.log(err)
    }
}


const fetchUsers = async ()=>{
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.get('/user', options)
        const table = document.getElementById('customer-table')
        for(let user of data)
        {
            const ui = `
                <tr class="border-b">
                    <td class="py-3 pl-3">
                        <div class="flex items-center gap-3">
                            <img src="/images/pic.jpg" class="w-12 h-12 rounded-full" />
                            <div class="flex flex-col">
                                <h1 class="font-semibold capitalize">${user.fullname}</h1>
                                <small class="text-gray-600">${moment(user.createdAt).format('DD MMM YYYY, hh:mm:ss A')}</small>
                            </div>
                        </div>
                    </td>
                    <td>${user.email}</td>
                    <td>${user.mobile}</td>
                    <td>${user.address}</td>
                </tr>
            `
            table.innerHTML += ui
        }
    }
    catch(err)
    {
        console.log(err)
    }
}