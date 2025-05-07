// Initialize the application
async function initApp() {
  try {
    // Initialize Amplify configuration
    const amplifyConfig = {
      Auth: {
        Cognito: {
          userPoolId: process.env.USER_POOL_ID,
          userPoolClientId: process.env.USER_POOL_CLIENT_ID,
        },
      },
      API: {
        GraphQL: {
          endpoint: process.env.GRAPHQL_ENDPOINT,
          region: process.env.REGION,
        },
      },
    };

    // Initialize Amplify
    await Amplify.configure(amplifyConfig);

    // Initialize authentication
    const authenticator = await auth.init();

    // Initialize document selector
    await documentSelector.init();

    // Handle URL changes for editor
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (hash.startsWith("#editor?docId=")) {
        const docId = hash.split("=")[1];
        documentSelector.openDocument(docId);
      }
    });

    // Check if we should open the editor directly
    const hash = window.location.hash;
    if (hash.startsWith("#editor?docId=")) {
      const docId = hash.split("=")[1];
      documentSelector.openDocument(docId);
    }
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

// Start the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
