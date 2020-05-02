window.onload = () => {
    const div = document.querySelector('#container')
    fetch('http://10.0.0.120:3333/list')
        .then(res => res.json())
        .then(data => {
            data.map((valor) => {
                div.innerHTML += `
                    <button data='${valor.title}' onClick="clique('${valor.title}')">
                        <img src=${valor.icone} />
                        <span>${valor.title}</span>    
                    </button>
                `
            })
        })
}
function clique(param) {
    fetch(`http://10.0.0.120:3333/${param}`)
        .then(res => res.text())
        .then(data => {
            console.log(data)
        })
}