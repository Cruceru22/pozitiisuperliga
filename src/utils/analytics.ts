import posthog from 'posthog-js';

// Export PostHog instance for use in components
export { posthog };

// Helper functions for common analytics tasks
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  posthog.identify(userId, properties);
};

export const resetUser = () => {
  posthog.reset();
};

export const setUserProperties = (properties: Record<string, any>) => {
  posthog.people.set(properties);
};

// Note: The increment method might not be available in the current version of posthog-js
// Use capture with a custom event instead for tracking incremental properties
export const trackIncrement = (property: string, value = 1) => {
  posthog.capture('increment_property', { property, value });
}; 