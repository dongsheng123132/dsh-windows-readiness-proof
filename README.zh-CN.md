# dsh-windows-readiness-proof

[![CI](https://github.com/dongsheng123132/dsh-windows-readiness-proof/actions/workflows/ci.yml/badge.svg)](https://github.com/dongsheng123132/dsh-windows-readiness-proof/actions/workflows/ci.yml)
[![MIT 许可证](https://img.shields.io/github/license/dongsheng123132/dsh-windows-readiness-proof)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/Node.js-%E2%89%A522-339933?logo=nodedotjs&logoColor=white)](package.json)
[![Awesome DSH Plugins](https://img.shields.io/badge/Awesome_DSH-%E5%B7%B2%E9%AA%8C%E8%AF%81%E5%AE%9E%E9%AA%8C-0969da)](https://github.com/dongsheng123132/awesome-dsh-plugins/blob/main/README.zh-CN.md#2origin-%E6%8F%92%E4%BB%B6%E5%AE%9E%E9%AA%8C%E5%AE%A4)

这是一个面向受管 Windows 主机的 DSH readiness 证据验证器，不是采集器或修复器。它只读取显式、脱敏、SHA-256 固定的观测，核验 Windows build/重启状态、Node/DSH/PowerShell、WDAC/AppLocker/Defender/执行策略、TLS、文件系统与 ACL、非交互服务、存储和匿名化连接端点。

它不会执行 PowerShell、读写注册表、修改组策略、添加 Defender 排除项、安装软件、重启服务或探测网络。缺失、陈旧、未来时间、秘密/用户名形字段、路径逃逸、symlink 和策略不满足均失败闭合。报告不返回用户名、域、端点、命令输出、凭据或原始观测。

Harness Doctor 负责安装健康诊断；桌面控制工具负责执行 Windows 动作。本插件只产生可供 CI/审计复核的确定性 readiness 证据。

DSH 入口采用只有 `name` / `inject` / `apply` 的 namespace plugin，不提供 default export。这是发布兼容性契约的一部分：stock Web profile 通过真实 Cordis Loader 加载 bundle 时必须保留 `tools` 注入；插件 smoke 和结构检查会阻止该回归再次出现。

已有 DSH 构建和装入本 bundle 的隔离 Web profile 时，可运行 `DSH_CHECKOUT=/path/to/dsh DSH_HOME=/path/to/isolated-home npm run smoke:web-loader`。该 smoke 使用有界且不含凭据的环境启动真实 stock Web profile，并要求观察到实际 readiness URL。

```bash
dsh-windows-readiness-proof verify --workspace . --manifest manifest.json --artifactDir artifacts
```
