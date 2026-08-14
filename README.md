# dsh-windows-readiness-proof

[![CI](https://github.com/dongsheng123132/dsh-windows-readiness-proof/actions/workflows/ci.yml/badge.svg)](https://github.com/dongsheng123132/dsh-windows-readiness-proof/actions/workflows/ci.yml)
[![MIT license](https://img.shields.io/github/license/dongsheng123132/dsh-windows-readiness-proof)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/Node.js-%E2%89%A522-339933?logo=nodedotjs&logoColor=white)](package.json)
[![Awesome DSH Plugins](https://img.shields.io/badge/Awesome_DSH-verified_lab-0969da)](https://github.com/dongsheng123132/awesome-dsh-plugins#2origin-plugin-lab)

`dsh-windows-readiness-proof` evaluates a SHA-256-pinned, sanitized observation of a managed Windows host against explicit DeepSeek Harness readiness requirements.

It is an evidence verifier, not a collector or remediation tool. It never runs PowerShell, reads the registry, changes Group Policy, creates Defender exclusions, edits WDAC/AppLocker, installs software, restarts services, or probes the network.

## What it proves

An explicit manifest fixes an opaque machine digest, snapshot revision, observation bytes, evaluation time, maximum evidence age, and requirements for:

- Windows product type, architecture, build, and pending reboot;
- Node, DSH, PowerShell edition/version, and language mode;
- classified WDAC, AppLocker, Defender, execution policy, Credential Guard, and TLS 1.2 posture;
- long paths, atomic rename, workspace/temp ACL class, and symlink policy;
- non-interactive session, opaque identity class, writable profile, and recovery configuration;
- free workspace/temp storage;
- required connectivity identities represented only by endpoint SHA-256 plus status/TLS/proxy classes.

Missing, stale, future, malformed, secret-shaped, identity-bearing, path-escaping, symlinked, or policy-mismatched evidence fails closed. Reports expose only opaque identities, hashes, classifications, reason codes, and control status—not usernames, domains, endpoints, registry paths, command output, credentials, or raw observations.

## Complementary boundary

Harness Doctor diagnoses local DSH/Codex/OpenClaw installation health. Windows desktop-control skills execute UI and PowerShell actions. This plugin does neither: it verifies a pre-collected enterprise readiness fact set under a reviewable policy and produces a deterministic artifact suitable for CI or audit.

## CLI

```bash
dsh-windows-readiness-proof inspect --workspace . --manifest manifest.json
dsh-windows-readiness-proof verify --workspace . --manifest manifest.json --artifactDir artifacts
```

Exit `0` means verified; exit `2` means a readiness or evidence failure.

## DSH / MCP tools

- `dsh_windows_readiness_inspect`
- `dsh_windows_readiness_verify`
- MCP aliases: `windows_readiness_inspect`, `windows_readiness_verify`

```bash
dsh plugin --profile windows-readiness add github:dongsheng123132/dsh-windows-readiness-proof#<commit>
```

See [examples/README.md](examples/README.md) for a synthetic, non-collecting example. MIT licensed.
