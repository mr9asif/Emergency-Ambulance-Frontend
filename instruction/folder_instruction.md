src/
│
├── app/
│ │
│ ├── (auth)/
│ │ │
│ │ ├── login/
│ │ │ └── page.tsx
│ │ │
│ │ ├── register/
│ │ │ └── page.tsx
│ │ │
│ │ ├── forgot-password/
│ │ │ └── page.tsx
│ │ │
│ │ └── reset-password/
│ │ └── page.tsx
│ │
│ ├── (public)/
│ │ │
│ │ ├── about/
│ │ │ └── page.tsx
│ │ │
│ │ ├── contact/
│ │ │ └── page.tsx
│ │ │
│ │ └── page.tsx
│ │
│ ├── admin/
│ │ │
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ │
│ │ ├── users/
│ │ │ ├── page.tsx
│ │ │ └── [userId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── ambulances/
│ │ │ ├── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ └── [ambulanceId]/
│ │ │ ├── page.tsx
│ │ │ └── edit/
│ │ │ └── page.tsx
│ │ │
│ │ ├── drivers/
│ │ │ ├── page.tsx
│ │ │ └── [driverId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── hospitals/
│ │ │ ├── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ └── [hospitalId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── emergency-requests/
│ │ │ ├── page.tsx
│ │ │ └── [requestId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── trips/
│ │ │ ├── page.tsx
│ │ │ └── [tripId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── reports/
│ │ │ └── page.tsx
│ │ │
│ │ └── settings/
│ │ └── page.tsx
│ │
│ ├── dispatcher/
│ │ │
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ │
│ │ ├── emergency-requests/
│ │ │ ├── page.tsx
│ │ │ └── [requestId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── dispatch/
│ │ │ └── page.tsx
│ │ │
│ │ ├── ambulances/
│ │ │ └── page.tsx
│ │ │
│ │ ├── trips/
│ │ │ ├── page.tsx
│ │ │ └── [tripId]/
│ │ │ └── page.tsx
│ │ │
│ │ └── notifications/
│ │ └── page.tsx
│ │
│ ├── driver/
│ │ │
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ │
│ │ ├── emergency-requests/
│ │ │ └── page.tsx
│ │ │
│ │ ├── trips/
│ │ │ ├── page.tsx
│ │ │ └── [tripId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── ambulance/
│ │ │ └── page.tsx
│ │ │
│ │ ├── notifications/
│ │ │ └── page.tsx
│ │ │
│ │ └── profile/
│ │ └── page.tsx
│ │
│ ├── patient/
│ │ │
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ │
│ │ ├── emergency/
│ │ │ ├── page.tsx
│ │ │ └── create/
│ │ │ └── page.tsx
│ │ │
│ │ ├── requests/
│ │ │ ├── page.tsx
│ │ │ └── [requestId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── trips/
│ │ │ ├── page.tsx
│ │ │ └── [tripId]/
│ │ │ └── page.tsx
│ │ │
│ │ ├── notifications/
│ │ │ └── page.tsx
│ │ │
│ │ └── profile/
│ │ └── page.tsx
│ │
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
│
│
├── components/
│ │
│ ├── ui/
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ ├── Label.tsx
│ │ ├── Select.tsx
│ │ ├── Textarea.tsx
│ │ ├── Checkbox.tsx
│ │ ├── RadioGroup.tsx
│ │ ├── Switch.tsx
│ │ ├── Modal.tsx
│ │ ├── Dialog.tsx
│ │ ├── Dropdown.tsx
│ │ ├── Badge.tsx
│ │ ├── Card.tsx
│ │ ├── Table.tsx
│ │ ├── Tabs.tsx
│ │ ├── Skeleton.tsx
│ │ ├── Spinner.tsx
│ │ ├── Alert.tsx
│ │ ├── Toast.tsx
│ │ └── index.ts
│ │
│ ├── shared/
│ │ ├── Logo.tsx
│ │ ├── Loading.tsx
│ │ ├── ErrorMessage.tsx
│ │ ├── EmptyState.tsx
│ │ ├── ConfirmDialog.tsx
│ │ ├── PageHeader.tsx
│ │ ├── Pagination.tsx
│ │ ├── SearchInput.tsx
│ │ └── StatusBadge.tsx
│ │
│ └── layout/
│ ├── Header.tsx
│ ├── Sidebar.tsx
│ ├── MobileSidebar.tsx
│ ├── DashboardLayout.tsx
│ └── UserMenu.tsx
│
│
├── config/
│ ├── env.ts
│ ├── routes.ts
│ └── site.ts
│
│
├── features/
│ │
│ ├── auth/
│ │ │
│ │ ├── api/
│ │ │ └── auth.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── LoginForm.tsx
│ │ │ ├── RegisterForm.tsx
│ │ │ ├── ForgotPasswordForm.tsx
│ │ │ ├── ResetPasswordForm.tsx
│ │ │ ├── LogoutButton.tsx
│ │ │ ├── AuthGuard.tsx
│ │ │ └── RoleGuard.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useLogin.ts
│ │ │ ├── useRegister.ts
│ │ │ ├── useCurrentUser.ts
│ │ │ ├── useLogout.ts
│ │ │ ├── useForgotPassword.ts
│ │ │ └── useResetPassword.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── auth.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── auth.types.ts
│ │ │
│ │ ├── utils/
│ │ │ ├── auth.utils.ts
│ │ │ ├── redirect.utils.ts
│ │ │ └── token.utils.ts
│ │ │
│ │ └── constants/
│ │ └── auth.constants.ts
│ │
│ │
│ ├── emergency/
│ │ │
│ │ ├── api/
│ │ │ └── emergency.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── EmergencyRequestForm.tsx
│ │ │ ├── EmergencyRequestCard.tsx
│ │ │ ├── EmergencyRequestList.tsx
│ │ │ ├── EmergencyRequestDetails.tsx
│ │ │ ├── EmergencyStatus.tsx
│ │ │ └── EmergencyPriorityBadge.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useEmergencies.ts
│ │ │ ├── useEmergency.ts
│ │ │ ├── useCreateEmergency.ts
│ │ │ ├── useUpdateEmergency.ts
│ │ │ └── useCancelEmergency.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── emergency.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── emergency.types.ts
│ │ │
│ │ ├── utils/
│ │ │ └── emergency.utils.ts
│ │ │
│ │ └── constants/
│ │ └── emergency.constants.ts
│ │
│ │
│ ├── ambulance/
│ │ │
│ │ ├── api/
│ │ │ └── ambulance.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── AmbulanceTable.tsx
│ │ │ ├── AmbulanceCard.tsx
│ │ │ ├── AmbulanceForm.tsx
│ │ │ ├── AmbulanceDetails.tsx
│ │ │ ├── AmbulanceStatus.tsx
│ │ │ └── AmbulanceAssignment.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useAmbulances.ts
│ │ │ ├── useAmbulance.ts
│ │ │ ├── useCreateAmbulance.ts
│ │ │ ├── useUpdateAmbulance.ts
│ │ │ ├── useDeleteAmbulance.ts
│ │ │ └── useAmbulanceAvailability.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── ambulance.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── ambulance.types.ts
│ │ │
│ │ ├── utils/
│ │ │ └── ambulance.utils.ts
│ │ │
│ │ └── constants/
│ │ └── ambulance.constants.ts
│ │
│ │
│ ├── driver/
│ │ │
│ │ ├── api/
│ │ │ └── driver.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── DriverTable.tsx
│ │ │ ├── DriverCard.tsx
│ │ │ ├── DriverForm.tsx
│ │ │ ├── DriverDetails.tsx
│ │ │ └── DriverStatus.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useDrivers.ts
│ │ │ ├── useDriver.ts
│ │ │ ├── useCreateDriver.ts
│ │ │ ├── useUpdateDriver.ts
│ │ │ └── useDriverAvailability.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── driver.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── driver.types.ts
│ │ │
│ │ └── utils/
│ │ └── driver.utils.ts
│ │
│ │
│ ├── hospital/
│ │ │
│ │ ├── api/
│ │ │ └── hospital.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── HospitalTable.tsx
│ │ │ ├── HospitalCard.tsx
│ │ │ ├── HospitalForm.tsx
│ │ │ ├── HospitalDetails.tsx
│ │ │ └── HospitalStatus.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useHospitals.ts
│ │ │ ├── useHospital.ts
│ │ │ ├── useCreateHospital.ts
│ │ │ └── useUpdateHospital.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── hospital.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── hospital.types.ts
│ │ │
│ │ └── utils/
│ │ └── hospital.utils.ts
│ │
│ │
│ ├── trip/
│ │ │
│ │ ├── api/
│ │ │ └── trip.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── TripTable.tsx
│ │ │ ├── TripCard.tsx
│ │ │ ├── TripDetails.tsx
│ │ │ ├── TripStatus.tsx
│ │ │ └── TripTimeline.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useTrips.ts
│ │ │ ├── useTrip.ts
│ │ │ ├── useCreateTrip.ts
│ │ │ └── useUpdateTripStatus.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── trip.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── trip.types.ts
│ │ │
│ │ ├── utils/
│ │ │ └── trip.utils.ts
│ │ │
│ │ └── constants/
│ │ └── trip.constants.ts
│ │
│ │
│ ├── notification/
│ │ │
│ │ ├── api/
│ │ │ └── notification.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── NotificationList.tsx
│ │ │ ├── NotificationItem.tsx
│ │ │ └── NotificationBadge.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useNotifications.ts
│ │ │ ├── useNotification.ts
│ │ │ └── useMarkNotificationRead.ts
│ │ │
│ │ ├── types/
│ │ │ └── notification.types.ts
│ │ │
│ │ └── utils/
│ │ └── notification.utils.ts
│ │
│ │
│ ├── user/
│ │ │
│ │ ├── api/
│ │ │ └── user.api.ts
│ │ │
│ │ ├── components/
│ │ │ ├── UserProfile.tsx
│ │ │ ├── UserProfileForm.tsx
│ │ │ ├── UserTable.tsx
│ │ │ └── UserDetails.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useUsers.ts
│ │ │ ├── useUser.ts
│ │ │ ├── useUpdateProfile.ts
│ │ │ └── useUpdateUser.ts
│ │ │
│ │ ├── schemas/
│ │ │ └── user.schema.ts
│ │ │
│ │ ├── types/
│ │ │ └── user.types.ts
│ │ │
│ │ └── utils/
│ │ └── user.utils.ts
│ │
│ └── report/
│ │
│ ├── api/
│ │ └── report.api.ts
│ │
│ ├── components/
│ │ ├── ReportTable.tsx
│ │ ├── ReportFilters.tsx
│ │ └── ReportSummary.tsx
│ │
│ ├── hooks/
│ │ ├── useReports.ts
│ │ └── useReport.ts
│ │
│ ├── types/
│ │ └── report.types.ts
│ │
│ └── utils/
│ └── report.utils.ts
│
│
├── lib/
│ │
│ ├── axios.ts
│ ├── react-query.ts
│ ├── utils.ts
│ └── error-handler.ts
│
│
├── stores/
│ │
│ ├── auth.store.ts
│ ├── ui.store.ts
│ └── sidebar.store.ts
│
│
├── types/
│ │
│ ├── api.types.ts
│ ├── common.types.ts
│ └── pagination.types.ts
│
│
├── middleware.ts
│
└── providers/
├── QueryProvider.tsx
└── AppProvider.tsx
