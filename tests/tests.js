var assert = chai.assert;

suite('CSV', function() {
    setup(function(){
      if (typeof __html__ !== 'undefined') {
          document.body.innerHTML = __html__['tests/index.html'];
          original = document.getElementById('original');
          finaltable = document.getElementById('finaltable');
      }
    });
    test('Test de tabla con un solo un elemento', function() {
        original.value = "prueba1";
        calculate();
        assert.deepEqual(finaltable.innerHTML, '<table class="center" id="result"><tbody><tr><td>prueba1</td></tr></tbody></table>')
    });

});
