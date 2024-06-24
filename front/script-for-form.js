/*let nextClienteId = 1;

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
        generateTable(await fetchEmployees());

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
        // DELETE request to delete a client
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
        console.log(`Client ID ${clienteId} deleted successfully.`);


        alert(`Cliente ID ${clienteId} excluído com sucesso!`);
    } catch (error) {
        console.error('Error deleting client:', error);
        alert(`Erro ao excluir cliente ID ${clienteId}. Verifique o console para mais detalhes.`);
    }
}




*/