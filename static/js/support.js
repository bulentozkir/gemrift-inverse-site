(() => {
  const form = document.querySelector("#support-form");
  const status = document.querySelector("#support-status");
  const submit = document.querySelector("#support-submit");
  const attachment = document.querySelector("#attachment");
  if (!form || !status || !submit || !attachment) return;

  const maxBytes = 5 * 1024 * 1024;
  const cleanHeader = (text) => text.replace(/[\r\n]/g, " ").trim();
  const wrapBase64 = (text) => text.match(/.{1,76}/g)?.join("\r\n") || "";
  const toBase64 = (bytes) => {
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  };
  const encodeText = (text) => toBase64(new TextEncoder().encode(text));
  const encodeSubject = (text) => {
    const words = [];
    let part = "";
    for (const character of text) {
      if (new TextEncoder().encode(part + character).length > 42) {
        words.push(`=?UTF-8?B?${encodeText(part)}?=`);
        part = "";
      }
      part += character;
    }
    if (part) words.push(`=?UTF-8?B?${encodeText(part)}?=`);
    return words.join("\r\n ");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.removeAttribute("data-state");
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = cleanHeader(String(data.get("subject") || ""));
    const message = String(data.get("message") || "").trim();
    if (!subject || !message) {
      status.dataset.state = "error";
      status.textContent = "Please enter a subject and message, not just spaces.";
      return;
    }

    const file = attachment.files[0];
    if (file && file.size > maxBytes) {
      status.dataset.state = "error";
      status.textContent = "The attachment is larger than 5 MB. Please choose a smaller file.";
      return;
    }

    submit.disabled = true;
    try {
      const body = [
        `Topic: ${String(data.get("topic") || "")}`,
        `Environment: ${String(data.get("environment") || "").trim() || "Not specified"}`,
        "",
        message,
      ].join("\r\n");
      const boundary = `GemriftInverse_${crypto.randomUUID()}`;
      const lines = [
        "X-Unsent: 1",
        "To: Bulent Ozkir <bulentozkir@hotmail.com>",
        `Subject: ${encodeSubject(`[Gemrift inverse] ${subject}`)}`,
        "MIME-Version: 1.0",
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        "",
        `--${boundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: base64",
        "",
        wrapBase64(encodeText(body)),
      ];

      if (file) {
        const name = file.name.replace(/[^\x20-\x7e]|["\\]/g, "_") || "attachment";
        const encodedName = encodeURIComponent(file.name).replace(/['()*]/g, (character) =>
          `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
        lines.push(
          `--${boundary}`,
          "Content-Type: application/octet-stream",
          "Content-Transfer-Encoding: base64",
          `Content-Disposition: attachment; filename="${name}";`,
          ` filename*=UTF-8''${encodedName}`,
          "",
          wrapBase64(toBase64(new Uint8Array(await file.arrayBuffer())))
        );
      }

      lines.push(`--${boundary}--`, "");
      const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "message/rfc822" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "gemrift-inverse-support.eml";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      status.textContent = "Draft created: gemrift-inverse-support.eml. Open it in your mail app to review and send. Nothing has been emailed by this website.";
    } catch (error) {
      console.error("Could not prepare Gemrift inverse support draft.", error);
      status.dataset.state = "error";
      status.textContent = "Could not create the draft. Please email bulentozkir@hotmail.com directly instead.";
    } finally {
      submit.disabled = false;
    }
  });

  submit.disabled = false;
})();
