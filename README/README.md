------------- UPDATE AS I PROGRESS -------------

🧭 Suggested Project Roadmap

Phase 1 — Foundation

✅ React+Vite UI base

✅ Add React Router pages - Still need to fix Sidebar parameters in Topbar

✅ Setup Go backend + /health route

✅ Connect frontend → backend (Smoke Check)

Phase 2 — Core Backend

✅ Set up folder structure & DB connection (SQLlite)

✅ Add /login + /register endpoints (JWT auth)

⬜ Connect Authentication with frontend Login Modal

⬜ Add /recession-metrics endpoint with dummy data

⬜ Write first tests with Testify

Phase 3 — Frontend Specs

⬜ Set up dashboard cards

⬜ Set up rest of pages cards

⬜ Create mock data charts

Phase 4 — Data Streaming

⬜ Set up Kafka locally (Docker)

⬜ Create a Go Kafka producer → pulls data from FRED API

⬜ Create a Go Kafka consumer → writes to PostgreSQL

⬜ Add a /metrics/latest endpoint to serve that data

Phase 5 — Data Engineering & Scaling

⬜ Build orchestration layer (Airflow or Prefect)

⬜ Schedule data pulls and model updates

⬜ Add metrics visualizations in the frontend
