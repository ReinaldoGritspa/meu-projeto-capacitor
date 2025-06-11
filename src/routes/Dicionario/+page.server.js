import { dicionario } from '$lib/dicionario.js';

export async function load() {
  // Você pode retornar todo o dicionário aqui
  return {
    props: {
      dicionario
    }
  };
}
