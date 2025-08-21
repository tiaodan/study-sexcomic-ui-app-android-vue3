// v0.4 加载本地文件写法 - 删除旧文件
import { Filesystem, Directory } from '@capacitor/filesystem'
import { API_IP } from '../order/shared'

const AD_KEY = 'cachedAd'

/**
 * 获取本地缓存广告数据
 * 返回结构：
 * {
 *   version: '20250601',
 *   file: 'file://xxx/path/to/ad.webp',  ← 本地文件路径
 *   link: 'https://ad-link.com'          ← 跳转链接
 * }
 */
export function getCachedAd() {
  try {
    const cached = JSON.parse(localStorage.getItem(AD_KEY))
    if (cached?.file && cached?.version) {
      console.log('获取本地广告缓存. cached?.file && cached?.file = ', cached?.file)
      console.log('获取本地广告缓存. cached?.file && cached?.version = ', cached?.version)
      return cached
    }
    return null
  } catch (err) {
    console.warn('❌ 广告缓存解析失败:', err)
    return null
  }
}

/**
 * 从远程接口获取广告信息，并下载新图片存入本地，更新缓存
 */
export async function fetchAndUpdateAd() {
  try {
    const res = await fetch(API_IP + '/ad') // ← 修改为你的广告接口地址
    // const res = await fetch('http://localhost:3000/ad') // ← 本地 - 修改为你的广告接口地址
    if (!res.ok) throw new Error(`广告接口请求失败：${res.status}`)
  
  const data = await res.json()
  const old = getCachedAd()
  console.log("请求返回信息 data = ", JSON.stringify(data))

  // 更新情况：本地缓存没数据，并且，新旧版本不相等
  const shouldUpdate = !old || data.version !== old.version
  if (shouldUpdate) {
    console.log('shouldUpdate == true, 下载图片操作。。。。。。。。。')
    const filename = `startAd_${data.version}.webp`
    const localPath = await downloadAndSaveImage(data.url, filename)
    console.log('fun=downloadAndSaveImage, 返回图片 file-url格式: ', localPath)

    if (localPath) {
      // ✅ 下载成功后，尝试删除旧图片
      if (old?.file) {
        try {
          // const oldPath = old.file.replace(/^file:\/\//, '')  // delete 移除 file:// 前缀; 用不着都是https请求，不用替换  // fun=downloadAndSaveImage, 返回图片 file:  https://localhost/_capacitor_file_/data/user/0/com.study.ui_sexcomic/files/ad_1_20250601.webp
          // const oldPath = old.file.replace(/^https:\/\/localhost\/_capacitor_file_\//, '')  // ✅ 转换为真实本地路径.  原来写法：const oldPath = old.file
          // const oldPath = old.file
          let oldPath = old.file
          // ✅ 如果是 file:// 开头的绝对路径，提取相对路径
          if (oldPath.startsWith('file://')) {
            // 去掉 file:// 前缀
            oldPath = oldPath.replace('file://', '')
          } else if (oldPath.startsWith('https://localhost/_capacitor_file_/')) {
            // 适配 WebView 映射路径
            oldPath = oldPath.replace('https://localhost/_capacitor_file_/', '')
          }
          oldPath = oldPath.split('/').pop()  // 只提取最后的 "startAd_1_20250601.webp" 文件名, path: 'startAd_1_20250601.webp', 才是 Capacitor 正确支持的形式
          console.log('🗑️ 旧广告图片路径: ', oldPath)
          await Filesystem.deleteFile({
            path: oldPath,
            directory: Directory.Data
          })
          console.log('🗑️ 旧广告图片已删除:', oldPath)
        } catch (deleteErr) {
          console.warn('⚠️ 删除旧广告图片失败:', deleteErr)
        }
      }
      // 删除旧图片 end
      
      const adCache = {
        version: data.version,
        file: localPath,      // ✅ 本地 file:// 路径
        link: data.link || '' // ✅ 跳转链接
      }
      localStorage.setItem(AD_KEY, JSON.stringify(adCache))
      console.log('✅ 广告缓存已更新:', JSON.stringify(adCache))
    } else {
      console.warn('⚠️ 图片下载失败，缓存未更新')
    }
  } else {
    console.log('📦 广告版本未变，使用已有缓存')
  }
  } catch (err) {
    console.warn('🚫 获取广告失败:', err)
  }
}

/**
 * 下载远程广告图并保存到设备本地（Directory.Data）
 */
// 改进后
async function downloadAndSaveImage(url, filename) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`图片下载失败：${res.status}`)

    const blob = await res.blob()
    const base64 = await blobToBase64(blob)

    // 写入本地文件
    await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Data,
      recursive: true
    })

    // 读取确认写入成功
    await Filesystem.readFile({
      path: filename,
      directory: Directory.Data
    })

    // 获取 file:// 路径
    const { uri } = await Filesystem.getUri({
      path: filename,
      directory: Directory.Data
    })

    console.log('✅ 图片下载并保存成功, 保存路径= ', uri)

    return uri // 原来写法: return uri -》 返回 file:// 路径； Capacitor.convertFileSrc(uri) -》返回 uri 路径-》https://localhost/xxx格式
  } catch (err) {
    console.error('❌ 下载或保存广告图失败:', err)
    return null
  }
}

// 改进前
// async function downloadAndSaveImage(url, filename) {
//   try {
//     const res = await fetch(url)
//     if (!res.ok) throw new Error(`图片下载失败：${res.status}`)

//     const blob = await res.blob()
//     const base64 = await blobToBase64(blob)

//     await Filesystem.writeFile({
//       path: filename,
//       data: base64,
//       directory: Directory.Data,
//       recursive: true
//     })

//     const { uri } = await Filesystem.getUri({
//       path: filename,
//       directory: Directory.Data
//     })

//     return uri // 返回 file:// 路径
//   } catch (err) {
//     console.error('❌ 保存广告图失败:', err)
//     return null
//   }
// }

/**
 * Blob 转 Base64（去除 data:image 前缀）
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
// -----------------v0.4 end ------------

// v0.3 加载本地文件写法 - 不带删除旧文件
// import { Filesystem, Directory } from '@capacitor/filesystem'

// const AD_KEY = 'cachedAd'

// /**
//  * 获取本地缓存广告数据
//  * 返回结构：
//  * {
//  *   version: '20250601',
//  *   file: 'file://xxx/path/to/ad.webp',  ← 本地文件路径
//  *   link: 'https://ad-link.com'          ← 跳转链接
//  * }
//  */
// export function getCachedAd() {
//   try {
//     const cached = JSON.parse(localStorage.getItem(AD_KEY))
//     if (cached?.file && cached?.version) {
//       console.log('请求广告json-server. cached?.file && cached?.file = ', cached?.file)
//       console.log('请求广告json-server. cached?.file && cached?.version = ', cached?.version)
//       return cached
//     }
//     return null
//   } catch (err) {
//     console.warn('❌ 广告缓存解析失败:', err)
//     return null
//   }
// }

// /**
//  * 从远程接口获取广告信息，并下载新图片存入本地，更新缓存
//  */
// export async function fetchAndUpdateAd() {
//   try {
//     const res = await fetch('https://www.j88d.com/test/ad') // ← 修改为你的广告接口地址
//     // const res = await fetch('http://localhost:3000/ad') // ← 本地 - 修改为你的广告接口地址
//     if (!res.ok) throw new Error(`广告接口请求失败：${res.status}`)
  
//   const data = await res.json()
//   const old = getCachedAd()
//   console.log("请求返回信息 data = ", data)

//   // 更新情况：本地缓存没数据，并且，新旧版本不相等
//   const shouldUpdate = !old || data.version !== old.version
//   if (shouldUpdate) {
//     console.log('shouldUpdate == ture, 下载图片操作。。。。。。。。。')
//     const filename = `ad_${data.version}.webp`
//     const localPath = await downloadAndSaveImage(data.url, filename)
//     console.log('fun=downloadAndSaveImage, 返回图片 file: ', localPath)

//     if (localPath) {
//       const adCache = {
//         version: data.version,
//         file: localPath,      // ✅ 本地 file:// 路径
//         link: data.link || '' // ✅ 跳转链接
//       }
//       localStorage.setItem(AD_KEY, JSON.stringify(adCache))
//       console.log('✅ 广告缓存已更新:', adCache)
//     } else {
//       console.warn('⚠️ 图片下载失败，缓存未更新')
//     }
//   } else {
//     console.log('📦 广告版本未变，使用已有缓存')
//   }
//   } catch (err) {
//     console.warn('🚫 获取广告失败:', err)
//   }
// }

// /**
//  * 下载远程广告图并保存到设备本地（Directory.Data）
//  */
// // 改进后
// async function downloadAndSaveImage(url, filename) {
//   try {
//     const res = await fetch(url)
//     if (!res.ok) throw new Error(`图片下载失败：${res.status}`)

//     const blob = await res.blob()
//     const base64 = await blobToBase64(blob)

//     // 写入本地文件
//     await Filesystem.writeFile({
//       path: filename,
//       data: base64,
//       directory: Directory.Data,
//       recursive: true
//     })

//     // 读取确认写入成功
//     await Filesystem.readFile({
//       path: filename,
//       directory: Directory.Data
//     })

//     // 获取 file:// 路径
//     const { uri } = await Filesystem.getUri({
//       path: filename,
//       directory: Directory.Data
//     })

//     console.log('✅ 图片下载并保存成功, 保存路径= ', uri)

//     return Capacitor.convertFileSrc(uri) // 原来写法: return uri
//   } catch (err) {
//     console.error('❌ 下载或保存广告图失败:', err)
//     return null
//   }
// }
// // 改进前
// // async function downloadAndSaveImage(url, filename) {
// //   try {
// //     const res = await fetch(url)
// //     if (!res.ok) throw new Error(`图片下载失败：${res.status}`)

// //     const blob = await res.blob()
// //     const base64 = await blobToBase64(blob)

// //     await Filesystem.writeFile({
// //       path: filename,
// //       data: base64,
// //       directory: Directory.Data,
// //       recursive: true
// //     })

// //     const { uri } = await Filesystem.getUri({
// //       path: filename,
// //       directory: Directory.Data
// //     })

// //     return uri // 返回 file:// 路径
// //   } catch (err) {
// //     console.error('❌ 保存广告图失败:', err)
// //     return null
// //   }
// // }

// /**
//  * Blob 转 Base64（去除 data:image 前缀）
//  */
// function blobToBase64(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       const base64 = reader.result.split(',')[1]
//       resolve(base64)
//     }
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }
// -----------------v0.3 end ------------


// v0.2 加载网络资源的写法
// 对应db.json 测试数据 - 备份，实际使用要把db.json删了，把内容拷贝到 db.json文件中
// {
//   "posts": [
//     { "id": 1, "title": "Hello World", "author": "ChatGPT" },
//     { "id": 2, "title": "JSON Server 使用教程", "author": "OpenAI" }
//   ],
//   "comments": [
//     { "id": 1, "body": "Nice article!", "postId": 1 }
//   ],
//   "profile": { "name": "fifrj fjwifwe" },
//   "ad": {
//     "url": "https://d2tjd77zongpix.cloudfront.net/sexcomic/adimg/startad_default_home.webp",  
//     "link": "https://your-ad-link.com",
//     "version": "1_20250620"
//   }
// }

// import { Filesystem, Directory } from '@capacitor/filesystem'

// const AD_KEY = 'cachedAd'

// export function getCachedAd() {
//   try {
//     return JSON.parse(localStorage.getItem(AD_KEY))
//   } catch {
//     return null
//   }
// }

// export async function fetchAndUpdateAd() {
//   try {
//     // const res = await fetch('https://your-api.com/ad')   // ✅ 你的json-server地址
//     const res = await fetch('http://localhost:3000/ad') // ✅ 你的json-server地址
//     const data = await res.json()
//     const old = getCachedAd()

//     // 判断版本是否有变化
//     if (!old || data.version !== old.version) {
//       // 下载新图片并保存
//       const fileName = `ad_${data.version}.webp`
//       const localPath = await downloadAndSaveImage(data.url, fileName)

//       if (localPath) {
//         // 更新缓存信息
//         localStorage.setItem(AD_KEY, JSON.stringify({
//           version: data.version,
//           file: localPath,
//         }))
//         console.log('✅ 广告已更新:', localPath)
//       }
//     } else {
//       console.log('广告未变化，使用缓存')
//     }
//   } catch (err) {
//     console.warn('广告更新失败:', err)
//   }
// }

// async function downloadAndSaveImage(url, filename) {
//   try {
//     const res = await fetch(url)
//     const blob = await res.blob()
//     const base64 = await blobToBase64(blob)

//     // 保存到 Cache 目录
//     await Filesystem.writeFile({
//       path: filename,
//       data: base64,
//       directory: Directory.Cache,
//     })

//     const { uri } = await Filesystem.getUri({
//       path: filename,
//       directory: Directory.Cache,
//     })

//     // 返回 file:// 路径
//     return uri
//   } catch (err) {
//     console.error('下载广告图失败:', err)
//     return null
//   }
// }

// function blobToBase64(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       const base64 = reader.result.split(',')[1] // 去掉 data:image/... 头部
//       resolve(base64)
//     }
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }


// v0.1 一直请求在线广告的写法
// const AD_KEY = 'cachedAd'

// /**
//  * 获取缓存广告信息
//  */
// export function getCachedAd() {
//   try {
//     return JSON.parse(localStorage.getItem(AD_KEY))
//   } catch (e) {
//     console.warn('缓存广告解析失败', e)
//     return null
//   }
// }

// /**
//  * 从远程接口获取广告信息并更新缓存
//  */
// export async function fetchAndUpdateAd() {
//   try {
//     // const res = await fetch('http://your-api/ad') // ✅ 你的json-server地址
//     const res = await fetch('http://localhost:3000/ad') // ✅ 你的json-server地址
//     if (!res.ok) throw new Error('网络错误：' + res.status)
//     const data = await res.json()

//     const old = getCachedAd()
//     // console.log("缓存=", localStorage)  // debug打印
//     console.log("缓存cachedAd =", old)

//     // 如果是首次缓存，或广告版本有更新，则更新缓存
//     if (!old || data.version !== old.version) {
//       localStorage.setItem(AD_KEY, JSON.stringify(data))
//       console.log('广告已更新:', data)
//     } else {
//       console.log('广告未变化，使用缓存')
//     }
//   } catch (err) {
//     console.warn('广告获取失败:', err)
//   }
// }
