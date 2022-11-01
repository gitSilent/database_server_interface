fetch("http://localhost:4000/")
.then(val =>
    val.json()
)
.then((val)=>{
    console.log(val)
})