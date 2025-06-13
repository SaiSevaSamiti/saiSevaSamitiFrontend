export async function GET() {
  const content = `
  User-agent: *
  Allow: /
  
  Sitemap: https://sai-seva-samiti.vercel.app/sitemap.xml
  `

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
