# services/

This folder contains all API requests to the Spring Boot backend.
No API calls should be made directly from screens — always go through this layer.

## Structure
```
api/
├── api.ts              # Axios base setup, base URL, JWT interceptor
├── authService.ts      # login, register, logout
├── userService.ts      # get/update user profile
└── congestionService.ts # traffic congestion endpoints
```