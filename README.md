# 🗂️檔案管理

<!-- ![alt text](image.png) -->
<!-- ![alt text](image-1.png) -->



## ⭐️檔案管理系統的介紹影片
[![影片標題](<截圖 2025-02-08 上午10.37.30.png>)](https://www.youtube.com/watch?v=影片ID)
https://youtu.be/qUI3NAs39mo



## ⭐️檔案管理以清單呈現
![alt text](<截圖 2025-02-08 上午10.36.50.png>)

## ⭐️檔案管理以圖示呈現
![alt text](<截圖 2025-02-08 上午10.37.30.png>)

## ⭐️建立新的資料夾/檔案
![alt text](<截圖 2025-02-08 上午10.38.10.png>)

## ⭐️建立檔案選擇檔案類型
![alt text](<截圖 2025-02-08 上午10.38.21.png>)




## 📖 資料結構

如果 isDir=false ,category 則為必填</br>
category: 'product' | 'sorting'

```js
const fs = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "1",
    name: "123.製品",
    isDir: false,
    parentId: "0",
    lastModified: 1677021347,
    path: "/",
    category: "product",
  },
  {
    id: "2",
    name: "所有的排版專案",
    isDir: true,
    parentId: "0",
    path: "/所有的排版專案",
    lastModified: 1704720512,
  },
];
```

## ⚙️所有檔案管理功能

- 切換 亮暗色
- 檔案管理 顯示模式: 清單、Icon
- 按下返回上一層資料夾
- 詳細資訊 資料夾/檔案
- 新增 資料夾/檔案
- 重新命名 資料夾/檔案
- 刪除 資料夾/檔案
- 複製 資料夾/檔案
- 剪下 資料夾/檔案
- 貼上 資料夾/檔案
- 搜尋 資料夾/檔案
- 下載 資料夾/檔案
- 上傳 資料夾/檔案
- 點下任一處開啟menu(Create New、貼上)

---

## ✅目前Ok的功能

- 檔案管理 顯示模式: 清單、Icon
- 按下返回上一層資料夾
- 詳細資訊 資料夾/檔案
- 新增 資料夾/檔案
- 重新命名 資料夾/檔案
- 刪除 資料夾/檔案
- 複製 資料夾/檔案
- 剪下 資料夾/檔案
- 貼上 資料夾/檔案
- 點下任一處開啟menu(Create New、貼上)

---

## 🌀還沒做的功能
- 切換 亮暗色
- 搜尋 資料夾/檔案
- 下載 資料夾/檔案
- 上傳 資料夾/檔案
