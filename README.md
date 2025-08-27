# Singo Learn

[Live Demo](https://singo-learn.vercel.app)

**Singo Learn** is a fully responsive e-learning platform built with **pure React** (no Next.js). This project was developed as a portfolio piece to showcase advanced React skills, including state management, routing, forms, and dynamic UI interactions.

## Overview

Singo Learn allows three types of users:

- **Users**: Can browse, add/remove courses from their cart, purchase courses, and view their personal information and purchased courses in their dashboard.  
- **Teachers**: Can manage their own courses by creating, editing, and deleting sessions. Teachers can also update their profile information.  
- **Admin**: The admin has full CRUD access to teachers, users, courses, and discounts. Only the admin can add new teachers. Admin can also update their own profile.

## Key Features

- **Authentication & Authorization**: Registration, login, and password recovery implemented for all users. Role-based access for users, teachers, and admin.  
- **User Dashboard**: View personal info, purchased courses, and course details.  
- **Teacher Dashboard**: Manage personal info and course sessions.  
- **Admin Dashboard**: Full CRUD access over all entities, manage teachers, courses, discounts, and users.  
- **Responsive Design**: Fully responsive layout supporting both desktop and mobile screens.  
- **Dynamic UI**: Smooth page transitions and modal animations using `framer-motion`.  
- **Forms**: Managed with `react-hook-form` for validation and dynamic input handling.  
- **Rich Text Editing**: TinyMCE used for creating course content.  
- **Data Fetching & Caching**: `react-query` for efficient API fetching and state management.

## Tech Stack

- **Frontend**: React, React Router, React Query, Axios, Framer Motion, React Hook Form, TinyMCE  
- **Backend**: Mock API using `json-server` (deployed on [singo-learn-server](https://github.com/yourusername/singo-learn-server))  
- **State & Forms**: React Query, React Hook Form  
- **Animations**: Framer Motion  
- **Editor**: TinyMCE  

## Project Structure
```bash
public/
├── images # globally images that use in components and pages like logo and other things 
├── fonts # project fonts
├── svg # svg icons

src/
├── api # API Manage Api Requests (Private -> need Authorization , Public -> no nedd Autorizarion)
├── components # Reusable UI components
├── constants # Constants and input patterns
├── data # Static data
├── hooks # Custom React hooks
├── HOC # Higher Order Components
├── layouts # Layouts for pages
├── pages # Main pages for users, teachers , admin and other pages
├── utils # Utility functions and helper functions
```

## Installation & Usage

1. Clone the repository:  
git clone https://github.com/amirhosein7590/singo-learn.git
2. cd singo-learn/front-end
3. npm install
4. npm run dev
5. open http://localhost:5173

## limitation / notes
1. No additional environment variables are required. 
2. The frontend connects to a mock backend hosted separately (singo-learn-server).
3. The backend is a mock API using json-server, so some authentication features like http-only cookies are not implemented.
4. Access tokens and refresh tokens are stored in localStorage.
5. Currently, only one admin account exists, and additional admin accounts cannot be created.
6. Some backend limitations exist, such as the admin being stored in the users table, which allows unintended course purchases.
7.  These limitations are purely due to the mock backend setup and are not reflective of frontend capabilities
