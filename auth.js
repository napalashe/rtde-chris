// Initialize the Authenticator
const auth = {
  async init() {
    const { Authenticator } = await import("@aws-amplify/ui");
    const authenticator = new Authenticator({
      container: document.getElementById("auth-container"),
    });

    authenticator.on("signIn", () => {
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("document-selector").style.display = "block";
    });

    authenticator.on("signOut", () => {
      document.getElementById("auth-container").style.display = "block";
      document.getElementById("document-selector").style.display = "none";
      document.getElementById("editor").style.display = "none";
    });

    return authenticator;
  },

  async signOut() {
    try {
      await Amplify.Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
};
