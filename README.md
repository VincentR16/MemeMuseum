# 🎭 MemeMuseum

**MemeMuseum** is a full-stack web application that combines entertainment and data-driven content discovery.  
It allows users to browse, upload, and interact with memes while automatically showcasing trending content based on real-world popularity data from **Google Trends** via **SerpApi**.  

The platform features secure authentication, efficient pagination, image hosting via Cloudinary, and automated trending updates.

---

## 🧠 Project Overview

**Goal:**  
To create a modern meme-sharing platform that integrates automated trending detection, optimized content delivery, and a responsive interface built with cutting-edge web technologies.

**Core Features:**
- 🔐 Secure authentication with JWT (access + refresh tokens)  
- 📸 Meme upload and hosting via **Cloudinary**  
- 📊 “Meme of the Day” system powered by **SerpApi + Google Trends**  
- ⏱️ Scheduled cron job every 12 hours for trending content updates  
- 🔄 Infinite scrolling pagination via **React Query**  
- 🧩 Modular NestJS backend with DTO validation and middleware security  
- 🎨 Responsive and accessible UI with **Mantine UI**

---

## 🧱 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Backend** | NestJS (Node.js / TypeScript), PostgreSQL, TypeORM |
| **Auth** | JWT Strategy (Access 15min, Refresh 7d), bcrypt hashing |
| **Image Storage** | Cloudinary |
| **Frontend** | React 18, Vite, TypeScript, React Router v6, Mantine UI |
| **Data Fetching** | TanStack React Query |
| **Testing** | Playwright (E2E) |
| **APIs** | SerpApi (Google Trends) |
| **Database** | PostgreSQL |
| **Security** | Throttler, Guards, ClassSerializerInterceptor |

---

## ⚙️ Installation

### 1. Clone the repositories
The project is divided into two separate repositories:

- 🖥️ **Backend:** [MemeMuseum Backend](https://github.com/VincentR16/MemeMuseum_Backend)  
- 🌐 **Frontend:** [MemeMuseum Frontend](https://github.com/VincentR16/MemeMuseum_Frontend)

```bash
git clone https://github.com/VincentR16/MemeMuseum_Backend.git
git clone https://github.com/VincentR16/MemeMuseum_Frontend.git
