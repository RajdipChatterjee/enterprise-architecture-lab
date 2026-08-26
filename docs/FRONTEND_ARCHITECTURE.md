# Frontend Architecture

## Purpose

This document defines the frontend architecture and coding philosophy used in this project.

The frontend follows a **feature-based architecture** while separating responsibilities within each feature.

The goal is to keep the frontend scalable, maintainable, and easy to understand as the application grows.

---

# Core Architecture Philosophy

The backend is primarily organized around technical layers:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

The frontend is primarily organized around **features**:

```text
auth/
surveys/
practiceOnboarding/
```

Each feature contains the code related to that specific business capability.

Within each feature, responsibilities are separated into:

```text
Feature
│
├── pages
├── components
├── hooks
├── api
├── types
└── utils
```

---

# Frontend Request Flow

A typical frontend request follows this flow:

```text
Route
  ↓
Page
  ↓
Components
  ↓
Hook / Feature Logic
  ↓
API Layer
  ↓
Axios Client
  ↓
Backend API
```

Example:

```text
LoginPage
    ↓
LoginForm
    ↓
useLogin()
    ↓
authApi.login()
    ↓
apiClient
    ↓
POST /api/auth/login
```

The backend then processes the request:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
MongoDB
```

The response flows back:

```text
MongoDB
    ↑
Repository
    ↑
Service
    ↑
Controller
    ↑
HTTP Response
    ↑
Axios
    ↑
API Layer
    ↑
Hook
    ↑
State Update
    ↑
React Re-render
```

---

# Project Structure

The general frontend structure should follow this pattern:

```text
src/
│
├── app/
│   ├── routes/
│   ├── store/
│   └── App.tsx
│
├── features/
│   ├── auth/
│   ├── surveys/
│   └── practiceOnboarding/
│
├── components/
│   └── common/
│
├── services/
│   └── apiClient.ts
│
├── hooks/
│
├── utils/
│
├── types/
│
├── constants/
│
└── config/
```

---

# Feature Structure

Each business feature should generally organize its own related code together.

Example:

```text
features/
└── auth/
    ├── pages/
    │   └── LoginPage.tsx
    │
    ├── components/
    │   └── LoginForm.tsx
    │
    ├── hooks/
    │   └── useLogin.ts
    │
    ├── api/
    │   └── authApi.ts
    │
    ├── types/
    │   └── auth.types.ts
    │
    └── utils/
```

Not every feature needs every folder.

Folders should only be created when they provide a clear separation of responsibility.

Avoid creating empty folders unnecessarily.

---

# Pages

Pages represent application screens and routes.

Example:

```text
/login
    ↓
LoginPage

/practice/onboarding
    ↓
PracticeOnboardingPage
```

Pages are responsible for:

* Representing a route
* Composing components
* Coordinating the screen

Pages should avoid containing large amounts of reusable UI or API logic.

---

# Components

Components are responsible primarily for presentation and UI interaction.

Examples:

```text
LoginForm
OnboardingStepper
PracticeDetailsStep
BrandingStep
```

Components should generally:

* Receive data through props
* Trigger events
* Display state
* Render UI

Avoid placing complex API communication directly inside reusable UI components.

---

# Hooks

Hooks contain reusable state and feature-related logic.

Examples:

```text
useLogin()
usePracticeOnboarding()
useCurrentUser()
```

Hooks may handle:

* Loading state
* Error state
* Form state
* Feature logic
* API call coordination
* State transitions

Example flow:

```text
Component
    ↓
Hook
    ↓
API Layer
```

Hooks are conceptually similar to part of the responsibility handled by backend services, although they are not a direct equivalent.

---

# API Layer

The API layer handles communication with the backend.

Example:

```text
authApi.login()
authApi.register()
practiceApi.create()
surveyApi.getAll()
```

The API layer should use a shared Axios client.

Example:

```text
apiClient
    ↓
authApi
    ↓
POST /api/auth/login
```

Avoid scattering Axios calls throughout multiple components.

---

# State Management

Frontend state exists at different levels.

## Local State

Use component or hook state for temporary UI state.

Examples:

```text
Modal open/close
Current wizard step
Input state
Dropdown state
Temporary form data
```

Example:

```ts
const [currentStep, setCurrentStep] = useState(0);
```

## Feature State

Feature-specific state belongs within the feature or its custom hooks.

Example:

```text
usePracticeOnboarding
    ├── currentStep
    ├── formData
    ├── validation
    └── navigation
```

## Global State

Use global state only when multiple unrelated parts of the application need access to the same data.

Examples:

```text
Authenticated user
Authentication status
Application-wide notifications
Theme
```

For this project, Redux can manage global application state such as authentication.

Avoid putting temporary form state into Redux unless multiple distant parts of the application genuinely need it.

---

# Types and API Contracts

TypeScript types define the shape of frontend data.

Some types should match backend API contracts.

Example:

```text
LoginUserDto
AuthResponseDto
SurveyResponseDto
```

Other types may exist only for frontend UI state.

Example:

```text
PracticeOnboardingData
```

Frontend UI state does not always need to match the backend request DTO.

A transformation can be used:

```text
PracticeOnboardingData
        ↓
Mapper / Transformer
        ↓
CreatePracticeDto
        ↓
Backend API
```

---

# Mappers and Transformers

When frontend UI data differs from the backend API contract, use a mapper or transformation function.

Example:

```text
PracticeOnboardingData
        ↓
mapToCreatePracticeRequest()
        ↓
CreatePracticeDto
```

Mappers should focus on transforming data rather than handling UI or API communication.

---

# Shared Components

Reusable application-wide UI components should be placed outside individual features.

Example:

```text
components/
└── common/
    ├── LoadingSpinner.tsx
    ├── ConfirmDialog.tsx
    └── ErrorMessage.tsx
```

Feature-specific components should remain inside their feature.

Example:

```text
features/
└── practiceOnboarding/
    └── components/
        └── OnboardingStepper.tsx
```

---

# Utils

Utility functions should generally be:

* Stateless
* Reusable
* Focused on one responsibility

Examples:

```text
formatDate()
formatPhoneNumber()
validateEmail()
buildUrl()
```

Avoid placing feature business logic inside generic utility files.

Feature-specific helpers should remain inside their feature.

---

# Configuration

Configuration contains environment and application-level settings.

Examples:

```text
API base URL
Environment configuration
Feature flags
External service configuration
```

Example:

```ts
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;
```

Sensitive secrets must never be placed in the frontend because frontend environment variables are exposed in the built application.

---

# Coding Principles

When adding a new piece of frontend code, first ask:

### Is it a route or full screen?

→ Page

### Is it reusable UI?

→ Component

### Does it manage reusable state or feature logic?

→ Hook

### Does it communicate with the backend?

→ API layer

### Does it define the shape of data?

→ Type or interface

### Does it transform data?

→ Mapper or transformer

### Is it a reusable pure helper function?

→ Utility

### Is it shared across the entire application?

→ Shared component, hook, type, or utility

### Is it specific to one business capability?

→ Keep it inside that feature.

---

# Main Architectural Principle

Prefer this:

```text
Feature-based organization
        +
Clear separation of responsibilities
        +
Reusable shared infrastructure
```

Avoid this:

```text
One giant components folder
One giant API folder
Axios calls scattered across components
Large page components containing all logic
Global state for every piece of data
```

## Short version to remember

```text
Route
 ↓
Page
 ↓
Components
 ↓
Hook / Feature Logic
 ↓
API Layer
 ↓
Axios Client
 ↓
Backend
```

This should become your **frontend architectural reference document**. Then whenever we add Auth, Survey, Practice Onboarding, Azure file upload, etc., we can follow the same philosophy consistently.
