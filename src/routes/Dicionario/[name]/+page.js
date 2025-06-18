import { dicionario } from '$lib/dicionario.js';

export async function load({ params }) {
  const name = params.name;
  let palavra = dicionario.filter((palavra) => palavra.palavra == name)
  return { palavra };
}

