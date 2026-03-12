const container = document.getElementById("produtos");

let listaProdutos = [];

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTnUpUw17uwwwrXxiFAyl1sytEI--NVaI0iTHJwkPcpm1VChv4AVG-uamgrrjD4JDsphg_mtnsAB7e/pub?output=csv";

async function carregarProdutos() {
  const response = await fetch(CSV_URL + "&v=" + Date.now());
  const csv = await response.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  listaProdutos = parsed.data;

  exibirProdutos(listaProdutos);
}

function exibirProdutos(produtos) {
  container.innerHTML = "";

  produtos.forEach((p, index) => {
    container.innerHTML += `
    
    <a href="produto.html?id=${index}" class="card">

      <img src="${p.imagem}" alt="${p.nome}">

      <h4>${p.nome}</h4>

      ${
        p.promocao
          ? `<div class="preco">
             <span class="preco-antigo">${p.preco}</span>
             <span class="preco-novo">${p.promocao}</span>
           </div>`
          : `<strong class="preco-normal">${p.preco}</strong>`
      }

    </a>
    
    `;
  });
}

function filtrarCategoria(cat) {
  if (cat == "todos") {
    exibirProdutos(listaProdutos);
  } else {
    const filtrados = listaProdutos.filter(
      (p) => p.categoria.toLowerCase() == cat,
    );

    exibirProdutos(filtrados);
  }
}

// Pesquisar produto
function pesquisarProduto() {
  const termo = document.getElementById("barraPesquisa").value.toLowerCase();
  const filtrados = listaProdutos.filter((p) =>
    p.nome.toLowerCase().includes(termo),
  );
  exibirProdutos(filtrados);
}

carregarProdutos();
