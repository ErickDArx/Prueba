$(document).ready(function () {
  $("#sub").click(function () {
    let anio = $("#anio").val();
    res = anio % 100 === 0 ? anio % 400 === 0 : anio % 4 === 0;
    if (res) {
      $("#res").text("Año bisiesto");
    } else {
      $("#res").text("Año no bisiesto");
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

    const setB = new Set(B),
      setA = new Set(A);

    let union = [...new Set([...A, ...B])];
    let intersect = [...new Set([...A].filter((value) => B.includes(value)))];
    let except = A.filter((value) => !B.includes(value));
    let symmetricDifference = [
      ...A.filter((x) => setB.has(x), ...B.filter((x) => !setA.has(x))),
    ];

    $("#A").text(A);
    $("#B").text(B);
    $("#union").text(union);
    $("#inter").text(intersect);
    $("#except").text(except);
    $("#diff").text(symmetricDifference);
  });

  function tipoCambio() {

    var myUrl = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43936/datos/2022-03-23/2022-03-25";
    var proxy = "https://cors-anywhere.herokuapp.com/";

    $.ajax({
      url: proxy + myUrl,
      method: "GET",
      jsonp: "callback",
      dataType: "jsonp",
      async: true,
      crossDomain: true,
      contentType: 'application/json',
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*",
        "Bmx-Token":
          "4768e9e0708c1401328864afd3f9a09b3af08c6106f471cc9caa072ef194ed0d",
      },
      success: function (response) {
        var series = response.bmx.series;
        //Se carga una tabla con los registros obtenidos

        for (var i in series) {
          var serie = series[i];
        }

        $("#result > thead").append("<td>" + serie.titulo + "</td>");
        $("#result > tbody").append(
          "<td>" +
            serie.datos[0].fecha +
            "<td>" +
            serie.datos[0].dato +
            "</td> </td>"
        );
      },
    });
  }

  $(document).ready(tipoCambio);
});
