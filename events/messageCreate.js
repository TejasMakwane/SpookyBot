module.exports = async (client, message) => {
  if (message.author.bot) return // Ignore all bots
  if (message.author.id == client.user.id) return // Ignore our bot
  if (message.channel.type == 'dm') return // Ignore DM messages

  // -------------------- Messages with prefix --------------------

  if (message.content.startsWith(client.config.prefix)) {
    // TODO: Include prefix length
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    // Grab the command from the commands collection
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (!cmd) return

    return cmd.run(client, message)
  }

  // -------------------- Messages without prefix --------------------
  let emojis = [
    {
      id: 'spookybot',
      emoji: '761602615326146590',
      word: 'spooky',
    },
    {
      id: 'pumpkin',
      emoji: '🎃',
      word: 'halloween',
    },
  ]

  let words = message.content.trim().split(' ')
  words.forEach((word) => {
    emojis.forEach((emoji) => {
      if (word.toUpperCase() == emoji.word.toUpperCase()) {
        message.react(emoji.emoji)
      }
    })
  })
}
