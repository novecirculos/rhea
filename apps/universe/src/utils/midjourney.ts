import { Midjourney } from 'midjourney'

export const midjourney = new Midjourney({
  ServerId: <string>process.env.DISCORD_SERVER_ID,
  ChannelId: <string>process.env.DISCORD_CHANNEL_ID,
  SalaiToken: <string>process.env.DISCORD_SALAI_TOKEN,
  Debug: process.env.NODE_ENV === 'development' ? true : false,
})
