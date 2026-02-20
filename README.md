# Express + MySQL API

Prosta aplikacja Express.js z 4 endpointami CRUD dla użytkowników i bazą MySQL.

## Endpointy

- `GET /users` – lista użytkowników
- `POST /users` – dodanie użytkownika (`name`, `email`)
- `PUT /users/:id` – aktualizacja użytkownika (`name`, `email`)
- `DELETE /users/:id` – usunięcie użytkownika

## Konfiguracja

1. Skopiuj plik `.env.example` do `.env` i ustaw dane dostępowe.
2. Uruchom MySQL lokalnie lub przez Docker:

```bash
docker compose up -d
```

3. Zainstaluj zależności:

```bash
npm install
```

4. Uruchom serwer:

```bash
npm start
```

Aplikacja sama tworzy bazę danych i tabelę `users` przy starcie.
