# Digital Lab

Digital Lab 是獨立數位創作品牌的公開作品入口。本倉庫僅包含已篩選的公開網站檔案，供 GitHub Pages 靜態發布。

## 發布內容

- `site/`：可公開的 HTML、CSS、JavaScript、圖像與作品資料。
- `.github/workflows/pages.yml`：免費 GitHub Pages 的建置及發布流程。
- 本機管理介面、隱藏作品、待確認網址及私人工作資料均不包含在此倉庫。

僅經實際驗證的作品網址會成為可點擊外部連結。網站內容為作品展示與研究紀錄；運動數據不構成投注或投資建議。作品狀態與更新日期請以網站說明為準。

## 更新

在本機 Digital Lab 管理工具完成編輯並重新建置後，將過濾後的 `dist/` 內容更新至本倉庫的 `site/`，再提交至 `main`。GitHub Actions 會發布新的公開版本。

公開站點不提供管理 API，也不接受線上寫入作品資料。
