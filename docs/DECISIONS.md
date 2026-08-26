# Architecture Decisions

---

## Authentication Tokens

### Decision

Access and refresh tokens will be stored in HttpOnly cookies.

### Reason

HttpOnly cookies cannot be directly accessed by JavaScript.

This reduces the risk of token theft through XSS attacks.

---

## Password Storage

### Decision

Passwords will never be stored directly.

Passwords will be hashed using BCrypt.

### Reason

If the database is exposed, plain text passwords should not be available.

---

## Mapper Design

### Decision

Simple DTO-to-model mappers are implemented as static classes.

### Reason

They contain no state and require no dependency injection.

Example:

```csharp
UserMapper.MapToUser(...)
```

---

## User Roles

### Decision

The application currently uses two authenticated roles:

- User
- Admin

`Unknown` is used as the default enum value and should not receive any permissions.

Anonymous visitors are not stored as a `Guest` role.

### Reason

An unauthenticated visitor already has no authenticated identity and can be handled using `[AllowAnonymous]`.

Roles are only stored for authenticated users.

The initial role structure is intentionally simple and can be expanded later based on actual application requirements.