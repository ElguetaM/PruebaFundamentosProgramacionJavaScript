const search = $("#button");
let errorId = document.querySelector("#errorId");
let imageHero = document.querySelector("#imageHero");
let nameHero = document.querySelector(".nameHero");
let connections = document.querySelector(".connections");
let publisher = document.querySelector(".publisher");
let occupation = document.querySelector(".occupation");
let first = document.querySelector(".first");
let height = document.querySelector(".height");
let weight = document.querySelector(".weight");
let aliases = document.querySelector(".aliases");
let cardHero = document.querySelector(".cardHero");

search.click("submit", function (e) {
  $("#collapseExample").show("slow");
  $("html, body").animate({ scrollTop: $(".footer").offset().top }, 1000);
  e.preventDefault();

  limpiarErrores();
  let id = document.querySelector("#inputsearch").value;
  let resultado = validar(id);

  function validar(id) {
    const caracter = /[1-9]/gim;
    if (caracter.test(id)) {
      $.ajax({
        url: `https://www.superheroapi.com/api.php/3525635500807579/${id}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
          if (result.response === "success") {
            $("#imageHero").attr("src", `${result.image.url}`);
            nameHero.innerHTML = `${result.name}`;
            connections.innerHTML = `${result.connections["group-affiliation"]}`;
            publisher.innerHTML = `${result.biography.publisher}`;
            occupation.innerHTML = `${result.work.occupation}`;
            first.innerHTML = `${result.biography["first-appearance"]}`;
            height.innerHTML = `${result.appearance.height.join(" - ")}`;
            weight.innerHTML = `${result.appearance.weight.join(" - ")}`;
            aliases.innerHTML = `${result.biography.aliases}`;

            let NN = [];
            for (let n in result.powerstats) {
              NN.push({
                label: n,
                y: parseInt(result.powerstats[n]),
              });
            }

            let chart = new CanvasJS.Chart("chartContainer", {
              title: {
                text: `Estadisticas ${result.name}`,
              },

              axisY: {
                title: "Fuerza",
              },

              data: [
                {
                  color: "#88A0BF",
                  type: "column",
                  indexLabel: "{y}",
                  legendMarkerColor: "grey",
                  legendText: "{label}",
                  dataPoints: NN,
                },
              ],
            });
            chart.render();
          } else {
            alert("No se encontro el heroe con ese id");
          }
        },
        error: function (error) {
          errorId.innerHTML = "ID no existe";
          alert("No existe heroe con ese ID");
        },
      });
    } else {
      errorId.innerHTML = "ID no valido";
      alert("Ingrese solo numeros");
    }
  }
});
function limpiarErrores() {
  errorId.innerHTML = "";
}

//let imageHero = $("div.scroll > img src ");
