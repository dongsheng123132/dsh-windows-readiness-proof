# dsh-windows-readiness-proof

这是一个面向受管 Windows 主机的 DSH readiness 证据验证器，不是采集器或修复器。它只读取显式、脱敏、SHA-256 固定的观测，核验 Windows build/重启状态、Node/DSH/PowerShell、WDAC/AppLocker/Defender/执行策略、TLS、文件系统与 ACL、非交互服务、存储和匿名化连接端点。

它不会执行 PowerShell、读写注册表、修改组策略、添加 Defender 排除项、安装软件、重启服务或探测网络。缺失、陈旧、未来时间、秘密/用户名形字段、路径逃逸、symlink 和策略不满足均失败闭合。报告不返回用户名、域、端点、命令输出、凭据或原始观测。

Harness Doctor 负责安装健康诊断；桌面控制工具负责执行 Windows 动作。本插件只产生可供 CI/审计复核的确定性 readiness 证据。

```bash
dsh-windows-readiness-proof verify --workspace . --manifest manifest.json --artifactDir artifacts
```
