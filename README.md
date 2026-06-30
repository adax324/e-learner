# e-learner

Statyczna strona z materiałami do nauki. Bez serwera, bez build stepu —
hostowana bezpośrednio np. przez GitHub Pages.

Każdy temat to folder z plikiem `index.html`, np. `fizyka/index.html`
jest dostępny pod `/fizyka/`. Strona główna (`index.html`) zawiera listę
linków do tematów.

## Dodawanie nowego tematu

1. Stwórz folder `<nazwa>/` z plikiem `index.html`.
2. Dodaj link do niego w `index.html` na stronie głównej.

## Hostowanie

Włącz GitHub Pages dla tego repozytorium (Settings → Pages → branch `main`,
folder `/ (root)`).
