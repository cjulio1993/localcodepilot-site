const examples = {
  laravel: { manifest: 'composer.json', command: 'php artisan serve' },
  node: { manifest: 'package.json', command: 'npm run dev' },
  service: { manifest: 'package.json', command: 'node server.js' }
};

const demoTranslations = {
  pt: {
    ready: 'PRONTO', starting: 'INICIANDO', running: 'EXECUTANDO',
    run: 'Executar simulação', stop: 'Parar simulação', workspace: 'Workspace local / ',
    detected: ' detectado. Ambiente identificado.', found: ' encontrado. Projeto pronto.',
    sample: 'Saída de exemplo · execução simulada.', stopped: 'Processo encerrado na simulação.',
    laravel: 'Servidor Laravel iniciado · http://localhost:8000',
    node: 'Vite pronto · http://localhost:5173', service: 'Serviço local iniciado · http://localhost:3000'
  },
  en: {
    ready: 'READY', starting: 'STARTING', running: 'RUNNING',
    run: 'Run simulation', stop: 'Stop simulation', workspace: 'Local workspace / ',
    detected: ' detected. Environment identified.', found: ' found. Project ready.',
    sample: 'Example output · simulated execution.', stopped: 'Process stopped in the simulation.',
    laravel: 'Laravel server started · http://localhost:8000',
    node: 'Vite ready · http://localhost:5173', service: 'Local service started · http://localhost:3000'
  },
  es: {
    ready: 'LISTO', starting: 'INICIANDO', running: 'EN EJECUCIÓN',
    run: 'Ejecutar simulación', stop: 'Detener simulación', workspace: 'Entorno local / ',
    detected: ' detectado. Entorno identificado.', found: ' encontrado. Proyecto listo.',
    sample: 'Salida de ejemplo · ejecución simulada.', stopped: 'Proceso detenido en la simulación.',
    laravel: 'Servidor Laravel iniciado · http://localhost:8000',
    node: 'Vite listo · http://localhost:5173', service: 'Servicio local iniciado · http://localhost:3000'
  }
};
const demoText = demoTranslations[document.documentElement.lang.split('-')[0]] || demoTranslations.pt;
const buttons = [...document.querySelectorAll('.demo-project')];
const manifest = document.querySelector('#demo-manifest');
const command = document.querySelector('#demo-command');
const log = document.querySelector('#demo-log');
const state = document.querySelector('#demo-state');
const run = document.querySelector('#demo-run');
const reset = document.querySelector('#demo-reset');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let selected = 'laravel';
let running = false;
let timer;

function addLine(message, className = 'terminal-result', prefix = '›') {
  const line = document.createElement('p');
  line.className = className;
  const prompt = document.createElement('span');
  prompt.className = 'console-prompt';
  prompt.textContent = prefix;
  const text = document.createTextNode(message);
  line.append(prompt, text);
  log.append(line);
  log.scrollTop = log.scrollHeight;
  return { line, text };
}

function setRunLabel(label, symbol) {
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = symbol;
  run.replaceChildren(document.createTextNode(label + ' '), icon);
}

function stop() {
  clearTimeout(timer);
  running = false;
  log.querySelectorAll('.is-typing').forEach(line => line.classList.remove('is-typing'));
  log.setAttribute('aria-busy', 'false');
  state.textContent = demoText.ready;
  state.classList.remove('is-running', 'is-starting');
  setRunLabel(demoText.run, '↗');
}

function start() {
  stop();
  running = true;
  log.replaceChildren();
  log.setAttribute('aria-busy', 'true');
  state.textContent = demoText.starting;
  state.classList.add('is-starting');
  setRunLabel(demoText.stop, '■');
  const example = examples[selected];
  addLine(demoText.workspace + buttons.find(button => button.dataset.project === selected).querySelector('span:last-child').firstChild.textContent);
  addLine(example.manifest + demoText.detected);
  const { line, text } = addLine('', 'terminal-command is-typing', '$');
  let index = 0;
  function type() {
    index = reducedMotion.matches ? example.command.length : index + 1;
    text.textContent = example.command.slice(0, index);
    if (index < example.command.length) {
      timer = setTimeout(type, 65);
      return;
    }
    line.classList.remove('is-typing');
    timer = setTimeout(() => {
      state.textContent = demoText.running;
      state.classList.remove('is-starting');
      state.classList.add('is-running');
      addLine(demoText[selected], 'terminal-result', '✓');
      addLine(demoText.sample);
      log.setAttribute('aria-busy', 'false');
    }, reducedMotion.matches ? 0 : 450);
  }
  type();
}

function selectProject(key, autoplay = true) {
  stop();
  selected = key;
  buttons.forEach(button => {
    const active = button.dataset.project === key;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  manifest.textContent = examples[key].manifest;
  command.textContent = examples[key].command;
  log.replaceChildren();
  addLine(examples[key].manifest + demoText.found);
  if (autoplay) start();
}

buttons.forEach(button => button.addEventListener('click', () => selectProject(button.dataset.project)));
run.addEventListener('click', () => {
  if (running) {
    stop();
    addLine(demoText.stopped);
  } else start();
});
reset.addEventListener('click', () => selectProject(selected, false));
// A single introductory sequence; never loops or executes real commands.
if (!reducedMotion.matches) timer = setTimeout(start, 800);
