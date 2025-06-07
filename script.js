const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("あなた", userText);
  input.value = "";
  callOpenAI(userText);
}

function appendMessage(sender, text) {
  chatBox.innerHTML += `<strong>${sender}：</strong> ${text}<br><br>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function callOpenAI(message) {
  appendMessage("ACT診断コーチ", "考えています…");

  const apiKey = "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";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたはACT診断コーチです。ユーザーの診断コード（例：SVE-2）を受け取り、それに合わせた成長・適職・自己理解・進化のアドバイスを行ってください。断定的で優しく、共感的な口調で話してください。"
        },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  const botMessage = data.choices?.[0]?.message?.content || "エラーが発生しました。";
  appendMessage("ACT診断コーチ", botMessage);
}
