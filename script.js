$(document).ready(function() {
    // Função para atualizar o contador de tarefas
    function updateTaskCounter() {
        var taskCount = $('#task-list li').length;
        $('#task-counter b').text(taskCount);
    }

    // Evento de envio do formulário
    $('#task-form').submit(function(e) {
        e.preventDefault();

        var taskName = $('#task-input').val().trim();
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        var taskDetails = $('#task-details').val().trim();

        if(taskName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'O nome da tarefa é obrigatório!'
            });
            return;
        }

        if(!moment(startDate).isValid() || !moment(endDate).isValid()) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Datas inválidas!'
            });
            return;
        }

        if(moment(startDate).isAfter(endDate)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A data de início deve ser antes da data de fim!'
            });
            return;
        }

        var taskHtml = '<li>' + taskName + ' (Início: ' + moment(startDate).format('DD/MM/YYYY') + ', Fim: ' + moment(endDate).format('DD/MM/YYYY') + ')' + '<p>' + taskDetails + '</p></li>';
        $('#task-list').append(taskHtml);
        $('#task-form')[0].reset();

        updateTaskCounter();

        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Tarefa adicionada com sucesso!'
        });
    });

    // Evento de clique nas tarefas para marcar como concluída
    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed');
    });
});
