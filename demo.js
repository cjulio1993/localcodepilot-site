// Interactive replica of the LocalCodePilot desktop app: six pages sharing one state.
// Everything is simulated in the browser; no command is ever executed.
(() => {
  const root = document.getElementById('app-demo');
  if (!root) return;

  const L = {
    pt: {
      nav: { overview: 'Visão geral', projects: 'Projetos', processes: 'Processos', containers: 'Containers', help: 'Ajuda', settings: 'Configurações' },
      groupWork: 'Trabalho', groupApp: 'Aplicativo', menu: 'Menu do aplicativo',
      search: { overview: 'Buscar projeto...', projects: 'Buscar por nome...', processes: 'Buscar processo...', containers: 'Buscar projeto ou serviço', help: 'Ex.: porta, logs, Docker', settings: 'Buscar configuração...' },
      running: 'Rodando', problem: 'Com problema', stopped: 'Parado', stoppedGroup: 'Parados', starting: 'Iniciando',
      installing: 'Instalando dependências', stopping: 'Parando', responding: 'Site respondendo', all: 'Todos',
      start: 'Iniciar', stop: 'Parar', restart: 'Reiniciar', open: 'Abrir site', logs: 'Ver logs', hideLogs: 'Ocultar logs',
      install: 'Instalar dependências', missing: 'Instale as dependências de: Node.js', compose: 'Roda com containers',
      details: 'Detalhes técnicos', hideDetails: 'Ocultar detalhes técnicos', folder: 'Pasta', command: 'Comando', runs: 'Executa', port: 'Porta',
      favAdd: 'Adicionar aos favoritos', favRemove: 'Remover dos favoritos',
      overviewSub: 'O que está rodando, o que precisa de atenção e o que está parado.',
      projectsCount: (n) => `${n} projetos`, addFolder: 'Adicionar pasta', refresh: 'Atualizar', searching: 'Procurando projetos...',
      noFilter: 'Nenhum projeto neste filtro.', noName: 'Nenhum projeto com esse nome.', refreshed: 'Lista atualizada: 4 projetos.',
      folderNotice: 'Na demonstração, nenhuma pasta é aberta.', openNotice: 'Na demonstração, nenhum site é aberto.',
      processesSub: (n) => `${n} comando(s) detectado(s) em seus projetos`, inRun: 'Em execução', ready: 'Pronto',
      services: (n) => `${n} serviço(s)`, stopEnv: 'Parar ambiente', startEnv: 'Iniciar ambiente', server: 'Servidor',
      openIn: (name) => `Abrir ${name} no navegador`, output: (n) => `Saída (${n})`,
      engine: 'Docker · Compose disponível', file: 'Arquivo', image: 'Imagem', ports: 'Portas declaradas', actions: 'Ações',
      stopServices: 'Parar serviços', copyLogs: 'Copiar logs', copied: 'Logs copiados (simulação).',
      containerTitle: 'Confirmar ação de container', containerText: 'Esta ação altera o ambiente de containers do projeto.',
      willStop: 'Serão parados: db, web', volumesKept: 'Os containers listados serão parados. Os volumes não serão removidos.',
      confirmRun: 'Confirmar e executar', cancel: 'Cancelar', close: 'Fechar',
      confirmTitle: 'Iniciar este projeto?',
      confirmText: 'Confira a pasta e o comando que o LocalCodePilot vai executar. Os arquivos do projeto podem mudar depois desta confirmação.',
      helpSub: 'Encontre um projeto, confira seu estado e escolha a próxima ação. Para investigar, abra Detalhes ou Ver logs.',
      problems: (n) => `${n} projeto com problema`, seeOverview: 'Ver na Visão geral', noProblems: 'Nenhum problema encontrado.',
      question: 'Qual é a sua dúvida?', noResult: 'Nenhum resultado para essa busca.',
      topics: [
        ['first', 'Primeiros passos', 'Em Projetos, confira as pastas examinadas. Use Adicionar pasta se faltar uma; use Atualizar para refazer a busca. Busque pelo nome ou filtre por Rodando, Com problema e Parados. Antes de confirmar uma instalação ou uma ação do Compose, confira o comando e a pasta em que ele será executado.', 'projects', 'Abrir Projetos'],
        ['site', 'O site não abre', 'Confira se o projeto está Rodando e veja o selo ao lado do endereço. Se aparecer Site sem resposta, abra Ver logs e procure a primeira mensagem de erro.', 'overview', 'Abrir Visão geral'],
        ['port', 'Porta ocupada', 'Quando outro programa usa a porta, o projeto não inicia e o cartão diz qual porta está ocupada. Encerre o outro programa ou inicie o projeto em uma porta alternativa.', 'processes', 'Abrir Processos'],
        ['engine', 'Docker ou Podman parado', 'O LocalCodePilot não instala nem inicia o motor de containers. Abra o Docker ou o Podman e volte para Containers.', 'containers', 'Abrir Containers'],
        ['states', 'Entender os estados', 'Rodando: o projeto está em execução. Iniciando: o comando começou e o app espera a resposta. Parado: nada está em execução. Com problema: falta algo, e o cartão diz o quê e qual ação resolve.', 'overview', 'Abrir Visão geral']
      ],
      updates: 'Atualizações', check: 'Verificar se há atualizações', checking: 'Consultando as versões disponíveis', upToDate: 'Você está usando a versão mais recente.',
      lastCheck: 'Última consulta concluída: agora', autoCheck: 'A consulta automática acontece uma vez por dia ao abrir o app.',
      languages: 'Linguagens neste computador', languagesSub: 'Encontradas neste computador e usadas pelos seus projetos.', found: 'Instalada',
      history: 'Histórico de logs', historyText: 'Senhas e tokens em formatos conhecidos aparecem como •••• nos logs salvos. Os logs salvos são apagados depois de 30 dias.',
      clear: 'Limpar histórico', cleared: 'Histórico apagado.', savedLogs: (n) => `${n} arquivos de log salvos`, noSaved: 'Nenhum log salvo.',
      empty: 'Nenhuma saída ainda.', installed: 'Dependências instaladas.', isRunning: 'está rodando.', wasStopped: 'foi parado.', logsOf: 'Logs'
    },
    en: {
      nav: { overview: 'Overview', projects: 'Projects', processes: 'Processes', containers: 'Containers', help: 'Help', settings: 'Settings' },
      groupWork: 'Work', groupApp: 'App', menu: 'App menu',
      search: { overview: 'Search projects...', projects: 'Search by name...', processes: 'Search processes...', containers: 'Search projects or services', help: 'E.g. port, logs, Docker', settings: 'Search settings...' },
      running: 'Running', problem: 'Needs attention', stopped: 'Stopped', stoppedGroup: 'Stopped', starting: 'Starting',
      installing: 'Installing dependencies', stopping: 'Stopping', responding: 'Site responding', all: 'All',
      start: 'Start', stop: 'Stop', restart: 'Restart', open: 'Open site', logs: 'View logs', hideLogs: 'Hide logs',
      install: 'Install dependencies', missing: 'Install the dependencies for: Node.js', compose: 'Runs with containers',
      details: 'Technical details', hideDetails: 'Hide technical details', folder: 'Folder', command: 'Command', runs: 'Runs', port: 'Port',
      favAdd: 'Add to favorites', favRemove: 'Remove from favorites',
      overviewSub: 'What is running, what needs attention and what is stopped.',
      projectsCount: (n) => `${n} projects`, addFolder: 'Add folder', refresh: 'Refresh', searching: 'Looking for projects...',
      noFilter: 'No projects in this filter.', noName: 'No project with that name.', refreshed: 'List refreshed: 4 projects.',
      folderNotice: 'In the demo, no folder is opened.', openNotice: 'In the demo, no site is opened.',
      processesSub: (n) => `${n} command(s) detected in your projects`, inRun: 'Running', ready: 'Ready',
      services: (n) => `${n} service(s)`, stopEnv: 'Stop environment', startEnv: 'Start environment', server: 'Server',
      openIn: (name) => `Open ${name} in the browser`, output: (n) => `Output (${n})`,
      engine: 'Docker · Compose available', file: 'File', image: 'Image', ports: 'Declared ports', actions: 'Actions',
      stopServices: 'Stop services', copyLogs: 'Copy logs', copied: 'Logs copied (simulated).',
      containerTitle: 'Confirm container action', containerText: "This action changes the project's container environment.",
      willStop: 'Will be stopped: db, web', volumesKept: 'The listed containers will be stopped. Volumes will not be removed.',
      confirmRun: 'Confirm and run', cancel: 'Cancel', close: 'Close',
      confirmTitle: 'Start this project?',
      confirmText: 'Check the folder and the command LocalCodePilot will run. The project files may change after this confirmation.',
      helpSub: 'Find a project, check its state and choose the next action. To investigate, open Details or View logs.',
      problems: (n) => `${n} project needs attention`, seeOverview: 'See in Overview', noProblems: 'No problems found.',
      question: 'What do you need help with?', noResult: 'No results for this search.',
      topics: [
        ['first', 'Getting started', 'In Projects, check the scanned folders. Use Add folder if one is missing; use Refresh to search again. Search by name or filter by Running, Needs attention and Stopped. Before confirming an installation or a Compose action, check the command and the folder it will run in.', 'projects', 'Open Projects'],
        ['site', 'The site does not open', 'Check that the project is Running and look at the badge next to the address. If it says Site not responding, open View logs and look for the first error message.', 'overview', 'Open Overview'],
        ['port', 'Port in use', 'When another program is using the port, the project does not start and the card says which port is taken. Close the other program or start the project on an alternative port.', 'processes', 'Open Processes'],
        ['engine', 'Docker or Podman stopped', 'LocalCodePilot does not install or start the container engine. Open Docker or Podman and come back to Containers.', 'containers', 'Open Containers'],
        ['states', 'Understanding the states', 'Running: the project is running. Starting: the command has begun and the app is waiting for a response. Stopped: nothing is running. Needs attention: something is missing, and the card says what and which action fixes it.', 'overview', 'Open Overview']
      ],
      updates: 'Updates', check: 'Check for updates', checking: 'Checking available versions', upToDate: 'You are using the latest version.',
      lastCheck: 'Last check completed: just now', autoCheck: 'The automatic check runs once a day when the app opens.',
      languages: 'Languages on this computer', languagesSub: 'Found on this computer and used by your projects.', found: 'Installed',
      history: 'Log history', historyText: 'Passwords and tokens in known formats appear as •••• in saved logs. Saved logs are deleted after 30 days.',
      clear: 'Clear history', cleared: 'History cleared.', savedLogs: (n) => `${n} saved log files`, noSaved: 'No saved logs.',
      empty: 'No output yet.', installed: 'Dependencies installed.', isRunning: 'is running.', wasStopped: 'was stopped.', logsOf: 'Logs'
    },
    es: {
      nav: { overview: 'Resumen', projects: 'Proyectos', processes: 'Procesos', containers: 'Contenedores', help: 'Ayuda', settings: 'Configuración' },
      groupWork: 'Trabajo', groupApp: 'Aplicación', menu: 'Menú de la aplicación',
      search: { overview: 'Buscar proyecto...', projects: 'Buscar por nombre...', processes: 'Buscar proceso...', containers: 'Buscar proyecto o servicio', help: 'Ej.: puerto, logs, Docker', settings: 'Buscar configuración...' },
      running: 'En ejecución', problem: 'Con problema', stopped: 'Detenido', stoppedGroup: 'Detenidos', starting: 'Iniciando',
      installing: 'Instalando dependencias', stopping: 'Deteniendo', responding: 'Sitio respondiendo', all: 'Todos',
      start: 'Iniciar', stop: 'Detener', restart: 'Reiniciar', open: 'Abrir sitio', logs: 'Ver logs', hideLogs: 'Ocultar logs',
      install: 'Instalar dependencias', missing: 'Instala las dependencias de: Node.js', compose: 'Se ejecuta con contenedores',
      details: 'Detalles técnicos', hideDetails: 'Ocultar detalles técnicos', folder: 'Carpeta', command: 'Comando', runs: 'Ejecuta', port: 'Puerto',
      favAdd: 'Añadir a favoritos', favRemove: 'Quitar de favoritos',
      overviewSub: 'Qué está en ejecución, qué necesita atención y qué está detenido.',
      projectsCount: (n) => `${n} proyectos`, addFolder: 'Añadir carpeta', refresh: 'Actualizar', searching: 'Buscando proyectos...',
      noFilter: 'Ningún proyecto en este filtro.', noName: 'Ningún proyecto con ese nombre.', refreshed: 'Lista actualizada: 4 proyectos.',
      folderNotice: 'En la demostración no se abre ninguna carpeta.', openNotice: 'En la demostración no se abre ningún sitio.',
      processesSub: (n) => `${n} comando(s) detectado(s) en tus proyectos`, inRun: 'En ejecución', ready: 'Listo',
      services: (n) => `${n} servicio(s)`, stopEnv: 'Detener entorno', startEnv: 'Iniciar entorno', server: 'Servidor',
      openIn: (name) => `Abrir ${name} en el navegador`, output: (n) => `Salida (${n})`,
      engine: 'Docker · Compose disponible', file: 'Archivo', image: 'Imagen', ports: 'Puertos declarados', actions: 'Acciones',
      stopServices: 'Detener servicios', copyLogs: 'Copiar logs', copied: 'Logs copiados (simulación).',
      containerTitle: 'Confirmar acción de contenedor', containerText: 'Esta acción cambia el entorno de contenedores del proyecto.',
      willStop: 'Se detendrán: db, web', volumesKept: 'Los contenedores listados se detendrán. Los volúmenes no se eliminarán.',
      confirmRun: 'Confirmar y ejecutar', cancel: 'Cancelar', close: 'Cerrar',
      confirmTitle: '¿Iniciar este proyecto?',
      confirmText: 'Revisa la carpeta y el comando que LocalCodePilot va a ejecutar. Los archivos del proyecto pueden cambiar después de esta confirmación.',
      helpSub: 'Encuentra un proyecto, revisa su estado y elige la siguiente acción. Para investigar, abre Detalles o Ver logs.',
      problems: (n) => `${n} proyecto con problema`, seeOverview: 'Ver en el Resumen', noProblems: 'No se encontraron problemas.',
      question: '¿Cuál es tu duda?', noResult: 'No hay resultados para esta búsqueda.',
      topics: [
        ['first', 'Primeros pasos', 'En Proyectos, revisa las carpetas examinadas. Usa Añadir carpeta si falta una; usa Actualizar para buscar de nuevo. Busca por nombre o filtra por En ejecución, Con problema y Detenidos. Antes de confirmar una instalación o una acción de Compose, revisa el comando y la carpeta en la que se ejecutará.', 'projects', 'Abrir Proyectos'],
        ['site', 'El sitio no abre', 'Comprueba que el proyecto está En ejecución y mira la etiqueta junto a la dirección. Si dice Sitio sin respuesta, abre Ver logs y busca el primer mensaje de error.', 'overview', 'Abrir Resumen'],
        ['port', 'Puerto ocupado', 'Cuando otro programa usa el puerto, el proyecto no inicia y la tarjeta indica qué puerto está ocupado. Cierra el otro programa o inicia el proyecto en un puerto alternativo.', 'processes', 'Abrir Procesos'],
        ['engine', 'Docker o Podman detenido', 'LocalCodePilot no instala ni inicia el motor de contenedores. Abre Docker o Podman y vuelve a Contenedores.', 'containers', 'Abrir Contenedores'],
        ['states', 'Entender los estados', 'En ejecución: el proyecto está corriendo. Iniciando: el comando empezó y la app espera la respuesta. Detenido: no hay nada en ejecución. Con problema: falta algo, y la tarjeta dice qué y qué acción lo resuelve.', 'overview', 'Abrir Resumen']
      ],
      updates: 'Actualizaciones', check: 'Buscar actualizaciones', checking: 'Consultando las versiones disponibles', upToDate: 'Estás usando la versión más reciente.',
      lastCheck: 'Última consulta: ahora', autoCheck: 'La consulta automática se hace una vez al día al abrir la app.',
      languages: 'Lenguajes en este equipo', languagesSub: 'Encontrados en este equipo y usados por tus proyectos.', found: 'Instalado',
      history: 'Historial de logs', historyText: 'Las contraseñas y tokens en formatos conocidos aparecen como •••• en los logs guardados. Los logs guardados se eliminan después de 30 días.',
      clear: 'Borrar historial', cleared: 'Historial borrado.', savedLogs: (n) => `${n} archivos de log guardados`, noSaved: 'No hay logs guardados.',
      empty: 'Todavía no hay salida.', installed: 'Dependencias instaladas.', isRunning: 'está en ejecución.', wasStopped: 'se detuvo.', logsOf: 'Logs'
    }
  };
  const t = L[document.documentElement.lang.split('-')[0]] || L.pt;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wait = (ms) => (reducedMotion.matches ? 0 : ms);

  const projects = [
    { id: 'backend', name: 'backend-api', tag: 'Laravel', color: 'red', state: 'running', port: 8000, pid: 18244, trusted: true, fav: true,
      folder: 'C:\\projetos\\backend-api', command: 'php artisan serve',
      output: ['INFO  Server running on [http://127.0.0.1:8000].', 'Press Ctrl+C to stop the server', 'GET / .......................... ~ 0.4ms', 'GET /api/produtos .............. ~ 1.2ms'] },
    { id: 'frontend', name: 'frontend-app', tag: 'Node.js', color: 'yellow', state: 'stopped', port: 5173, trusted: false,
      folder: 'C:\\projetos\\frontend-app', command: 'npm run dev', runs: 'vite',
      output: ['> frontend-app@0.1.0 dev', '> vite', 'VITE v5.4.2  ready in 412 ms', '➜  Local:   http://localhost:5173/'] },
    { id: 'dashboard', name: 'dashboard', tag: 'React', color: 'blue', state: 'problem', port: 3000, trusted: false,
      folder: 'C:\\projetos\\dashboard', command: 'npm start', runs: 'react-scripts start',
      output: ['Starting the development server...', 'Compiled successfully!', 'You can now view dashboard in the browser.', '  Local:  http://localhost:3000'] },
    { id: 'loja', name: 'loja', tag: 'Containers', color: 'blue', state: 'stopped', port: 8080, compose: true, trusted: false,
      folder: 'C:\\projetos\\loja', command: 'docker compose -f compose.yaml up -d',
      services: [{ name: 'db', image: 'docker.io/library/mariadb:11' }, { name: 'web', image: 'docker.io/library/nginx:alpine', ports: '8080:80' }],
      output: ['Network loja_default  Created', 'Container loja-db-1  Started', 'Container loja-web-1  Started'] }
  ];
  projects.forEach((p) => { p.log = p.state === 'running' ? [...p.output] : []; });

  const ui = { page: 'overview', filter: 'all', query: '', helpQuery: '', topic: 'first', details: new Set(), outputs: new Set(),
    logsFor: null, refreshing: false, update: 'idle', saved: 12 };
  const find = (id) => projects.find((p) => p.id === id);
  const apps = () => projects.filter((p) => !p.compose);

  // Tiny DOM builder: h('div.class', {attrs}, ...children)
  function h(spec, attrs, ...children) {
    const [tag, ...classes] = spec.split('.');
    const node = document.createElement(tag || 'div');
    if (classes.length) node.className = classes.join(' ');
    if (attrs && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) { children.unshift(attrs); attrs = null; }
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === false || v == null) continue;
      if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) if (c != null && c !== false) node.append(c instanceof Node ? c : document.createTextNode(c));
    return node;
  }
  const btn = (label, action, id, cls = '', extra = {}) =>
    h(`button.app-btn${cls ? '.' + cls.split(' ').join('.') : ''}`, { type: 'button', 'data-action': action, 'data-id': id, ...extra }, label);
  const icons = {
    overview: '<path d="M4 5h16v14H4zM4 10h16M10 10v9"/>', projects: '<path d="M3 7h6l2 2h10v10H3z"/>',
    processes: '<path d="m5 8 4 4-4 4M12 16h7"/>', containers: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
    help: '<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'
  };
  const icon = (name) => { const s = h('span.app-ico', { 'aria-hidden': 'true' }); s.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`; return s; };

  // ---------- shell ----------
  const body = root.querySelector('.app-body');
  const sidebar = h('nav.app-sidebar', { 'aria-label': t.menu });
  const topTitle = h('span');
  const search = h('span.app-search', { 'aria-hidden': 'true' });
  const content = h('div.app-content', { tabindex: '-1' });
  const logsPanel = h('div.app-logs', { hidden: true });
  const toast = h('p.app-toast', { role: 'status', hidden: true });
  const main = h('div.app-main', h('div.app-topbar', topTitle, search), content, logsPanel, toast);
  body.replaceChildren(sidebar, main);
  const dialogLayer = root.querySelector('#app-dialog');
  const announcer = h('p.app-sr', { 'aria-live': 'polite' });
  root.append(announcer);

  function renderSidebar() {
    const item = (page) => h('button.app-nav' + (ui.page === page ? '.is-active' : ''), {
      type: 'button', 'data-nav': page, 'aria-current': ui.page === page ? 'page' : false, title: t.nav[page]
    }, icon(page), h('span', t.nav[page]), page === 'projects' ? h('b', String(projects.length)) : null);
    sidebar.replaceChildren(
      h('div.app-brand', h('img', { src: root.querySelector('.app-title img').getAttribute('src'), alt: '', width: 24, height: 24 }), h('span', 'LocalCodePilot')),
      h('p.app-group', t.groupWork), item('overview'), item('projects'), item('processes'), item('containers'),
      h('p.app-group', t.groupApp), item('help'), item('settings'));
  }

  // ---------- shared pieces ----------
  const stateInfo = (p) => ({
    running: [t.running, 'is-ok'], problem: [t.problem, 'is-warn'], starting: [t.starting, 'is-busy'],
    installing: [t.installing, 'is-busy'], stopping: [t.stopping, 'is-busy']
  }[p.state] || [t.stopped, '']);
  const statusChip = (p) => { const [label, cls] = stateInfo(p); return h('span.app-state' + (cls ? '.' + cls : ''), h('i'), h('span', label)); };
  const tag = (p) => h(`span.app-tag.tag-${p.color}`, p.tag);
  const busy = (p) => ['starting', 'installing', 'stopping'].includes(p.state);

  function primaryActions(p) {
    if (busy(p)) return [h('button.app-btn.is-primary.is-busy', { type: 'button', disabled: true }, stateInfo(p)[0])];
    if (p.state === 'running') return [btn(t.open, 'open', p.id, 'is-primary'), btn(ui.logsFor === p.id ? t.hideLogs : t.logs, 'logs', p.id), btn(t.stop, 'stop', p.id, 'is-danger')];
    if (p.state === 'problem') return [btn(t.install, 'install', p.id, 'is-primary')];
    const list = [btn(t.start, 'start', p.id, 'is-primary')];
    if (p.log.length) list.push(btn(ui.logsFor === p.id ? t.hideLogs : t.logs, 'logs', p.id));
    return list;
  }
  function headNotes(p) {
    if (p.state === 'running') return [h('span.app-note.is-ok', t.responding), h('code', `localhost:${p.port}`)];
    if (p.state === 'problem') return [h('span.app-note', t.missing)];
    if (p.compose && p.state === 'stopped') return [h('span.app-note', t.compose)];
    return [];
  }

  // ---------- pages ----------
  const pages = {
    overview() {
      const n = (s) => projects.filter((p) => p.state === s).length;
      const groups = [
        [t.running, projects.filter((p) => ['running', 'starting', 'stopping'].includes(p.state))],
        [t.problem, projects.filter((p) => ['problem', 'installing'].includes(p.state))],
        [t.stoppedGroup, projects.filter((p) => p.state === 'stopped')]
      ];
      return [
        h('p.app-h1', t.nav.overview), h('p.app-sub', t.overviewSub),
        h('div.app-stats',
          h('button.app-stat', { type: 'button', 'data-filter-go': 'running' }, h('b.is-ok', String(n('running'))), h('span', t.running)),
          h('button.app-stat', { type: 'button', 'data-filter-go': 'problem' }, h('b.is-warn', String(n('problem'))), h('span', t.problem)),
          h('button.app-stat', { type: 'button', 'data-filter-go': 'stopped' }, h('b', String(n('stopped'))), h('span', t.stoppedGroup))),
        ...groups.filter(([, items]) => items.length).flatMap(([title, items]) => [
          h('p.app-section', `${title} `, h('span', `(${items.length})`)),
          ...items.map((p) => h('article.app-card', h('div.app-card-head', h('strong', p.name), tag(p), statusChip(p), ...headNotes(p)), h('div.app-actions', primaryActions(p))))
        ])
      ];
    },

    projects() {
      const counts = { all: projects.length, running: 0, problem: 0, stopped: 0 };
      projects.forEach((p) => { if (counts[p.state] !== undefined) counts[p.state]++; });
      const chip = (key, label) => h('button.app-chip' + (ui.filter === key ? '.is-active' : ''), { type: 'button', 'data-filter': key, 'aria-pressed': String(ui.filter === key) }, `${label} ${counts[key]}`);
      const input = h('input.app-input', { type: 'search', placeholder: t.search.projects, 'aria-label': t.search.projects, value: ui.query });
      const grid = h('div.app-grid');
      const fill = () => {
        const q = ui.query.trim().toLowerCase();
        const items = projects.filter((p) => (ui.filter === 'all' || p.state === ui.filter) && p.name.toLowerCase().includes(q));
        grid.replaceChildren(...(items.length ? items.map(projectCard) : [h('p.app-empty', q ? t.noName : t.noFilter)]));
      };
      input.addEventListener('input', () => { ui.query = input.value; fill(); });
      fill();
      return [
        h('div.app-pagehead', h('div', h('p.app-h1', t.nav.projects, h('small', t.projectsCount(projects.length)))),
          h('div.app-actions', btn(t.addFolder, 'add-folder', '', 'is-primary is-soft'),
            ui.refreshing ? h('button.app-btn.is-busy', { type: 'button', disabled: true }, t.searching) : btn(t.refresh, 'refresh', ''))),
        h('div.app-toolbar', input, h('div.app-chips', chip('all', t.all), chip('running', t.running), chip('problem', t.problem), chip('stopped', t.stoppedGroup))),
        grid
      ];
    },

    processes() {
      const list = apps();
      return [
        h('p.app-h1', t.nav.processes), h('p.app-sub', t.processesSub(list.length)),
        ...list.map((p) => {
          const running = p.state === 'running';
          const [label, cls] = running ? [t.inRun, 'is-ok'] : p.state === 'problem' ? [t.problem, 'is-warn'] : busy(p) ? [stateInfo(p)[0], 'is-busy'] : [t.ready, 'is-ok'];
          const envBtn = running ? btn(t.stopEnv, 'stop', p.id, 'is-danger') : p.state === 'stopped' ? btn(t.startEnv, 'start', p.id, 'is-primary') : null;
          const svcActions = busy(p) ? [] : running
            ? [btn(t.restart, 'restart', p.id), btn(t.stop, 'stop', p.id, 'is-danger')]
            : p.state === 'stopped' ? [btn(t.start, 'start', p.id, 'is-primary')] : [btn(t.install, 'install', p.id, 'is-primary')];
          const showOut = ui.outputs.has(p.id);
          return h('article.app-card.app-proc',
            h('div.app-proc-head', h('div', h('strong', p.name), h(`p.app-mini.${cls}`, `${label} · ${t.services(1)}`)), envBtn),
            h('div.app-svc',
              h('div.app-proc-head', h('div.app-card-head', h('span', t.server), statusChip(p)), h('div.app-actions', svcActions)),
              running ? h('button.app-link', { type: 'button', 'data-action': 'open', 'data-id': p.id }, `${t.openIn(p.name)} ↗`) : null,
              h('code.app-cmd', p.command),
              running ? h('code.app-cmd.is-muted', `PID ${p.pid}`) : null,
              p.log.length ? h('button.app-disclosure', { type: 'button', 'data-action': 'output', 'data-id': p.id, 'aria-expanded': String(showOut) }, `${showOut ? '▾' : '▸'} ${t.output(p.log.length)}`) : null,
              showOut ? h('div.app-out', p.log.map((line) => h('p', line))) : null));
        })
      ];
    },

    containers() {
      const p = find('loja');
      const running = p.state === 'running';
      return [
        h('p.app-h1', t.nav.containers), h('p.app-sub', h('span.app-dot.is-ok'), t.engine),
        h('article.app-card.app-proc',
          h('div.app-proc-head', h('div', h('strong', p.name), h('code.app-cmd.is-muted', p.folder)), statusChip(p)),
          h('p.app-mini', `${t.file}: compose.yaml`),
          ...p.services.map((s) => h('div.app-service',
            h('div.app-card-head', h('strong', s.name), running ? h('span.app-state.is-ok', h('i'), h('span', t.running)) : null),
            h('p.app-mini', `${t.image}: `, h('code', s.image)),
            s.ports ? h('p.app-mini', `${t.ports}: ${s.ports}`) : null)),
          h('p.app-label', t.actions),
          h('div.app-actions', busy(p) ? h('button.app-btn.is-primary.is-busy', { type: 'button', disabled: true }, stateInfo(p)[0])
            : running ? [btn(t.open, 'open', p.id, 'is-primary'), btn(ui.logsFor === p.id ? t.hideLogs : t.logs, 'logs', p.id), btn(t.copyLogs, 'copy', p.id), btn(t.stopServices, 'stop', p.id, 'is-danger')]
              : [btn(t.startEnv, 'start', p.id, 'is-primary'), p.log.length ? btn(ui.logsFor === p.id ? t.hideLogs : t.logs, 'logs', p.id) : null]))
      ];
    },

    help() {
      const problems = projects.filter((p) => p.state === 'problem').length;
      const input = h('input.app-input', { type: 'search', placeholder: t.search.help, 'aria-label': t.question, value: ui.helpQuery });
      const topics = h('div.app-topics');
      const fill = () => {
        const q = ui.helpQuery.trim().toLowerCase();
        const items = t.topics.filter(([, title, text]) => !q || (title + ' ' + text).toLowerCase().includes(q));
        topics.replaceChildren(...(items.length ? items.map(([key, title, text, go, goLabel]) => {
          const open = ui.topic === key || (q && items.length === 1);
          return h('div.app-topic',
            h('button.app-topic-head', { type: 'button', 'data-topic': key, 'aria-expanded': String(!!open) }, h('span', open ? '▾' : '▸'), title),
            open ? h('div.app-topic-body', h('p', text), h('button.app-btn', { type: 'button', 'data-nav': go }, goLabel)) : null);
        }) : [h('p.app-empty', t.noResult)]));
      };
      input.addEventListener('input', () => { ui.helpQuery = input.value; fill(); });
      fill();
      return [
        h('p.app-h1', t.nav.help), h('p.app-sub', t.helpSub),
        problems ? h('div.app-banner', h('span.app-note.is-warn', `⚠ ${t.problems(problems)}`), h('button.app-btn', { type: 'button', 'data-nav': 'overview' }, t.seeOverview))
          : h('div.app-banner', h('span.app-note.is-ok', `✓ ${t.noProblems}`)),
        h('p.app-label', t.question), input,
        h('div.app-chips', t.topics.slice(1).map(([key, title]) => h('button.app-chip', { type: 'button', 'data-topic': key }, title))),
        topics
      ];
    },

    settings() {
      const checking = ui.update === 'checking';
      return [
        h('p.app-h1', t.nav.settings),
        h('p.app-section', t.updates),
        h('article.app-card', h('div.app-proc-head', h('strong', 'LocalCodePilot 0.4.0-alpha.10'),
          checking ? h('button.app-btn.is-busy', { type: 'button', disabled: true }, t.checking) : btn(t.check, 'check-update', '')),
          ui.update === 'done' ? h('p.app-mini.is-ok', `✓ ${t.upToDate}`) : null,
          h('p.app-mini', ui.update === 'done' ? t.lastCheck : t.autoCheck)),
        h('p.app-section', t.languages), h('p.app-sub', t.languagesSub),
        h('article.app-card.app-langs', [['Node.js', 'v22.16.0', 'C:\\Program Files\\nodejs\\node.exe'], ['PHP', '8.3.14', 'C:\\php\\php.exe'], ['Python', '3.13.1', 'C:\\Python313\\python.exe']]
          .map(([name, version, path]) => h('div.app-lang', h('strong', name), h('span.app-note.is-ok', version), h('code.app-cmd.is-muted', path)))),
        h('p.app-section', t.history),
        h('article.app-card', h('p.app-mini', t.historyText),
          h('div.app-proc-head', h('span.app-note', ui.saved ? t.savedLogs(ui.saved) : t.noSaved), ui.saved ? btn(t.clear, 'clear-history', '') : null))
      ];
    }
  };

  function projectCard(p) {
    const open = ui.details.has(p.id);
    return h('article.app-card.app-pcard' + (p.state === 'problem' ? '.is-warn' : ''),
      h('div.app-proc-head', h('strong', p.name),
        h('button.app-star', { type: 'button', 'data-action': 'fav', 'data-id': p.id, 'aria-pressed': String(!!p.fav), 'aria-label': p.fav ? t.favRemove : t.favAdd, title: p.fav ? t.favRemove : t.favAdd }, p.fav ? '★' : '☆')),
      h('div.app-card-head', tag(p)),
      h('div.app-card-head', statusChip(p), ...headNotes(p)),
      h('div.app-actions', primaryActions(p)),
      h('button.app-btn.app-details', { type: 'button', 'data-action': 'details', 'data-id': p.id, 'aria-expanded': String(open) }, open ? t.hideDetails : t.details),
      open ? h('div.app-detail-rows', [[t.folder, p.folder], [t.command, p.command], [t.port, String(p.port)]].map(([k, v]) => h('p', h('span', `${k}: `), h('code', v)))) : null);
  }

  // ---------- render ----------
  function render(focusSelector) {
    renderSidebar();
    topTitle.textContent = t.nav[ui.page];
    search.textContent = t.search[ui.page];
    const scroll = content.scrollTop;
    content.replaceChildren(...pages[ui.page]());
    content.scrollTop = scroll;
    renderLogs();
    if (focusSelector) root.querySelector(focusSelector)?.focus({ preventScroll: true });
  }
  function go(page) {
    ui.page = page;
    content.scrollTop = 0;
    render(`[data-nav="${page}"]`);
    content.scrollTop = 0;
  }
  function renderLogs() {
    const p = ui.logsFor && find(ui.logsFor);
    logsPanel.hidden = !p;
    if (!p) return;
    const bodyEl = h('div.app-logs-body', p.log.length ? p.log.map((line) => h('p', line)) : h('p.is-muted', t.empty));
    logsPanel.replaceChildren(h('div.app-logs-head', h('span', `${t.logsOf} · ${p.name}`),
      h('button.app-logs-close', { type: 'button', 'data-action': 'logs', 'data-id': p.id, 'aria-label': t.hideLogs }, '×')), bodyEl);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }
  const keepFocus = (p) => (root.contains(document.activeElement) || document.activeElement === document.body) ? `[data-id="${p.id}"]:not(:disabled)` : null;

  // ---------- behaviour ----------
  function run(p) {
    p.state = 'starting';
    p.log = [];
    render(`[data-id="${p.id}"]`);
    p.output.forEach((line, i) => setTimeout(() => {
      p.log.push(line);
      if (ui.logsFor === p.id) renderLogs();
    }, wait(350 + i * 380)));
    setTimeout(() => {
      p.state = 'running';
      p.pid = 20000 + Math.floor(Math.random() * 9000);
      render(keepFocus(p));
      announcer.textContent = `${p.name} ${t.isRunning}`;
    }, wait(1700));
  }
  function stop(p) {
    p.state = 'stopping';
    render(keepFocus(p));
    setTimeout(() => {
      p.state = 'stopped';
      p.log.push(p.compose ? 'Container loja-web-1  Stopped' : '^C');
      if (ui.logsFor === p.id) renderLogs();
      render(keepFocus(p));
      announcer.textContent = `${p.name} ${t.wasStopped}`;
    }, wait(p.compose ? 900 : 500));
  }

  function dialog({ title, name, text, rows = [], note, okLabel, onOk, opener }) {
    const x = h('button.app-dialog-x', { type: 'button', 'aria-label': t.close }, '×');
    const cancel = h('button.app-btn', { type: 'button' }, t.cancel);
    const ok = h('button.app-btn.is-primary', { type: 'button' }, okLabel);
    const box = h('div.app-dialog', { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'app-dialog-title' },
      h('div.app-dialog-head', h('p', { id: 'app-dialog-title' }, title), x),
      h('div.app-dialog-body', h('strong', name), h('p', text), note ? h('p.app-mini.is-warn', note) : null,
        rows.map(([label, value]) => h('p.app-dialog-row', h('span', `${label}:`), h('code', value)))),
      h('div.app-dialog-actions', cancel, ok));
    dialogLayer.replaceChildren(box);
    dialogLayer.hidden = false;
    cancel.focus(); // the safe choice, as in the app
    const close = (confirmed) => {
      dialogLayer.hidden = true;
      dialogLayer.replaceChildren();
      root.removeEventListener('keydown', onKey);
      if (confirmed) onOk(); else opener?.focus();
    };
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(false); }
      if (event.key === 'Tab') {
        const items = [x, cancel, ok];
        const i = items.indexOf(document.activeElement);
        event.preventDefault();
        items[(i + (event.shiftKey ? items.length - 1 : 1)) % items.length].focus();
      }
    };
    root.addEventListener('keydown', onKey);
    x.addEventListener('click', () => close(false));
    cancel.addEventListener('click', () => close(false));
    ok.addEventListener('click', () => close(true));
  }

  function start(p, opener) {
    if (p.compose) {
      dialog({ title: t.containerTitle, name: p.name, text: t.containerText, rows: [[t.folder, p.folder], [t.command, p.command]],
        okLabel: t.confirmRun, opener, onOk: () => run(p) });
    } else if (!p.trusted) {
      const rows = [[t.folder, p.folder], [t.command, p.command]];
      if (p.runs) rows.push([t.runs, p.runs]);
      dialog({ title: t.confirmTitle, name: p.name, text: t.confirmText, rows, okLabel: t.start, opener, onOk: () => { p.trusted = true; run(p); } });
    } else run(p);
  }

  root.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-nav]');
    if (nav && root.contains(nav)) { root.classList.add('is-touched'); go(nav.dataset.nav); return; }
    const filterGo = event.target.closest('[data-filter-go]');
    if (filterGo) { ui.filter = filterGo.dataset.filterGo; ui.query = ''; go('projects'); return; }
    const filter = event.target.closest('[data-filter]');
    if (filter) { ui.filter = filter.dataset.filter; render(`[data-filter="${ui.filter}"]`); return; }
    const topic = event.target.closest('[data-topic]');
    if (topic) {
      const key = topic.dataset.topic;
      ui.topic = ui.topic === key && topic.classList.contains('app-topic-head') ? null : key;
      ui.helpQuery = '';
      render(`.app-topic-head[data-topic="${key}"]`);
      return;
    }
    const target = event.target.closest('button[data-action]');
    if (!target || !root.contains(target)) return;
    root.classList.add('is-touched');
    const p = find(target.dataset.id);
    switch (target.dataset.action) {
      case 'start': start(p, target); break;
      case 'stop':
        if (p.compose) dialog({ title: t.containerTitle, name: p.name, text: t.containerText, note: `${t.willStop}. ${t.volumesKept}`,
          rows: [[t.folder, p.folder], [t.command, 'docker compose -f compose.yaml stop']], okLabel: t.confirmRun, opener: target, onOk: () => stop(p) });
        else stop(p);
        break;
      case 'restart': p.state = 'stopped'; run(p); break;
      case 'install':
        p.state = 'installing';
        render(`[data-id="${p.id}"]`);
        setTimeout(() => { p.state = 'stopped'; render(keepFocus(p)); notify(t.installed); }, wait(1600));
        break;
      case 'logs': ui.logsFor = ui.logsFor === p.id ? null : p.id; render(`[data-id="${p.id}"][data-action="logs"]`); break;
      case 'output': ui.outputs.has(p.id) ? ui.outputs.delete(p.id) : ui.outputs.add(p.id); render(`[data-id="${p.id}"][data-action="output"]`); break;
      case 'details': ui.details.has(p.id) ? ui.details.delete(p.id) : ui.details.add(p.id); render(`[data-id="${p.id}"][data-action="details"]`); break;
      case 'fav': p.fav = !p.fav; render(`[data-id="${p.id}"][data-action="fav"]`); break;
      case 'open': notify(t.openNotice); break;
      case 'copy': notify(t.copied); break;
      case 'add-folder': notify(t.folderNotice); break;
      case 'refresh':
        ui.refreshing = true; render();
        setTimeout(() => { ui.refreshing = false; render('[data-action="refresh"]'); notify(t.refreshed); }, wait(1200));
        break;
      case 'check-update':
        ui.update = 'checking'; render();
        setTimeout(() => { ui.update = 'done'; render('[data-action="check-update"]'); }, wait(1400));
        break;
      case 'clear-history': ui.saved = 0; render(); notify(t.cleared); break;
    }
  });

  render();
})();

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
