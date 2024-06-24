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
    myTable.innerHTML = " "; // Clear previous table content

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    // Define table headers
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    // Add header for delete button column
    let deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Ações'; // Actions column
    headerRow.appendChild(deleteHeader);

    table.appendChild(headerRow);

    // Populate table rows with client data
    clientes.forEach(cliente => {
        let row = document.createElement('tr');
        row.setAttribute('data-cliente-id', cliente.cliente_id); // Set data attribute

        // Populate regular data cells
        headers.forEach(header => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(cliente[header]);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });

        // Add delete button cell
        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir'; // Delete button text
        deleteButton.addEventListener('click', () => deleteClient(cliente.cliente_id)); // Pass cliente_id to deleteClient
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append row to table
        table.appendChild(row);
    });

    // Append table to the container
    myTable.appendChild(table);
}


document.addEventListener('DOMContentLoaded', async function() {
    const clientes = await fetchClientes();
    generateTable(clientes);
});


// Funcao para criar um novo cliente

let nextClienteId = 1;

async function submitForm() {
    // Capture input values
    const nome = document.getElementById("newNome").value;
    const gostos = document.getElementById("newGostos").value;
    const endereco = document.getElementById("newEndereco").value;

    let clienteId = nextClienteId;
    nextClienteId++; 
    
    // Create JSON object
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
        
        // Call generateTable function after form submission
        generateTable(await fetchClientes());

        // Clear input fields
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

        // Optionally handle success or additional operations after deletion
        console.log(`Client ID ${clienteId} deletado.`);


        alert(`Cliente ID ${clienteId} excluído com sucesso!`);
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert(`Erro ao excluir cliente ID ${clienteId}. Verifique o console para mais detalhes.`);
    }
}


