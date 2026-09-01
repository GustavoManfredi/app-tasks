let listas = [];

const listname = document.getElementById("listname");
const btncreatelist = document.getElementById("btncreatelist");
const listascontainer = document.getElementById("listascontainer");



btncreatelist.addEventListener("click", criarLista);

function criarLista() {

    const nome = listname.value;

    if (nome === "") {
        alert("Digite um nome para a lista.");
        return;
    }

    const novaLista = {
        id: Date.now(),
        nome: nome,
        tarefas: []
    };

    listas.push(novaLista);

    listname.value = "";

    mostrarListas();
}



function mostrarListas() {

    listascontainer.innerHTML = "";

    for (let i = 0; i < listas.length; i++) {

        const lista = listas[i];

        const divLista = document.createElement("div");
        divLista.classList.add("lista");

        const titulo = document.createElement("h2");
        titulo.textContent = lista.nome;



        const divBotoes = document.createElement("div");
        divBotoes.classList.add("lista-actions");

        const botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = '<i class="bi bi-pencil"></i> Editar Lista';
        botaoEditar.classList.add("btn-editar-lista");

        

        botaoEditar.addEventListener("click", function() {
            editarLista(i);
        });


        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="bi bi-trash"></i> Excluir Lista';
        botaoExcluir.classList.add("btn-excluir-lista");
        

        botaoExcluir.addEventListener("click", function() {
            excluirLista(i);
        });


        divBotoes.appendChild(botaoEditar);
        divBotoes.appendChild(botaoExcluir);



        const divCriarTarefa = document.createElement("div");
        divCriarTarefa.classList.add("create-task");

        const inputTarefa = document.createElement("input");
        inputTarefa.type = "text";
        inputTarefa.placeholder = "Digite uma tarefa";

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar tarefa";

        botaoAdicionar.addEventListener("click", function() {
            criarTarefa(i, inputTarefa);
        });


        divCriarTarefa.appendChild(inputTarefa);
        divCriarTarefa.appendChild(botaoAdicionar);


        

        divLista.appendChild(titulo);
        divLista.appendChild(divBotoes);
        divLista.appendChild(divCriarTarefa);



        for (let j = 0; j < lista.tarefas.length; j++) {

            const tarefa = lista.tarefas[j];

            const divTarefa = document.createElement("div");
            divTarefa.classList.add("tarefa");


            const descricao = document.createElement("span");
            descricao.classList.add("tarefa-descricao");
            descricao.textContent = tarefa.descricao;


            if (tarefa.concluida === true) {
                descricao.style.textDecoration = "line-through";
            }


         

           const botaoConcluir = document.createElement("button");
           botaoConcluir.classList.add("btn-concluir");

           if (tarefa.concluida === true) {
           botaoConcluir.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i> Desfazer';
           } else {
           botaoConcluir.innerHTML = '<i class="bi bi-check-lg"></i> Concluir';
           }

           botaoConcluir.addEventListener("click", function() {
           concluirTarefa(i, j);
           });




            const botaoEditarTarefa = document.createElement("button");
            botaoEditarTarefa.innerHTML = '<i class="bi bi-pencil"></i> Editar';
            botaoEditarTarefa.classList.add("btn-editar");

            botaoEditarTarefa.addEventListener("click", function() {
                editarTarefa(i, j);
            });



           
            const botaoExcluirTarefa = document.createElement("button");
            botaoExcluirTarefa.innerHTML = '<i class="bi bi-trash"></i> Excluir';
            botaoExcluirTarefa.classList.add("btn-excluir");
            
            botaoExcluirTarefa.addEventListener("click", function() {
            excluirTarefa(i, j);
            
            });




            divTarefa.appendChild(descricao);
            divTarefa.appendChild(botaoConcluir);
            divTarefa.appendChild(botaoEditarTarefa);
            divTarefa.appendChild(botaoExcluirTarefa);

            divLista.appendChild(divTarefa);
        }


        listascontainer.appendChild(divLista);
    }
}



function editarLista(indice) {

    const novoNome = prompt("Digite o novo nome da lista:");

    if (novoNome === null || novoNome === "") {
        return;
    }

    listas[indice].nome = novoNome;

    mostrarListas();
}



function excluirLista(indice) {

    const confirmar = confirm("Deseja realmente excluir esta lista?");

    if (confirmar === true) {

        listas.splice(indice, 1);

        mostrarListas();
    }
}



function criarTarefa(indiceLista, inputTarefa) {

    const descricao = inputTarefa.value;

    if (descricao === "") {
        alert("Digite uma tarefa.");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        descricao: descricao,
        concluida: false
    };

    listas[indiceLista].tarefas.push(novaTarefa);

    inputTarefa.value = "";

    mostrarListas();
}



function concluirTarefa(indiceLista, indiceTarefa) {

    const tarefa = listas[indiceLista].tarefas[indiceTarefa];

    if (tarefa.concluida === false) {
        tarefa.concluida = true;
    } else {
        tarefa.concluida = false;
    }

    mostrarListas();
}


function editarTarefa(indiceLista, indiceTarefa) {

    const tarefa = listas[indiceLista].tarefas[indiceTarefa];

    const novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null || novaDescricao === "") {
        return;
    }

    tarefa.descricao = novaDescricao;

    mostrarListas();
}


function excluirTarefa(indiceLista, indiceTarefa) {

    const confirmar = confirm("Deseja excluir esta tarefa?");

    if (confirmar === true) {

        listas[indiceLista].tarefas.splice(indiceTarefa, 1);

        mostrarListas();
    }
}

const btnTema = document.getElementById("btntema");

btnTema.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btnTema.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        btnTema.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
});
