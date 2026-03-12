const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTnUpUw17uwwwrXxiFAyl1sytEI--NVaI0iTHJwkPcpm1VChv4AVG-uamgrrjD4JDsphg_mtnsAB7e/pub?output=csv";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(url)
  .then((res) => res.text())
  .then((csv) => {
    const dados = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    }).data;

    const produto = dados[id];

    document.getElementById("produto").innerHTML = `

<img src="${produto.imagem}">

<div class="info">

<h1>${produto.nome}</h1>
<br>

<div class="descricao">
<h3>Descrição</h3>
<p>${produto.descricao.replace(/\n/g, "<br>")}</p>
</div>
<br>

<h3>Valor</h3>
<p>${produto.preco}</p>
<br>

<a class="botao-whats"
href="https://wa.me/5599999999999?text=Olá quero o produto ${produto.nome}">
Comprar pelo WhatsApp
</a>

</div>

`;
  });
