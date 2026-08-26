# Project Architecture

## Overview

The application consists of:

- React frontend
- ASP.NET Core backend
- MongoDB database

```text
React
  ↓ HTTP
ASP.NET Core API
  ↓
Services
  ↓
Repositories
  ↓
MongoDB
```

# Authorization

The application uses role-based authorization.

Current roles:

- User
- Admin

Anonymous visitors are not assigned a role and can only access public endpoints.

## User

A User can:

- Access authenticated features
- View their own profile
- Manage their own sessions
- Create surveys
- View their own surveys
- Update their own surveys
- Delete their own surveys

## Admin

An Admin can:

- Perform all User actions
- View all surveys
- Update any survey
- Delete any survey
- Restore soft-deleted surveys
- Manage users in future stages

Authorization will later combine:

- Role-based authorization
- Resource ownership checks