declare module '@rails/actioncable' {
  interface Subscription {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    received(data: any): void;
    unsubscribe(): void;
  }

  interface SubscriptionManager {
    create(channel: string, params?: object): Subscription;
    // You can add more methods if needed, e.g., `remove`, `find`, etc.
  }

  interface Consumer {
    subscriptionManager: SubscriptionManager;
  }

  export function createConsumer(url?: string): Consumer;
}
