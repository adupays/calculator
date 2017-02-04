// logs des valeurs
var inputs = [];
// logs des types
var logs = [];

// gestion du calcul de l'opération
function resolve() {
  inputs = [eval(inputs.join(''))];
  logs = ['int'];
  log(inputs.join(''));
}

// gestion du reset
function reset() {
  inputs = [];
  logs = [];
  log('');
}

// gestion du rendu
function log(val) {
  $('input').val(inputs.join(''));
}

// gestion des nombres
$('button[data-type="int"]').on('click', function() {
  var val = $(this).data('btn');
  inputs.push(val);
  logs.push('int');
  log();
});

// gestion du signe négatif
$('button[data-type="sign"]').on('click', function() {
  // commencer par un -
  if (!logs.length) {
    inputs.push('-');
    logs.push('sign');
  } else {
    // premier nombre négatif
    if (logs.indexOf('operator') === -1) {
      inputs.unshift('-');
      logs.unshift('sign');
    } else {
      // dernier nombre négatif
      for (var i = logs.length - 1; i >= 0; i--) {
        if (logs[i] !== 'operator') {
          continue;
        } else if (inputs[i] === '-') {
          // si deux moins se suivent => +
          inputs[i] = '+';
        } else {
          inputs.splice(i + 1, 0, "-");
        }
      }
    }
  }
  log();
});

// gestion des opérateurs
$('button[data-type="operator"]').on('click', function() {
  var val = $(this).data('btn');

  // si l'opération commence par un opérateur on commence par 0
  if (!inputs.length) {
    inputs = ['0', val];
    logs.push('int', 'operator');
  // si l'opération se termine par un opérateur, on le remplace par le nouveau
  } else if (logs[logs.length - 1] === 'operator') {
    inputs[inputs.length - 1] = val;
  // si un opérateur est déjà présent dans le calcul on effectue le calcul et on continue
  } else if (logs.indexOf('operator') !== -1) {
    resolve();
    inputs.push(val);
    logs.push('operator');
  // dans tous les autres cas on sauvegarde l'opérateur
  } else {
    inputs.push(val);
    logs.push('operator');
  }
  log();
});

// gestion des resets
$('button[data-type="reset"]').on('click', function() {
  if (inputs.length) {
    var val = $(this).data('btn');

    switch (val) {
      // soft reset: effacer le dernier nombre
      case 'soft':
        while (logs.length && logs[logs.length - 1] !== 'operator') {
          inputs.pop();
          logs.pop();
        }
        log();
      break
      // soft reset: effacer le dernier chiffre
      case 'del':
        inputs.pop();
        logs.pop();
        log();
      break
      // hard reset: tout effacer
      default:
        reset()
    }
  }
});

// calculer
$('button[data-type="resolve"]').on('click', function() {
  resolve()
});
