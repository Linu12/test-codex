# Zadanie dla początkujących: `useEffect` w React

## Cel
Nauczysz się używać `useEffect` do pobierania danych po załadowaniu komponentu.

## Treść zadania
Stwórz komponent `UserCard`, który:

1. Po pierwszym renderze pobierze dane użytkownika z API:
   - `https://jsonplaceholder.typicode.com/users/1`
2. W trakcie pobierania wyświetli tekst: **„Ładowanie...”**.
   - Stan ładowania powinien trwać co najmniej **3 sekundy** (żeby był wyraźnie widoczny).
3. Po udanym pobraniu pokaże:
   - imię użytkownika,
   - email,
   - nazwę firmy.
4. Gdy wystąpi błąd, pokaże komunikat: **„Nie udało się pobrać danych.”**.
5. Dodaj przycisk **„Odśwież dane”**, który ponownie pobiera użytkownika po kliknięciu.

## Wymagania techniczne
- Użyj `useState` do przechowywania:
  - danych użytkownika,
  - statusu ładowania,
  - błędu.
- Użyj `useEffect` z pustą tablicą zależności (`[]`), aby wykonać pobranie tylko raz po zamontowaniu komponentu.
- Użyj `fetch` i `async/await`.
- Dodaj sztuczne opóźnienie (np. `setTimeout` w `Promise`) tak, aby loading był dłuższy.
- Wydziel funkcję `loadUser`, aby można było jej użyć zarówno w `useEffect`, jak i w `onClick` przycisku odświeżania.

## Podpowiedź (szkielet)
```jsx
import { useEffect, useState } from "react";

export default function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function loadUser() {
    try {
      setLoading(true);
      setError(false);

      await wait(3000); // wydłużony loading dla celów ćwiczenia

      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!response.ok) {
        throw new Error("Błąd odpowiedzi serwera");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) {
    return (
      <div>
        <p>Nie udało się pobrać danych.</p>
        <button onClick={loadUser}>Odśwież dane</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Firma: {user.company?.name}</p>
      <button onClick={loadUser}>Odśwież dane</button>
    </div>
  );
}
```

## Kryteria zaliczenia
- Komponent działa bez błędów.
- Dane pobierają się tylko raz po wejściu na stronę (przy pierwszym renderze).
- Widoczne są stany: ładowanie / sukces / błąd.
- Kliknięcie przycisku **„Odśwież dane”** ponownie pobiera użytkownika.
