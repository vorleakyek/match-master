export async function addLevelAndTheme(levelAndTheme) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(levelAndTheme),
  };

  const res = await fetch('/api/level-and-theme',req);

  if(!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
