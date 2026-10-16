"""Build the bilingual documentation and sitemap: python build_content.py."""
from pathlib import Path
from html import escape
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
DOMAIN = 'https://localcodepilot.com.br'
REPO = 'https://github.com/cjulio1993/LocalCodePilot'
RELEASE = REPO + '/releases/tag/v0.4.0-alpha.5.1'

GUIDES = [
    {
        'pt': ('docs/primeiros-passos/', 'Primeiros passos com LocalCodePilot no Windows', 'Instale a alpha do LocalCodePilot no Windows, verifique o SHA-256 e organize seu primeiro projeto com processos, portas e logs.'),
        'en': ('en/docs/getting-started/', 'Getting started with LocalCodePilot on Windows', 'Set up the LocalCodePilot Windows alpha, verify SHA-256 and organize your first project with processes, ports and logs.'),
        'body_pt': fr'''<p class="note">Guia para a versão 0.4.0-alpha.5.1, distribuída como ZIP portátil para Windows 10/11 x64. O produto está em alpha: consulte as limitações e notas da versão antes de usar.</p>
<h2>1. Baixe a release oficial</h2><p>Abra as <a href="{RELEASE}">notas da release 0.4.0-alpha.5.1</a> e baixe o arquivo <code>LocalCodePilot-0.4.0-alpha.5.1-windows-x64.zip</code>. Confira os requisitos e a lista de arquivos da release.</p>
<h2>2. Confira o SHA-256</h2><p>No PowerShell, execute o comando abaixo usando o caminho real do arquivo baixado. Compare o valor Hash com o SHA-256 publicado na mesma release. Os valores precisam ser iguais; se forem diferentes, não execute o arquivo e refaça o download oficial.</p><pre><code>Get-FileHash -LiteralPath "$env:USERPROFILE\Downloads\LocalCodePilot-0.4.0-alpha.5.1-windows-x64.zip" -Algorithm SHA256</code></pre>
<h2>3. Extraia e abra o aplicativo</h2><p>Extraia o ZIP para uma pasta de sua escolha e abra o executável incluído. Não execute diretamente dentro do ZIP. Confira o nome e as instruções do executável na release.</p>
<h2>4. Escolha uma pasta de projetos</h2><p>No aplicativo, selecione os diretórios que contêm seus projetos locais. A descoberta identifica tecnologias e estruturas; dependências e arquivos de build são excluídos da busca. Comece com um projeto de teste conhecido para conferir o reconhecimento.</p>
<h2>5. Confira requisitos antes de iniciar</h2><p>Revise a tecnologia detectada, os requisitos do projeto e o comando sugerido. Uma detecção não significa que todos os runtimes ou ferramentas necessários já estejam instalados. Use as instruções do próprio projeto para preparar o ambiente.</p><p>Nos serviços compatíveis, use as ações disponíveis para preparar dependências, iniciar ou interromper a execução e acompanhar os logs. Confira a porta e a URL mostradas pelo aplicativo.</p>
<h2>Quando algo não inicia</h2><ul><li>Consulte o log e identifique a primeira mensagem de erro.</li><li>Confirme que o runtime exigido pelo projeto está disponível.</li><li>Se a porta estiver ocupada, consulte o <a href="/blog/porta-em-uso-windows/">guia de portas em uso no Windows</a>.</li><li>Ao relatar uma falha, informe versão do app, Windows, tecnologia e passos para reproduzir. Remova tokens, senhas e dados privados dos logs.</li></ul>
<h2>Limites da alpha</h2><p>Projetos com Dockerfile e Compose podem ser identificados e diagnosticados. O LocalCodePilot ainda não instala Docker ou Podman, baixa imagens ou executa containers.</p><p>O fluxo de atualização no aplicativo começa nesta alpha; quem usa alpha 4 ou anterior precisa instalar a alpha 5 manualmente antes de usar esse fluxo nas próximas versões.</p>''',
        'body_en': fr'''<p class="note">This guide covers version 0.4.0-alpha.5.1, a portable ZIP for Windows 10/11 x64. The product is in alpha: review its limitations and release notes before use.</p>
<h2>1. Download the official release</h2><p>Open the <a href="{RELEASE}">0.4.0-alpha.5.1 release notes</a> and download <code>LocalCodePilot-0.4.0-alpha.5.1-windows-x64.zip</code>. Check the requirements and release asset list.</p>
<h2>2. Verify SHA-256</h2><p>In PowerShell, run this command with the actual path to your downloaded file. Compare Hash with the SHA-256 published in that release. They must match. If they differ, do not run the file; download it again from the official release.</p><pre><code>Get-FileHash -LiteralPath "$env:USERPROFILE\Downloads\LocalCodePilot-0.4.0-alpha.5.1-windows-x64.zip" -Algorithm SHA256</code></pre>
<h2>3. Extract and open the application</h2><p>Extract the ZIP to a folder of your choice, then open the included executable. Do not run it from inside the ZIP. See the release for the executable name and instructions.</p>
<h2>4. Select a project folder</h2><p>Select directories containing local projects in the app. Discovery identifies technologies and structures while excluding dependencies and build artifacts. Start with a familiar test project to check detection.</p>
<h2>5. Check requirements before starting</h2><p>Review the detected technology, project requirements and suggested command. Detection does not mean every required runtime or tool is already installed. Follow the project's own setup instructions.</p><p>For supported services, use the available actions to prepare dependencies, start or stop execution and follow logs. Check the port and URL reported by the app.</p>
<h2>When a service will not start</h2><ul><li>Read the log and find the first error.</li><li>Confirm that the required runtime is available.</li><li>For port conflicts, read the <a href="/en/blog/port-already-in-use-windows/">Windows port troubleshooting guide</a>.</li><li>When reporting a bug, include the app version, Windows version, technology and reproduction steps. Remove tokens, passwords and private data from logs.</li></ul>
<h2>Alpha limitations</h2><p>Dockerfile and Compose projects can be identified and diagnosed. LocalCodePilot does not yet install Docker or Podman, download images or run containers.</p><p>In-app updates begin with this alpha. Users on alpha 4 or earlier must install alpha 5 manually before using this flow for subsequent updates.</p>'''
    },
    {
        'pt': ('blog/porta-em-uso-windows/', 'Porta 3000 em uso no Windows: como resolver', 'Descubra qual processo ocupa a porta 3000 no Windows usando PowerShell e resolva o conflito sem encerrar processos desconhecidos.'),
        'en': ('en/blog/port-already-in-use-windows/', 'Port 3000 already in use on Windows: how to fix it', 'Find which process owns port 3000 on Windows with PowerShell and resolve local development port conflicts.'),
        'body_pt': '''<p>Erros como <code>EADDRINUSE</code> ou “address already in use” podem indicar que outro processo já está escutando na porta desejada. Antes de encerrar qualquer processo, descubra qual aplicativo ele representa. Os exemplos abaixo usam TCP e a porta 3000; substitua o número pela porta do seu erro.</p>
<h2>1. Identifique quem está escutando</h2><p>Abra o PowerShell e execute:</p><pre><code>Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object LocalAddress, LocalPort, OwningProcess</code></pre><p>A coluna <code>OwningProcess</code> contém o PID. Podem existir entradas IPv4 e IPv6 para o mesmo processo. Sem resultado, não foi encontrado um listener TCP nessa porta no momento da consulta; o processo pode ter parado ou o problema pode ter outra causa.</p>
<h2>2. Confira o processo pelo PID</h2><p>Substitua 12345 pelo PID encontrado:</p><pre><code>Get-Process -Id 12345 | Select-Object Id, ProcessName, Path</code></pre><p>Se necessário, consulte a linha de comando para distinguir servidores com o mesmo nome:</p><pre><code>Get-CimInstance Win32_Process -Filter "ProcessId = 12345" |
    Select-Object ProcessId, Name, CommandLine</code></pre><p>Alguns dados podem exigir permissão adicional. Não publique linhas de comando sem revisar possíveis credenciais.</p>
<h2>3. Pare o serviço conhecido ou escolha outra porta</h2><p>Se for seu servidor de desenvolvimento, prefira <code>Ctrl+C</code> no terminal de origem ou a ação de parar no aplicativo responsável. Se não reconhecer o processo, não o encerre: escolha outra porta nas configurações do projeto.</p><p>Para um projeto que usa Vite por meio do script <code>dev</code>, um exemplo é:</p><pre><code>npm run dev -- --port 3001</code></pre><p>Essa opção depende do comando executado pelo script; não é um parâmetro universal do npm. Atualize também URLs de frontend, API e callbacks quando necessário.</p><p>Como último recurso para um processo seu, já identificado, o PowerShell pode solicitar confirmação antes de interrompê-lo. Isso pode descartar trabalho em andamento; o encerramento não substitui a parada normal do serviço:</p><pre><code>Stop-Process -Id 12345 -Confirm</code></pre>
<h2>4. Verifique novamente</h2><p>Repita a consulta da primeira etapa e reinicie seu projeto. Se o serviço reaparecer, verifique se existe um supervisor reiniciando o processo. Se a porta estiver livre e o erro persistir, revise o log completo, o endereço de bind e as configurações da aplicação.</p>
<h2>Centralize processos, portas e logs</h2><p>O LocalCodePilot reúne projetos e permite acompanhar processos, portas alternativas e logs nos serviços compatíveis. Isso ajuda a manter o contexto ao alternar entre projetos. A alpha não executa containers.</p><p><a href="/docs/primeiros-passos/">Veja os primeiros passos com LocalCodePilot no Windows</a>.</p>
<p>Referências dos comandos: <a href="https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection">Get-NetTCPConnection</a>, <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process">Get-Process</a> e <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process">Stop-Process</a>.</p>''',
        'body_en': '''<p>Errors such as <code>EADDRINUSE</code> or “address already in use” can mean another process is listening on the requested port. Identify the application before stopping any process. These examples use TCP port 3000; replace it with the port from your error.</p>
<h2>1. Find the listening process</h2><p>Open PowerShell and run:</p><pre><code>Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object LocalAddress, LocalPort, OwningProcess</code></pre><p><code>OwningProcess</code> is the PID. IPv4 and IPv6 entries can belong to the same process. An empty result means no TCP listener was found on this port at that moment; the process may have stopped or the error may have another cause.</p>
<h2>2. Inspect the PID</h2><p>Replace 12345 with the PID you found:</p><pre><code>Get-Process -Id 12345 | Select-Object Id, ProcessName, Path</code></pre><p>If needed, inspect the command line to distinguish servers sharing a process name:</p><pre><code>Get-CimInstance Win32_Process -Filter "ProcessId = 12345" |
    Select-Object ProcessId, Name, CommandLine</code></pre><p>Some details may require additional permissions. Review command lines for credentials before sharing them.</p>
<h2>3. Stop a known service or choose another port</h2><p>For your own development server, prefer <code>Ctrl+C</code> in its original terminal or the owning application's stop action. If you do not recognize the process, leave it running and configure another port.</p><p>For a project using Vite through its <code>dev</code> script, one example is:</p><pre><code>npm run dev -- --port 3001</code></pre><p>This option depends on the command behind the script; it is not a universal npm option. Update frontend URLs, API URLs and callbacks as needed.</p><p>As a last resort for your own identified process, PowerShell can request confirmation before stopping it. This may discard ongoing work and does not replace a normal service shutdown:</p><pre><code>Stop-Process -Id 12345 -Confirm</code></pre>
<h2>4. Check again</h2><p>Repeat the first query and restart your project. If the service reappears, check for a supervisor restarting it. If the port is free but the error persists, review the full log, bind address and application configuration.</p>
<h2>Keep processes, ports and logs together</h2><p>LocalCodePilot brings projects together and helps you follow processes, alternative ports and logs for supported services. This keeps context available when switching projects. The alpha does not run containers.</p><p><a href="/en/docs/getting-started/">Get started with LocalCodePilot on Windows</a>.</p>
<p>Command references: <a href="https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection">Get-NetTCPConnection</a>, <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process">Get-Process</a> and <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process">Stop-Process</a>.</p>'''
    }
]

def build():
    paths = ['', 'en/', 'es/']
    for guide in GUIDES:
        for lang in ('pt', 'en'):
            path, title, description = guide[lang]
            paths.append(path)
            home = '/' if lang == 'pt' else '/en/'
            back = 'Voltar ao produto' if lang == 'pt' else 'Back to product'
            cta = 'Baixar alpha para Windows' if lang == 'pt' else 'Download Windows alpha'
            alternates = ''.join(f'<link rel="alternate" hreflang="{locale}" href="{DOMAIN}/{guide[key][0]}">' for key, locale in [('pt', 'pt-BR'), ('en', 'en')])
            other = 'en' if lang == 'pt' else 'pt'
            html = f'''<!doctype html>
<html lang="{'pt-BR' if lang == 'pt' else 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="base-uri 'none'; object-src 'none'; frame-src 'none'; form-action 'none'">
<title>{escape(title)}</title><meta name="description" content="{escape(description, quote=True)}"><link rel="canonical" href="{DOMAIN}/{path}">{alternates}<link rel="alternate" hreflang="x-default" href="{DOMAIN}/{guide['en'][0]}">
<meta property="og:type" content="article"><meta property="og:site_name" content="LocalCodePilot"><meta property="og:title" content="{escape(title, quote=True)}"><meta property="og:description" content="{escape(description, quote=True)}"><meta property="og:url" content="{DOMAIN}/{path}"><meta name="twitter:card" content="summary"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head>
<body><a class="skip" href="#conteudo">{'Pular para o conteúdo' if lang == 'pt' else 'Skip to content'}</a><header class="doc-header"><div class="wrap"><a href="{home}">LocalCodePilot / {back}</a><a href="/{guide[other][0]}" hreflang="{'en' if other == 'en' else 'pt-BR'}" lang="{'en' if other == 'en' else 'pt-BR'}">{'English' if other == 'en' else 'Português'}</a></div></header>
<main id="conteudo" class="doc-page"><p class="section-kicker">LOCALCODEPILOT / {'GUIA PRÁTICO' if lang == 'pt' else 'PRACTICAL GUIDE'}</p><h1>{escape(title)}</h1>{guide['body_'+lang]}<a class="button primary" href="{home}#comecar">{cta}</a></main><footer class="doc-footer"><a href="{REPO}">GitHub · LocalCodePilot</a></footer></body></html>'''
            output = ROOT / path / 'index.html'
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(html, encoding='utf-8')
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    tree = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}urlset')
    for path in paths:
        entry = ET.SubElement(tree, 'url')
        ET.SubElement(entry, 'loc').text = DOMAIN + '/' + path
    ET.indent(tree)
    ET.ElementTree(tree).write(ROOT / 'sitemap.xml', encoding='utf-8', xml_declaration=True)
    print(f'Built 4 guide pages and sitemap with {len(paths)} URLs')

if __name__ == '__main__':
    build()
