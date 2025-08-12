# API Documentation

Bu dokümantasyon, İş Randevu Sistemi frontend'inin backend API ile etkileşimini açıklar.

## 🌐 Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 2,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user",
      "status": "active",
      "joinDate": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 👥 Users

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user",
    "status": "active",
    "joinDate": "2024-01-15T10:30:00Z",
    "preferences": {
      "theme": "light",
      "language": "tr"
    }
  }
}
```

### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "theme": "dark"
  }
}
```

### Get Users (Admin)
```http
GET /api/users?page=1&limit=20&role=user&status=active
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "user@example.com",
        "role": "user",
        "status": "active",
        "joinDate": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

## 🏢 Businesses

### Get Businesses
```http
GET /api/businesses?page=1&limit=20&category=restaurant&status=active
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "businesses": [
      {
        "id": 1,
        "name": "Sample Restaurant",
        "description": "Fine dining restaurant",
        "address": "123 Main St, City",
        "phone": "+90 555 123 4567",
        "email": "info@restaurant.com",
        "category": "restaurant",
        "status": "active",
        "ownerId": 1,
        "rating": 4.5,
        "reviewCount": 25
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

### Get Business Details
```http
GET /api/businesses/{id}
```

### Create Business (Owner)
```http
POST /api/businesses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Business",
  "description": "Business description",
  "address": "456 Business St, City",
  "phone": "+90 555 987 6543",
  "email": "info@newbusiness.com",
  "category": "retail"
}
```

### Update Business
```http
PUT /api/businesses/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Business Name",
  "description": "Updated description"
}
```

## 📅 Appointments

### Get Appointments
```http
GET /api/appointments?page=1&limit=20&status=pending&userId=1
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": 1,
        "userId": 1,
        "businessId": 1,
        "businessName": "Sample Restaurant",
        "date": "2024-01-20",
        "time": "14:00",
        "status": "pending",
        "notes": "Window seat preferred",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "pages": 1
    }
  }
}
```

### Create Appointment
```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "businessId": 1,
  "date": "2024-01-25",
  "time": "19:00",
  "notes": "Special occasion"
}
```

### Update Appointment
```http
PUT /api/appointments/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "date": "2024-01-26",
  "time": "20:00",
  "notes": "Updated notes"
}
```

### Cancel Appointment
```http
DELETE /api/appointments/{id}
Authorization: Bearer {token}
```

## 🔍 Search & Filters

### Search Businesses
```http
GET /api/search/businesses?q=restaurant&category=food&location=city
```

### Search Users (Admin)
```http
GET /api/search/users?q=john&role=user&status=active
Authorization: Bearer {token}
```

## 📊 Analytics (Admin)

### Dashboard Stats
```http
GET /api/analytics/dashboard
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalBusinesses": 89,
    "totalAppointments": 567,
    "pendingAppointments": 23,
    "monthlyGrowth": 15.5,
    "topCategories": [
      { "name": "restaurant", "count": 25 },
      { "name": "retail", "count": 18 }
    ]
  }
}
```

## 🚨 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Form validation failed
- `AUTHENTICATION_ERROR`: Invalid or expired token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `INTERNAL_ERROR`: Server error

## 📱 Pagination

Tüm list endpoint'leri pagination desteği sağlar:

```http
GET /api/resource?page=1&limit=20
```

**Response Structure:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔒 Security

### Authentication Headers
```http
Authorization: Bearer {jwt_token}
```

### Rate Limiting
- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 1000 requests/minute
- **Admin endpoints**: 5000 requests/minute

### CORS
```javascript
// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-domain.com'
];
```

## 📡 WebSocket Events

Real-time updates için WebSocket bağlantısı:

### Connection
```javascript
const ws = new WebSocket('wss://your-domain.com/ws');
```

### Events
```javascript
// Appointment updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'APPOINTMENT_UPDATE') {
    // Handle appointment update
  }
};

// New notifications
if (data.type === 'NOTIFICATION') {
  // Handle new notification
}
```

## 🧪 Testing

### Test Environment
```bash
# Test API endpoint
TEST_API_URL=http://localhost:3001/api

# Test database
TEST_DB_URL=postgresql://test:test@localhost:5432/test_db
```

### Mock Responses
Test dosyalarında kullanılan mock response'lar:

```typescript
export const mockApiResponse = (data: any, status = 200) => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    status,
    ok: status >= 200 && status < 300,
  });
};
```

## 📚 SDK Usage

Frontend'de API çağrıları için utility fonksiyonları:

```typescript
import { apiClient } from '@/utils/api-client';

// GET request
const users = await apiClient.get('/users');

// POST request
const newUser = await apiClient.post('/users', userData);

// PUT request
const updatedUser = await apiClient.put(`/users/${id}`, updateData);

// DELETE request
await apiClient.delete(`/users/${id}`);
```

## 🔄 Versioning

API versioning için URL path kullanılır:

```
Current: /api/v1/
Legacy: /api/v0/ (deprecated)
```

## 📈 Performance

### Caching
- **Static data**: 1 hour
- **User data**: 15 minutes
- **Business data**: 30 minutes
- **Appointment data**: 5 minutes

### Compression
- **Gzip**: Enabled for all responses
- **Brotli**: Enabled for modern browsers

### CDN
- **Static assets**: CloudFront
- **API responses**: No CDN (dynamic content)

