var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){ // função para iniciar as funcões quando iniciar a pagina
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();  
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text(); // me retorna o elemento com a classe frase e pega o texto de dentro
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras)
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            
            if(tempoRestante < 1) {
                clearInterval(cronometroID); // parar o SetInterval
                finalizaJogo();
            }
        },1000)
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.addClass("campo-desativado");
    // campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input",  function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);
        if(digitado == comparavel){
            campo.removeClass("borda-vermelha")
            campo.addClass("borda-verde")
        } else{
            campo.removeClass("borda-verde")
            campo.addClass("borda-vermelha")
        }
    });
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Vinicio";
    var numPalavras = $("#contador-palavras").text();

    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                "</tr>";

    corpoTabela.prepend(linha);
    
}

function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

