# Project Roadmap

This document tracks the development stages of the project.

The goal is to develop the application in vertical slices.

Each completed stage should:

- Have working backend functionality
- Have working frontend functionality
- Be tested end-to-end
- Be stable enough to demonstrate
- Be merged into `main`

---

# Stage 1 — Survey CRUD Foundation

## Goal

Build a complete Survey CRUD system with MongoDB, ASP.NET Core, and React.

## Backend

- [x] MongoDB Atlas setup
- [x] MongoDB connection configuration
- [x] Survey model
- [x] Survey DTOs
- [x] Survey repository
- [x] Survey service
- [x] Survey controller
- [x] Filtering
- [x] Pagination
- [x] Sorting
- [x] Soft delete

## Frontend

- [ ] Survey list
- [ ] Create survey
- [ ] Update survey
- [ ] Delete survey
- [ ] Filtering
- [ ] Pagination

## Before Completing This Stage

- [ ] Backend and frontend work together
- [ ] APIs tested
- [ ] Error handling works
- [ ] Application can be demonstrated

Status: `In Progress`

---

# Stage 2 — Authentication

## Goal

Implement secure user authentication.

## Backend

- [x] User model
- [x] Refresh token model
- [x] Register DTO
- [x] Login DTO
- [x] Auth response DTO
- [x] Auth result DTO
- [x] User mapper
- [x] User repository
- [x] Password hashing using BCrypt
- [x] Password verification
- [x] Username duplicate check
- [x] Email duplicate check
- [x] User role model
- [x] Role claim in JWT
- [x] JWT settings
- [x] JWT access token generation
- [x] Secure refresh token generation
- [x] Token service
- [x] Refresh token hashing
- [x] Store refresh tokens in MongoDB
- [x] JWT authentication middleware configuration
- [x] JWT validation configuration
- [x] Cookie-based JWT extraction
- [x] CORS credentials configuration
- [x] Register endpoint
- [x] Login endpoint
- [ ] Refresh token endpoint
- [ ] Logout endpoint
- [ ] Get current user endpoint
- [ ] Global exception handling

## Frontend

- [ ] Register page
- [ ] Login page
- [ ] Auth API integration
- [ ] Store authenticated user state
- [ ] Protected routes
- [ ] Logout

## Before Completing This Stage

- [ ] User can register
- [ ] User can login
- [ ] Access and refresh tokens are stored securely in HttpOnly cookies
- [ ] Authentication cookies work with the React frontend
- [ ] User stays authenticated after page refresh
- [ ] User can logout
- [ ] Complete flow is tested
- [ ] Application is demoable

Status: `In Progress`

---

---

# Stage 3 — Practice Onboarding Foundation

## Goal

Create a multi-step Practice Onboarding wizard.

The initial implementation will focus on the frontend UI, wizard flow, form state management, and validation.

Backend integration will be implemented after the UI flow and requirements are clarified.

## Requirements Identified So Far

- Practice Name
- Logo
- Favicon
- Website
- Practice Phone Number
- Invoice Sample
- Invoice Header
- Invoice Footer
- Public Email (No Reply)
- Proposed URL
- Contact Person Name
- Contact Person Email
- Contact Person Phone Number

## Current Implementation Plan

The Practice Onboarding feature will initially be implemented as a frontend-only multi-step wizard.

The first implementation will focus on:

- UI structure
- Step navigation
- Central form state management
- Preserving form data between steps
- Basic field validation
- File selection UI
- File preview where applicable
- Review screen

The frontend will initially use local React state.

No backend integration will be implemented during the initial UI phase.

Backend models, DTOs, repositories, services, controllers, file storage, and data conversion processing will be designed after the UI flow and requirements are clarified.

## Frontend

- [ ] Create onboarding feature folder
- [ ] Create onboarding TypeScript types
- [ ] Create OnboardingPage
- [ ] Create multi-step wizard structure
- [ ] Create stepper component
- [ ] Create step navigation
- [ ] Create central onboarding form state

### Step 1 — Practice Details

- [ ] Practice Name
- [ ] Proposed URL

### Step 2 — Branding

- [ ] Logo selection
- [ ] Favicon selection
- [ ] File preview where applicable

### Step 3 — Contact Information

- [ ] Website
- [ ] Practice Phone Number
- [ ] Contact Person Name
- [ ] Contact Person Email
- [ ] Contact Person Phone Number

### Step 4 — Invoice and Email

- [ ] Invoice Sample selection
- [ ] Invoice Header
- [ ] Invoice Footer
- [ ] Public Email / No Reply Email

### Step 5 — Data Conversion

- [ ] Contacts
- [ ] Users
- [ ] Receipts
- [ ] Businesses
- [ ] Credit Notes
- [ ] Tasks
- [ ] Subscription and DD
- [ ] Invoices
- [ ] File selection UI
- [ ] Template download UI

### Step 6 — Review and Create

- [ ] Display collected onboarding data
- [ ] Display selected files
- [ ] Add mock Create Practice action
- [ ] Define expected final onboarding payload

## Validation

- [ ] Required field validation
- [ ] Email format validation
- [ ] Step-based validation
- [ ] Prevent moving forward when required data is missing

## Backend

Status: Not Started

Backend implementation will begin after:

- [ ] UI flow is finalized
- [ ] Requirements are clarified
- [ ] Practice data model is confirmed
- [ ] File storage requirements are confirmed
- [ ] Data conversion workflow is confirmed

## Open Questions

- [ ] Confirm whether Proposed URL is manually entered or generated
- [ ] Confirm the difference between Practice Phone Number and Contact Person Phone Number
- [ ] Confirm accepted file types for Logo and Favicon
- [ ] Confirm the purpose and expected format of Invoice Sample
- [ ] Confirm whether Data Conversion is mandatory
- [ ] Confirm whether data conversion happens during or after Practice creation
- [ ] Confirm how invalid rows in imported files should be handled
- [ ] Confirm which file formats are accepted for each data conversion type

## Before Completing This Stage

- [ ] User can navigate through all onboarding steps
- [ ] Form data is preserved between steps
- [ ] Validation works
- [ ] File selection UI works
- [ ] Review screen correctly displays collected data
- [ ] Complete wizard flow is tested
- [ ] UI is stable enough to demonstrate

Status: `In Progress`

---

# Stage 4 — Protected Survey Features

## Goal

Connect authentication with survey authorization.

## Goals

- [ ] Protect survey endpoints
- [ ] Learn `[Authorize]`
- [ ] Learn JWT claims
- [ ] Learn `HttpContext.User`
- [ ] Associate surveys with users
- [ ] Prevent users from modifying other users' surveys
- [ ] Implement authorization rules
- [ ] Update frontend for protected features

Status: `Not Started`

---

# Stage 5 — Advanced Authentication

## Goal

Improve authentication and session management.

## Goals

- [ ] Access token expiration
- [ ] Refresh token endpoint
- [ ] Refresh token rotation
- [ ] Multi-device login
- [ ] Active sessions
- [ ] Revoke refresh tokens
- [ ] Logout from individual devices
- [ ] Logout from all devices
- [ ] Session/device information

Status: `Not Started`

---

# Stage 6 — OAuth 2.0 and OpenID Connect

## Goal

Add external authentication providers.

## Goals

- [ ] Learn OAuth 2.0
- [ ] Learn OpenID Connect
- [ ] Authorization Code Flow
- [ ] Redirect URIs
- [ ] Client ID
- [ ] Client Secret
- [ ] Scopes
- [ ] Claims
- [ ] Microsoft login
- [ ] Google login
- [ ] Connect external identity to local user

Status: `Not Started`

---

# Stage 7 — Azure Blob Storage

## Goal

Add file storage to the application.

## Goals

- [ ] Learn Azure Storage concepts
- [ ] Create Blob Storage account
- [ ] Configure backend connection
- [ ] File upload API
- [ ] File validation
- [ ] File metadata
- [ ] Store files in Blob Storage
- [ ] Download/access files
- [ ] Connect files with application entities

Status: `Not Started`

---

# Stage 8 — Production Configuration and Azure Key Vault

## Goal

Improve security and production configuration.

## Goals

- [ ] Learn Azure Key Vault
- [ ] Move secrets outside source code
- [ ] Store MongoDB connection string securely
- [ ] Store JWT configuration securely
- [ ] Store OAuth secrets securely
- [ ] Configure development and production environments
- [ ] Production security review

Status: `Not Started`