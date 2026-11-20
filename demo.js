// Real Alpha 9 screenshots with sample projects: a cover (project running)
// and four steps the visitor moves through at their own pace. No autoplay.
const realDemo = document.getElementById('demo-real');

if (realDemo) {
  const steps = [
    { file: 'demo-1-parado', mobile: [604, 85] },
    { file: 'demo-2-confirmacao', mobile: [560, 308] },
    { file: 'demo-3-rodando', mobile: [494, 86] },
    { file: 'demo-4-projetos', mobile: [308, 303] }
  ];

  const copy = {
    pt: {
      counter: (current, total) => `${current} de ${total}`,
      names: ['Projeto parado', 'Confirme antes de iniciar', 'Site respondendo', 'Abra o site ou veja os logs'],
      captions: [
        'Instale as dependências para poder iniciar este projeto.',
        'Confira o comando antes da primeira execução.',
        'O projeto está rodando e o site está respondendo.',
        'Na lista de Projetos, abra o site, veja os logs ou acesse Detalhes técnicos.'
      ],
      alts: [
        'loja-exemplo Parado, com aviso de dependências de Node.js ausentes e botão Instalar dependências.',
        'Janela Iniciar este projeto? com a pasta C:\\projetos-exemplo\\loja-exemplo, o comando npm run dev, o que ele executa (node server.js) e os botões Cancelar e Iniciar.',
        'loja-exemplo Rodando, Site respondendo em localhost:4321, com Abrir site, Ver logs e Parar.',
        'Cartão de loja-exemplo Rodando, com Abrir site, Ver logs, Parar e Detalhes técnicos.'
      ]
    },
    en: {
      counter: (current, total) => `${current} of ${total}`,
      names: ['Stopped project', 'Confirm before starting', 'Site responding', 'Open the site or view logs'],
      captions: [
        'Install the dependencies so you can start this project.',
        'Check the command before the first run.',
        'The project is running and the site is responding.',
        'In the Projects list, open the site, view the logs or open the technical details.'
      ],
      alts: [
        'loja-exemplo Stopped (Parado), with a notice that Node.js dependencies are missing and the Install dependencies button (Instalar dependências).',
        'Start this project? window (Iniciar este projeto?) with the folder C:\\projetos-exemplo\\loja-exemplo, the npm run dev command, what it runs (node server.js), and the Cancel and Start buttons.',
        'loja-exemplo Running (Rodando), Site responding on localhost:4321, with Open site, View logs and Stop.',
        'loja-exemplo card Running, with Open site, View logs, Stop and Technical details (Detalhes técnicos).'
      ]
    },
    es: {
      counter: (current, total) => `${current} de ${total}`,
      names: ['Proyecto detenido', 'Confirma antes de iniciar', 'Sitio respondiendo', 'Abre el sitio o mira los logs'],
      captions: [
        'Instala las dependencias para poder iniciar este proyecto.',
        'Revisa el comando antes de la primera ejecución.',
        'El proyecto está en ejecución y el sitio está respondiendo.',
        'En la lista de Proyectos, abre el sitio, mira los logs o accede a los detalles técnicos.'
      ],
      alts: [
        'loja-exemplo Detenido (Parado), con el aviso de que faltan dependencias de Node.js y el botón Instalar dependencias (Instalar dependências).',
        'Ventana ¿Iniciar este proyecto? (Iniciar este projeto?) con la carpeta C:\\projetos-exemplo\\loja-exemplo, el comando npm run dev, lo que ejecuta (node server.js) y los botones Cancelar e Iniciar.',
        'loja-exemplo en ejecución (Rodando), Sitio respondiendo en localhost:4321, con Abrir sitio, Ver logs y Detener.',
        'Tarjeta de loja-exemplo en ejecución, con Abrir sitio, Ver logs, Detener y Detalles técnicos (Detalhes técnicos).'
      ]
    }
  };

  const language = document.documentElement.lang.toLowerCase();
  const text = language.startsWith('en') ? copy.en : language.startsWith('es') ? copy.es : copy.pt;

  const image = document.getElementById('real-demo-image');
  const mobile = document.getElementById('real-demo-mobile');
  const counter = document.getElementById('real-demo-counter');
  const title = document.getElementById('real-demo-title');
  const caption = document.getElementById('real-demo-caption');
  const start = document.getElementById('real-demo-start');
  const previous = document.getElementById('real-demo-prev');
  const next = document.getElementById('real-demo-next');
  const stepButtons = [...realDemo.querySelectorAll('.real-demo-steps button')];
  // "demo/" on the Portuguese page, "../demo/" on /en/ and /es/.
  const base = image.getAttribute('src').replace(/[^/]*$/, '');
  let current = -1;

  function show(index, moveFocus) {
    current = index;
    const step = steps[index];
    image.src = `${base}${step.file}.jpg`;
    image.alt = text.alts[index];
    mobile.srcset = `${base}${step.file}-m.jpg`;
    mobile.width = step.mobile[0];
    mobile.height = step.mobile[1];
    counter.hidden = false;
    counter.textContent = text.counter(index + 1, steps.length);
    title.textContent = `${index + 1}. ${text.names[index]}`;
    caption.textContent = text.captions[index];
    start.hidden = true;
    previous.hidden = false;
    next.hidden = false;
    previous.disabled = index === 0;
    next.disabled = index === steps.length - 1;
    stepButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    if (moveFocus) title.focus();
  }

  start.hidden = false;
  stepButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => show(Number(button.dataset.step), true));
  });
  start.addEventListener('click', () => show(0, true));
  previous.addEventListener('click', () => { if (current > 0) show(current - 1, false); });
  next.addEventListener('click', () => { if (current < steps.length - 1) show(current + 1, false); });
}
