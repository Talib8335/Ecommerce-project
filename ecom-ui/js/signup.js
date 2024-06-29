axios.defaults.baseURL = server

window.onload = async ()=>{
    const session = await checkAuth()
    
    if(session)
        return window.location.href = "/"

}

window.onstorage = (e)=>{
    if(e.storageArea === localStorage)
    {
        const ___as = localStorage.getItem("___as")
        if(___as !== null) 
            handle___as(___as)
    }
}

const signup = async (e)=>{
    e.preventDefault()
    const form = e.target
    const payload = {
        fullname: form.fullname.value,
        email: form.email.value,
        password: form.password.value,
        mobile: form.mobile.value,
        address: form.address.value
    }
    try {
        const options = {
            headers: {
                'X-Auth-Token': (form.AN ? form.AN.value : null)
            }
        }
        const {data} = await axios.post('/auth/signup', payload, options)
        localStorage.setItem('auth', data.token)
        window.location.href = "/"
    }
    catch(err)
    {
        console.log(err)
    }
}

const handle___as = async (s)=>{
    try {
        await axios.post('/token/verify?iss=admin', {token: s})
        const signupForm = document.getElementById("signup-form")
        const input = document.createElement("input")
        input.className = "border border-gray-300 p-2 rounded w-full"
        input.value = s
        input.readOnly = true
        input.disabled = true
        input.name = "AN"
        signupForm.innerHTML = ""
        signupForm.append(input)
    }
    catch(err)
    {
       console.log(err) 
    }
    
}