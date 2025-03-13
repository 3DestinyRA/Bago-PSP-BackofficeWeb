export interface ISalesforceApiRequestAuth {
    grant_type: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
  }
  
  export interface ISalesforceApiResponseAuth {
    access_token: string;
    instance_url: string;
    id: string;
    token_type: string;
    issued_at: string;
    signature: string;
  }
  