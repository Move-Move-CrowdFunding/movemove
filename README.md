# Move Move 募募

> 募資平台的核心理念在於透過眾人的集體力量，在募資平台上支持以人為本，共同建立更美好社會互助。
> 

![Untitled](https://github-production-user-asset-6210df.s3.amazonaws.com/89630579/342068545-9fbf8958-f77b-4b08-bfc9-12b0bcb12ffa.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240623%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240623T134335Z&X-Amz-Expires=300&X-Amz-Signature=6caac50134e18729f2ca53f382fa1089c65e2a2d445dd04639bb127deedf36c5&X-Amz-SignedHeaders=host&actor_id=27848834&key_id=0&repo_id=789781280)

- 線上觀看連結

## 功能

測試帳號密碼

```bash
帳號： 
密碼： 
```

## 畫面

![Untitled](https://github-production-user-asset-6210df.s3.amazonaws.com/89630579/342068545-9fbf8958-f77b-4b08-bfc9-12b0bcb12ffa.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240623%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240623T134335Z&X-Amz-Expires=300&X-Amz-Signature=6caac50134e18729f2ca53f382fa1089c65e2a2d445dd04639bb127deedf36c5&X-Amz-SignedHeaders=host&actor_id=27848834&key_id=0&repo_id=789781280)

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`18.x` 以上...

### 取得專案

```bash
git clone https://github.com/Move-Move-CrowdFunding/movemove.git
```

### 移動到專案內

```bash
cd movemove
```

### 安裝套件

```bash
npm install

// 或者

pnpm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
npm run dev

// 或者

pnpm dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3000/
```

### Commit 時會執行

- commit 內容檢查
- eslint 程式碼檢查

## 環境變數說明

```
NUXT_PUBLIC_API_BASE=https://movemove-api.koyeb.app/
```

## 資料夾說明

- .husky - commit 檢查設定檔
- .vscode
    - .settings.json - 儲存自動格式化程式碼、自動格式化 style
- middleware - 中介軟體放置處
- pages - nuxt 頁面放置處
- stores - pinia 檔案放置處
- tailwindcss - tailwindcss 設定檔案
- types - TypeScript 型別檔案
- utilis - mapping 表、共用方法檔案
- components - 元件檔案
- composables - composables 檔案
- assets - 靜態資源放置處
    - scss - scss 檔案放置處
    - images - 圖片放置處
    - icon -  單色 icon 放置處
- public
    - images - 圖片放置處
- plugins
- layouts

## 專案技術

- Nuxt3
- NuxtUI
- Nuxt icon
- Pinia
- Swiper
- Zod
- Tailwind
- dayjs

## 第三方服務

- 藍新金流

## 參與成員

團隊成員：

- [羽](https://github.com/linglingsyu)
- [Ken](https://github.com/kenlee100)
- [YC](https://github.com/yichienlu)
- [圈圈](https://github.com/panduola666)
- [Hank](https://github.com/tw1720)

設計師：

- Claire LIN

教練：

- 鉛筆
- Alpha
