import { access, readFile } from 'node:fs/promises'

const required = ['.codex-plugin/plugin.json', '.mcp.json', 'mcp-server.mjs', 'bin/dsh-windows-readiness-proof.mjs', 'cordis.patch.yml', 'index.js', 'lib/windows-readiness-proof.mjs', 'README.md', 'README.zh-CN.md', 'SECURITY.md']
await Promise.all(required.map((file) => access(file)))

const pkg = JSON.parse(await readFile('package.json', 'utf8'))
const plugin = JSON.parse(await readFile('.codex-plugin/plugin.json', 'utf8'))
const mcp = JSON.parse(await readFile('.mcp.json', 'utf8'))
const entry = await readFile('index.js', 'utf8')

if (pkg.name !== plugin.name || pkg.version !== plugin.version || plugin.mcpServers !== './.mcp.json') throw new Error('package/plugin identity or MCP path mismatch')
if (!mcp.mcpServers?.['dsh-windows-readiness-proof']) throw new Error('MCP declaration missing')
if (['preinstall', 'install', 'postinstall', 'prepare'].some((name) => pkg.scripts?.[name])) throw new Error('lifecycle scripts are forbidden')
if (/export\s+default\b/.test(entry)) throw new Error('namespace DSH plugins must not default-export apply because Loader would discard inject metadata')

process.stdout.write(`${JSON.stringify({ ok: true, requiredFiles: required.length, lifecycleScripts: false, mcp: true, namespaceLoaderSafe: true })}\n`)
