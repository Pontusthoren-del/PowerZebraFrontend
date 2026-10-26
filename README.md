# Meetly – Frontend

Meetly är en webbapp där man hittar meetups, anmäler sig och håller koll på sina möten. Det här repot innehåller frontend, byggd i React. Backend finns i [PowerZebraBackend](https://github.com/Pontusthoren-del/PowerZebraBackend).

## Live

| | URL |
|---|---|
| Appen | https://meetly-frontend-a9g6b7gvhdd2afga.norwayeast-01.azurewebsites.net |
| Backend (API) | https://meetly-aed8cwgec3cshjhv.norwayeast-01.azurewebsites.net |

Testkonto: `demo@meetly.se` / `Meetly123!`

## Funktioner

- **Hitta** – lista med kommande meetups: tid, plats, värd, beskrivning och lediga platser
- **Sök och filtrera** – fritextsökning och filter på kategori
- **Detaljsida** – all information om en meetup
- **Konto** – registrera dig och logga in, du förblir inloggad vid omladdning
- **Anmäl dig** – anmäl och avanmäl dig, med besked direkt om det är fullt
- **Mina möten** – dina kommande och tidigare meetups på ett ställe

## Teknik

- **React 19** med **TypeScript** och **Vite**
- **Redux Toolkit** för inloggning och anmälningar som delas mellan sidorna
- **React Router** för sidorna
- **nginx** i en Docker-container i produktion

## Köra lokalt

Kräver **Node 22** och att backend körs lokalt (se [backend-README](https://github.com/Pontusthoren-del/PowerZebraBackend)).

```sh
cd Meetly.Frontend
npm install
npm run dev
```

Öppna adressen som Vite skriver ut (oftast http://localhost:5173).

Frontend hittar backend via `VITE_API_URL` i `.env.development`:

```
VITE_API_URL=http://localhost:5156
```

> Lokal frontend måste prata med lokal backend. Backend i Azure släpper bara in den publika frontend-adressen (CORS).

### Kommandon

| Kommando | Vad det gör |
|---|---|
| `npm run dev` | Startar utvecklingsservern |
| `npm run lint` | Kollar koden med ESLint |
| `npm run build` | Typkontroll och produktionsbygge till `dist/` |
| `npm run preview` | Kör produktionsbygget lokalt |

Kör `npm run lint` och `npm run build` innan du pushar – det är samma kontroller som CI gör.

## Projektstruktur

```
Meetly.Frontend/src/
├── api/          Anrop till backend (meetups, inloggning, anmälningar)
├── components/   Återanvändbara delar: header, meetup-kort, sökfält, formulär …
├── hooks/        useMeetups, useMeetup, useRegistration, useSignup …
├── pages/        Startsida, detaljsida, Mina möten, logga in, registrera
├── routes/       Alla routes i appen
├── store/        Redux: inloggning (authSlice) och anmälningar (registrationsSlice)
└── types/        TypeScript-typer för meetups och inloggning
```

## Arbetssätt och CI/CD

1. Ny branch från `Dev` för varje kort på Trello (`feature/…` eller `fix/…`)
2. Pull request mot `Dev` – **CI** kör `npm ci`, `lint` och `build`
3. CI måste vara grön och någon annan måste granska innan merge
4. Release: pull request `Dev` → `main`
5. **CD** bygger en Docker-image, pushar den till Docker Hub och driftsätter den på Azure App Service

`Dev` är default-branch, så nya pull requests pekar rätt automatiskt. Ingen kan pusha direkt till `Dev` eller `main`.

Hemligheter (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `AZURE_WEBAPP_PUBLISH_PROFILE`) ligger som GitHub secrets, och `VITE_API_URL` för produktion som repo-variabel. Inget av det finns i koden.

## Gruppen – Power Zebras

Pontus · Viktor · Sara · Nikki
