const editor = {
  docId: null,
  content: "",
  bold: false,
  italic: false,
  underline: false,

  async init(docId) {
    this.docId = docId;
    this.textarea = document.getElementById("editor-textarea");
    this.boldButton = document.getElementById("bold-button");
    this.italicButton = document.getElementById("italic-button");
    this.underlineButton = document.getElementById("underline-button");
    this.downloadButton = document.getElementById("download-button");
    this.signOutButton = document.getElementById("editor-signout-button");

    this.textarea.addEventListener("input", (e) => this.handleEdit(e));
    this.boldButton.addEventListener("click", () => this.toggleStyle("bold"));
    this.italicButton.addEventListener("click", () =>
      this.toggleStyle("italic")
    );
    this.underlineButton.addEventListener("click", () =>
      this.toggleStyle("underline")
    );
    this.downloadButton.addEventListener("click", () => this.handleDownload());
    this.signOutButton.addEventListener("click", () => auth.signOut());

    await this.fetchDocument();
    this.startAutoSave();
  },

  async fetchDocument() {
    try {
      const { data } = await Amplify.Data.models.Document.list();
      const doc = data.find((d) => d.id === this.docId);
      if (doc) {
        this.content = doc.content || "";
        this.textarea.value = this.content;
      }
    } catch (error) {
      console.error("Failed to fetch document:", error);
    }
  },

  async handleEdit(event) {
    this.content = event.target.value;
    await this.saveDocument();
  },

  async saveDocument() {
    try {
      await Amplify.Data.models.Document.update({
        id: this.docId,
        content: this.content,
      });
    } catch (error) {
      console.error("Failed to save document:", error);
    }
  },

  toggleStyle(style) {
    this[style] = !this[style];
    const button = document.getElementById(`${style}-button`);
    button.classList.toggle("active");

    this.textarea.style.fontWeight = this.bold ? "bold" : "normal";
    this.textarea.style.fontStyle = this.italic ? "italic" : "normal";
    this.textarea.style.textDecoration = this.underline ? "underline" : "none";
  },

  async handleDownload() {
    try {
      const { data } = await Amplify.Data.models.Document.list();
      const doc = data.find((d) => d.id === this.docId);

      if (!doc) {
        alert("No document found.");
        return;
      }

      const blob = new Blob([doc.content || ""], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${doc.title || "document"}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download document.");
    }
  },

  startAutoSave() {
    setInterval(() => this.fetchDocument(), 1000);
  },
};
