document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const taskDetailsInput = document.getElementById('task-details');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter').querySelector('b');

    // Função para atualizar o contador de tarefas
    function updateTaskCounter() {
        const taskCount = taskList.getElementsByTagName('li').length;
        taskCounter.textContent = taskCount;
    }

    // Evento de envio do formulário
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskName = taskInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const taskDetails = taskDetailsInput.value.trim();

        if (taskName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'O nome da tarefa é obrigatório!'
            });
            return;
        }

        if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Datas inválidas!'
            });
            return;
        }

        if (moment(startDate).isAfter(endDate)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A data de início deve ser antes da data de fim!'
            });
            return;
        }

        const taskHtml = `
            <li>
                ${taskName} (Início: ${moment(startDate).format('DD/MM/YYYY')}, Fim: ${moment(endDate).format('DD/MM/YYYY')})
                <p>${taskDetails}</p>
            </li>
        `;
        taskList.insertAdjacentHTML('beforeend', taskHtml);
        taskForm.reset();

        updateTaskCounter();

        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Tarefa adicionada com sucesso!'
        });
    });

    // Evento de clique nas tarefas para marcar como concluída
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
    });
});
