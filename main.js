const clients = [
    {
      nombre: "Ana",
      apellido: "López",
      dni: 87456321,
      domicilio: "residencial",
      consumo: 7621,
      deuda: 5077,
      monto: 17147.25
    },
    {
      nombre: "Juan",
      apellido: "González",
      dni: 59836214,
      domicilio: "comercial",
      consumo: 5125,
      deuda: 1261,
      monto: 23062.5
    },
    {
      nombre: "Laura",
      apellido: "Martínez",
      dni: 70348926,
      domicilio: "residencial",
      consumo: 4806,
      deuda: 5812,
      monto: 10838.5
    },
    {
      nombre: "Carlos",
      apellido: "Rodríguez",
      dni: 21569734,
      domicilio: "comercial",
      consumo: 2988,
      deuda: 0,
      monto: 13446
    },
    {
      nombre: "Sofía",
      apellido: "Hernández",
      dni: 98765432,
      domicilio: "residencial",
      consumo: 6512,
      deuda: 0,
      monto: 14640
    },
    {
      nombre: "Miguel",
      apellido: "Díaz",
      dni: 45678901,
      domicilio: "comercial",
      consumo: 3780,
      deuda: 8181,
      monto: 17010
    },
    {
      nombre: "Luisa",
      apellido: "Ramírez",
      dni: 34562187,
      domicilio: "residencial",
      consumo: 4123,
      deuda: 0,
      monto: 9276.75
    },
    {
      nombre: "Javier",
      apellido: "Pérez",
      dni: 87654321,
      domicilio: "comercial",
      consumo: 7425,
      deuda: 14177,
      monto: 33412.5
    },
    {
      nombre: "María",
      apellido: "Gómez",
      dni: 23456789,
      domicilio: "residencial",
      consumo: 3267,
      deuda: 919,
      monto: 7345.25
    },
    {
      nombre: "Roberto",
      apellido: "Fernández",
      dni: 78901234,
      domicilio: "comercial",
      consumo: 5984,
      deuda: 0,
      monto: 26928
    }
]

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#clients-table tbody")

    // HTML de tabla
    const tableHTML = (nombre, apellido, dni, domicilio, consumo, deuda) => {
        return `
            <tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${dni}</td>
                <td>${domicilio}</td>
                <td>${consumo}</td>
                <td>${deuda}</td>
                <td>${domicilio === "residencial" ? deuda + (consumo * 2.25) : deuda + (consumo * 4.5)}</td>
                <td><button class="delete-btn">Borrar</button></td>
            </tr>
        `
    }

    clients.forEach(({ nombre, apellido, dni, domicilio, consumo, deuda }) => {
        tableBody.innerHTML += tableHTML(nombre, apellido, dni, domicilio, consumo, deuda)
    })

    // Funcionalidad agregar nuevo cliente
    const addClient = () => {
        const nombre = document.getElementById("nombre").value
        const apellido = document.getElementById("apellido").value
        const dni = parseInt(document.getElementById("dni").value)
        const domicilio = document.getElementById("domicilio").value
        const consumo = parseInt(document.getElementById("consumo").value)
        const deuda = parseInt(document.getElementById("deuda").value)

        const newRow = document.createElement("tr")

        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${dni}</td>
            <td>${domicilio}</td>
            <td>${consumo}</td>
            <td>${deuda}</td>
            <td>${domicilio === "residencial" ? deuda + (consumo * 2.25) : deuda + (consumo * 4.5)}</td>
            <td><button class="delete-btn">Borrar</button></td>
        `

        tableBody.appendChild(newRow);
    }

    document.getElementById("client-form").addEventListener("submit", (e) => {
        e.preventDefault()
        addClient()
    })

    // Funcionalidad eliminar cliente
    const deleteClient = (row) => {
        const index = Array.from(tableBody.children).indexOf(row)
        if (index !== -1) {
            // Eliminar <tr>
            tableBody.removeChild(row)
        }
    }

    document.querySelectorAll(".delete-btn").forEach(btn => btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr")
        deleteClient(row)
    }))

    // Filtrar clientes por deuda > 0
    const renderTable = (clientsToRender) => {
        tableBody.innerHTML = ""
        
        clientsToRender.forEach(({ nombre, apellido, dni, domicilio, consumo, deuda, monto }) => {
            tableBody.innerHTML += tableHTML(nombre, apellido, dni, domicilio, consumo, deuda, monto)
        })
    }

    const filterClients = () => {
        const filteredClients = clients.filter(client => client.deuda > 0)
        renderTable(filteredClients)
    }

    document.querySelector(".filter-btn").addEventListener("click", filterClients)

    // Filtrar clientes según input de monto
    const filterClientsByMonto = (monto) => {
        const filteredClients = clients.filter(client => client.monto >= monto);
        renderTable(filteredClients)
    }

    document.querySelector(".search form").addEventListener("submit", (e) => {
        e.preventDefault()
        const montoValue = parseFloat(document.querySelector("#buscar-monto").value)
        filterClientsByMonto(montoValue)
    })

    // Funcionalidad ordenar alfabéticamente
    const sortOrders = Array(7).fill(0)

    const sortTable = (columnIndex, order) => {
        const rows = Array.from(tableBody.children)

        rows.sort((a, b) => {
            const aValue = a.children[columnIndex].textContent.toLowerCase()
            const bValue = b.children[columnIndex].textContent.toLowerCase()

            if (order === 1) {
                return aValue.localeCompare(bValue)
            } else {
                return bValue.localeCompare(aValue)
            }
        });

        tableBody.innerHTML = ""

        rows.forEach((row) => {
            tableBody.appendChild(row)
        })
    }

    document.querySelectorAll("#clients-table th").forEach((header, index) => {
        header.addEventListener("click", () => {
            const currentOrder = sortOrders[index]
            sortOrders.fill(0)

            if (currentOrder === 0 || currentOrder === -1) {
                sortTable(index, 1)
                sortOrders[index] = 1
            } else {
                sortTable(index, -1)
                sortOrders[index] = -1
            }
        })
    })
})