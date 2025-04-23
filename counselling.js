function toggleSection(section) {
    document.getElementById('ai-section').style.display = section === 'ai' ? 'block' : 'none';
    document.getElementById('person-section').style.display = section === 'person' ? 'block' : 'none';
  }
  
  async function sendAIMessage() {
    const input = document.getElementById("chat-input");
    const userMsg = input.value.trim();
    if (!userMsg) return;
  
    appendMessage("user", userMsg);
    input.value = "";
  
    appendMessage("bot", "Typing...");
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:5500"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI counselor for students struggling with academic stress and preparation." },
            { role: "user", content: userMsg }
          ],
          temperature: 0.7
        })
      });
  
      const data = await response.json();
      const aiReply = data.choices[0].message.content;
  
      // Remove the "Typing..." placeholder
      document.querySelectorAll(".bot-msg").forEach(msg => {
        if (msg.textContent === "Typing...") msg.remove();
      });
  
      appendMessage("bot", aiReply);
    } catch (error) {
      console.error("AI API Error:", error);
      document.querySelectorAll(".bot-msg").forEach(msg => {
        if (msg.textContent === "Typing...") msg.remove();
      });
      appendMessage("bot", "❌ Sorry, something went wrong. Please try again later.");
    }
  }
  
  function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("p");
    msg.classList.add(sender === "bot" ? "bot-msg" : "user-msg");
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Booking Form Handler
  document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("confirmation").style.display = "block";
    setTimeout(() => {
      document.getElementById("confirmation").style.display = "none";
      this.reset();
    }, 3000);
  });
  