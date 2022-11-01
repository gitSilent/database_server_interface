fetch("http://localhost:4000/")
.then(val =>
    val.json()
)
.then((val)=>{
    console.log(val)
})

const btnAddAuthor = document.querySelector('.btn_add_author');

function fillTableBooks(id){
    
    fetch(`http://localhost:4000/${id}`)
    .then(val =>
        val.json()
    )
    .then((val)=>{
        const table = document.createElement('table');
        table.className = 'table_books';

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
    fetch(`http://localhost:4000/postAuthor`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:{
            id_author : 0,
            name_author,
            birthday_author
        }
    })
    
}

btnAddAuthor.addEventListener('click', ()=>{
    addAuthor('Блок','1900-01-01')
})


fillTableBooks("allBooks")
fillTableBooks("allAuthors")