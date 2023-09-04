const words = ['fantasia', 'RPG', 'magia']
let wordIndex = 0
let charIndex = 0

function typeWord() {
  const typewriterElement = document.querySelector('.typewriter')
  if (charIndex < words[wordIndex].length) {
    typewriterElement.textContent += words[wordIndex].charAt(charIndex)
    charIndex++
    setTimeout(typeWord, 150)
  } else {
    wordIndex = (wordIndex + 1) % words.length
    charIndex = 0
    setTimeout(() => {
      typewriterElement.textContent = ''
      typeWord()
    }, 2000)
  }
  typewriterElement.classList.add('cursor')
}

window.onload = typeWord
