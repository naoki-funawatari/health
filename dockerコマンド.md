docker-compose down
docker-compose build --no-cache
docker-compose up -d

docker exec -it health /bin/sh
docker exec -it health /bin/bash

yarn start
