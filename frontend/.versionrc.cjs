module.exports = {
  header: '# 项目变更日志\n\n',
  types:[
    {type: 'feat', section: '✨ Features | 新功能'},
    {type: 'fix', section: '🐛 Bug Fix | Bug修复'},
    {type: 'init', section: '🎉 Init | 初始化'},
    {type: 'docs', section: '📄 Documentation | 文档'},
    {type: 'style', section: '💄 Styles | 风格样式'},
    {type: 'refactor', section: '♻️ Code Refactoring | 重构'},
    {type: 'perf', section: '⚡️ Performance | 性能优化'},
    {type: 'test', section: '✅ Tests | 测试'},
    {type: 'revert', section: '⏪ Revert | 版本回退'},
    {type: 'build', section: '📦 Build | 打包构建'},
    { type: 'chore', section: '🚀 Chore | 构建/工程依赖/工具' },
    { type: 'ci', section: '👷 Continuous Integration | CI 配置' }
  ]
}