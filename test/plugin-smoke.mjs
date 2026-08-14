import assert from 'node:assert/strict'
import * as plugin from '../index.js'

assert.equal('default' in plugin, false, 'a default export makes the real DSH Loader discard namespace inject metadata')
assert.equal(plugin.name, 'dsh-windows-readiness-proof')
assert.deepEqual(plugin.inject, ['tools'])

const definitions = plugin.createDefinitions(null, { workspaceRoot: process.cwd() })
assert.deepEqual(definitions.map(({ name }) => name), [
  'dsh_windows_readiness_inspect',
  'dsh_windows_readiness_verify',
])

process.stdout.write(`${JSON.stringify({
  ok: true,
  namespacePlugin: true,
  inject: plugin.inject,
  tools: definitions.map(({ name }) => name),
})}\n`)
