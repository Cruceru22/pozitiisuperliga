import { PostHog } from 'posthog-node';

// Initialize the PostHog client
const posthogClient = new PostHog(
  'phc_pfbsTplJjteHCdf1JoUTJ6W65wgPFmuNaj0rfuTlQrD',
  { host: 'https://us.i.posthog.com' }
);

// Helper functions for server-side tracking
export const trackServerEvent = async (
  eventName: string, 
  distinctId: string, 
  properties?: Record<string, any>
) => {
  try {
    await posthogClient.capture({
      distinctId,
      event: eventName,
      properties
    });
  } catch (error) {
    console.error('Error tracking server event:', error);
  }
};

export const identifyServerUser = async (
  distinctId: string, 
  properties?: Record<string, any>
) => {
  try {
    await posthogClient.identify({
      distinctId,
      properties
    });
  } catch (error) {
    console.error('Error identifying server user:', error);
  }
};

export const trackPageview = async (
  distinctId: string, 
  url: string, 
  properties?: Record<string, any>
) => {
  try {
    await posthogClient.capture({
      distinctId,
      event: '$pageview',
      properties: {
        $current_url: url,
        ...properties
      }
    });
  } catch (error) {
    console.error('Error tracking server pageview:', error);
  }
};

// Make sure to shut down the client when the server is shutting down
// This can be called in your app's shutdown hook
export const shutdownPostHog = async () => {
  try {
    await posthogClient.shutdown();
  } catch (error) {
    console.error('Error shutting down PostHog client:', error);
  }
};

export default posthogClient; 