import { dicionario } from '$lib/dicionario.js';

export async function load({ params }) {
  console.log('params.name:', params.name);  // Log para garantir que o nome da palavra está correto

  const name = params.name;  // Captura o parâmetro 'name' da URL
  const palavraEncontrada = dicionario.find(item => item.palavra.toLowerCase() === name.toLowerCase());

  if (!palavraEncontrada) {
    return {
      status: 404,
      error: new Error('Palavra não encontrada')
    };
  }

  console.log('Palavra encontrada no servidor:', palavraEncontrada);  // Log para mostrar a palavra encontrada

  return {
    props: {
      palavra: palavraEncontrada  // Passa a palavra encontrada para o frontend
    }
  };
}
