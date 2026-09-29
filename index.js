import { inspectWindowsReadiness, verifyWindowsReadiness } from './lib/windows-readiness-proof.mjs'

export const name = 'dsh-windows-readiness-proof'
export const inject = ['tools']

const renderJson = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
const definition = (value) => ({ ...value, output: { schema: {}, render: renderJson } })
const base = (config, args) => ({
  workspaceRoot: config.workspaceRoot ?? process.cwd(),
  manifestPath: args.manifestPath,
  artifactDir: args.artifactDir,
})

export function createDefinitions(_ctx, config = {}) {
  return [
    definition({
      name: 'dsh_windows_readiness_inspect',
      description: 'Inspect a pinned managed-Windows readiness policy without collecting or returning host observations.',
      parameters: { type: 'object', required: ['manifestPath'], properties: { manifestPath: { type: 'string' } }, additionalProperties: false },
      execute(args) {
        return inspectWindowsReadiness(base(config, args))
      },
    }),
    definition({
      name: 'dsh_windows_readiness_verify',
      description: 'Verify sanitized Windows/DSH observations and emit a content-addressed readiness proof without modifying the host.',
      parameters: { type: 'object', required: ['manifestPath', 'artifactDir'], properties: { manifestPath: { type: 'string' }, artifactDir: { type: 'string' } }, additionalProperties: false },
      execute(args) {
        return verifyWindowsReadiness(base(config, args))
      },
    }),
  ]
}

export function apply(ctx, config = {}) {
  for (const definition of createDefinitions(ctx, config)) ctx.tools.register(definition)
}
