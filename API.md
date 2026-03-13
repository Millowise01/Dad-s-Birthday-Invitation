# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Sign Up
**POST** `/auth/signup`

Register a new guest account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123"
}
```

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "guest",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  }
}
```

**Errors:**
- `400` - Email already registered
- `400` - Validation error

---

### Sign In
**POST** `/auth/signin`

Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "guest",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "tableNumber": 5
  }
}
```

**Errors:**
- `401` - Invalid credentials

---

## RSVP Endpoints

### Submit/Update RSVP
**POST** `/rsvp` 🔒

Submit or update RSVP response.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "attending": true,
  "numberOfGuests": 3,
  "message": "Can't wait to celebrate!",
  "dietaryRestrictions": "Vegetarian",
  "giftContribution": 50
}
```

**Response:** `200 OK`
```json
{
  "rsvp": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "attending": true,
    "numberOfGuests": 3,
    "message": "Can't wait to celebrate!",
    "dietaryRestrictions": "Vegetarian",
    "giftContribution": 50,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  },
  "message": "RSVP saved successfully"
}
```

**Errors:**
- `401` - Unauthorized
- `400` - Validation error

---

### Get My RSVP
**GET** `/rsvp/me` 🔒

Get current user's RSVP.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "rsvp": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "attending": true,
    "numberOfGuests": 3,
    "message": "Can't wait to celebrate!",
    "dietaryRestrictions": "Vegetarian",
    "giftContribution": 50,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- `401` - Unauthorized

---

## Guest Endpoints

### Get My Profile
**GET** `/guests/me` 🔒

Get current user's profile and RSVP.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "guest",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "tableNumber": 5,
    "checkedIn": false,
    "createdAt": "2025-01-15T10:00:00.000Z"
  },
  "rsvp": {
    "_id": "507f1f77bcf86cd799439012",
    "attending": true,
    "numberOfGuests": 3,
    "message": "Can't wait to celebrate!",
    "dietaryRestrictions": "Vegetarian",
    "giftContribution": 50
  }
}
```

**Errors:**
- `401` - Unauthorized

---

## Admin Endpoints

### Get All Guests
**GET** `/admin/guests` 🔒👑

Get list of all guests with their RSVPs.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "guests": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "guest",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "tableNumber": 5,
      "checkedIn": false,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "rsvp": {
        "_id": "507f1f77bcf86cd799439012",
        "attending": true,
        "numberOfGuests": 3,
        "message": "Can't wait to celebrate!",
        "dietaryRestrictions": "Vegetarian",
        "giftContribution": 50
      }
    }
  ]
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required

---

### Get Statistics
**GET** `/admin/stats` 🔒👑

Get event statistics.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "totalGuests": 50,
  "confirmed": 35,
  "declined": 5,
  "pending": 10,
  "totalSeats": 105,
  "giftContribution": 2500
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required

---

### Delete Guest
**DELETE** `/admin/guests/:id` 🔒👑

Delete a guest and their RSVP.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Parameters:**
- `id` - Guest user ID

**Response:** `200 OK`
```json
{
  "message": "Guest deleted"
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Guest not found

---

### Assign Table
**PUT** `/admin/guests/:id/table` 🔒👑

Assign a table number to a guest.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Parameters:**
- `id` - Guest user ID

**Request Body:**
```json
{
  "tableNumber": 5
}
```

**Response:** `200 OK`
```json
{
  "message": "Table assigned"
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Guest not found

---

### Check-In Guest
**POST** `/admin/checkin` 🔒👑

Check-in a guest using their email (from QR scan).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`
```json
{
  "message": "Guest checked in",
  "user": {
    "name": "John Doe",
    "tableNumber": 5
  }
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Guest not found

---

## Table Endpoints

### Get All Tables
**GET** `/tables` 🔒👑

Get all tables with assigned guests.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "tables": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "tableNumber": 1,
      "tableName": "Family Table",
      "capacity": 8,
      "guests": [
        {
          "_id": "507f1f77bcf86cd799439011",
          "name": "John Doe",
          "email": "john@example.com"
        }
      ],
      "createdAt": "2025-01-15T09:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required

---

### Create Table
**POST** `/tables` 🔒👑

Create a new table.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "tableNumber": 1,
  "tableName": "Family Table",
  "capacity": 8,
  "guests": []
}
```

**Response:** `201 Created`
```json
{
  "table": {
    "_id": "507f1f77bcf86cd799439020",
    "tableNumber": 1,
    "tableName": "Family Table",
    "capacity": 8,
    "guests": [],
    "createdAt": "2025-01-15T09:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required
- `400` - Validation error

---

## Memory Wall Endpoints

### Post Memory
**POST** `/memories` 🔒

Post a birthday wish or memory.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "type": "wish",
  "content": "Happy 60th Birthday! Wishing you many more years of happiness.",
  "mediaUrl": ""
}
```

**Response:** `201 Created`
```json
{
  "memory": {
    "_id": "507f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "type": "wish",
    "content": "Happy 60th Birthday! Wishing you many more years of happiness.",
    "mediaUrl": "",
    "approved": false,
    "createdAt": "2025-01-15T11:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Unauthorized
- `400` - Validation error

---

### Get Approved Memories
**GET** `/memories`

Get all approved memories (public endpoint).

**Response:** `200 OK`
```json
{
  "memories": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      "type": "wish",
      "content": "Happy 60th Birthday! Wishing you many more years of happiness.",
      "mediaUrl": "",
      "approved": true,
      "createdAt": "2025-01-15T11:00:00.000Z"
    }
  ]
}
```

---

### Approve Memory
**PUT** `/admin/memories/:id/approve` 🔒👑

Approve a memory for display.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Parameters:**
- `id` - Memory ID

**Response:** `200 OK`
```json
{
  "message": "Memory approved"
}
```

**Errors:**
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Memory not found

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Please authenticate"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per 15 minutes per IP
- 5 login attempts per 15 minutes per IP

---

## CORS

CORS is enabled for all origins in development. For production, update:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "SecurePass123"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Submit RSVP
```bash
curl -X POST http://localhost:5000/api/rsvp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "attending": true,
    "numberOfGuests": 3,
    "message": "Can'\''t wait!",
    "dietaryRestrictions": "Vegetarian",
    "giftContribution": 50
  }'
```

### Get Stats (Admin)
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Postman Collection

Import this JSON into Postman for easy testing:

```json
{
  "info": {
    "name": "Birthday Celebration API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Sign Up",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/signup",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"phone\": \"+1234567890\",\n  \"password\": \"SecurePass123\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

---

**Legend:**
- 🔒 = Requires authentication
- 👑 = Requires admin role
