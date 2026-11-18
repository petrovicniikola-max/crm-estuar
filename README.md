# CRM Estuar + Mapa održavanja (Raspberry Pi)

LAN stack za Raspberry Pi 5: CRM na portu 80, zidna mapa na `/mapa`.

## Pristup u lokalu

- CRM: `http://IP-PI` (npr. `http://192.168.50.155`)
- Mapa: `http://IP-PI/mapa`

IP na Pi: `hostname -I`

## Pokretanje na Pi

```bash
sudo mkdir -p /opt && cd /opt
sudo git clone --recurse-submodules https://github.com/petrovicniikola-max/crm-estuar.git .

# Ako je mapa već u repou, dovoljno je:
sudo cp Caddyfile.pi-local /opt/Caddyfile
sudo cp docker-compose.pi-local.yml /opt/docker-compose.pi-local.yml

# .env (opciono)
echo 'POSTGRES_PASSWORD=programai' | sudo tee /opt/.env
echo 'FRONTEND_URL=http://192.168.50.155' | sudo tee -a /opt/.env
echo 'NEXT_PUBLIC_API_BASE_URL=http://192.168.50.155/api' | sudo tee -a /opt/.env

sudo docker compose -p opt -f /opt/docker-compose.pi-local.yml --env-file /opt/.env up -d --build
```

Zamenite `192.168.50.155` stvarnim IP-jem Pi-ja.

## Struktura

- `programai-crm/` – backend (submodul)
- `programai-frontend/` – CRM UI (submodul)
- `mapa-odrzavanja/` – zidna mapa održavanja
- `docker-compose.pi-local.yml` – LAN compose
- `Caddyfile.pi-local` – reverse proxy (`/api`, `/mapa`, CRM)

## Ažuriranje mape

Posle `git pull` na Pi:

```bash
cd /opt
sudo git pull
sudo git submodule update --init --recursive
sudo docker compose -p opt -f /opt/docker-compose.pi-local.yml --env-file /opt/.env up -d --build mapa
```
