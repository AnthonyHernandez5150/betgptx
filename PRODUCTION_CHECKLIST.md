# Production Checklist for Expo Router App

## Navigation

- [x] Use Expo Router for file-based navigation
- [x] Remove manual NavigationContainer and stack/tab navigators from root

## Authentication

- [ ] Implement secure authentication (OAuth, JWT, or backend)
- [ ] Store tokens securely (Expo SecureStore)

## Error Handling

- [ ] Add user-friendly error messages
- [ ] Add loading indicators
- [ ] Handle network/API errors gracefully

## Code Quality

- [ ] Use TypeScript for type safety
- [ ] Run linting (eslint) and formatting (prettier)
- [ ] Write unit and integration tests

## Performance

- [ ] Optimize images/assets
- [ ] Use lazy loading for screens/components
- [ ] Minimize bundle size

## Security

- [ ] Never store sensitive data in plain text
- [ ] Use HTTPS for all API calls
- [ ] Keep dependencies up to date

## Environment Variables

- [ ] Store API keys/secrets in environment variables

## Accessibility

- [ ] Ensure accessibility (labels, contrast, screen reader support)

## Deployment

- [ ] Use EAS Build for production builds
- [ ] Test on both iOS and Android devices
- [ ] Use Expo Updates for OTA updates

## Monitoring

- [ ] Integrate error/crash reporting (e.g., Sentry)

---

Check off each item as you complete it. Update this file as your project evolves!
