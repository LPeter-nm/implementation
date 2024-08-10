document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const userForm = document.getElementById('user-form');

    // Função para obter e exibir usuários
    const getUsers = async () => {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    };

    // Função para adicionar novo usuário
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        getUsers();
    });

    getUsers();
});
