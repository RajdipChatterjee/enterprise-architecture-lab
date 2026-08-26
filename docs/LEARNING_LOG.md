# Learning Log

---

# MongoDB

## BSON Attributes

### `[BsonId]`

Marks the MongoDB document identifier.

### `[BsonRepresentation(BsonType.ObjectId)]`

Allows MongoDB ObjectId values to be represented as C# strings.

---

# Authentication

## BCrypt

Passwords should not be stored directly.

```text
Password
   ↓
BCrypt.HashPassword()
   ↓
PasswordHash