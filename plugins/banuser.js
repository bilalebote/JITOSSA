let handler = async (m, {
    conn,
    args
}) => {
    if (!args || !args[0]) throw 'من يرغب في الحظر؟'
    let mention = m.mentionedJid[0] || await conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || ''
    if (!mention) throw 'يرجى وضع علامة على شخص ما.'
    if (!(mention in global.db.data.users)) throw 'المستخدم غير مسجل في قاعدة البيانات!!'
    let user = global.db.data.users[mention]
    if (user.banned) throw 'المستخدم محظور بالفعل!!'
    let txt = (args.length > 1 ? args.slice(1).join(' ') : '') || ''
    user.banned = true
    user.BannedReason = txt
    m.reply('تم حظر المستخدم بنجاح!')
    m.reply('*لقد تم حظرك من قبل مالك الأصل أو المشرف!!*\n *اتصل* \n' + global.owner.map((v, i) => '*Owner ' + (i + 1) + ':* wa.me/' + v).join('\n') + '\n\n' + global.mods.map((v, i) => '*Moderator ' + (i + 1) + ':* wa.me/' + v).join('\n'), mention)
}

handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(user)?$/i
handler.owner = true

export default handler