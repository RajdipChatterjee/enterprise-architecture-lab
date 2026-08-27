# Domain Model

This document describes the current working understanding of the main business entities and their relationships.

The domain model is based on the requirements identified so far and may evolve as additional requirements are clarified.

---

# Core Platform Structure

The current working model is:

User
 │
 └── Membership / Access
          │
          ▼
       Practice
          │
          ├── Surveys
          ├── Businesses
          ├── Contacts
          ├── Invoices
          ├── Receipts
          ├── Credit Notes
          ├── Tasks
          └── Other Practice Data

---

# User

A User represents a person who can authenticate and access the application.

The current authentication flow includes:

- Username
- Email
- Password
- Role
- Refresh Tokens

A User account is responsible for authentication and identity.

A User is not the same thing as a Practice.

Example:

A person creates a User account and logs into Acting Office.

---

# Practice

A Practice represents an organization, business entity, or customer account using the Acting Office platform.

A Practice can contain and manage its own application data, configuration, users, and businesses.

Current Practice-related requirements include:

- Practice Name
- Proposed URL
- Logo
- Favicon
- Website
- Practice Phone Number
- Contact Person Information
- Invoice Configuration
- Public / No-Reply Email
- Data Conversion / Migration

The Practice Onboarding wizard is responsible for collecting this initial configuration.

---

# User and Practice Relationship

The exact relationship between Users and Practices has not yet been finalized.

The current design should not assume that a User belongs to only one Practice.

A future architecture may allow:

- One User to access multiple Practices.
- One Practice to have multiple Users.
- Different roles or permissions for a User within different Practices.

A possible future relationship model is:

User
   │
   └── UserPractice
           │
           └── Practice

The UserPractice relationship may eventually contain information such as:

- UserId
- PracticeId
- Role
- JoinedAt
- Permissions

This model is not implemented yet.

---

# Subscription

Subscription architecture has not yet been finalized.

The current working assumption is that a Subscription may belong to a Practice rather than directly to an individual User.

Conceptually:

Practice
    │
    └── Subscription
            │
            └── Plan

Different subscription plans may eventually control limits or features such as:

- Number of Users
- Number of Businesses
- Available Features
- Storage Limits
- Number of Practices
- Data Conversion Features

The exact subscription model will be implemented after business requirements are clarified.

---

# Survey

A Survey represents feedback, ratings, and associated context collected within a Practice.

## Conceptual Structure

Survey fields are logically grouped into the following conceptual categories:

Survey
├── Identity
│   └── Id
├── Ownership
│   └── PracticeId
├── Survey Content
│   ├── Rating
│   └── Feedback
├── Survey Context
│   ├── UserName
│   ├── AccountantName
│   └── BusinessName
├── Status
│   └── Status
└── Lifecycle / Audit
    ├── CreatedAt
    ├── IsDeleted
    └── DeletedAt

---

## Architectural Reasoning & Design Decisions

### 1. Practice as Ownership & Tenant Boundary

- A Survey belongs to a Practice (`PracticeId`).
- `PracticeId` represents ownership and the primary tenant context.
- Future survey queries and operations will eventually be scoped to a specific Practice to enforce tenant isolation.

### 2. Separation of Feedback Submitter (`UserName`) from Application `User`

- `UserName` captures the name of the person submitting the survey feedback.
- **Do NOT automatically add `UserId` to Survey**: The person submitting feedback is not necessarily an authenticated application user.
- Feedback submitters may be external respondents or clients without application accounts. Prematurely coupling Survey to the internal application `User` entity via `UserId` is avoided.

### 3. Business Context (`BusinessName`) vs. Entity Relationship (`BusinessId`)

- `BusinessName` currently exists as survey context to identify the business referenced in feedback.
- In the future, when a `Business` entity exists under a Practice, a `BusinessId` relationship may be introduced.
- However, `BusinessName` will remain valuable as snapshot/historical context even if a `BusinessId` is added later.
- `BusinessId` is **not** implemented now and remains purely architectural planning.

### 4. Data Consistency & MongoDB Enum Serialization

- `SurveyStatus` is stored consistently in MongoDB as a string representation.
- String serialization maintains data readability in MongoDB, guards against enum integer reordering issues, and enforces model/data consistency.

---

## Backward Compatibility & Legacy Data Considerations

- **Current Implementation vs. Future Direction**: Existing MongoDB Survey documents may not yet contain a `PracticeId` field.
- **Future Migration Consideration**: Before making `PracticeId` mandatory in all queries and filters, migration or backward compatibility strategies must be evaluated so existing legacy records remain accessible and intact.

---

# Current User Flow

The current expected flow is:

Register / Login
        ↓
Authenticated User
        ↓
Practice Onboarding
        ↓
Practice Created
        ↓
User accesses the Practice

The initial implementation will focus on authentication and Practice Onboarding.

Multi-Practice access, User-Practice relationships, subscriptions, and advanced permissions will be designed later when requirements are clarified.

---

# Important Architectural Principle

The following concepts should remain separate:

User
    = Identity and authentication

Practice
    = Organization or customer account using the platform

Subscription
    = Plan and feature/usage limits

Survey Submitter (UserName)
    = Person submitting survey feedback (not coupled to User account)

The relationships between these entities may evolve as the application requirements become clearer.