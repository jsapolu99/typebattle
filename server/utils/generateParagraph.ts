const string = 'The customer is very important, the customer will be followed by the customer. But the customer is not always right, as the customer may sometimes have incomplete information, unrealistic expectations, or misunderstand the process entirely. However, it is the responsibility of the service provider to ensure that the customer feels heard, valued, and respected throughout their journey. The customer’s perspective, while not infallible, provides valuable insight into the experience of the customer and highlights areas for improvement. Yet, the customer’s desires should be balanced with ethical practices, sustainable policies, and the practical limitations faced by businesses. Ultimately, the customer is central to the equation, but the customer must also be guided, educated, and sometimes challenged to arrive at mutually beneficial solutions.';

export function generateParagraphUsingLoremIpsum() {
  const words = string.split(' ');
  const paragraph = [];
  for (let i = 0; i < 150; i++) {
    paragraph.push(words[Math.floor(Math.random() * words.length)]);
  }
  return paragraph.join(' ').toLowerCase();
}

export async function generateParagraph(textLength: number) {
  try {
    const response = await fetch('http://metaphorpsum.com/paragraphs/10');

    if (!response.ok) {
      throw new Error('Failed to fetch paragraph');
    }

    const data = await response.text();
    const paragraph = data.split('\n').join(' ');

    return paragraph.split(' ').slice(0, textLength + 1).join(' ');
  } catch (e) {
    console.log(e);
    const paragraph = generateParagraphUsingLoremIpsum();
    return paragraph;
  }
}