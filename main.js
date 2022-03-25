$(document).ready(function () {
  $("#sub").click(function () {
    let anio = $("#anio").val();
    res = anio % 100 === 0 ? anio % 400 === 0 : anio % 4 === 0;
    if (res) {
      $("#res").text("Año bisiesto").addClass("text-success");
    } else {
      $("#res").text("Año no bisiesto").addClass("text-danger");
    }
  });

  myrow = [];
  mycolumn = [];

  $("#table").click(function () {
    $.ajax({
      url: "http://127.0.0.1:5500/index.html",
      type: "GET",
      async: true,
      success: function (res) {
        myrow.push($("#valor1").val());
        mycolumn.push($("#valor2").val());

        $("#table_test > thead").append("<td>" + myrow.pop() + "</td>");
        $("#table_test > tbody").append("<td>" + mycolumn.pop() + "</td>");
      },
      error: function () {
        alert("Algo salio mal :c");
      },
    });
  });

  $("#random").click(function () {
    let random = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * (100 - 1) + 1)
    );

    for (var x = 0; x < random.length; x++) {
      for (var y = 0; y < random.length - x - 0; y++) {
        if (random[y] < random[y - 1]) {
          tmp = random[y - 1];
          random[y - 1] = random[y];
          random[y] = tmp;
        }
      }
    }

    let sortArray = random.map(function (x) {
      return x;
    });

    $("#sort").text(sortArray);
  });

  $("#joins").click(function () {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let A = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
    let B = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
    let union = [...new Set([...A, ...B])];
    let intersect = new Set([...A].filter((value) => B.includes(value)));
    let except = A.filter((value) => !B.includes(value));
    let symmetricDifference = new Set(
      [...union].filter((x) => !intersect.has(x))
    );
    alert(symmetricDifference);
  });

  $("#tipoCambio").click(function () {
    $.ajax({
      url: "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP74665,SF61745,SF60634,SF43773/datos/oportuno?token=4768e9e0708c1401328864afd3f9a09b3af08c6106f471cc9caa072ef194ed0d",
      dataType: "jsonp", //Se utiliza JSONP para realizar la consulta cross-site
      success: function (response) {
        //Handler de la respuesta
        var series = response.bmx.series;

        //Se carga una tabla con los registros obtenidos
        for (var i in series) {
          var serie = series[i];
          var reg =
            "" +
            serie.titulo +
            "" +
            serie.datos[0].fecha +
            "" +
            serie.datos[0].dato +
            "";
          $("#result").append(reg);
        }
      },
    });
  });
});
