AUREON 管理后台版

前台：/
后台：/admin/
可编辑内容：content/site.json

要让 /admin/ 真正支持“登录 -> 修改 -> 发布”，需要把站点连接到 Git 仓库，并在 Netlify 中启用 Identity + Git Gateway。
完成后，后台保存内容会写回仓库并触发 Netlify 自动部署。

当前视觉设计、三张高清办公室图片均保留。
