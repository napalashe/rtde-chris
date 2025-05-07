const documentSelector = {
  async init() {
    this.documentsList = document.getElementById("documents-list");
    this.refreshButton = document.getElementById("refresh-button");
    this.createNewButton = document.getElementById("create-new-button");
    this.signOutButton = document.getElementById("signout-button");

    this.refreshButton.addEventListener("click", () => this.fetchDocuments());
    this.createNewButton.addEventListener("click", () => this.createDocument());
    this.signOutButton.addEventListener("click", () => auth.signOut());

    await this.fetchDocuments();
  },

  async fetchDocuments() {
    try {
      const { data } = await Amplify.Data.models.Document.list();
      this.documentsList.innerHTML = "";

      data.forEach((doc) => {
        const tile = document.createElement("a");
        tile.href = `#editor?docId=${doc.id}`;
        tile.className = "document-tile";
        tile.innerHTML = `
                    <h2>${doc.title || "Untitled"}</h2>
                    <p>Created: ${new Date(doc.createdAt).toLocaleString()}</p>
                `;
        tile.addEventListener("click", (e) => {
          e.preventDefault();
          this.openDocument(doc.id);
        });
        this.documentsList.appendChild(tile);
      });
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  },

  async createDocument() {
    const title = window.prompt("Create New Document");
    if (title) {
      try {
        await Amplify.Data.models.Document.create({ title });
        await this.fetchDocuments();
      } catch (error) {
        console.error("Failed to create document:", error);
      }
    }
  },

  openDocument(docId) {
    document.getElementById("document-selector").style.display = "none";
    document.getElementById("editor").style.display = "block";
    editor.init(docId);
  },
};
