const examples = {
  laravel: { manifest: 'composer.json', command: 'php artisan serve', ready: 'Servidor Laravel iniciado · http://localhost:8000' },
  node: { manifest: 'package.json', command: 'npm run dev', ready: 'Vite pronto · http://localhost:5173' },
  service: { manifest: 'package.json', command: 'node server.js', ready: 'Serviço local iniciado · http://localhost:3000' }
};

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

function stop() {
  clearTimeout(timer);
  running = false;
  log.querySelectorAll('.is-typing').forEach(line => line.classList.remove('is-typing'));
  log.setAttribute('aria-busy', 'false');
  state.textContent = 'PRONTO';
  state.classList.remove('is-running', 'is-starting');
  run.innerHTML = 'Executar simulação <span aria-hidden="true">↗</span>';
}

function start() {
  stop();
  running = true;
  log.replaceChildren();
  log.setAttribute('aria-busy', 'true');
  state.textContent = 'INICIANDO';
  state.classList.add('is-starting');
  run.innerHTML = 'Parar simulação <span aria-hidden="true">■</span>';
  const example = examples[selected];
  addLine('Workspace local / ' + buttons.find(button => button.dataset.project === selected).querySelector('span:last-child').firstChild.textContent);
  addLine(example.manifest + ' detectado. Ambiente identificado.');
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
      state.textContent = 'EXECUTANDO';
      state.classList.remove('is-starting');
      state.classList.add('is-running');
      addLine(example.ready, 'terminal-result', '✓');
      addLine('Saída de exemplo · execução simulada.');
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
  addLine(`${examples[key].manifest} encontrado. Projeto pronto.`);
  if (autoplay) start();
}

buttons.forEach(button => button.addEventListener('click', () => selectProject(button.dataset.project)));
run.addEventListener('click', () => {
  if (running) {
    stop();
    addLine('Processo encerrado na simulação.');
  } else start();
});
reset.addEventListener('click', () => selectProject(selected, false));
// A single introductory sequence; never loops or executes real commands.
if (!reducedMotion.matches) timer = setTimeout(start, 800);
