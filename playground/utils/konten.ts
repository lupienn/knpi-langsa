/**
 * Memformat isi konten artikel berita agar tautan (link) dan elemen HTML tertata dengan benar:
 * 1. Memperbaiki tag <a> yang atributnya pecah baris (newline).
 * 2. Memperbaiki tag <a> di mana href hanya 'https://' tetapi URL asli berada di dalam teksnya.
 * 3. Otomatis mengubah URL mentah (https://...) yang belum dibungkus menjadi link aktif yang dapat diklik.
 * 4. Memastikan semua link membuka tab baru (target="_blank") dan memiliki atribut keamanan (rel="noopener noreferrer").
 */
export function formatKontenHtml(raw: string | null | undefined): string {
  if (!raw) return ''
  let html = raw

  // 1. Perbaiki tag <a> rusak di mana href hanya 'https://' atau 'http://' tetapi URL asli ada di dalam teks
  html = html.replace(
    /<a\s+[^>]*href=['"]https?:\/\/?['"][^>]*>([\s\S]*?)<\/a>/gi,
    (match, textInside) => {
      const cleanText = textInside.trim()
      if (/^https?:\/\/[^\s<]+$/i.test(cleanText)) {
        return `<a href="${cleanText}" target="_blank" rel="noopener noreferrer" class="link-artikel">${cleanText}</a>`
      }
      return match
    },
  )

  // 2. Perbaiki tag <a> yang terpotong baris baru (newline) di antara atributnya
  html = html.replace(/<a\s+([\s\S]*?)>/gi, (match, attrs) => {
    let cleanAttrs = attrs.replace(/\r?\n/g, ' ').trim()
    if (!/target=/i.test(cleanAttrs)) {
      cleanAttrs += ' target="_blank"'
    }
    if (!/rel=/i.test(cleanAttrs)) {
      cleanAttrs += ' rel="noopener noreferrer"'
    }
    if (!/class=/i.test(cleanAttrs)) {
      cleanAttrs += ' class="link-artikel"'
    }
    return `<a ${cleanAttrs}>`
  })

  // 3. Auto-link: Cari teks URL biasa (https:// atau http://) yang belum dibungkus tag <a>
  const tokens = html.split(/(<[^>]+>)/g)
  let insideAnchor = false

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.startsWith('<')) {
      if (/^<a[\s>]/i.test(token)) insideAnchor = true
      if (/^<\/a>/i.test(token)) insideAnchor = false
      continue
    }

    if (!insideAnchor && token) {
      // Ubah URL polos menjadi link <a> yang dapat diklik
      tokens[i] = token.replace(
        /(https?:\/\/[^\s<"']+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="link-artikel">$1</a>',
      )
    }
  }

  return tokens.join('')
}
