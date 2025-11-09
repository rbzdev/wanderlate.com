# Authentication API

## POST /api/auth/register

Register a new user account.

### Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "0612345678",
  "birthDay": "15",
  "birthMonth": "6",
  "birthYear": "1990",
  "country": "France",
  "language": "fr",
  "currency": "EUR",
  "accountType": "traveler",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "acceptTerms": true,
  "acceptMarketing": false
}
```

### Password Requirements

- Minimum 6 characters
- At least 1 digit
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 special character (#?!@$%^&*-)

### Response (Success - 201)

```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "firstname": "John",
    "lastName": "Doe"
  }
}
```

### Response (Error - 400/409/500)

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional validation errors array
}
```

### Error Codes

- `400` - Invalid request body or validation error
- `409` - User with this email already exists
- `500` - Internal server error
