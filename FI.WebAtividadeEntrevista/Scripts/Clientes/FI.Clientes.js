$(document).ready(function ($) {

    $('#formCadastro #CPF').mask('000.000.000-00', { reverse: true });


    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var tabela = document.body.querySelectorAll("table td:nth-child(1),table td:nth-child(2)");

        var beneficiarios = [];
        for (var x = 0; x < tabela.length; x += 2) {
            e
            var objeto = {
                CPF: tabela[x].textContent.trim(),
                Nome: tabela[x + 1].textContent.trim()
            };
            beneficiarios.push(objeto);
        }


        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "CPF": $(this).find("#CPF").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Beneficiario": beneficiarios,
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    $("#TabelaBenef > tbody ").remove()
                }
        });
    });


    $("#btnModal").on("click", function () {
        ModalBeneficiario();
        $('#InputCPFBenef').mask('000.000.000-00', { reverse: true });
        $('#exampleModalCenter').modal('show');
    });
})

function ModalBeneficiario() {
    var modal = '<div class="modal .modal-lg fade" id = "exampleModalCenter" tabindex = "-1" role = "dialog" aria - labelledby="exampleModalCenterTitle" aria - hidden="true" >              ' +
        '        <div class="modal-dialog modal-dialog-centered" role="document">                                                                                                            ' +
        '            <div class="modal-content">                                                                                                                                             ' +
        '                <div class="modal-header">                                                                                                                                          ' +
        '                    <h5 class="modal-title" id="exampleModalLongTitle">Beneficiários</h5>                                                                                           ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">                                                                                    ' +
        '                        <span aria-hidden="true">&times;</span>                                                                                                                     ' +
        '                    </button>                                                                                                                                                       ' +
        '                </div>                                                                                                                                                              ' +
        '                <div class="modal-body">                                                                                                                                            ' +

        '                    <div class="row">                                                                                                                                               ' +
        '                        <div class="col-md-4">                                                                                                                                      ' +
        '                            <div class="form-group">                                                                                                                                ' +
        '                                <label for="CPF">CPF:</label>                                                                                                                       ' +
        '                                <input required="required" type="text" class="form-control" id="InputCPFBenef" name="CPF" placeholder="Ex.: 010.011.111-00" maxlength="15"">                   ' +
        '                            </div>                                                                                                                                                  ' +
        '                        </div>                                                                                                                                                      ' +
        '                        <div class="col-md-6">                                                                                                                                      ' +
        '                            <div class="form-group">                                                                                                                                ' +
        '                                <label for="Nome">Nome:</label>                                                                                                                     ' +
        '                                <input required="required" type="text" class="form-control" id="InputNomeBenef" name="Nome" placeholder="Ex.: João" maxlength="50">                           ' +
        '                            </div>                                                                                                                                                  ' +
        '                        </div>                                                                                                                                                      ' +
        '                        <div class="col-md-2" style="margin-top: 4.4%;">                                                                                                            ' +
        '                            <div class="form-group">                                                                                                                                ' +
        '                                <button type="button" id="IncluirBene" class="btn btn-md btn-success" data-toggle="modal" onclick="IncluirBeneficiarioTable()">Incluir</button>     ' +
        '                            </div>                                                                                                                                                  ' +
        '                        </div>                                                                                                                                                      ' +
        '                    </div>                                                                                                                                                          ' +
        '                    <div class="row">                                                                                                                                               ' +
        '                       <div class="col-lg-12">                                                                                                                                      ' +
        '                           <table class="table" id="TabelaBenef">                                                                                                                   ' +
        '                               <thead>                                                                                                                                              ' +
        '                                   <tr>                                                                                                                                             ' +
        '                                       <th scope="col-md-4">CPF</th>                                                                                                                ' +
        '                                       <th scope="col-md-4">Nome</th>                                                                                                               ' +
        '                                       <th scope="col">Ações</th>                                                                                                                   ' +
        '                                   </tr>                                                                                                                                            ' +
        '                               </thead>                                                                                                                                             ' +
        '                               <tbody>                                                                                                                                              ' +
        '                               </tbody>                                                                                                                                             ' +
        '                            </table>                                                                                                                                                ' +
        '                       </div>                                                                                                                                                       ' +
        '                   </div>                                                                                                                                                           ' +
        '                </div>                                                                                                                                                              ' +
        '            </div>                                                                                                                                                                  ' +
        '        </div>                                                                                                                                                                      ' +
        '    </div>                                                                                                                                                                          ';


    $('body').append(modal);

    $('#InputCPFBenef').change(function () {
        var cpf = $(this).val();
        if (!ValidaCPF(cpf.replace(/[^\d]+/g, ''))) {
            ModalDialog("Ocorreu um erro", "CPF Inválido");
            $(this).val('');
        }
    });
};

function IncluirBeneficiarioTable() {
    var cpf = $('#InputCPFBenef').val();
    var nome = $("#InputNomeBenef").val();

    if (cpf != '' || nome != '') {
        var linha = '<tr> ' +
            '        <td class="col-md-4" id="CPFBenef" >' + cpf + '</td>                                      ' +
            '        <td class="col-md-4" id="NomeBenef">' + nome + '</td>                                    ' +
            '        <td>                                                                                     ' +
            '            <button class="btn btn-primary btn-md" id="AlterarBenef">Alterar</button>                              ' +
            '            <button class="btn btn-primary btn-md" id="ExcluirBenef" value=0 >Excluir</button>   ' +
            '        </td>' +
            '   </tr > ';
    }

    $("#TabelaBenef > tbody ").append(linha);
    $('#InputCPFBenef').val("");
    $('#InputNomeBenef').val("");
}

$(document).on('click', '#ExcluirBenef', function () {
    $(this).parent().parent().remove();
});

$(document).on('click', '#AlterarBenef', function () {
    $('#InputCPFBenef').val($(this).closest('tr').find('td:first').text().trim());
    $("#InputNomeBenef").val($(this).closest('tr').find('td:eq(1)').text().trim());
    $(this).closest('tr').remove();
});

$('#CPF').change(function () {
    var cpf = $(this).val();
    if (!ValidaCPF(cpf.replace(/[^\d]+/g, ''))) {
        ModalDialog("Ocorreu um erro", "CPF Inválido");
        $(this).val('');
    }
});

function ValidaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
