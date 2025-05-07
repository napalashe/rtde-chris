# Real-time Document Editor

A static web application for real-time collaborative document editing using AWS Amplify.

## Features

- User authentication with AWS Cognito
- Real-time document editing
- Document formatting (bold, italic, underline)
- Document download
- Auto-saving

## Infrastructure

The application uses AWS services configured through CDK:

- AWS Cognito for authentication
- AWS AppSync for GraphQL API
- DynamoDB for document storage
- AWS Amplify for hosting

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

This is a static site deployed on AWS Amplify. The deployment is configured in `amplify.yml`.

### Infrastructure Deployment

The AWS infrastructure is managed through CDK. To deploy the infrastructure:

```bash
cdk deploy
```

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `app.js` - Main application logic
- `auth.js` - Authentication handling
- `documentSelector.js` - Document list and creation
- `editor.js` - Document editing functionality
- `infra/` - CDK infrastructure code
- `amplify/` - Amplify configuration

## Dependencies

- AWS Amplify
- AWS Amplify UI
- Serve (for local development)
- AWS CDK (for infrastructure)
