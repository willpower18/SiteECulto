// Write your JavaScript code.
$(document).ready(function () {
    const htmlInico = "<div class='row'><div class='col text-center'><img src='./loading.gif'/></div></div>"
    $("#renderHtml").html(htmlInico);
    const url = "/Participar/getIgrejas";

    $.ajax({
        url: url
        , type: "GET"
        , success: function (data) {
            if (data.length > 0) {
                let html = "";
                for (let i = 0; i < data.length; i++) {
                    html += "</br>";
                    html += "<div class='row'>";
                    html += "<div class='col'>";
                    html += "<div class='card'>";
                    html += "<div class='card-body'>";
                    html += "<h5 class='card-title' style='color:#6c757d'>" + data[i].nome + "</h5>";
                    html += "<p class='card-text'>" + data[i].endereco + ", " + data[i].numero + " - " + data[i].bairro +"</p>";
                    html += "<p class='card-text'>" + data[i].responsavel + "</p>";
                    html += "<p class='card-text'>" + data[i].tradicao + "</p>";
                    html += "<button type=\"button\" style='background-color:#95c957;color:#fff;' onclick='getCultos(" + data[i].idIgreja +");' class=\"btn btn-lg btn-block\">Ver Horários</button>"
                    html += "</div>";
                    html += "</div>";
                    html += "</div></div>";
                }
                $("#renderHtml").html(html);
            }
            else {
                $("#renderHtml").html("<p>Nenhuma Igreja Encontrada!</p>");
            }
        }
        , error: function (data) {
            $("#renderHtml").html("<p>Nenhuma Igreja Encontrada!</p>");
        }
    });
});

function getCultos(id) {
    let html = "<div class='row'><div class='col text-center'><img src='./loading.gif'/></div></div>"
    $("#renderHtml").html(html);
    const url = `/Participar/getCultos?Id=${id}`
    $.ajax({
        url: url
        , type: "GET"
        , success: function (data) {
            if (data.cultos.length > 0) {
                html = "";
                for (let i = 0; i < data.cultos.length; i++) {
                    html += "</br>";
                    html += "<h4 style=\"color:#8b57c9\">" + data.nomeIgreja + "</h4>";
                    html += "<div class='row'>";
                    html += "<div class='col'>";
                    html += "<div class='card'>";
                    html += "<div class='card-body'>";
                    html += "<h5 class='card-title' style='color:#6c757d'>" + data.cultos[i].nome + "</h5>";
                    html += "<p class='card-text'>" + data.cultos[i].preletor + "</p>";
                    html += "<p class='card-text'>" + moment(data.cultos[i].dataHora).format("DD/MM/YYYY HH:mm") + "</p>";
                    let prg = data.cultos[i].lotacao / data.capacidade;
                    prg = prg * 100;
                    html += "<div class=\"progress\" style='margin-bottom:10px;'>";
                    html += "<div class=\"progress-bar\" role=\"progressbar\" style=\"width:" + prg + "%;background-color:#8b57c9\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>";
                    html += "</div>";
                    html += "<button type=\"button\" style='background-color:#95c957;color:#fff;' onclick='participar(" + data.cultos[i].idCulto + ", \"" + data.nomeIgreja + "\");' class=\"btn btn-lg btn-block\">Quero Participar</button>"
                    html += "</div>";
                    html += "</div>";
                    html += "</div></div>";
                }
                $("#renderHtml").html(html);
            }
            else {
                $("#renderHtml").html("<p>Nenhum Culto Encontrado!</p>");
            }
        }
    });
}

function participar(id, nomeIgreja) {
    const htmlInico = "<div class='row'><div class='col text-center'><img src='./loading.gif'/></div></div>"
    $("#renderHtml").html(htmlInico);
    $("#idCulto").val(id);
    let html = "";
    html += "</br>";
    html += "<h4 style=\"color:#8b57c9\">" + nomeIgreja + "</h4>";
    html += "</br>";
    html += "<div class='row'>";
    html += "<div class='col'>";
    html += "<div class='form-group'>";
    html += "<input class='form-control' id=\"nome\" placeholder='Nome Completo' maxlength='100'/>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<input class='form-control' id='telefone' placeholder='Telefone' maxlength='30'/>";
    html += "</div>";
    html += "<button type=\"button\" style='background-color:#95c957;color:#fff;' onclick='confirmarParticipacao(" + id + ",\"" + nomeIgreja + "\");' class=\"btn btn-lg btn-block\">Confirmar</button>";
    html += "</div></div>";
    $("#renderHtml").html(html);
    $('#telefone').mask('(00) 00000-0000');
}

function confirmarParticipacao(id, nomeIgreja) {
    const nome = $("#nome").val();
    const telefone = $("#telefone").val();
    if (nome === '' | nome === ' ' | nome === null) {
        alert('O compo Nome é de preenchimento obrigatório.');
    }
    else if (nome.length <= 5) {
        alert('O Nome Completo deve ser informado.');
        $("#nome").focus();
    }
    else if (telefone.length < 15) {
        alert('Preencha o campo telefone com um valor válido.');
    }
    else if (telefone === '' | telefone === ' ' | telefone === null) {
        alert('O compo Telefone é de preenchimento obrigatório.');
        $("#telefone").focus();
    }
    else if (telefone.indexOf('0000') !== -1 | telefone.indexOf('1111') !== -1 | telefone.indexOf('2222') !== -1 | telefone.indexOf('3333') !== -1 | telefone.indexOf('4444') !== -1 | telefone.indexOf('5555') !== -1 | telefone.indexOf('6666') !== -1 | telefone.indexOf('7777') !== -1 | telefone.indexOf('8888') !== -1 | telefone.indexOf('9999') !== -1) {
        alert('Preencha o campo telefone com um valor válido.');
    }
    else {
        const htmlInico = "<div class='row'><div class='col text-center'><img src='./loading.gif'/></div></div>"
        $("#renderHtml").html(htmlInico);
        const url = "/Participar/Participacao";
        $.ajax({
            url: url
            , type: "POST"
            , datatype: "json"
            , data: { Nome: nome, Telefone: telefone, IdCulto: id, Acompanhantes: 0 }
            , success: function (data) {
                if (data.code === 200) {
                    alert('Presença confirmada com sucesso!');
                    $(window.document.location).attr('href', '/Participar');
                }
                else if (data.code === 401) {
                    alert('Sua presença já está confirmada!');
                    $(window.document.location).attr('href', '/Participar');
                }
                else if (data.code === 406) {
                    alert('Capacidade do evento Atingida!');
                    $(window.document.location).attr('href', '/Participar');
                }
                else {
                    alert('Algo deu errado, tente novamente mais tarde');
                    $(window.document.location).attr('href', '/Participar');
                }
            }
        });
    }
}