// fetch("http://localhost:4000/")
// .then(val =>
//     val.json()
// )
// .then((val)=>{
//     console.log(val)
// })

const btnAddAuthor = document.querySelector('.btn_add_author');
const inputNameAuthor = document.querySelector('.input_nameAuthor')
const inputBirthdayAuthor = document.querySelector('.input_birthdayAuthor')

function fillTableBooks(id){
    
    fetch(`http://127.0.0.1:4000/get/${id}`)
    .then(val =>
        val.json()
    )
    .then((val)=>{
        const table = document.createElement('table');
        table.className = `table_${id}`;

        let table_header = document.createElement('thead');
        let tr = document.createElement('tr');

        let table_body= document.createElement('tbody');
        
        for(let key in val[0]){
            const th = document.createElement('th');
            th.textContent = `${key}`
            tr.append(th)
        }
        
        table_header.append(tr);
        table.append(table_header)
        
        val.forEach((el,index) => {
            let tr = document.createElement('tr');
            for(let key in el) {
                const th = document.createElement('th');
                th.textContent = el[key]
                tr.append(th)
            };
            table_body.append(tr)
        });

        table.append(table_body)
        
        
        document.body.append(table);

        console.log(val)
    })
}

function addAuthor(name_author, birthday_author){
    console.log()
    fetch(`http://127.0.0.1:4000/post/author`,{
        method: 'POST',
        headers:{
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id_author : 0,
            name_author: name_author,
            birthday_author: birthday_author
        }),
        // body: "stroka",
        mode: 'no-cors'
    })
    
}

btnAddAuthor.addEventListener('click', ()=>{
    delete document.querySelector('.table_allBooks')
    // addAuthor('Блок','1900-01-01')
    console.log(inputNameAuthor.value)
    console.log(inputBirthdayAuthor.value)
    addAuthor(inputNameAuthor.value,inputBirthdayAuthor.value)
    
    // fillTableBooks("allAuthors")
    
})


// fillTableBooks("allBooks")
fillTableBooks("allAuthors")