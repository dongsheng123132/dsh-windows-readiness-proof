# Security policy

Report vulnerabilities privately through GitHub Security Advisories.

The verifier never collects host state, executes scripts or inspected input, opens a network connection, reads environment variables, or modifies Windows. Inputs must be workspace-relative regular files with pinned SHA-256. Traversal, symlinks, oversized or overly complex data, secret-shaped values, credential/user-identity fields, and raw-output fields are rejected.

A passing proof establishes only that the supplied sanitized snapshot satisfies the explicit manifest at its fixed evaluation time. It does not prove the collector was trustworthy, the host is currently unchanged, malware is absent, or a Microsoft security baseline is fully satisfied.
