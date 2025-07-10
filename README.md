# IUMS Auth API

Ushbu loyiha JWT asosida autentifikatsiya, email orqali aktivatsiya va admin panelga ega. Docker yordamida ishga tushiriladi va Swagger orqali test qilinadi.

## Boshlash

### 1. Klonlash va o‘rnatish
```bash
git clone <repo-url>
cd iums
npm install
```

### 2. .env faylini sozlash
`.env.example` faylini `.env` deb ko‘chirib, quyidagilarni to‘ldiring:
```
MONGO_URI=mongodb://mongo:27017/iums
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000
PORT=3000
```

### 3. Docker orqali ishga tushirish
```bash
docker-compose up --build
```

### 4. Swagger orqali test qilish
Brauzerda `http://localhost:3001/api-docs` manziliga kiring.

## Muhim endpointlar
- `POST /api/auth/register` — Ro‘yxatdan o‘tish (email orqali aktivatsiya)
- `POST /api/auth/login` — Login (JWT token va cookie)
- `POST /api/auth/logout` — Logout (cookie tozalanadi)
- `GET /api/auth/activate/:token` — Emaildan aktivatsiya
- `GET /users` — Foydalanuvchilar ro‘yxati (faqat admin)
- `POST /users/:id/make-admin` — Foydalanuvchini admin qilish (faqat admin)
- `GET /api/users` — Foydalanuvchilar ro‘yxati (API, faqat admin)

## Eslatma
- Birinchi ro‘yxatdan o‘tgan foydalanuvchi avtomatik admin bo‘ladi.
- Email yuborish uchun Gmail app password ishlating.
- Swagger orqali barcha API’larni test qilishingiz mumkin.

## Loyiha tuzilmasi
- `controllers/` — Biznes logika va HTTP javoblar
- `services/` — Biznes va tashqi servislar (email, auth)
- `models/` — Mongoose modellari
- `routes/` — Marshrutlar va middleware
- `middleware/` — Auth, role check, error handler
- `views/` — EJS view’lar (foydalanuvchilar ro‘yxati, 404)

## Muammo yoki savollar uchun
Bog'lanish uchun
 - Tg: @Abdumannon_Shamsiyev