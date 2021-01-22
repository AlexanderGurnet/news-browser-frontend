const setAppropriatePhrase = (n, differentForms) => {
  const num = Math.abs(n) % 100; const n1 = n % 10;
  if (num > 10 && num < 20) { return differentForms[2]; }
  if (n1 > 1 && n1 < 5) { return differentForms[1]; }
  if (n1 === 1) { return differentForms[0]; }
  return differentForms[2];
};

export default setAppropriatePhrase;
