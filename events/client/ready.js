require('colors')

module.exports = async client => {
    client.user.setActivity(client.config.Activity.Name, {
        type: client.config.Activity.Type,
    });
    console.log(`[Client] Logged in as ${client.user.tag}`.magenta);

    const channel = client.channels.cache.get(String(client.config.MemberCount.Channel))
    const memberCount = channel.guild.memberCount
    setInterval(() => {
        channel.setName(`${String(client.config.MemberCount.Format).replace('{members}', String(memberCount))}`)
    }, 600000)
};