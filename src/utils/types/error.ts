import { PostgrestError } from '@supabase/supabase-js';

export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export interface HttpErrorObject {
  name: string;
  message: string;
  stack?: string;
  http: {
    url: string;
    status: number;
    statusText: string;
  };
}
export class HttpError extends Error {
  url: string;
  status: number;
  statusText: string;
  constructor(response: Response, message?: string) {
    super(message ?? response.statusText);
    this.name = 'HttpError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
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
    };
  }
}

interface SupabaseErrorObject {
  name: string;
  message: string;
  details: string;
  code: string;
  hint: string;
}
export class SupabaseError extends Error {
  details: string;
  code: string;
  hint: string;
  constructor(error: PostgrestError) {
    super(error.message);
    this.name = 'SupabaseError';
    this.details = error.details;
    this.hint = error.hint;
    this.code = error.code;
  }
  serialize(): SupabaseErrorObject {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      code: this.code,
      hint: this.hint,
    };
  }
}

export interface UnAuthorizedErrorObject {
  name: string;
  message: string;
  stack?: string;
  actionName?: string;
}

export class UnAuthorizedError extends Error {
  actionName?: string;
  constructor({
    message,
    actionName,
  }: {
    message?: string;
    actionName?: string;
  }) {
    super(message ?? 'ログインしてください.');
    this.name = 'UnAuthorizedError';
    this.actionName = actionName;
    this.message;
  }

  serialize(): UnAuthorizedErrorObject {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      actionName: this.actionName,
    };
  }
}
