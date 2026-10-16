# Backend API Documentation

Exported from Postman Collection: Emergency-Ambulance

## auth

### POST register
- **URL**: `{{BaseUrl}}/api/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
    "name":"raju",
     "phone":"01793848383",
    "email": "laptopali847@gmail.com",
    "password": "Asif@1234"
   
}
```

### POST verify-email
- **URL**: `{{BaseUrl}}/api/auth/verify-email`
- **Method**: `POST`
- **Body**:
```json
{
    "email":"laptopali847@gmail.com",
    "otp":"818593"
}
```

### POST login
- **URL**: `{{BaseUrl}}/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "laptopali847@gmail.com",
    "password": "Asif@1234"
}
```

### GET get_me
- **URL**: `{{BaseUrl}}/api/auth/me`
- **Method**: `GET`
- **Body**:
```json
{
    "email": "laptopali847@gmail.com",
    "password": "Asif@1234"
}
```

### POST admin_login
- **URL**: `{{BaseUrl}}/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    
    "email": "asifalibd002@gmail.com",
    "password": "Asif@1234"
}
```

### POST setPassword
- **URL**: `http://localhost:5000/api/auth/set-password?token=92ee07c0ccdb995fa2549053ccf7e3dc2e7add39d1cd8619a6878c7367781ab6`
- **Method**: `POST`
- **Body**:
```json
{
  "password": "Asif@1234",
  "confirmPassword": "Asif@1234"
}
```

### POST dispatcherLogin
- **URL**: `{{BaseUrl}}/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    
    "email": "demo.dispatcher1@gmail.com",
    "password": "Dispatcher123!"
}
```

### POST driver-login
- **URL**: `{{BaseUrl}}/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "demo.driver5@gmail.com",
    "password": "Driver123!"
}
```

### POST forget-password
- **URL**: `{{BaseUrl}}/api/auth/forgot-password`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "laptopali847@gmail.com"
   
}
```

### POST reset-password
- **URL**: `{{BaseUrl}}/api/auth/reset-password`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "laptopali847@gmail.com",
  "otp": "480524",
  "newPassword": "Asif@1234"
}
```

### PATCH upload-Image
- **URL**: `{{BaseUrl}}/api/auth/profile-image`
- **Method**: `PATCH`

## hospital

### POST create
- **URL**: `{{BaseUrl}}/api/hospital`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "BIRDEM General Hospital",
  "phone": "02-55165011",
  "address": "122 Kazi Nazrul Islam Avenue, Shahbag, Dhaka, Bangladesh",
  "latitude": 23.7389,
  "longitude": 90.3957,
  "hasEmergency": true
}
```

### GET get_all
- **URL**: `{{BaseUrl}}/api/hospital`
- **Method**: `GET`
- **Body**:
```json
{
  "name": "Dhaka Medical College Hospital",
  "phone": "02-55165088",
  "address": "Secretariat Road, Dhaka, Bangladesh",
  "latitude": 23.7258,
  "longitude": 90.3978,
  "hasEmergency": true
}
```

### GET getBy_id
- **URL**: `{{BaseUrl}}/api/hospital/2eccbb93-8953-43d6-b678-4a420a42c393`
- **Method**: `GET`
- **Body**:
```json
{
  "name": "Dhaka Medical College Hospital",
  "phone": "02-55165088",
  "address": "Secretariat Road, Dhaka, Bangladesh",
  "latitude": 23.7258,
  "longitude": 90.3978,
  "hasEmergency": true
}
```

### PATCH update
- **URL**: `{{BaseUrl}}/api/hospital/2eccbb93-8953-43d6-b678-4a420a42c393`
- **Method**: `PATCH`
- **Body**:
```json
{
    "phone": "02-55027602"
}
```

## ambulance

### POST create ambulance
- **URL**: `{{BaseUrl}}/api/ambulance`
- **Method**: `POST`
- **Body**:
```json
{
  "registrationNumber": "DHA-AMB-007",
  "ambulanceType": "BASIC",
  "baseHospitalId": "637539d9-f75c-40b2-a8c7-42137a4131db"
}
```

## operatorApplication

### POST createAppplicationrOperator
- **URL**: `{{BaseUrl}}/api/operatorApplication`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Rahim Ahmed",
  "email": "asifpersonalinfo1@gmail.com",
  "phone": "01712345678",
  "operatorType": "DRIVER",
   "licenseNumber": "DL-123456789"
}
```

### POST verify-email-operator
- **URL**: `{{BaseUrl}}/api/operatorApplication/verify-email`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "asifpersonalinfo1@gmail.com",
  "otp": "925880"
}
```

## admin

### GET getAplications
- **URL**: `{{BaseUrl}}/api/admin/operator-applications`
- **Method**: `GET`
- **Body**:
```json
{
  "name": "Rahim Ahmed",
  "email": "asifpersonalinfo1@gmail.com",
  "phone": "01712345678",
  "operatorType": "DRIVER"
}
```

### GET getApplicationsById
- **URL**: `{{BaseUrl}}/api/admin/operator-applications/e0317564-5cc1-4b67-8ace-136d105b9fd8`
- **Method**: `GET`

### PATCH approve
- **URL**: `{{BaseUrl}}/api/admin/operator-applications/a0cf5509-7113-4a12-9f1d-fe1c20d6e4c5/approve`
- **Method**: `PATCH`
- **Body**:
```json
{
   "employeeCode": "DRV-1005"
}
```

### GET getAllOperator
- **URL**: `{{BaseUrl}}/api/admin/operators`
- **Method**: `GET`

### GET getAll-Users
- **URL**: `{{BaseUrl}}/api/admin/users`
- **Method**: `GET`

### GET getUser-by-role
- **URL**: `{{BaseUrl}}/api/admin/users?role=CUSTOMER`
- **Method**: `GET`

### GET getUsers-by-status
- **URL**: `{{BaseUrl}}/api/admin/users?status=ACTIVE`
- **Method**: `GET`

### GET getUsers-by-search
- **URL**: `{{BaseUrl}}/api/admin/users?search=raju`
- **Method**: `GET`

### GET getUser-by-id
- **URL**: `{{BaseUrl}}/api/admin/users/0cc9f394-1d94-458e-86f2-e0f98aa4fe44`
- **Method**: `GET`

### PATCH change-user-status
- **URL**: `{{BaseUrl}}/api/admin/users/0cc9f394-1d94-458e-86f2-e0f98aa4fe44/status`
- **Method**: `PATCH`
- **Body**:
```json
{
  "status": "ACTIVE"
}
```

### GET dashboard
- **URL**: `{{BaseUrl}}/api/admin/dashboard`
- **Method**: `GET`
- **Body**:
```json
{
  "status": "ACTIVE"
}
```

## patient

### POST create_patient
- **URL**: `{{BaseUrl}}/api/patient`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Rahim Ahmed",
  "phone": "01712345678",
  "dateOfBirth": "1960-05-10",
  "gender": "MALE",
  "bloodGroup": "O_POSITIVE",
  "medicalNotes": "History of heart disease and hypertension",
  "emergencyContact": "01798765432"
}
```

## emergencyRequest

### POST emergencyRequst
- **URL**: `{{BaseUrl}}/api/emergencyRequest`
- **Method**: `POST`
- **Body**:
```json
{
  "patientId": "0b16f65b-845e-45c7-ac53-0f1849673eb3",
  "pickupAddress": "Dhaka, Hamayatput",
 "pickupLatitude": 23.777628,
  "pickupLongitude": 80.405449,
  "emergencyType": "ACCIDENT",
  "priority": "HIGH",
  "notes": "bleeding"
}
```

### GET getPendingRequest
- **URL**: `{{BaseUrl}}/api/emergencyRequest/pending`
- **Method**: `GET`

### GET getAvailableDrivers
- **URL**: `{{BaseUrl}}/api/emergencyRequest/available-drivers`
- **Method**: `GET`

### GET getAvailableAmbulance
- **URL**: `{{BaseUrl}}/api/emergencyRequest/available-ambulances`
- **Method**: `GET`

### GET nearestHospital
- **URL**: `{{BaseUrl}}/api/emergencyRequest/16808f00-f3dc-4543-b868-d583ee02e536/nearby-hospital`
- **Method**: `GET`

### POST assignTask
- **URL**: `{{BaseUrl}}/api/emergencyRequest/16808f00-f3dc-4543-b868-d583ee02e536/assign`
- **Method**: `POST`
- **Body**:
```json
{
    "hospitalId":"aadc6a38-b779-4e05-bd0e-e03dbc32d24a",
    "ambulanceId":"bb0c4e0f-5232-43f5-b84b-c1dbeb1f1d24",
    "driverId":"a0ae096d-0978-4f15-a732-0e98c22753dc"
}
```

## dispatchAssignment

### GET getll-offers-by-dispatcher
- **URL**: `{{BaseUrl}}/api/dispatch-assignments/all-offers`
- **Method**: `GET`

### GET my-offer
- **URL**: `{{BaseUrl}}/api/dispatch-assignments/my-offers`
- **Method**: `GET`

### PATCH accept-assignment
- **URL**: `{{BaseUrl}}/api/dispatch-assignments/d7687d5a-55b8-4575-ba9a-4a446348bc76/accept`
- **Method**: `PATCH`

### GET reject-assignment
- **URL**: `{{BaseUrl}}/api/dispatch-assignments/d7687d5a-55b8-4575-ba9a-4a446348bc76/reject`
- **Method**: `GET`

## Trip

### PATCH start-trip
- **URL**: `{{BaseUrl}}/api/trip/53ed2411-cf7e-4ab7-a626-e2b87ce4888d/start`
- **Method**: `PATCH`

### PATCH arive-pickup
- **URL**: `{{BaseUrl}}/api/trip/53ed2411-cf7e-4ab7-a626-e2b87ce4888d/arrive-pickup`
- **Method**: `PATCH`

### PATCH confirm pickup
- **URL**: `{{BaseUrl}}/api/trip/53ed2411-cf7e-4ab7-a626-e2b87ce4888d/confirm-pickup`
- **Method**: `PATCH`

### PATCH start-hospital
- **URL**: `{{BaseUrl}}/api/trip/53ed2411-cf7e-4ab7-a626-e2b87ce4888d/start-hospital`
- **Method**: `PATCH`

### PATCH arive-hospital
- **URL**: `{{BaseUrl}}/api/trip/53ed2411-cf7e-4ab7-a626-e2b87ce4888d/arrive-hospital`
- **Method**: `PATCH`

### GET my-trips
- **URL**: `{{BaseUrl}}/api/trip/my-trips`
- **Method**: `GET`

### GET single-trip
- **URL**: `{{BaseUrl}}/api/trip/7eac40db-aaba-4cf7-91f0-8c348f539be8`
- **Method**: `GET`

### GET getAllTrip
- **URL**: `{{BaseUrl}}/api/trip`
- **Method**: `GET`

## payment

### POST create-payment
- **URL**: `{{BaseUrl}}/api/payment/53ed2411-cf7e-4ab7-a626-e2b87ce4888d`
- **Method**: `POST`

### GET customer-payment-history
- **URL**: `{{BaseUrl}}/api/payment/history`
- **Method**: `GET`

### GET payment-details
- **URL**: `{{BaseUrl}}/api/payment/ce136fa6-c83c-4690-b12f-747643770845`
- **Method**: `GET`

### GET payment-recipt
- **URL**: `{{BaseUrl}}/api/payment/e341249d-3351-43f0-ab4f-7ca9b64386ba/receipt`
- **Method**: `GET`

### GET download recipt-pdf
- **URL**: `{{BaseUrl}}/api/payment/e341249d-3351-43f0-ab4f-7ca9b64386ba/receipt/pdf`
- **Method**: `GET`

### GET driver-payment-history
- **URL**: `{{BaseUrl}}/api/payment/driver-history`
- **Method**: `GET`

## notificaiton

### GET notificaitons
- **URL**: `{{BaseUrl}}/api/notification`
- **Method**: `GET`
- **Body**:
```json
{
    "email": "demo.driver5@gmail.com",
    "password": "Driver123!"
}
```
