export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

// API Routeが返すエラー
export type ApiErrorObject = {
  message?: string;
  requireAlert?: boolean;
  unexpected?: boolean;
  details?: string[];
};

export type HttpErrorObject = {
  name: string;
  message: string;
  stack?: string;
  http: {
    url: string;
    status: number;
    statusText: string;
  };
} & Required<ApiErrorObject>;
export class HttpError extends Error {
  url: string;
  status: number;
  statusText: string;
  requireAlert: boolean;
  unexpected: boolean;
  details: string[];
  constructor(response: Response, apiError: ApiErrorObject) {
    super(apiError.message ?? response.statusText);
    this.name = 'HttpError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.requireAlert = apiError.requireAlert ?? false;
    this.unexpected = apiError.unexpected ?? false;
    this.details = apiError.details ?? [];
  }
  serialize(): HttpErrorObject {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      http: {
        status: this.status,
        statusText: this.statusText,
        url: this.url,
      },
      requireAlert: this.requireAlert,
      unexpected: this.unexpected,
      details: this.details,
    };
  }
}

export interface NetworkErrorObject {
  message: string;
  status: number;
}
export class NetworkError extends Error {
  status: number;
  constructor(message?: string) {
    super(message ?? 'ネットワークエラー');
    this.status = 400;
  }
  serialize(): NetworkErrorObject {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export interface UnauthenticatedErrorObject {
  name: string;
  message: string;
  stack?: string;
  actionName?: string;
}

export class UnauthenticatedError extends Error {
  actionName?: string;
  constructor({
    message,
    actionName,
  }: {
    message?: string;
    actionName?: string;
  }) {
    super(message ?? 'ログインしてください.');
    this.name = 'Unauthenticated';
    this.actionName = actionName;
    this.message;
  }

  serialize(): UnauthenticatedErrorObject {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      actionName: this.actionName,
    };
  }
}
