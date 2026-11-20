"""Regenerate /en/ and /es/ from the Portuguese page: python build_locales.py."""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = (ROOT / 'index.html').read_text(encoding='utf-8')
ROWS = json.loads((ROOT / 'translations.json').read_text(encoding='utf-8'))

for language, column in [('en', 1), ('es', 2)]:
    translations = {row[0]: row[column] for row in ROWS}
    translations['Idioma'] = 'Language' if language == 'en' else 'Idioma'
    used = set()

    def translate(value):
        key = html.unescape(value.strip())
        if key not in translations:
            return value
        used.add(key)
        translated = html.escape(translations[key], quote=False)
        return value.replace(value.strip(), translated, 1)

    def translate_tag(match):
        prefix, value = match.group(1), match.group(2)
        return prefix + translate(value).replace('"', '&quot;') + '"'

    # Translate complete text nodes and user-facing attributes, never code or URLs.
    parts = re.split(r'(<[^>]+>)', SOURCE)
    for index, part in enumerate(parts):
        if part.startswith('<'):
            parts[index] = re.sub(r'((?:aria-label|content)=")([^"]*)"', translate_tag, part)
        else:
            parts[index] = translate(part)
    output = ''.join(parts)
    missing = set(translations) - used
    if missing:
        raise ValueError(f'Unused translations for {language}: {sorted(missing)}')
    output = output.replace('<html lang="pt-BR">', f'<html lang="{language}">')
    output = output.replace('rel="canonical" href="https://localcodepilot.com.br/"',
                            f'rel="canonical" href="https://localcodepilot.com.br/{language}/"')
    for asset in ['styles.css', 'experience.css', 'theme.js', 'demo.js', 'navigation.js', 'analytics.js', 'icon.svg', 'logo.svg', 'windows.svg', 'macos.svg', 'linux.svg']:
        output = output.replace(f'"{asset}"', f'"../{asset}"')
    output = output.replace(' aria-current="page"', '')
    output = output.replace('href="./" lang="pt-BR"', 'href="../" lang="pt-BR"')
    for locale in ['en', 'es']:
        destination = './' if locale == language else f'../{locale}/'
        output = output.replace(f'href="{locale}/" lang="{locale}"',
                                f'href="{destination}" lang="{locale}"')
    label = 'English' if language == 'en' else 'Español'
    output = output.replace(f'aria-label="{label}"', f'aria-label="{label}" aria-current="page"')
    output = output.replace('property="og:url" content="https://localcodepilot.com.br/"',
                            f'property="og:url" content="https://localcodepilot.com.br/{language}/"')
    output = output.replace('property="og:locale" content="pt_BR"',
                            'property="og:locale" content="en_US"' if language == 'en' else 'property="og:locale" content="es_ES"')
    if language == 'en':
        output = output.replace('href="docs/primeiros-passos/"', 'href="docs/getting-started/"')
        output = output.replace('href="blog/porta-em-uso-windows/"', 'href="blog/port-already-in-use-windows/"')
        output = output.replace('href="blog/organizar-projetos-locais/"', 'href="blog/organize-local-projects/"')
    else:
        output = output.replace('href="docs/primeiros-passos/"', 'href="../en/docs/getting-started/"')
        output = output.replace('href="blog/porta-em-uso-windows/"', 'href="../en/blog/port-already-in-use-windows/"')
        output = output.replace('href="blog/organizar-projetos-locais/"', 'href="../en/blog/organize-local-projects/"')
        output = output.replace('Primeros pasos en Windows</a>', 'Primeros pasos en Windows (en inglés)</a>')
        output = output.replace('¿El puerto 3000 está en uso en Windows?</a>', '¿El puerto 3000 está en uso en Windows? (en inglés)</a>')
        output = output.replace('Cómo organizar proyectos locales sin perder contexto</a>', 'Cómo organizar proyectos locales sin perder contexto (en inglés)</a>')
    destination = ROOT / language
    destination.mkdir(exist_ok=True)
    (destination / 'index.html').write_text(output, encoding='utf-8')
    print(f'Generated {language}/index.html')
