import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) throw '😇What do you want me to create?'
    m.react(rwait)
    let msg = encodeURIComponent(text)
    let res = await fetch(`https://aemt.me/bingimg?text=${msg}`)
    let data = await res.json()
    console.log(data)
    let buffer = data.result
    conn.sendFile(m.chat, buffer, 'image.png', `${text}`, m)
    m.react(done)
}

handler.help = ['bingimg2 <query>']
handler.tags = ['drawing']
handler.command = /^bingimg2$/i

export default handler
