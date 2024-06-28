let myTable = document.querySelector('#table');
let headers = ['cliente_id', 'nome', 'endereco', 'gostos'];

async function fetchClientes() {
    try {
        const response = await fetch('http://127.0.0.1:5000/clientes');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }
        const {clientes} = await response.json();
        return clientes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function generateTable(clientes) {
    myTable.innerHTML = " "; // Limpa o conteúdo anterior

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    // Define os headers da tabela
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    // Adiona o header no botão Delete
    let deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Ações'; // Actions column
    headerRow.appendChild(deleteHeader);

    table.appendChild(headerRow);

    // Preenche as tabelas com dados
    clientes.forEach(cliente => {
        let row = document.createElement('tr');
        row.setAttribute('data-cliente-id', cliente.cliente_id);

        // Preenche de dados as cells
        headers.forEach(header => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(cliente[header]);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });

        // Adiciona o botão Delete
        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir'; // Delete button text
        deleteButton.addEventListener('click', () => deleteClient(cliente.cliente_id)); // Pass cliente_id to deleteClient
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Anexa as linhas à tabela
        table.appendChild(row);
    });

    // Anexa a tabela ao container
    myTable.appendChild(table);
}


document.addEventListener('DOMContentLoaded', async function() {
    const clientes = await fetchClientes();
    generateTable(clientes);
});


// Funcao para criar um novo cliente

let nextClienteId = 1;

async function submitForm() {
    // Toma os valores do input
    const nome = document.getElementById("newNome").value;
    const gostos = document.getElementById("newGostos").value;
    const endereco = document.getElementById("newEndereco").value;

    let clienteId = nextClienteId;
    nextClienteId++; 
    
    // Cria um objeto JSON
    const requestBody = {
        "cliente_id": clienteId,
        "nome": nome,
        "endereco": endereco,
        "gostos": gostos
    };

    try {
        let url = `http://127.0.0.1:5000/clientes/${clienteId}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        
        // Chama a função generateTable após o envio do form
        generateTable(await fetchClientes());

        // Limpa os campos do input
        document.getElementById("form").reset();

        nome.value = ''
        gostos.value = ''
        endereco.value = ''

        alert('Registro criado com sucesso!')
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }

    
}



// Funcao para deletar um cliente 

async function deleteClient(clienteId) {
   
    

    try {
        // Requisicao DELETE para deletar um cliente 
        const deleteUrl = `http://127.0.0.1:5000/clientes/${clienteId}`;
        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!deleteResponse.ok) {
            throw new Error('Failed to delete client. Network response was not ok.');
        }

        // Envia mensagem de sucesso ou informações adicionais após a exclusão
        console.log(`Client ID ${clienteId} deletado.`);


        alert(`Cliente ID ${clienteId} excluído com sucesso!`);
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert(`Erro ao excluir cliente ID ${clienteId}. Verifique o console para mais detalhes.`);
    }
}


