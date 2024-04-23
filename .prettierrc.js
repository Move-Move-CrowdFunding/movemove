module.exports = {
   tailwindConfig: './tailwind.config.ts', // Tailwind CSS 的配置檔
   printWidth: 100, // 每行最多 100 個字符
   endOfLine: 'auto', // 自動決定是 LF 還是 CRLF
   semi: false, // 不使用分號
   tabWidth: 2, // 縮進寬度為 2 個空格
   singleQuote: true, // 使用單引號
   trailingComma: 'none', // 如 Object、Array 內的元素不需要尾隨逗號
   plugins: [ // 使用的套件
      'prettier-plugin-tailwindcss' // 這個套件可以讓 Prettier 知道 Tailwind CSS 的 class
   ]
}