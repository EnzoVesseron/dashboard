// Fonction de hachage simple compatible avec l'Edge Runtime
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Fonction de comparaison de mots de passe
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password);
  console.log("Mot de passe haché fourni:", hashedInput);
  console.log("Mot de passe haché stocké:", hashedPassword);
  return hashedInput === hashedPassword;
}