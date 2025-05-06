# Етап 1: Збірка проєкту
FROM node:18-alpine AS builder

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json і package-lock.json (якщо є) для встановлення залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі вихідні файли до контейнера
COPY . .

# Збираємо Vite-проєкт (статичні файли зʼявляються у /app/dist)
RUN npm run build

# Етап 2: Сервер для продакшену через NGINX
FROM nginx:alpine

# Копіюємо збірку з попереднього етапу в стандартну директорію NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Копіюємо кастомний конфіг NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Експонуємо порт 80 (на ньому працює nginx)
EXPOSE 80

# Запускаємо NGINX у форграунді
CMD ["nginx", "-g", "daemon off;"]
