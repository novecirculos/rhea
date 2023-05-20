import { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '~/utils/openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { text } = req.body

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You will be receiving specific described scenes, and you will be acting as a skilled illustrator to create beautiful descriptions about these D&D arts / illustrations.',
          },
          {
            role: 'system',
            content:
              'MidJourney is proficient at adapting actual art styles to create an image of any combination of things the user wants. It excels at creating environments, especially fantasy.',
          },
          { role: 'system', content: 'Prompt examples:' },
          {
            role: 'system',
            content:
              "An awe - inspiring DND illustration that transports the viewer to a sprawling magical city, brimming with enchantment and wonder. This immersive fantasy scene is characterized by its exquisite English architecture, with ornate buildings and intricate details that reveal the city's rich history and culture. Dominating the cityscape is a colossal tree at the heart of the metropolis, its ancient branches reaching towards the heavens and providing a symbolic link between the natural world and the magical realm. The artist's masterful use of color and lighting imbues the scene with a palpable sense of magic, as the city's many buildings are bathed in a warm, golden glow, inviting the viewer to explore the countless mysteries that await within its winding streets and shadowed alleyways. The fantastical elements of the city are further emphasized by the presence of magical creatures and spellcasters, who weave their arcane arts amongst the bustling crowds. Drawing from the rich tradition of RPG and DND lore, the illustration is meticulously crafted, with each element of the scene carefully designed to engage the viewer's imagination and transport them to a world of adventure and intrigue. The city's diverse inhabitants, from noble wizards to roguish adventurers, are expertly rendered, their individual stories and motivations hinted at through subtle visual cues and expressive body language. This captivating DND illustration masterfully combines elements of English architecture, fantasy, and RPG storytelling to create a magical city that will ignite the imagination of any viewer, inviting them to step into a world filled with enchantment, danger, and endless possibilities for adventure --ar 16:9 --q 3",
          },
          {
            role: 'system',
            content:
              "A detailed and immersive D&D-style illustration of Akai, a skillful ronin swordsman, stands confidently amidst a traditional Japanese garden with a koi pond, bamboo, and cherry blossom trees. Akai is slim and average-height, with short, messy black hair, sharp deep brown eyes that convey a tired and sad feeling, and a small scar above his left eyebrow from a past battle. He wears a dark red haori with black cherry blossom patterns on the inner lining, a dark blue undershirt, black pants, and simple straw sandals with white straps. Akai carries two swords at his right side: a well-worn katana with a long, curved blade, a round guard, a grip, and a small red tassel tied to the hilt, and a wakizashi with a shorter, straight blade and a square guard and grip. Both swords are sheathed in black lacquer scabbards with silver fittings. The ground is covered in fallen cherry blossom petals, and the background features snow-capped mountains under a clear sky with scattered clouds. Akai's serious and focused expression, along with his ready-for-battle posture and the positioning of his swords for a quick draw, suggest anticipation of an attack. The illustration is full-body, with a dark color scheme and hints of red and black, capturing the essence of a fantasy ronin in a realistic and detailed D&D art style. --ar 16:9",
          },
          {
            role: 'system',
            content:
              'Always keep --ar 16:9 in the end of each prompt. This is a important parameter that defines the aspect ratio.',
          },
          { role: 'user', content: text },
        ],
      })

      return res.status(200).json({
        prompt: completion.data.choices[0].message?.content,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Completion error',
      })
    }
  }
}
