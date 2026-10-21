import { useEffect, useState } from "react";

function useFileExists(path) {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(path, { method: "HEAD" })
      .then((r) => {
        if (alive) setExists(r.ok);
      })
      .catch(() => alive && setExists(false));
    return () => {
      alive = false;
    };
  }, [path]);
  return exists;
}

/* Пробует пути по очереди, возвращает первый существующий ('pending' пока идёт проверка) */
export default function useFirstExisting(paths) {
  const list = Array.isArray(paths) ? paths : [paths];
  const flags = list.map((p) => useFileExists(p));
  for (let i = 0; i < list.length; i++) {
    if (flags[i]) return list[i];
  }
  // pending = какая-то проверка ещё не завершена
  return "pending";
}
