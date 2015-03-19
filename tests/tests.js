var assert = chai.assert;

suite('CSV', function() {
    setup(function(){
      if (typeof __html__ !== 'undefined') {
          document.body.innerHTML = __html__['tests/index.html'];
          original = document.getElementById('original');
          finaltable = document.getElementById('finaltable');
      }
    });

    test('Test de tabla con espacios vacios', function() {
        original.value = '1997,Ford,E350,"ac, abs, moon",3000.00 1999,Chevy,"Venture ""Extended Edition""","",4900.00 1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00';
        calculate();
        assert.deepEqual(finaltable.innerHTML,'<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>1997</td>                                  <td>Ford</td>                                  <td>E350</td>                                  <td>ac, abs, moon</td>                                  <td>3000.00 1999</td>                                  <td>Chevy</td>                                  <td>Venture </td>                                  <td>Extended Edition</td>                                  <td></td>                                  <td></td>                                  <td>4900.00 1999</td>                                  <td>Chevy</td>                                  <td>Venture </td>                                  <td>Extended Edition, Very Large</td>                                  <td></td>                                  <td></td>                                  <td>5000.00</td>              </tr>\n</tbody></table>')
    });

    test('Test de tabla con error', function() {
        original.value = '1997,Ford,E350,"ac, abs, moon",3000.00 1999,Chevy,"Venture ""Extended Edition""","",4900.00 1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00';
        calculate();
        assert.isTrue(calculate.error, 'the tea has been served');        
    });
    
    test('Test de tabla con un solo un elemento', function() {
        original.value = "prueba1";
        calculate();
        assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>prueba1</td>              </tr>\n</tbody></table>')
    });
    
    test('Prueba en diferentes lineas', function() {
        original.value = 'prueba, en\ndiferentes\nlineas, "con , coma"';
        calculate();
        assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>prueba</td>                                  <td> en</td>              </tr>\n<tr class="error">                    <td>diferentes</td>              </tr>\n<tr>                    <td>lineas</td>                                  <td>con , coma</td>              </tr>\n</tbody></table>')
    });

    test('Test con varios elementos, comillas escapadas y comas entre comillas', function() {
        original.value = 'el libro de O\"Reilly,el numero 7,2,"el numero 7,2","frase con , comas, en medio"';
        calculate();
        assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>el libro de O"Reilly</td>                                  <td>el numero 7</td>                                  <td>2</td>                                  <td>el numero 7,2</td>                                  <td>frase con , comas, en medio</td>              </tr>\n</tbody></table>')
    });

   test('Prueba almacenamiento web local', function(){
      if (window.localStorage)
      assert.deepEqual(localStorage.original, 'el libro de O\"Reilly,el numero 7,2,"el numero 7,2","frase con , comas, en medio"');
    });
});
