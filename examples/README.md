# Sanitized example

`node examples/create-sanitized-example.mjs <output-directory>` creates a synthetic managed-Windows observation and a SHA-256-pinned manifest. It does not inspect the current machine, read environment variables, execute PowerShell, or change policy.

```bash
node bin/dsh-windows-readiness-proof.mjs verify --workspace <output-directory> --manifest manifest.json --artifactDir artifacts
```
