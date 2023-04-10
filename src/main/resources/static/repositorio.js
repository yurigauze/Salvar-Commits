function buscarDados(){
    fetch('http://localhost:8080/repositorio/api')
  .then(response => response.json())
  .then(data => generateTable(data))
  .catch(error => console.error(error))

function generateTable(data) {
  const tableBody = document.querySelector('#tabela tbody')
  tableBody.innerHTML = ''

  let botaoExcluir = document.createElement('button');
  

  data.forEach(item => {
    //insere dados na tabela
    const row = tableBody.insertRow();

    
    row.insertCell().textContent = item.id
    row.insertCell().textContent = item.autor
    row.insertCell().textContent = item.repositorio
    row.insertCell().textContent = item.link
    row.insertCell().textContent = new Date(item.dataInicial).toLocaleDateString();
    row.insertCell().textContent = new Date(item.dataFinal).toLocaleDateString();
    row.insertCell().textContent = item.qtdCommits
    row.insertCell().textContent = item.percentual
    row.insertCell().textContent = item.resumo
    row.style.whiteSpace = 'pre-wrap';


    // Cria um botão "Excluir"
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Excluir'
    deleteButton.addEventListener('click', () => {
        const url = `http://localhost:8080/repositorio/api/${item.id}`
  
        fetch(url, {
          method: 'DELETE'
        })
        .then(() => {
          // Remove a linha da tabela após excluir o registro
          row.remove()
        })
        .catch(error => console.error(error))
      })
      row.insertCell().appendChild(deleteButton)
  });
}

}

