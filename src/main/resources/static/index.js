function validarCampoVazio(campo) {
    if (campo.value === '') {
        campo.style.border = '2px solid red';
    } else {
        campo.style.border = '';
    }
}
var nomerepo = "";
var autorrepo = "";
var linkrepo = "";
var contadorCommits = 0;
var resumo = "";
var contadordias = 0;
var diascomit = 0;



function contadorDeCommits() {
    let valor = 0;

    function incrementar() {
        valor++;
    }

    function obterValor() {
        return valor;
    }

    return {
        incrementar: incrementar,
        obterValor: obterValor
    };
}





const form = document.querySelector("form");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const repositorio = extrairUsuarioRepositorio(document.getElementById("repositorio").value);
    const dataInicial = document.querySelector("#dataInicial").value;
    const dataFinal = document.querySelector("#dataFinal").value;
    const c = contadorDeCommits();
    //console.log(repositorio + " " + dataInicial + " " + dataFinal);
    buscarCommits(repositorio, dataInicial, dataFinal);
    buscarForks(repositorio);
    contarEstrelas(repositorio);
    calcularDiasComCommit(dataInicial, dataFinal);
    diascomCommit();
    
});

function extrairUsuarioRepositorio(linkGithub) {

    //Extrair a parte https://github.com do link
    if (linkGithub.startsWith("https://github.com")) {
        linkGithub = linkGithub.slice(19);
        const partes = linkGithub.split("/");
        linkrepo = "https://github.com/" + linkGithub
        autorrepo = partes[0];
        nomerepo = partes[1];
        return linkGithub;
    } else if (linkGithub.startsWith("github.com")) {
        linkGithub = linkGithub.slice(10);
        linkrepo = "https://github.com/" + linkGithub
        const partes = linkGithub.split("/");
        autorrepo = partes[0];
        nomerepo = partes[1];
        return linkGithub;
    } else {
        const partes = linkGithub.split("/");
        autorrepo = partes[0];
        nomerepo = partes[1];
        linkrepo = "https://github.com/" + linkGithub
        return linkGithub;
    }

}


function buscarCommits(repositorio, dataInicial, dataFinal) {

    // Colocar no final da URL ? caso queira colocar mais parâmetros
    // Para separar os parâmetros, utilizar &
    // per_page = 100: demostra o máximo de itens que aparecem na página
    const url = `https://api.github.com/repos/${repositorio}/commits?since=${dataInicial}&until=${dataFinal}&per_page=100`;

    //Assíncrona: não vai travar a página. Caso exista uma resposta dessa chamada, ele vai executar o que tem dentro do then enquanto a execução da página continua.
    fetch(url).then(response => response.json()).then(commits => {
        // Demonstra no console do navegador os commits
        console.log(commits);
        contarCommits(commits);
    }).catch(error => {
        console.log(error);
    });
    console.log(new Date());
}

function contarCommits(commits) {
    const commitsPorDia = {};
    let diasComCommits = 0;
    commits.forEach(element => {
        // Procurará a data dentro do objeto
        // date.substr(0,10): pegará apenas a data, ou seja, sem a hora
        const dataCommit = element.commit.author.date.substr(0, 10);
        const mensagem = element.commit.message;


        // Verifica se existe dentro desse objeto esse atributo
        if (commitsPorDia[dataCommit]) {
            commitsPorDia[dataCommit].quantidade++;
            commitsPorDia[dataCommit].mensagem + "," + mensagem;
        }
        // Caso não existe, eu crio a quantidade = 1 e com a data do commit
        else {
            commitsPorDia[dataCommit] = { quantidade: 1, data: dataCommit, mensagem: mensagem };
            diasComCommits++;

        }
    });

    console.log(commitsPorDia);

    const commitsPorDiaArray = Object.keys(commitsPorDia).map(dataCommit => {
        return { data: dataCommit, quantidade: commitsPorDia[dataCommit].quantidade, mensagem: commitsPorDia[dataCommit].mensagem };
    })
    console.log(commitsPorDiaArray);
    mostrarTela(commitsPorDiaArray);
}

function buscarForks(repositorio) {

    // Recebe o repositorio por parametro

    const url = `https://api.github.com/repos/${repositorio}/forks`;

    //recebe o jason e converte e retorna o tamanho do vetor das Forks
    fetch(url).then(response => response.json()).then(forks => {
        const quantidadeForks = forks.length;
        document.getElementById("qtdforks").textContent = `Quantidade de Forks do respositorio ${repositorio}: ${quantidadeForks}`;

    });

}

function contarEstrelas(repositorio) {
    const url = `https://api.github.com/repos/${repositorio}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const estrelas = data.stargazers_count;
            document.getElementById("estrelas").textContent = `O repositório ${repositorio} tem ${estrelas} estrelas.`;
        })
        .catch(error => console.error(error));
}




function mostrarTela(commits) {
    var dias = 0;
    const dados = document.querySelector("#dados");

    // Cria uma tabela e adiciona a classe "tabela-commits"
    const tabela = document.createElement("table");
    tabela.classList.add("tabela-commits");

    // Cria a primeira linha da tabela com os cabeçalhos das colunas
    const cabecalho = tabela.createTHead().insertRow();
    const cabecalhoData = cabecalho.insertCell();
    cabecalhoData.innerHTML = "Data";
    const cabecalhoQuantidade = cabecalho.insertCell();
    cabecalhoQuantidade.innerHTML = "Quantidade";
    const cabecalhoMensagem = cabecalho.insertCell();
    cabecalhoMensagem.innerHTML = "Mensagem";

    // Adiciona as linhas da tabela para cada commit
    const corpoTabela = tabela.createTBody();
    commits.forEach(commit => {
        const linha = corpoTabela.insertRow();
        const celulaData = linha.insertCell();
        celulaData.innerHTML = commit.data.split('-').reverse().join('/'); //Colocando a data em um array e troca a posição, logo junta novamente usando /
        const celulaQuantidade = linha.insertCell();
        celulaQuantidade.innerHTML = commit.quantidade;
        contadorCommits = contadorCommits + commit.quantidade;


        const celulaMensagem = linha.insertCell();
        celulaMensagem.innerHTML = commit.mensagem;
        resumo = resumo + `Dia: ${commit.data.split('-').reverse().join('/')} - Houve ${commit.quantidade} de Commits\n`;
        dias++;

    });

    // Substitui o conteúdo de "dados" pela tabela
    diascomCommit(dias);
    dados.innerHTML = "";
    dados.appendChild(tabela);
    enviarFormulario();


}

function calcularDiasComCommit(dataInicial, dataFinal) {

    const day1 = new Date(dataFinal);
    const day2 = new Date(dataInicial);

    const difference = day1.getTime() - day2.getTime();
    const days = difference / (1000 * 3600 * 24);

    document.getElementById("tempo").innerHTML = `Dias disponíveis para a realização da atividade: ${days}`;
    diascomit = days;

    console.log(`Dias disponíveis: ${days}`);
    
}

function diascomCommit(qtd) {
    contadordias = qtd;

    // Exibir o número de linhas
    document.getElementById("dias").textContent = `Dias com Commits: ${qtd}`;
    

}

function calcularPercentual(totalDias, diasComCommits) {

    if (totalDias === 0) {
        return 0;
    }

    // Calcular o percentual de dias com commits
    const percentual = (diasComCommits / totalDias) * 100;
    return percentual.toFixed(2);
    
}



function enviarFormulario() {

    let dataInicial = document.querySelector("#dataInicial").value;
    let dataFinal = document.querySelector("#dataFinal").value;

    console.log(contadorCommits);
    let percentual = calcularPercentual(diascomit, contadordias).toString() + "%";
    console.log(percentual);
    var formData = {
        'autor': autorrepo,
        'repositorio': nomerepo,
        'link': linkrepo,
        'dataInicial': dataInicial,
        'dataFinal': dataFinal,
        'qtdCommits': contadorCommits,
        'percentual': percentual,
        'resumo': resumo
    };
    fetch('/repositorio/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}
