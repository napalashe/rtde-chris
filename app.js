// Initialize the application
async function initApp() {
  try {
    // Initialize Amplify configuration
    const amplifyConfig = {
      Auth: {
        Cognito: {
          userPoolId: "us-east-1_gajpEI5Ox",
          userPoolClientId: "7sl2rmbk0m7hh96c6g1il3q9it",
          identityPoolId: "us-east-1:20079a08-6076-4ed1-a947-0bd5bd108cc7",
        },
      },
      API: {
        GraphQL: {
          endpoint:
            "https://et67qcynanbafjpd4rd5y7s4sm.appsync-api.us-east-1.amazonaws.com/graphql",
          region: "us-east-1",
          defaultAuthMode: "userPool",
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
